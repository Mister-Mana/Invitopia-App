-- Update teams table to ensure it has all needed columns for comprehensive management
ALTER TABLE teams ADD COLUMN IF NOT EXISTS team_type TEXT DEFAULT 'internal'::text;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active'::text;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS budget DECIMAL DEFAULT 0;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS contact_phone TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS settings JSONB DEFAULT '{}'::jsonb;

-- Update team_members table to ensure comprehensive member management
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS position TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS department TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS access_level TEXT DEFAULT 'standard'::text;

-- Create comprehensive RLS policies for Super Admin team management
CREATE POLICY "Super admins can manage all teams" 
ON teams FOR ALL 
USING (get_current_user_role() = 'super_admin'::user_role);

CREATE POLICY "Super admins can manage all team members" 
ON team_members FOR ALL 
USING (get_current_user_role() = 'super_admin'::user_role);

-- Add a function to get team statistics
CREATE OR REPLACE FUNCTION get_team_statistics()
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT jsonb_build_object(
    'total_teams', (SELECT COUNT(*) FROM teams WHERE is_active = true),
    'total_members', (SELECT COUNT(*) FROM team_members WHERE status = 'accepted'),
    'pending_invitations', (SELECT COUNT(*) FROM team_members WHERE status = 'pending'),
    'teams_by_type', (
      SELECT jsonb_object_agg(team_type, count)
      FROM (
        SELECT team_type, COUNT(*) as count
        FROM teams 
        WHERE is_active = true
        GROUP BY team_type
      ) t
    )
  );
$$;