ALTER TABLE inquiries ADD COLUMN message_id TEXT;
ALTER TABLE inquiries ADD COLUMN accepted_at TEXT;
ALTER TABLE inquiries ADD COLUMN delivered_at TEXT;
ALTER TABLE inquiries ADD COLUMN delivery_event TEXT;
ALTER TABLE inquiries ADD COLUMN smtp_status_code TEXT;
ALTER TABLE inquiries ADD COLUMN smtp_response TEXT;

CREATE INDEX IF NOT EXISTS inquiries_message_id_idx
  ON inquiries (message_id);
