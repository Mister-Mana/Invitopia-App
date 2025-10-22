-- Add app configuration table for title and icon management
CREATE TABLE IF NOT EXISTS public.app_configuration (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  app_title TEXT NOT NULL DEFAULT 'Invitopia',
  app_icon_url TEXT,
  favicon_url TEXT,
  meta_description TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE public.app_configuration ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view active app configuration"
  ON public.app_configuration FOR SELECT
  USING (is_active = true);

CREATE POLICY "Super admins can manage app configuration"
  ON public.app_configuration FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'super_admin'::user_role
    )
  );

-- Insert default configuration
INSERT INTO public.app_configuration (app_title, app_icon_url, meta_description)
VALUES ('Invitopia', NULL, 'Plateforme de gestion d\'événements et d\'invitations');

-- Create storage bucket for app assets if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('app-assets', 'app-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for app assets storage
CREATE POLICY "App assets are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'app-assets');

CREATE POLICY "Super admins can upload app assets"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'app-assets' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'super_admin'::user_role
  )
);

CREATE POLICY "Super admins can update app assets"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'app-assets' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'super_admin'::user_role
  )
);

CREATE POLICY "Super admins can delete app assets"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'app-assets' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'super_admin'::user_role
  )
);