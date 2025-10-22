-- Create or replace the trigger function for RSVP notifications
CREATE OR REPLACE FUNCTION public.notify_organizer_on_rsvp()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_rsvp_status_change ON public.guests;

-- Create the trigger
CREATE TRIGGER on_rsvp_status_change
  AFTER UPDATE ON public.guests
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_organizer_on_rsvp();