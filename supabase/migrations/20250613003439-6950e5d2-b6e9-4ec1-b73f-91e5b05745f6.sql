
-- Create badge types enum
CREATE TYPE badge_type AS ENUM ('excellence', 'professional', 'verified', 'premium');

-- Create badge status enum
CREATE TYPE badge_status AS ENUM ('pending', 'approved', 'rejected', 'active', 'revoked');

-- Create payment status enum
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Create content type enum
CREATE TYPE content_type AS ENUM ('home_hero', 'home_features', 'testimonial', 'pricing_plan', 'public_event', 'page_content');

-- Create badges table
CREATE TABLE public.badges (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  badge_type badge_type NOT NULL,
  status badge_status NOT NULL DEFAULT 'pending',
  application_reason text,
  price decimal(10,2) NOT NULL DEFAULT 0,
  payment_status payment_status NOT NULL DEFAULT 'pending',
  applied_at timestamp with time zone NOT NULL DEFAULT now(),
  reviewed_at timestamp with time zone,
  reviewed_by uuid REFERENCES public.profiles(id),
  expires_at timestamp with time zone,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create site_content table for managing all site content
CREATE TABLE public.site_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type content_type NOT NULL,
  title text NOT NULL,
  subtitle text,
  description text,
  content jsonb DEFAULT '{}'::jsonb,
  image_url text,
  is_active boolean NOT NULL DEFAULT true,
  display_order integer DEFAULT 0,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_by uuid REFERENCES public.profiles(id) NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create file_uploads table for managing all uploaded files
CREATE TABLE public.file_uploads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  original_filename text NOT NULL,
  stored_filename text NOT NULL,
  file_size bigint NOT NULL,
  mime_type text NOT NULL,
  upload_source text NOT NULL DEFAULT 'local', -- 'local' or 'google_drive'
  google_drive_file_id text,
  storage_path text NOT NULL,
  is_public boolean NOT NULL DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.file_uploads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for badges
CREATE POLICY "Users can view their own badges" ON public.badges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own badge applications" ON public.badges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all badges" ON public.badges
  FOR ALL USING (public.get_current_user_role() IN ('admin', 'super_admin'));

-- Create RLS policies for site_content
CREATE POLICY "Everyone can view active site content" ON public.site_content
  FOR SELECT USING (is_active = true);

CREATE POLICY "Super admins can manage all site content" ON public.site_content
  FOR ALL USING (public.get_current_user_role() = 'super_admin');

-- Create RLS policies for file_uploads
CREATE POLICY "Users can view their own files" ON public.file_uploads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can upload their own files" ON public.file_uploads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own files" ON public.file_uploads
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Super admins can view all files" ON public.file_uploads
  FOR ALL USING (public.get_current_user_role() = 'super_admin');

-- Insert default badge for super admin
INSERT INTO public.badges (user_id, badge_type, status, price, payment_status, applied_at, reviewed_at, expires_at)
SELECT 
  id, 
  'excellence'::badge_type, 
  'active'::badge_status, 
  0, 
  'completed'::payment_status, 
  now(), 
  now(), 
  now() + interval '10 years'
FROM public.profiles 
WHERE role = 'super_admin' 
LIMIT 1;

INSERT INTO public.badges (user_id, badge_type, status, price, payment_status, applied_at, reviewed_at, expires_at)
SELECT 
  id, 
  'professional'::badge_type, 
  'active'::badge_status, 
  0, 
  'completed'::payment_status, 
  now(), 
  now(), 
  now() + interval '10 years'
FROM public.profiles 
WHERE role = 'super_admin' 
LIMIT 1;

-- Insert default site content
INSERT INTO public.site_content (content_type, title, subtitle, description, content, is_active, display_order, created_by) 
SELECT 
  'home_hero'::content_type,
  'Créez des événements inoubliables avec Invitopia',
  'La plateforme complète pour organiser et gérer vos événements',
  'De la planification à la réalisation, Invitopia vous accompagne dans la création d''événements exceptionnels qui marquent les esprits.',
  '{"cta_text": "Commencer gratuitement", "cta_link": "/signup", "features": ["Invitations personnalisées", "Gestion des invités", "Suivi en temps réel"]}'::jsonb,
  true,
  1,
  id
FROM public.profiles 
WHERE role = 'super_admin' 
LIMIT 1;

-- Create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('site-uploads', 'site-uploads', true);

-- Create storage policies for the bucket
CREATE POLICY "Authenticated users can upload files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'site-uploads' AND auth.role() = 'authenticated');

CREATE POLICY "Users can view public files" ON storage.objects
  FOR SELECT USING (bucket_id = 'site-uploads');

CREATE POLICY "Users can update their own files" ON storage.objects
  FOR UPDATE USING (bucket_id = 'site-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own files" ON storage.objects
  FOR DELETE USING (bucket_id = 'site-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
