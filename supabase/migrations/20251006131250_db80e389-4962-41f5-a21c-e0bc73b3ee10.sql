-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  guest_id UUID REFERENCES public.guests(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (true);

-- Trigger for updated_at
CREATE TRIGGER update_notifications_updated_at
  BEFORE UPDATE ON public.notifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create notification when guest responds
CREATE OR REPLACE FUNCTION public.notify_organizer_on_rsvp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  event_organizer_id UUID;
  event_title TEXT;
  guest_name TEXT;
  notification_message TEXT;
BEGIN
  -- Only trigger when rsvp_status changes
  IF OLD.rsvp_status IS DISTINCT FROM NEW.rsvp_status THEN
    -- Get event organizer and title
    SELECT organizer_id, title INTO event_organizer_id, event_title
    FROM public.events
    WHERE id = NEW.event_id;
    
    guest_name := NEW.name;
    
    -- Create appropriate notification message
    IF NEW.rsvp_status = 'confirmed' THEN
      notification_message := guest_name || ' a confirmé sa présence à votre événement "' || event_title || '"';
    ELSIF NEW.rsvp_status = 'declined' THEN
      notification_message := guest_name || ' a décliné l''invitation à votre événement "' || event_title || '"';
    ELSIF NEW.rsvp_status = 'maybe' THEN
      notification_message := guest_name || ' est peut-être intéressé par votre événement "' || event_title || '"';
    END IF;
    
    -- Insert notification
    INSERT INTO public.notifications (
      user_id,
      event_id,
      guest_id,
      type,
      title,
      message,
      metadata
    ) VALUES (
      event_organizer_id,
      NEW.event_id,
      NEW.id,
      'rsvp_response',
      'Nouvelle réponse RSVP',
      notification_message,
      jsonb_build_object(
        'guest_name', guest_name,
        'rsvp_status', NEW.rsvp_status,
        'response_date', NEW.response_date
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for RSVP notifications
DROP TRIGGER IF EXISTS on_guest_rsvp_change ON public.guests;
CREATE TRIGGER on_guest_rsvp_change
  AFTER UPDATE ON public.guests
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_organizer_on_rsvp();

-- Add qr_code column to guests if not exists
ALTER TABLE public.guests ADD COLUMN IF NOT EXISTS qr_code TEXT;
ALTER TABLE public.guests ADD COLUMN IF NOT EXISTS qr_code_generated_at TIMESTAMPTZ;

-- Add invitation_image column to events
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS invitation_image_url TEXT;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_event_id ON public.notifications(event_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_guests_qr_code ON public.guests(qr_code);