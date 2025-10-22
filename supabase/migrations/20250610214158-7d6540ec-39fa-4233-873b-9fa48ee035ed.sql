
-- Create enum types for roles and event types
CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'organizer', 'guest');
CREATE TYPE event_type AS ENUM ('wedding', 'birthday', 'corporate', 'conference', 'concert', 'other');
CREATE TYPE event_status AS ENUM ('draft', 'published', 'canceled', 'completed');
CREATE TYPE event_visibility AS ENUM ('public', 'private', 'unlisted');
CREATE TYPE rsvp_status AS ENUM ('pending', 'confirmed', 'declined', 'maybe');
CREATE TYPE template_type AS ENUM ('invitation', 'ticket', 'rsvp', 'thank-you', 'save-the-date', 'menu', 'program');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  phone text,
  role user_role NOT NULL DEFAULT 'organizer',
  avatar text,
  organization text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create organizations table
CREATE TABLE public.organizations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  logo text,
  address text,
  website text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES public.profiles(id) NOT NULL
);

-- Create events table
CREATE TABLE public.events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  type event_type NOT NULL DEFAULT 'other',
  location jsonb,
  start_date timestamp with time zone NOT NULL,
  end_date timestamp with time zone,
  organizer_id uuid REFERENCES public.profiles(id) NOT NULL,
  status event_status NOT NULL DEFAULT 'draft',
  visibility event_visibility NOT NULL DEFAULT 'private',
  capacity integer,
  registration_deadline timestamp with time zone,
  custom_fields jsonb DEFAULT '[]'::jsonb,
  settings jsonb DEFAULT '{}'::jsonb,
  design jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create guests table
CREATE TABLE public.guests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id uuid REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  email text,
  phone text,
  rsvp_status rsvp_status NOT NULL DEFAULT 'pending',
  checked_in boolean NOT NULL DEFAULT false,
  check_in_time timestamp with time zone,
  invitation_sent boolean NOT NULL DEFAULT false,
  invitation_sent_date timestamp with time zone,
  response_date timestamp with time zone,
  plus_ones integer DEFAULT 0,
  plus_one_details jsonb DEFAULT '[]'::jsonb,
  group_id text,
  table_assignment text,
  custom_responses jsonb DEFAULT '{}'::jsonb,
  notes text,
  tags text[] DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create templates table
CREATE TABLE public.templates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  type template_type NOT NULL,
  category text,
  thumbnail text,
  preview_images text[] DEFAULT '{}',
  is_system boolean NOT NULL DEFAULT false,
  is_public boolean NOT NULL DEFAULT true,
  owner_id uuid REFERENCES public.profiles(id),
  layout jsonb DEFAULT '{}'::jsonb,
  elements jsonb DEFAULT '[]'::jsonb,
  default_data jsonb DEFAULT '{}'::jsonb,
  required_fields text[] DEFAULT '{}',
  popularity integer DEFAULT 0,
  tags text[] DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create tables for seating arrangements
CREATE TABLE public.tables (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id uuid REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  capacity integer NOT NULL,
  category text,
  location text,
  coordinates jsonb,
  shape text DEFAULT 'round',
  assignments jsonb DEFAULT '[]'::jsonb,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tables ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.get_current_user_role() IN ('admin', 'super_admin'));

-- Events policies
CREATE POLICY "Users can view their own events" ON public.events
  FOR SELECT USING (auth.uid() = organizer_id);

CREATE POLICY "Users can view public events" ON public.events
  FOR SELECT USING (visibility = 'public');

CREATE POLICY "Users can create their own events" ON public.events
  FOR INSERT WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Users can update their own events" ON public.events
  FOR UPDATE USING (auth.uid() = organizer_id);

CREATE POLICY "Users can delete their own events" ON public.events
  FOR DELETE USING (auth.uid() = organizer_id);

-- Guests policies
CREATE POLICY "Event organizers can manage guests" ON public.guests
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.events 
      WHERE events.id = guests.event_id 
      AND events.organizer_id = auth.uid()
    )
  );

-- Templates policies
CREATE POLICY "Everyone can view public templates" ON public.templates
  FOR SELECT USING (is_public = true OR owner_id = auth.uid());

CREATE POLICY "Users can create their own templates" ON public.templates
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own templates" ON public.templates
  FOR UPDATE USING (auth.uid() = owner_id);

-- Tables policies
CREATE POLICY "Event organizers can manage tables" ON public.tables
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.events 
      WHERE events.id = tables.event_id 
      AND events.organizer_id = auth.uid()
    )
  );

-- Organizations policies
CREATE POLICY "Users can view organizations they created" ON public.organizations
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can create organizations" ON public.organizations
  FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    'organizer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample templates
INSERT INTO public.templates (name, type, category, is_system, is_public, layout, elements) VALUES
('Modern Wedding Invitation', 'invitation', 'wedding', true, true, '{"width": 600, "height": 800}', '[{"id": "title", "type": "text", "content": "Wedding Invitation", "style": {"fontSize": 32, "textAlign": "center"}}]'),
('Birthday Party Invitation', 'invitation', 'birthday', true, true, '{"width": 600, "height": 800}', '[{"id": "title", "type": "text", "content": "Birthday Party", "style": {"fontSize": 28, "textAlign": "center"}}]'),
('Corporate Event Invitation', 'invitation', 'corporate', true, true, '{"width": 600, "height": 800}', '[{"id": "title", "type": "text", "content": "Corporate Event", "style": {"fontSize": 30, "textAlign": "center"}}]'),
('Conference Ticket', 'ticket', 'conference', true, true, '{"width": 400, "height": 200}', '[{"id": "event", "type": "text", "content": "Conference Ticket", "style": {"fontSize": 20}}]');
