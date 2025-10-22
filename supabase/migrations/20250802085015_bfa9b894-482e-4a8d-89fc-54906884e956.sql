-- Fix security issues: Update function to set search_path
CREATE OR REPLACE FUNCTION get_team_statistics()
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT jsonb_build_object(
    'total_teams', (SELECT COUNT(*) FROM public.teams WHERE is_active = true),
    'total_members', (SELECT COUNT(*) FROM public.team_members WHERE status = 'accepted'),
    'pending_invitations', (SELECT COUNT(*) FROM public.team_members WHERE status = 'pending'),
    'teams_by_type', (
      SELECT jsonb_object_agg(team_type, count)
      FROM (
        SELECT team_type, COUNT(*) as count
        FROM public.teams 
        WHERE is_active = true
        GROUP BY team_type
      ) t
    )
  );
$$;