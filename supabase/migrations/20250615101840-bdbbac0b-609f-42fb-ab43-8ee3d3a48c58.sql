
-- Créer la table des contacts pour la gestion des invités
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  organization TEXT,
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  avatar_url TEXT,
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer la table des groupes de contacts
CREATE TABLE IF NOT EXISTS public.contact_groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer la table de liaison contacts-groupes
CREATE TABLE IF NOT EXISTS public.contact_group_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE,
  group_id UUID REFERENCES public.contact_groups(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(contact_id, group_id)
);

-- Créer la table des équipes
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES auth.users NOT NULL,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer la table des membres d'équipe
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'member',
  permissions JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending',
  invited_by UUID REFERENCES auth.users,
  invited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  joined_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(team_id, user_id),
  UNIQUE(team_id, email)
);

-- Créer la table des invitations/notifications
CREATE TABLE IF NOT EXISTS public.invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  guest_id UUID REFERENCES public.guests(id) ON DELETE CASCADE,
  invitation_type TEXT NOT NULL DEFAULT 'email',
  status TEXT NOT NULL DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE,
  responded_at TIMESTAMP WITH TIME ZONE,
  delivery_method JSONB DEFAULT '{"email": true, "sms": false, "whatsapp": false}',
  template_data JSONB DEFAULT '{}',
  tracking_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer la table des modèles d'invitations
CREATE TABLE IF NOT EXISTS public.invitation_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  subject TEXT,
  content TEXT NOT NULL,
  design_data JSONB DEFAULT '{}',
  variables JSONB DEFAULT '[]',
  is_default BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT false,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Ajouter des politiques RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitation_templates ENABLE ROW LEVEL SECURITY;

-- Politiques pour contacts
CREATE POLICY "Users can manage their own contacts" ON public.contacts
  FOR ALL USING (auth.uid() = user_id);

-- Politiques pour groupes de contacts
CREATE POLICY "Users can manage their own contact groups" ON public.contact_groups
  FOR ALL USING (auth.uid() = user_id);

-- Politiques pour membres des groupes
CREATE POLICY "Users can manage their group members" ON public.contact_group_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.contact_groups cg 
      WHERE cg.id = group_id AND cg.user_id = auth.uid()
    )
  );

-- Politiques pour équipes
CREATE POLICY "Users can view teams they own or belong to" ON public.teams
  FOR SELECT USING (
    owner_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.team_members tm 
      WHERE tm.team_id = id AND tm.user_id = auth.uid() AND tm.status = 'accepted'
    )
  );

CREATE POLICY "Users can manage their own teams" ON public.teams
  FOR ALL USING (owner_id = auth.uid());

-- Politiques pour membres d'équipe
CREATE POLICY "Team owners and members can view team members" ON public.team_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.teams t 
      WHERE t.id = team_id AND (
        t.owner_id = auth.uid() OR 
        EXISTS (
          SELECT 1 FROM public.team_members tm2 
          WHERE tm2.team_id = t.id AND tm2.user_id = auth.uid() AND tm2.status = 'accepted'
        )
      )
    )
  );

CREATE POLICY "Team owners can manage team members" ON public.team_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.teams t 
      WHERE t.id = team_id AND t.owner_id = auth.uid()
    )
  );

-- Politiques pour invitations
CREATE POLICY "Users can manage invitations for their events" ON public.invitations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.events e 
      WHERE e.id = event_id AND e.organizer_id = auth.uid()
    )
  );

-- Politiques pour modèles d'invitations
CREATE POLICY "Users can manage their own invitation templates" ON public.invitation_templates
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view public invitation templates" ON public.invitation_templates
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

-- Mettre à jour la table events pour ajouter des champs manquants
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS invitation_template_id UUID REFERENCES public.invitation_templates(id),
ADD COLUMN IF NOT EXISTS rsvp_deadline TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS max_guests_per_invitation INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS requires_approval BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS allow_plus_ones BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS event_url TEXT,
ADD COLUMN IF NOT EXISTS qr_code_data TEXT;
