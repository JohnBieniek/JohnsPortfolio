interface ContactPayload {
  submissionId?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
}
interface DeliveryMessage {
  inquiryId: string;
}
interface EmailDeliveryEvent {
  type: string;
  payload?: {
    messageId?: string;
    terminal?: boolean;
    delivery?: { status?: string; smtpStatusCode?: string; smtpResponse?: string };
    bounce?: { type?: string; classification?: string; reason?: string };
  };
  metadata?: { eventTimestamp?: string };
}
interface InquiryRow {
  id: string;
  reference: string;
  email: string;
  subject: string;
  message: string;
  status: string;
}

const limits = { email: 254, subject: 150, message: 5000 } as const;
const retryDelays = [60, 300, 900, 3600] as const;
const retryableCodes = new Set([
  'E_RATE_LIMIT_EXCEEDED',
  'E_DELIVERY_FAILED',
  'E_INTERNAL_SERVER_ERROR',
]);

function isAllowedOrigin(origin: string, env: Env): boolean {
  const configuredOrigins = new Set(env.ALLOWED_ORIGINS.split(',').map((value) => value.trim()));
  if (configuredOrigins.has(origin)) return true;
  try {
    const url = new URL(origin);
    return (
      url.protocol === 'https:' &&
      (url.hostname.endsWith('.johns-portfolio.pages.dev') ||
        url.hostname.endsWith('.johns-portfolio-beta.pages.dev'))
    );
  } catch {
    return false;
  }
}
function corsHeaders(origin: string): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}
function json(origin: string, body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: corsHeaders(origin) });
}
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
function textField(value: unknown): string | null {
  return typeof value === 'string' ? value.trim() : null;
}
function errorDetails(error: unknown): { code: string; message: string } {
  const failure = error instanceof Error ? error : new Error(String(error));
  const code = 'code' in failure && typeof failure.code === 'string' ? failure.code : 'UNKNOWN';
  return { code, message: failure.message.slice(0, 500) };
}
function publicReference(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `JBN-${date}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
}
async function findInquiry(env: Env, id: string): Promise<InquiryRow | null> {
  return env.CONTACT_DB.prepare(
    'SELECT id, reference, email, subject, message, status FROM inquiries WHERE id = ?',
  )
    .bind(id)
    .first<InquiryRow>();
}
async function sendInquiry(env: Env, inquiry: InquiryRow): Promise<string> {
  const subject = `Portfolio: ${inquiry.subject} [${inquiry.reference}]`;
  const text = [
    `Reference: ${inquiry.reference}`,
    `Email: ${inquiry.email}`,
    `Subject: ${inquiry.subject}`,
    '',
    inquiry.message,
  ].join('\n');
  const html = `<h2>New portfolio message</h2><p>Reference: ${escapeHtml(inquiry.reference)}</p><p>From: ${escapeHtml(inquiry.email)}</p><p>Subject: ${escapeHtml(inquiry.subject)}</p><p>${escapeHtml(inquiry.message).replace(/\n/g, '<br>')}</p>`;
  const result = await env.CONTACT_EMAIL.send({
    to: env.TO_ADDRESS,
    from: { email: env.FROM_ADDRESS, name: 'John Bieniek Portfolio' },
    replyTo: inquiry.email,
    subject,
    text,
    html,
  });
  return result.messageId;
}
async function markQueued(env: Env, id: string): Promise<void> {
  const now = new Date().toISOString();
  await env.CONTACT_DB.prepare(
    "UPDATE inquiries SET status = 'queued', updated_at = ?, last_error_code = NULL, last_error_message = NULL WHERE id = ? AND status IN ('pending', 'queue_failed')",
  )
    .bind(now, id)
    .run();
}

async function acceptInquiry(request: Request, env: Env, origin: string): Promise<Response> {
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json'))
    return json(
      origin,
      { ok: false, message: 'The form sent an unsupported request. Please refresh and try again.' },
      415,
    );
  if (Number(request.headers.get('Content-Length') ?? 0) > 32_768)
    return json(
      origin,
      { ok: false, message: 'Your message is too long to submit. Please shorten the message.' },
      413,
    );
  let payload: ContactPayload;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error('Missing body');
    let size = 0;
    let raw = '';
    const decoder = new TextDecoder();
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > 32_768) {
        await reader.cancel();
        return json(origin, { ok: false, message: 'Your message is too long.' }, 413);
      }
      raw += decoder.decode(chunk.value, { stream: true });
    }
    const parsed: unknown = JSON.parse(raw + decoder.decode());
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed))
      throw new Error('Invalid body');
    payload = parsed;
  } catch {
    return json(
      origin,
      { ok: false, message: 'We could not read the form. Please refresh and try again.' },
      400,
    );
  }
  if (textField(payload.website))
    return json(origin, { ok: false, message: 'Please leave the website field empty.' }, 400);
  const clientId = textField(payload.submissionId);
  const email = textField(payload.email);
  const subject = textField(payload.subject);
  const message = textField(payload.message);
  if (
    !clientId ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(clientId) ||
    !email ||
    !subject ||
    !message
  )
    return json(origin, { ok: false, message: 'Please complete every required field.' }, 400);
  if (
    email.length > limits.email ||
    subject.length > limits.subject ||
    message.length > limits.message
  )
    return json(
      origin,
      { ok: false, message: 'One of the fields is too long. Please shorten it.' },
      400,
    );
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(subject))
    return json(
      origin,
      { ok: false, message: 'Please enter a valid email and a single-line subject.' },
      400,
    );

  const existing = await env.CONTACT_DB.prepare(
    'SELECT id, reference, status FROM inquiries WHERE client_id = ?',
  )
    .bind(clientId)
    .first<{ id: string; reference: string; status: string }>();
  if (existing)
    return json(
      origin,
      {
        ok: true,
        saved: true,
        reference: existing.reference,
        message: `Your message is safely saved as ${existing.reference}. You do not need to submit it again.`,
      },
      202,
    );

  const id = crypto.randomUUID();
  const reference = publicReference();
  const now = new Date().toISOString();
  try {
    await env.CONTACT_DB.prepare(
      `INSERT INTO inquiries (id, client_id, reference, email, subject, message, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?)`,
    )
      .bind(id, clientId, reference, email, subject, message, now, now)
      .run();
  } catch (error) {
    // A concurrent retry may have inserted this submission while we were validating it.
    const duplicate = await env.CONTACT_DB.prepare(
      'SELECT reference FROM inquiries WHERE client_id = ?',
    )
      .bind(clientId)
      .first<{ reference: string }>();
    if (duplicate)
      return json(
        origin,
        {
          ok: true,
          saved: true,
          reference: duplicate.reference,
          message: `Your message is safely saved as ${duplicate.reference}. You do not need to submit it again.`,
        },
        202,
      );
    const failure = errorDetails(error);
    console.error(
      JSON.stringify({
        message: 'contact inquiry storage failed',
        errorCode: failure.code,
        error: failure.message,
      }),
    );
    return json(
      origin,
      {
        ok: false,
        saved: false,
        message:
          'We could not safely save your message. Please try again in a moment or email Contact@JohnBieniek.com directly.',
      },
      503,
    );
  }
  try {
    await env.CONTACT_QUEUE.send({ inquiryId: id } satisfies DeliveryMessage);
    await markQueued(env, id);
    console.log(JSON.stringify({ message: 'contact inquiry queued', inquiryId: id, reference }));
    return json(
      origin,
      {
        ok: true,
        saved: true,
        queued: true,
        reference,
        message: `Thanks—your message is safely saved as ${reference}.`,
      },
      202,
    );
  } catch (error) {
    const failure = errorDetails(error);
    await env.CONTACT_DB.prepare(
      "UPDATE inquiries SET status = 'queue_failed', updated_at = ?, last_error_code = ?, last_error_message = ? WHERE id = ? AND status = 'pending'",
    )
      .bind(new Date().toISOString(), failure.code, failure.message, id)
      .run()
      .catch(() => {
        console.error(
          JSON.stringify({ message: 'queue failure status update failed', inquiryId: id }),
        );
      });
    console.error(
      JSON.stringify({
        message: 'contact inquiry queue failed',
        inquiryId: id,
        reference,
        errorCode: failure.code,
        error: failure.message,
      }),
    );
    return json(
      origin,
      {
        ok: true,
        saved: true,
        queued: false,
        reference,
        message: `Your message is safely saved as ${reference}, but delivery is delayed. You do not need to resubmit it.`,
      },
      202,
    );
  }
}

async function deliverMessage(message: Message<DeliveryMessage>, env: Env): Promise<void> {
  const inquiry = await findInquiry(env, message.body.inquiryId);
  if (inquiry?.status === 'failed') {
    await env.CONTACT_DLQ.send({ inquiryId: inquiry.id });
    message.ack();
    return;
  }
  if (
    !inquiry ||
    [
      'accepted',
      'delivered',
      'deferred',
      'bounced',
      'rejected',
      'complained',
      'sent',
      'delivery_unknown',
    ].includes(inquiry.status)
  ) {
    message.ack();
    return;
  }
  const now = new Date().toISOString();
  const claimed = await env.CONTACT_DB.prepare(
    "UPDATE inquiries SET status = 'sending', delivery_attempts = delivery_attempts + 1, updated_at = ? WHERE id = ? AND status IN ('pending', 'queued', 'queue_failed', 'retrying')",
  )
    .bind(now, inquiry.id)
    .run();
  if (!claimed.meta.changes) {
    message.retry({ delaySeconds: 60 });
    return;
  }
  try {
    const messageId = await sendInquiry(env, inquiry);
    await env.CONTACT_DB.prepare(
      `UPDATE inquiries SET status = 'accepted', message_id = ?, accepted_at = ?, updated_at = ?,
       last_error_code = NULL, last_error_message = NULL WHERE id = ?`,
    )
      .bind(messageId, now, now, inquiry.id)
      .run();
    console.log(
      JSON.stringify({
        message: 'contact email accepted',
        inquiryId: inquiry.id,
        reference: inquiry.reference,
        messageId,
        attempt: message.attempts,
      }),
    );
    message.ack();
  } catch (error) {
    const failure = errorDetails(error);
    const retryable = retryableCodes.has(failure.code) || failure.code === 'UNKNOWN';
    const canRetry = retryable && message.attempts <= retryDelays.length;
    const status = canRetry ? 'retrying' : 'failed';
    await env.CONTACT_DB.prepare(
      'UPDATE inquiries SET status = ?, updated_at = ?, last_error_code = ?, last_error_message = ? WHERE id = ?',
    )
      .bind(status, new Date().toISOString(), failure.code, failure.message, inquiry.id)
      .run();
    console.error(
      JSON.stringify({
        message: 'contact email failed',
        inquiryId: inquiry.id,
        reference: inquiry.reference,
        attempt: message.attempts,
        retryable,
        errorCode: failure.code,
        error: failure.message,
      }),
    );
    if (canRetry)
      message.retry({
        delaySeconds: retryDelays[Math.min(message.attempts - 1, retryDelays.length - 1)],
      });
    else {
      await env.CONTACT_DLQ.send({ inquiryId: inquiry.id } satisfies DeliveryMessage);
      message.ack();
    }
  }
}
function deliveryEventStatus(event: EmailDeliveryEvent): string {
  const eventName = event.type.split('.').at(-1) ?? 'unknown';
  if (eventName === 'delivered') return 'delivered';
  if (eventName === 'deferred') return 'deferred';
  if (['bounced', 'failed', 'rejected', 'complained'].includes(eventName)) return eventName;
  return 'delivery_unknown';
}
async function recordDeliveryEvent(message: Message<EmailDeliveryEvent>, env: Env): Promise<void> {
  const event = message.body;
  const messageId = event.payload?.messageId;
  if (!messageId) {
    console.error(
      JSON.stringify({ message: 'email delivery event missing message id', eventType: event.type }),
    );
    message.ack();
    return;
  }
  const status = deliveryEventStatus(event);
  const occurredAt = event.metadata?.eventTimestamp ?? new Date().toISOString();
  const smtpStatusCode = event.payload?.delivery?.smtpStatusCode ?? null;
  const smtpResponse =
    event.payload?.delivery?.smtpResponse ?? event.payload?.bounce?.reason ?? null;
  const errorCode = ['bounced', 'failed', 'rejected', 'complained'].includes(status)
    ? status.toUpperCase()
    : null;
  const result = await env.CONTACT_DB.prepare(
    `UPDATE inquiries SET status = ?, delivery_event = ?, delivered_at = CASE WHEN ? = 'delivered' THEN ? ELSE delivered_at END,
     sent_at = CASE WHEN ? = 'delivered' THEN ? ELSE sent_at END, updated_at = ?, smtp_status_code = ?, smtp_response = ?,
     last_error_code = ?, last_error_message = ?, delivery_event_at = ? WHERE message_id = ? AND (delivery_event_at IS NULL OR delivery_event_at <= ?)`,
  )
    .bind(
      status,
      event.type,
      status,
      occurredAt,
      status,
      occurredAt,
      occurredAt,
      smtpStatusCode,
      smtpResponse,
      errorCode,
      errorCode ? smtpResponse : null,
      occurredAt,
      messageId,
      occurredAt,
    )
    .run();
  if (!result.meta.changes) {
    const matched = await env.CONTACT_DB.prepare('SELECT id FROM inquiries WHERE message_id = ?')
      .bind(messageId)
      .first();
    if (!matched) {
      message.retry({ delaySeconds: 60 });
      return;
    }
  }
  console.log(
    JSON.stringify({
      message: 'contact delivery event recorded',
      messageId,
      status,
      matched: result.meta.changes,
      smtpStatusCode,
    }),
  );
  message.ack();
}
async function recoverStalledInquiries(env: Env): Promise<void> {
  // Longer than the longest queue backoff; never bypass a scheduled retry.
  const cutoff = new Date(Date.now() - 2 * 60 * 60_000).toISOString();
  const rows = await env.CONTACT_DB.prepare(
    `SELECT id FROM inquiries WHERE status IN ('pending', 'queue_failed')
     OR (status IN ('queued', 'sending', 'retrying') AND updated_at < ?) ORDER BY created_at ASC LIMIT 50`,
  )
    .bind(cutoff)
    .all<{ id: string }>();
  for (const row of rows.results) {
    try {
      const recovered = await env.CONTACT_DB.prepare(
        `UPDATE inquiries SET status = 'pending', updated_at = ?
        WHERE id = ? AND (status IN ('pending', 'queue_failed') OR (status IN ('queued', 'sending', 'retrying') AND updated_at < ?))`,
      )
        .bind(new Date().toISOString(), row.id, cutoff)
        .run();
      if (!recovered.meta.changes) continue;
      await env.CONTACT_QUEUE.send({ inquiryId: row.id } satisfies DeliveryMessage);
      await markQueued(env, row.id);
    } catch (error) {
      const failure = errorDetails(error);
      console.error(
        JSON.stringify({
          message: 'contact inquiry recovery failed',
          inquiryId: row.id,
          errorCode: failure.code,
          error: failure.message,
        }),
      );
    }
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') ?? '';
    if (!isAllowedOrigin(origin, env))
      return Response.json(
        { ok: false, message: 'This form origin is not allowed.' },
        { status: 403 },
      );
    if (request.method === 'OPTIONS')
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    if (request.method !== 'POST')
      return json(origin, { ok: false, message: 'Method not allowed.' }, 405);
    try {
      const allowed = await env.CONTACT_RATE_LIMITER.limit({
        key: request.headers.get('CF-Connecting-IP') ?? 'unknown',
      });
      if (!allowed.success)
        return json(
          origin,
          { ok: false, message: 'Please wait a minute before sending another message.' },
          429,
        );
      return await acceptInquiry(request, env, origin);
    } catch {
      console.error(JSON.stringify({ message: 'contact request failed' }));
      return json(
        origin,
        {
          ok: false,
          saved: false,
          message:
            'We could not confirm your message was saved. Please retry or email Contact@JohnBieniek.com directly.',
        },
        503,
      );
    }
  },
  async queue(batch: MessageBatch<DeliveryMessage | EmailDeliveryEvent>, env: Env): Promise<void> {
    if (batch.queue === 'portfolio-contact-email-events') {
      for (const message of batch.messages)
        await recordDeliveryEvent(message as Message<EmailDeliveryEvent>, env);
      return;
    }
    for (const message of batch.messages)
      await deliverMessage(message as Message<DeliveryMessage>, env);
  },
  async scheduled(
    _controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    ctx.waitUntil(recoverStalledInquiries(env));
  },
} satisfies ExportedHandler<Env, DeliveryMessage | EmailDeliveryEvent>;
