
-- Ajouter des colonnes pour les images de couverture multiples dans la table events
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS cover_images text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS primary_cover_image text;

-- Mettre à jour les événements existants pour migrer les anciennes images de couverture
UPDATE public.events 
SET cover_images = ARRAY[design->>'coverImage']::text[]
WHERE design->>'coverImage' IS NOT NULL AND design->>'coverImage' != '';

-- Définir l'image principale comme la première du tableau
UPDATE public.events 
SET primary_cover_image = cover_images[1]
WHERE array_length(cover_images, 1) > 0;

-- Créer une politique RLS pour permettre la lecture des événements publics
DROP POLICY IF EXISTS "Public events are viewable by everyone" ON public.events;
CREATE POLICY "Public events are viewable by everyone" 
ON public.events 
FOR SELECT 
USING (visibility = 'public' AND status = 'published');

-- Créer une vue pour les événements publics avec statistiques
CREATE OR REPLACE VIEW public.public_events_view AS
SELECT 
  e.*,
  COUNT(g.id) as attendees_count,
  COALESCE(e.capacity, 0) as total_capacity
FROM public.events e
LEFT JOIN public.guests g ON e.id = g.event_id AND g.rsvp_status = 'confirmed'
WHERE e.visibility = 'public' AND e.status = 'published'
GROUP BY e.id;

-- Activer RLS sur la vue (si possible)
ALTER VIEW public.public_events_view SET (security_invoker = true);
