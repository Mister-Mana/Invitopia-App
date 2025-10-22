-- Fix all remaining RLS policy assignments from public to authenticated
-- This addresses the security vulnerabilities where tables are publicly readable

-- Fix profiles table policies (reassign to authenticated role)
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (get_current_user_role() = ANY (ARRAY['admin'::user_role, 'super_admin'::user_role]));

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Fix guests table policies (reassign to authenticated role)
DROP POLICY IF EXISTS "Event organizers can delete their event guests" ON public.guests;
DROP POLICY IF EXISTS "Event organizers can insert guests to their events" ON public.guests;
DROP POLICY IF EXISTS "Event organizers can update their event guests" ON public.guests;
DROP POLICY IF EXISTS "Event organizers can view their event guests" ON public.guests;

CREATE POLICY "Event organizers can delete their event guests" ON public.guests
  FOR DELETE TO authenticated
  USING (EXISTS ( SELECT 1
   FROM events e
  WHERE ((e.id = guests.event_id) AND (e.organizer_id = auth.uid()))));

CREATE POLICY "Event organizers can insert guests to their events" ON public.guests
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS ( SELECT 1
   FROM events e
  WHERE ((e.id = guests.event_id) AND (e.organizer_id = auth.uid()))));

CREATE POLICY "Event organizers can update their event guests" ON public.guests
  FOR UPDATE TO authenticated
  USING (EXISTS ( SELECT 1
   FROM events e
  WHERE ((e.id = guests.event_id) AND (e.organizer_id = auth.uid()))))
  WITH CHECK (EXISTS ( SELECT 1
   FROM events e
  WHERE ((e.id = guests.event_id) AND (e.organizer_id = auth.uid()))));

CREATE POLICY "Event organizers can view their event guests" ON public.guests
  FOR SELECT TO authenticated
  USING (EXISTS ( SELECT 1
   FROM events e
  WHERE ((e.id = guests.event_id) AND (e.organizer_id = auth.uid()))));

-- Fix team_members table policies (reassign to authenticated role)
DROP POLICY IF EXISTS "Super admins can manage all team members" ON public.team_members;
DROP POLICY IF EXISTS "Team owners and members can view team members" ON public.team_members;
DROP POLICY IF EXISTS "Team owners can manage team members" ON public.team_members;

CREATE POLICY "Super admins can manage all team members" ON public.team_members
  FOR ALL TO authenticated
  USING (get_current_user_role() = 'super_admin'::user_role)
  WITH CHECK (get_current_user_role() = 'super_admin'::user_role);

CREATE POLICY "Team owners and members can view team members" ON public.team_members
  FOR SELECT TO authenticated
  USING (EXISTS ( SELECT 1
   FROM teams t
  WHERE ((t.id = team_members.team_id) AND ((t.owner_id = auth.uid()) OR (EXISTS ( SELECT 1
           FROM team_members tm2
          WHERE ((tm2.team_id = t.id) AND (tm2.user_id = auth.uid()) AND (tm2.status = 'accepted'::text))))))));

CREATE POLICY "Team owners can manage team members" ON public.team_members
  FOR ALL TO authenticated
  USING (EXISTS ( SELECT 1
   FROM teams t
  WHERE ((t.id = team_members.team_id) AND (t.owner_id = auth.uid()))))
  WITH CHECK (EXISTS ( SELECT 1
   FROM teams t
  WHERE ((t.id = team_members.team_id) AND (t.owner_id = auth.uid()))));

-- Fix payments table policies (reassign to authenticated role)
DROP POLICY IF EXISTS "Super admins can manage all payments" ON public.payments;
DROP POLICY IF EXISTS "Users can view their own payments" ON public.payments;

CREATE POLICY "Super admins can manage all payments" ON public.payments
  FOR ALL TO authenticated
  USING (get_current_user_role() = 'super_admin'::user_role)
  WITH CHECK (get_current_user_role() = 'super_admin'::user_role);

CREATE POLICY "Users can view their own payments" ON public.payments
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Fix advertising_accounts table policies (reassign to authenticated role)
DROP POLICY IF EXISTS "Organizers can manage their advertising accounts" ON public.advertising_accounts;
DROP POLICY IF EXISTS "Super admins can view all advertising accounts" ON public.advertising_accounts;

CREATE POLICY "Organizers can manage their advertising accounts" ON public.advertising_accounts
  FOR ALL TO authenticated
  USING (organizer_id = auth.uid())
  WITH CHECK (organizer_id = auth.uid());

CREATE POLICY "Super admins can view all advertising accounts" ON public.advertising_accounts
  FOR SELECT TO authenticated
  USING (get_current_user_role() = 'super_admin'::user_role);

-- Fix contacts table policies (reassign to authenticated role)
DROP POLICY IF EXISTS "Users can delete their own contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can insert their own contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can update their own contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can view their own contacts" ON public.contacts;

CREATE POLICY "Users can delete their own contacts" ON public.contacts
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own contacts" ON public.contacts
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contacts" ON public.contacts
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own contacts" ON public.contacts
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);