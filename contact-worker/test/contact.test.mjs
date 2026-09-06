import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import worker from '../src/index.ts';

function setup() {
  const db = new DatabaseSync(':memory:');
  for (const file of [
    '0001_create_inquiries.sql',
    '0002_track_delivery_events.sql',
    '0003_delivery_event_order.sql',
  ])
    db.exec(readFileSync(new URL('../migrations/' + file, import.meta.url), 'utf8'));
  const sent = [],
    queued = [],
    dead = [];
  const env = {
    ALLOWED_ORIGINS: 'https://johnbieniek.com',
    FROM_ADDRESS: 'contact-form@johnbieniek.com',
    TO_ADDRESS: 'shadowfox683@gmail.com',
    CONTACT_DB: {
      prepare(sql) {
        let args = [];
        const statement = {
          bind(...values) {
            args = values;
            return statement;
          },
          async first() {
            return db.prepare(sql).get(...args) ?? null;
          },
          async all() {
            return { results: db.prepare(sql).all(...args) };
          },
          async run() {
            const result = db.prepare(sql).run(...args);
            return { meta: { changes: Number(result.changes) } };
          },
        };
        return statement;
      },
    },
    CONTACT_QUEUE: {
      async send(body) {
        queued.push(body);
      },
    },
    CONTACT_DLQ: {
      async send(body) {
        dead.push(body);
      },
    },
    CONTACT_EMAIL: {
      async send(body) {
        sent.push(body);
        return { messageId: 'test-email-id' };
      },
    },
    CONTACT_RATE_LIMITER: {
      async limit() {
        return { success: true };
      },
    },
  };
  const payload = {
    submissionId: crypto.randomUUID(),
    email: 'visitor@example.com',
    subject: 'A project',
    message: '<hello>\nLet’s talk',
    website: '',
  };
  const request = (body = payload, origin = 'https://johnbieniek.com') =>
    new Request('https://worker.example', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: origin },
      body: JSON.stringify(body),
    });
  const deliver = async (attempts = 1) => {
    const msg = {
      body: queued[0],
      attempts,
      ack() {
        this.acked = true;
      },
      retry(options) {
        this.retried = options;
      },
    };
    await worker.queue({ queue: 'portfolio-contact-email', messages: [msg] }, env);
    return msg;
  };
  return { db, env, sent, queued, dead, payload, request, deliver };
}
test('requires valid email, subject, message; rejects whitespace, injection, oversized and bot requests', async () => {
  const s = setup();
  for (const change of [
    { email: '' },
    { email: 'bad' },
    { subject: ' ' },
    { message: '' },
    { subject: 'Hi\r\nBcc: bad' },
    { message: 'x'.repeat(5001) },
    { website: 'spam' },
  ])
    assert.equal((await worker.fetch(s.request({ ...s.payload, ...change }), s.env)).status, 400);
  assert.equal(
    (await worker.fetch(s.request({ ...s.payload, message: 'x'.repeat(40000) }), s.env)).status,
    413,
  );
  assert.equal(
    (await worker.fetch(s.request(s.payload, 'https://evil.example'), s.env)).status,
    403,
  );
  assert.equal(s.db.prepare('SELECT count(*) AS count FROM inquiries').get().count, 0);
});
test('stores first, deduplicates retries, and sends escaped mail to the fixed inbox with Reply-To', async () => {
  const s = setup();
  const first = await (await worker.fetch(s.request(), s.env)).json();
  assert.equal(first.saved, true);
  const second = await (await worker.fetch(s.request(), s.env)).json();
  assert.equal(second.reference, first.reference);
  assert.equal(s.queued.length, 1);
  await s.deliver();
  await s.deliver();
  assert.equal(s.sent.length, 1);
  assert.equal(s.sent[0].to, 'shadowfox683@gmail.com');
  assert.equal(s.sent[0].replyTo, s.payload.email);
  assert.match(s.sent[0].html, /&lt;hello&gt;/);
  assert.equal(s.db.prepare('SELECT status FROM inquiries').get().status, 'accepted');
});
test('queue outage still saves successfully and scheduled recovery requeues it', async () => {
  const s = setup();
  const queue = s.env.CONTACT_QUEUE;
  s.env.CONTACT_QUEUE = {
    async send() {
      throw new Error('outage');
    },
  };
  const response = await (await worker.fetch(s.request(), s.env)).json();
  assert.equal(response.saved, true);
  assert.equal(response.queued, false);
  s.env.CONTACT_QUEUE = queue;
  let recovery;
  await worker.scheduled({}, s.env, {
    waitUntil(p) {
      recovery = p;
    },
  });
  await recovery;
  assert.equal(s.queued.length, 1);
  await s.deliver();
  assert.equal(s.sent.length, 1);
});
test('temporary email errors back off and terminal failures stay recoverable', async () => {
  const s = setup();
  await worker.fetch(s.request(), s.env);
  s.env.CONTACT_EMAIL.send = async () => {
    throw Object.assign(new Error('temporary'), { code: 'E_INTERNAL_SERVER_ERROR' });
  };
  assert.equal((await s.deliver(1)).retried.delaySeconds, 60);
  assert.equal((await s.deliver(4)).retried.delaySeconds, 3600);
  await s.deliver(5);
  assert.equal(s.dead.length, 1);
  assert.equal(s.db.prepare('SELECT status FROM inquiries').get().status, 'failed');
});
test('storage outage returns failure, never false success', async () => {
  const s = setup();
  s.env.CONTACT_DB.prepare = () => {
    throw new Error('storage down');
  };
  const response = await worker.fetch(s.request(), s.env);
  assert.equal(response.status, 503);
  assert.equal((await response.json()).saved, false);
});
test('rate limit rejects before storage', async () => {
  const s = setup();
  s.env.CONTACT_RATE_LIMITER.limit = async () => ({ success: false });
  assert.equal((await worker.fetch(s.request(), s.env)).status, 429);
  assert.equal(s.queued.length, 0);
});
test('delivery events retry until send receipt is stored and do not regress newer events', async () => {
  const s = setup();
  await worker.fetch(s.request(), s.env);
  const event = {
    body: {
      type: 'email.delivered',
      payload: { messageId: 'test-email-id' },
      metadata: { eventTimestamp: '2026-09-06T20:00:00.000Z' },
    },
    ack() {
      this.acked = true;
    },
    retry() {
      this.retried = true;
    },
  };
  await worker.queue({ queue: 'portfolio-contact-email-events', messages: [event] }, s.env);
  assert.equal(event.retried, true);
  await s.deliver();
  await worker.queue({ queue: 'portfolio-contact-email-events', messages: [event] }, s.env);
  event.body.type = 'email.deferred';
  event.body.metadata.eventTimestamp = '2026-09-06T19:00:00.000Z';
  await worker.queue({ queue: 'portfolio-contact-email-events', messages: [event] }, s.env);
  assert.equal(s.db.prepare('SELECT status FROM inquiries').get().status, 'delivered');
});
