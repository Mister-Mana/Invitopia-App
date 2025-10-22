-- Add program field to events table for event schedule/agenda
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS program jsonb DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.events.program IS 'Event program/schedule with start time, steps, and end time';

-- Add preferences fields to guests table for RSVP information
ALTER TABLE public.guests ADD COLUMN IF NOT EXISTS beverage_preferences text;
ALTER TABLE public.guests ADD COLUMN IF NOT EXISTS food_preferences text;
ALTER TABLE public.guests ADD COLUMN IF NOT EXISTS dietary_restrictions text;
ALTER TABLE public.guests ADD COLUMN IF NOT EXISTS golden_book_message text;

COMMENT ON COLUMN public.guests.beverage_preferences IS 'Guest beverage preferences for events';
COMMENT ON COLUMN public.guests.food_preferences IS 'Guest food preferences for events';
COMMENT ON COLUMN public.guests.dietary_restrictions IS 'Guest dietary restrictions (vegetarian, vegan, etc.)';
COMMENT ON COLUMN public.guests.golden_book_message IS 'Guest message for the golden book/guestbook';