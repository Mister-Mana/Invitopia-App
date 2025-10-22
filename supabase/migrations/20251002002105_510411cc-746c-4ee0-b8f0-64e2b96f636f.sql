-- Add draft support to events table
ALTER TABLE events ADD COLUMN IF NOT EXISTS is_draft boolean DEFAULT true;

-- Update existing events to not be drafts if they're published
UPDATE events SET is_draft = false WHERE status = 'published';