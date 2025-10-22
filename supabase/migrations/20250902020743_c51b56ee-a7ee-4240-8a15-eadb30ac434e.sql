-- Fix critical security vulnerabilities in RLS policies

-- 1. Fix contacts table policies
DROP POLICY IF EXISTS "Contacts can be accessed by owner" ON public.contacts;
DROP POLICY IF EXISTS "Users can manage their own contacts" ON public.contacts;

-- Create secure policies for contacts table (authenticated users only)
CREATE POLICY "Users can view their own contacts"
ON public.contacts FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own contacts"
ON public.contacts FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contacts"
ON public.contacts FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contacts"
ON public.contacts FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- 2. Fix guests table policy (make it more secure)
DROP POLICY IF EXISTS "Event organizers can manage guests" ON public.guests;

CREATE POLICY "Event organizers can view their event guests"
ON public.guests FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM events e 
  WHERE e.id = guests.event_id 
  AND e.organizer_id = auth.uid()
));

CREATE POLICY "Event organizers can insert guests to their events"
ON public.guests FOR INSERT
TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM events e 
  WHERE e.id = guests.event_id 
  AND e.organizer_id = auth.uid()
));

CREATE POLICY "Event organizers can update their event guests"
ON public.guests FOR UPDATE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM events e 
  WHERE e.id = guests.event_id 
  AND e.organizer_id = auth.uid()
))
WITH CHECK (EXISTS (
  SELECT 1 FROM events e 
  WHERE e.id = guests.event_id 
  AND e.organizer_id = auth.uid()
));

CREATE POLICY "Event organizers can delete their event guests"
ON public.guests FOR DELETE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM events e 
  WHERE e.id = guests.event_id 
  AND e.organizer_id = auth.uid()
));

-- 3. Fix profiles table policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (get_current_user_role() = ANY (ARRAY['admin'::user_role, 'super_admin'::user_role]));

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 4. Fix payments table policies
DROP POLICY IF EXISTS "Super admins can manage all payments" ON public.payments;
DROP POLICY IF EXISTS "Users can view their own payments" ON public.payments;

CREATE POLICY "Users can view their own payments"
ON public.payments FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Super admins can manage all payments"
ON public.payments FOR ALL
TO authenticated
USING (get_current_user_role() = 'super_admin'::user_role)
WITH CHECK (get_current_user_role() = 'super_admin'::user_role);

-- 5. Fix teams table policies  
DROP POLICY IF EXISTS "Super admins can manage all teams" ON public.teams;
DROP POLICY IF EXISTS "Users can manage their own teams" ON public.teams;
DROP POLICY IF EXISTS "Users can view teams they own or belong to" ON public.teams;

CREATE POLICY "Users can view their own teams"
ON public.teams FOR SELECT
TO authenticated
USING (owner_id = auth.uid());

CREATE POLICY "Team members can view teams they belong to"
ON public.teams FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM team_members tm 
  WHERE tm.team_id = teams.id 
  AND tm.user_id = auth.uid() 
  AND tm.status = 'accepted'
));

CREATE POLICY "Users can insert their own teams"
ON public.teams FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Team owners can update their teams"
ON public.teams FOR UPDATE
TO authenticated
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Team owners can delete their teams"
ON public.teams FOR DELETE
TO authenticated
USING (owner_id = auth.uid());

CREATE POLICY "Super admins can manage all teams"
ON public.teams FOR ALL
TO authenticated
USING (get_current_user_role() = 'super_admin'::user_role)
WITH CHECK (get_current_user_role() = 'super_admin'::user_role);