-- ========================================
-- SECURITY FIX 1: Create user_roles table
-- ========================================

-- Create app_role enum if it doesn't exist
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'organizer', 'mc', 'guest');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Migrate existing roles from profiles to user_roles
INSERT INTO public.user_roles (user_id, role, created_at)
SELECT id, role::text::public.app_role, created_at
FROM public.profiles
WHERE role IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- Create SECURITY DEFINER function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to get user role (returns first role, prioritizing higher privileges)
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS public.app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  ORDER BY 
    CASE role
      WHEN 'super_admin' THEN 1
      WHEN 'admin' THEN 2
      WHEN 'organizer' THEN 3
      WHEN 'mc' THEN 4
      WHEN 'guest' THEN 5
    END
  LIMIT 1
$$;

-- RLS Policies for user_roles table
-- Only super_admins can manage roles
CREATE POLICY "Super admins can view all roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can insert roles"
  ON public.user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can update roles"
  ON public.user_roles
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can delete roles"
  ON public.user_roles
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'));

-- Users can view their own role
CREATE POLICY "Users can view own role"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- ========================================
-- SECURITY FIX 2: Update profiles policies to use has_role
-- ========================================

-- Drop old role-based policies on profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super admins can update any profile" ON public.profiles;

-- Create new secure policies
CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'super_admin')
  );

CREATE POLICY "Super admins can update any profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'));

-- ========================================
-- SECURITY FIX 3: Add secret token to guests for secure RSVP
-- ========================================

-- Add secret_token column to guests table
ALTER TABLE public.guests 
ADD COLUMN IF NOT EXISTS secret_token UUID DEFAULT gen_random_uuid();

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_guests_secret_token ON public.guests(secret_token);

-- Update existing guests to have secret tokens
UPDATE public.guests 
SET secret_token = gen_random_uuid() 
WHERE secret_token IS NULL;

-- Make secret_token required for new rows
ALTER TABLE public.guests 
ALTER COLUMN secret_token SET NOT NULL;

-- RLS Policy for public RSVP updates (secure with token validation)
CREATE POLICY "Public can update own RSVP with valid token"
  ON public.guests
  FOR UPDATE
  TO anon, authenticated
  USING (true)  -- Allow check on any row
  WITH CHECK (
    -- Must provide matching secret_token to update
    secret_token = (current_setting('request.jwt.claims', true)::json->>'secret_token')::uuid
    OR
    -- Or be the event organizer
    event_id IN (
      SELECT id FROM public.events WHERE organizer_id = auth.uid()
    )
  );

-- Public can view guest info with valid token
CREATE POLICY "Public can view guest with valid token"
  ON public.guests
  FOR SELECT
  TO anon, authenticated
  USING (
    secret_token = (current_setting('request.jwt.claims', true)::json->>'secret_token')::uuid
    OR
    event_id IN (
      SELECT id FROM public.events WHERE organizer_id = auth.uid()
    )
  );

-- ========================================
-- SECURITY FIX 4: Fix SECURITY DEFINER functions search_path
-- ========================================

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role, created_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    NEW.email,
    'organizer',
    NOW()
  );
  
  -- Create default role entry
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'organizer')
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Fix update_venues_updated_at function
CREATE OR REPLACE FUNCTION public.update_venues_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Fix log_activity function
CREATE OR REPLACE FUNCTION public.log_activity(
  activity_type TEXT,
  activity_description TEXT,
  user_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.activity_log (type, description, created_at, user_id)
  VALUES (activity_type, activity_description, NOW(), user_id);
END;
$$;

-- Fix notify_organizer_on_rsvp function
CREATE OR REPLACE FUNCTION public.notify_organizer_on_rsvp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  organizer_id UUID;
  event_title TEXT;
BEGIN
  -- Get event details
  SELECT e.organizer_id, e.title INTO organizer_id, event_title
  FROM public.events e
  WHERE e.id = NEW.event_id;
  
  -- Create notification for organizer
  INSERT INTO public.notifications (
    user_id,
    title,
    message,
    type,
    related_id,
    created_at
  )
  VALUES (
    organizer_id,
    'New RSVP Response',
    'Guest ' || NEW.name || ' responded to ' || event_title,
    'rsvp',
    NEW.event_id,
    NOW()
  );
  
  RETURN NEW;
END;
$$;

-- ========================================
-- SECURITY FIX 5: Add audit logging for admin profile access
-- ========================================

-- Create audit log table
CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit_log
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Only super_admins can view audit logs
CREATE POLICY "Super admins can view audit logs"
  ON public.audit_log
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'));

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON public.audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON public.audit_log(action);

-- Function to log admin profile access
CREATE OR REPLACE FUNCTION public.log_profile_access()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Only log if accessed by admin/super_admin
  IF public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') THEN
    INSERT INTO public.audit_log (
      user_id,
      action,
      table_name,
      record_id,
      new_data,
      created_at
    )
    VALUES (
      auth.uid(),
      'SELECT',
      'profiles',
      NEW.id,
      to_jsonb(NEW),
      NOW()
    );
  END IF;
  
  RETURN NEW;
END;
$$;

COMMENT ON TABLE public.user_roles IS 'Stores user roles separately from profiles for security. Only super_admins can modify roles.';
COMMENT ON FUNCTION public.has_role IS 'SECURITY DEFINER function to check if a user has a specific role without triggering RLS recursion.';
COMMENT ON COLUMN public.guests.secret_token IS 'Secret token for secure public RSVP access without authentication.';