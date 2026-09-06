CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL UNIQUE,
  reference TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  delivery_attempts INTEGER NOT NULL DEFAULT 0,
  last_error_code TEXT,
  last_error_message TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  sent_at TEXT
);

CREATE INDEX IF NOT EXISTS inquiries_status_updated_idx
  ON inquiries (status, updated_at);
