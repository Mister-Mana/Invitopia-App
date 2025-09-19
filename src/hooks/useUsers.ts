
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { Database } from '@/integrations/supabase/types';

type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export interface User extends ProfileRow {}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchUsers = async () => {
    if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
      setError('Accès non autorisé');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setUsers(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: Database['public']['Enums']['user_role']) => {
    if (!user || user.role !== 'super_admin') {
      throw new Error('Seuls les super administrateurs peuvent modifier les rôles');
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, ...data } : u
    ));
    return data;
  };

  const deleteUser = async (userId: string) => {
    if (!user || user.role !== 'super_admin') {
      throw new Error('Seuls les super administrateurs peuvent supprimer des utilisateurs');
    }

    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (error) throw error;

    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const createAdminUser = async (userData: { name: string; email: string; role: Database['public']['Enums']['user_role'] }) => {
    if (!user || user.role !== 'super_admin') {
      throw new Error('Seuls les super administrateurs peuvent créer des comptes admin');
    }

    // Note: In a real implementation, you would need to use Supabase Admin API
    // to create users programmatically. For now, we'll just update existing users.
    console.log('Creating admin user:', userData);
    throw new Error('Fonctionnalité à implémenter avec l\'API Admin Supabase');
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  return {
    users,
    loading,
    error,
    updateUserRole,
    deleteUser,
    createAdminUser,
    refetch: fetchUsers
  };
};
