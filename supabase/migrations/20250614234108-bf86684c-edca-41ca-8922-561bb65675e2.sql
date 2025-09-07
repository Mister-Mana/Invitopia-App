
-- Table pour la gestion des paiements
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  stripe_payment_id TEXT,
  transaction_fee DECIMAL(10,2) DEFAULT 0,
  net_amount DECIMAL(10,2),
  metadata JSONB DEFAULT '{}',
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table pour la surveillance système
CREATE TABLE public.system_monitoring (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type TEXT NOT NULL,
  metric_name TEXT NOT NULL,
  value JSONB NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info',
  source TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- Table pour les activités système
CREATE TABLE public.system_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action_type TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  description TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table pour les intégrations API
CREATE TABLE public.api_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  api_key_encrypted TEXT,
  status TEXT NOT NULL DEFAULT 'inactive',
  configuration JSONB DEFAULT '{}',
  last_sync TIMESTAMPTZ,
  sync_frequency TEXT DEFAULT 'daily',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table pour Invitopia Ads (demandes de promotion)
CREATE TABLE public.promotion_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  organizer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  campaign_name TEXT NOT NULL,
  budget DECIMAL(10,2) NOT NULL,
  target_audience JSONB DEFAULT '{}',
  ad_content JSONB NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  impressions BIGINT DEFAULT 0,
  clicks BIGINT DEFAULT 0,
  conversions BIGINT DEFAULT 0,
  cost_per_click DECIMAL(10,4) DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table pour Invitopia Suite (comptes publicitaires)
CREATE TABLE public.advertising_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  account_name TEXT NOT NULL,
  account_type TEXT NOT NULL DEFAULT 'basic',
  monthly_budget DECIMAL(10,2) NOT NULL,
  current_spent DECIMAL(10,2) DEFAULT 0,
  billing_info JSONB DEFAULT '{}',
  payment_method_id TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table pour les templates avancés
CREATE TABLE public.advanced_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL,
  canvas_data JSONB NOT NULL DEFAULT '{}',
  layers JSONB NOT NULL DEFAULT '[]',
  assets JSONB NOT NULL DEFAULT '{}',
  animations JSONB DEFAULT '{}',
  interactive_elements JSONB DEFAULT '{}',
  thumbnail_url TEXT,
  preview_urls TEXT[] DEFAULT '{}',
  is_premium BOOLEAN DEFAULT false,
  is_ai_generated BOOLEAN DEFAULT false,
  download_count INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Activer RLS sur toutes les tables
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_monitoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotion_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advertising_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advanced_templates ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour les paiements
CREATE POLICY "Super admins can manage all payments" ON public.payments
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'super_admin'
  )
);

CREATE POLICY "Users can view their own payments" ON public.payments
FOR SELECT USING (user_id = auth.uid());

-- Politiques RLS pour la surveillance système
CREATE POLICY "Super admins can manage system monitoring" ON public.system_monitoring
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'super_admin'
  )
);

-- Politiques RLS pour les activités système
CREATE POLICY "Super admins can view all activities" ON public.system_activities
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'super_admin'
  )
);

-- Politiques RLS pour les intégrations API
CREATE POLICY "Super admins can manage API integrations" ON public.api_integrations
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'super_admin'
  )
);

-- Politiques RLS pour les demandes de promotion
CREATE POLICY "Organizers can manage their promotion requests" ON public.promotion_requests
FOR ALL USING (organizer_id = auth.uid());

CREATE POLICY "Super admins can manage all promotion requests" ON public.promotion_requests
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'super_admin'
  )
);

-- Politiques RLS pour les comptes publicitaires
CREATE POLICY "Organizers can manage their advertising accounts" ON public.advertising_accounts
FOR ALL USING (organizer_id = auth.uid());

CREATE POLICY "Super admins can view all advertising accounts" ON public.advertising_accounts
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'super_admin'
  )
);

-- Politiques RLS pour les templates avancés
CREATE POLICY "Public templates are viewable by all" ON public.advanced_templates
FOR SELECT USING (true);

CREATE POLICY "Users can create templates" ON public.advanced_templates
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own templates" ON public.advanced_templates
FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "Super admins can manage all templates" ON public.advanced_templates
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'super_admin'
  )
);

-- Index pour les performances
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_system_monitoring_timestamp ON public.system_monitoring(timestamp);
CREATE INDEX idx_system_activities_user_id ON public.system_activities(user_id);
CREATE INDEX idx_promotion_requests_organizer_id ON public.promotion_requests(organizer_id);
CREATE INDEX idx_promotion_requests_status ON public.promotion_requests(status);
CREATE INDEX idx_advertising_accounts_organizer_id ON public.advertising_accounts(organizer_id);
CREATE INDEX idx_advanced_templates_category ON public.advanced_templates(category);
CREATE INDEX idx_advanced_templates_type ON public.advanced_templates(type);
