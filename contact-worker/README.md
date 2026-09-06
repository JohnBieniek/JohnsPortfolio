# Portfolio contact form

The Angular contact page posts email, subject, message, an empty honeypot,
and a client-generated submission ID to
`https://portfolio-contact-form.johnbieniekgt.workers.dev`.

All three visible fields are required in the browser and on the server.
Messages are sent to **shadowfox683@gmail.com** from
`contact-form@johnbieniek.com`, with the visitor's email as Reply-To.
The binding restricts both the sender and recipient.

## Reliability

- D1 stores the message before the browser receives a successful response.
- A unique submission ID prevents duplicate storage on browser retries.
- Cloudflare Queues handles delivery, with temporary failures retried after
  1, 5, 15, and 60 minutes.
- A cron runs every five minutes to recover messages that could not be queued;
  queued, sending, or retrying messages are recovered after two hours without progress.
- Terminal failures remain in D1 and are copied to a dead-letter queue.
- Atomic delivery claims prevent concurrent consumers from sending the same row.
- Email delivery is at least once: if email succeeds but recording its receipt
  fails, recovery can send it again. Browser submission deduplication does not
  imply exactly-once email delivery.
- Honeypot, origin checks, bounded request bodies and rate limiting reduce abuse.

The page retains the visitor's text on errors and reports a saved reference,
rather than claiming that the recipient has read or received the email.

## Current Cloudflare setup

The dedicated database, delivery queue, dead-letter queue, Worker and cron are
deployed. A live setup message was accepted by Cloudflare for the verified
destination, reference `JBN-20260906-B5EAA3`.

The delivery-event consumer is implemented and tested, but its subscription
is **not active**. Cloudflare reports that johnbieniek.com is not an enabled
Email Sending domain; enabling it through the current OAuth login returned
Unauthorized (2036). Whimsy's event queue likewise has no active subscription.
Sending through the existing restricted binding works, but `accepted` must
not be interpreted as confirmed inbox delivery.

Once the domain is onboarded to Email Sending, enable tracking with:

```sh
npx wrangler queues subscription create portfolio-contact-email-events --source email.sending --events message.delivered,message.deferred,message.bounced,message.failed,message.rejected,message.complained --name portfolio-contact-delivery --zone-id b07824ed9956633ef47025f559838f6c --domain johnbieniek.com
```

## Development and deployment

Run from `contact-worker` using Node.js 24:

```sh
npm ci
npm run check
npm test
npx wrangler d1 migrations apply portfolio-contact-inquiries --local
npm run dev
```

The unit tests use an in-memory SQLite database and simulated queue/email
bindings, and never send email. Wrangler local development also simulates mail.
For local browser development, add the local origin to ALLOWED_ORIGINS in a
local `.dev.vars` file and temporarily use the local Worker URL in the component.

```sh
npx wrangler d1 migrations apply portfolio-contact-inquiries --remote
npm run deploy
```

Deploy this backend separately from the portfolio Pages build. No API keys
belong in the Angular app. Generated Worker binding types are committed.

## Inspect and recover failures

```sh
npx wrangler d1 execute portfolio-contact-inquiries --remote --command "SELECT reference, status, delivery_attempts, last_error_code FROM inquiries ORDER BY created_at DESC LIMIT 20"
```

After investigating and fixing a terminal failure, an administrator can reset
that specific row from `failed` to `pending`; the cron will queue it again.
Review its recorded email receipt first to avoid resending accepted mail.
Messages remain in D1 until explicitly removed; the dead-letter queue is not
the permanent archive. Never expose D1 contents through the public endpoint.
