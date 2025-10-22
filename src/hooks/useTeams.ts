
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { Team, TeamMember } from '@/types/contacts';
import { toast } from 'sonner';

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [teamStats, setTeamStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchTeams = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Different queries based on user role
      let query = supabase.from('teams').select(`
        *,
        team_members(count)
      `);
      
      if (user.role === 'super_admin') {
        // Super admin can see all teams
        query = query.eq('is_active', true);
      } else {
        // Regular users see only their teams
        query = query
          .or(`owner_id.eq.${user.id},team_members.user_id.eq.${user.id}`)
          .eq('is_active', true);
      }
      
      const { data, error } = await query.order('name', { ascending: true });

      if (error) throw error;
      
      const teamsWithMemberCount = data?.map(team => ({
        ...team,
        members: team.team_members?.length || 0
      })) || [];
      
      setTeams(teamsWithMemberCount);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamMembers = async (teamId?: string) => {
    if (!user) return;

    try {
      let query = supabase.from('team_members').select(`
        *,
        teams(name, owner_id)
      `);
      
      if (teamId) {
        query = query.eq('team_id', teamId);
      }
      
      if (user.role !== 'super_admin') {
        // Regular users can only see members of their teams
        query = query.or(`team_id.in.(select id from teams where owner_id = ${user.id})`);
      }
      
      const { data, error } = await query.order('invited_at', { ascending: false });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchTeamStats = async () => {
    if (!user || user.role !== 'super_admin') return;

    try {
      const { data, error } = await supabase.rpc('get_team_statistics');
      if (error) throw error;
      setTeamStats(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const createTeam = async (teamData: {
    name: string;
    description?: string;
    team_type?: string;
    contact_email?: string;
    contact_phone?: string;
    budget?: number;
  }) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('teams')
        .insert({
          ...teamData,
          owner_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      await fetchTeams();
      toast.success('Équipe créée avec succès');
      return data;
    } catch (err: any) {
      toast.error(err.message);
      throw err;
    }
  };

  const updateTeam = async (teamId: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('teams')
        .update(updates)
        .eq('id', teamId);

      if (error) throw error;
      
      await fetchTeams();
      toast.success('Équipe mise à jour');
    } catch (err: any) {
      toast.error(err.message);
      throw err;
    }
  };

  const deleteTeam = async (teamId: string) => {
    try {
      const { error } = await supabase
        .from('teams')
        .update({ is_active: false })
        .eq('id', teamId);

      if (error) throw error;
      
      await fetchTeams();
      toast.success('Équipe supprimée');
    } catch (err: any) {
      toast.error(err.message);
      throw err;
    }
  };

  const inviteTeamMember = async (teamId: string, memberData: {
    email: string;
    role: string;
    full_name?: string;
    position?: string;
    department?: string;
  }) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .insert({
          team_id: teamId,
          email: memberData.email,
          role: memberData.role,
          full_name: memberData.full_name,
          position: memberData.position,
          department: memberData.department,
          invited_by: user?.id,
          status: 'pending'
        });

      if (error) throw error;
      
      await fetchTeamMembers(teamId);
      toast.success('Invitation envoyée');
    } catch (err: any) {
      toast.error(err.message);
      throw err;
    }
  };

  const updateTeamMember = async (memberId: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .update(updates)
        .eq('id', memberId);

      if (error) throw error;
      
      await fetchTeamMembers();
      toast.success('Membre mis à jour');
    } catch (err: any) {
      toast.error(err.message);
      throw err;
    }
  };

  const removeTeamMember = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', memberId);

      if (error) throw error;
      
      await fetchTeamMembers();
      toast.success('Membre supprimé');
    } catch (err: any) {
      toast.error(err.message);
      throw err;
    }
  };

  useEffect(() => {
    if (user) {
      fetchTeams();
      fetchTeamStats();
    }
  }, [user]);

  return {
    teams,
    teamMembers,
    teamStats,
    loading,
    error,
    fetchTeams,
    fetchTeamMembers,
    fetchTeamStats,
    createTeam,
    updateTeam,
    deleteTeam,
    inviteTeamMember,
    updateTeamMember,
    removeTeamMember,
    refetch: fetchTeams
  };
};
