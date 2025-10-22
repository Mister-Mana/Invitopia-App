-- Enable RLS on badges table if not already enabled
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

-- Create enum for badge types if not exists
DO $$ BEGIN
  CREATE TYPE public.badge_category AS ENUM ('verified', 'premium', 'featured');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add badge category column to master_of_ceremonies if not exists
DO $$ BEGIN
  ALTER TABLE public.master_of_ceremonies 
  ADD COLUMN badge_category public.badge_category;
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;

-- Add badge expiry to master_of_ceremonies
DO $$ BEGIN
  ALTER TABLE public.master_of_ceremonies 
  ADD COLUMN badge_expires_at TIMESTAMP WITH TIME ZONE;
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;

-- Create function to update MC badge from badges table
CREATE OR REPLACE FUNCTION public.update_mc_badge()
RETURNS TRIGGER AS $$
BEGIN
  -- When a badge is approved, update the MC profile
  IF NEW.status = 'approved' AND NEW.badge_type IN ('verified', 'premium', 'featured') THEN
    UPDATE public.master_of_ceremonies
    SET 
      badge_category = NEW.badge_type::public.badge_category,
      badge_expires_at = NEW.expires_at,
      is_verified = true
    WHERE user_id = NEW.user_id;
  END IF;
  
  -- When a badge expires or is rejected, remove it
  IF NEW.status IN ('rejected', 'expired') THEN
    UPDATE public.master_of_ceremonies
    SET 
      badge_category = NULL,
      badge_expires_at = NULL,
      is_verified = CASE WHEN NEW.status = 'rejected' THEN false ELSE is_verified END
    WHERE user_id = NEW.user_id AND badge_category = NEW.badge_type::public.badge_category;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- Create trigger for badge updates
DROP TRIGGER IF EXISTS on_badge_status_change ON public.badges;
CREATE TRIGGER on_badge_status_change
  AFTER UPDATE OF status ON public.badges
  FOR EACH ROW
  EXECUTE FUNCTION public.update_mc_badge();