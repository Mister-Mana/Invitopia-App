-- Fix event_type enum to include 'charity'
ALTER TYPE event_type ADD VALUE IF NOT EXISTS 'charity';

-- Also add other common event types that might be missing
ALTER TYPE event_type ADD VALUE IF NOT EXISTS 'conference';
ALTER TYPE event_type ADD VALUE IF NOT EXISTS 'concert';
ALTER TYPE event_type ADD VALUE IF NOT EXISTS 'sports';
ALTER TYPE event_type ADD VALUE IF NOT EXISTS 'education';
ALTER TYPE event_type ADD VALUE IF NOT EXISTS 'graduation';
ALTER TYPE event_type ADD VALUE IF NOT EXISTS 'baby-shower';
ALTER TYPE event_type ADD VALUE IF NOT EXISTS 'housewarming';
ALTER TYPE event_type ADD VALUE IF NOT EXISTS 'theater';