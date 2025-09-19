-- Créer la table pour les Maîtres de Cérémonie
CREATE TABLE public.master_of_ceremonies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  business_name TEXT NOT NULL,
  bio TEXT,
  specialties TEXT[],
  pricing_info JSONB DEFAULT '{}',
  social_media JSONB DEFAULT '{}',
  cover_image TEXT,
  profile_image TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  experience_years INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  rating NUMERIC DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  available_dates JSONB DEFAULT '{}',
  location TEXT,
  contact_info JSONB DEFAULT '{}',
  services JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Activer RLS
ALTER TABLE public.master_of_ceremonies ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour MC
CREATE POLICY "MC can manage their own profile"
ON public.master_of_ceremonies
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Everyone can view active MC profiles"
ON public.master_of_ceremonies
FOR SELECT
USING (is_active = true);

-- Créer la table pour les conversations de chat
CREATE TABLE public.mc_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mc_id UUID NOT NULL REFERENCES public.master_of_ceremonies(id) ON DELETE CASCADE,
  client_id UUID NOT NULL,
  last_message TEXT,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_read_by_mc BOOLEAN DEFAULT false,
  is_read_by_client BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS pour conversations
ALTER TABLE public.mc_conversations ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour conversations
CREATE POLICY "MC can view their conversations"
ON public.mc_conversations
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.master_of_ceremonies mc 
  WHERE mc.id = mc_conversations.mc_id AND mc.user_id = auth.uid()
));

CREATE POLICY "Clients can view their conversations"
ON public.mc_conversations
FOR ALL
USING (client_id = auth.uid());

-- Créer la table pour les messages
CREATE TABLE public.mc_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.mc_conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS pour messages
ALTER TABLE public.mc_messages ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour messages
CREATE POLICY "Users can view messages in their conversations"
ON public.mc_messages
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.mc_conversations conv 
  WHERE conv.id = mc_messages.conversation_id 
  AND (conv.client_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.master_of_ceremonies mc 
    WHERE mc.id = conv.mc_id AND mc.user_id = auth.uid()
  ))
));

CREATE POLICY "Users can send messages in their conversations"
ON public.mc_messages
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.mc_conversations conv 
  WHERE conv.id = mc_messages.conversation_id 
  AND (conv.client_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.master_of_ceremonies mc 
    WHERE mc.id = conv.mc_id AND mc.user_id = auth.uid()
  ))
));

-- Ajouter colonnes d'images aux venues
ALTER TABLE public.venues 
ADD COLUMN IF NOT EXISTS cover_image TEXT,
ADD COLUMN IF NOT EXISTS gallery_images TEXT[] DEFAULT '{}';

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour MC
CREATE TRIGGER update_mc_updated_at
    BEFORE UPDATE ON public.master_of_ceremonies
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger pour venues
CREATE TRIGGER update_venues_updated_at_new
    BEFORE UPDATE ON public.venues
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();