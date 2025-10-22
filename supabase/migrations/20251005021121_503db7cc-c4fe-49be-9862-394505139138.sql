-- Créer la table workflows pour la gestion complète des workflows
CREATE TABLE IF NOT EXISTS public.workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  event_type TEXT,
  steps JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Activer RLS sur workflows
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour workflows
CREATE POLICY "Users can manage their own workflows"
  ON public.workflows FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Super admins can manage all workflows"
  ON public.workflows FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin'
    )
  );

-- Créer la table marketing_campaigns
CREATE TABLE IF NOT EXISTS public.marketing_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  budget NUMERIC DEFAULT 0,
  spent NUMERIC DEFAULT 0,
  impressions BIGINT DEFAULT 0,
  clicks BIGINT DEFAULT 0,
  conversions BIGINT DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  target_audience JSONB DEFAULT '{}'::jsonb,
  ad_content JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Activer RLS sur marketing_campaigns
ALTER TABLE public.marketing_campaigns ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour marketing_campaigns
CREATE POLICY "Users can manage their own campaigns"
  ON public.marketing_campaigns FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Super admins can manage all campaigns"
  ON public.marketing_campaigns FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin'
    )
  );

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_workflows_updated_at
  BEFORE UPDATE ON public.workflows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_marketing_campaigns_updated_at
  BEFORE UPDATE ON public.marketing_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();