
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { Database } from '@/integrations/supabase/types';

type OrganizationRow = Database['public']['Tables']['organizations']['Row'];
type OrganizationInsert = Database['public']['Tables']['organizations']['Insert'];
type OrganizationUpdate = Database['public']['Tables']['organizations']['Update'];

export interface Organization extends OrganizationRow {}

export const useOrganizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchOrganizations = async () => {
    if (!user) return;

    try {
      setLoading(true);
      let query = supabase.from('organizations').select('*');

      // Admins and super_admins can see all organizations
      if (user.role === 'admin' || user.role === 'super_admin') {
        // No additional filter
      } else {
        // Regular users can only see organizations they created
        query = query.eq('created_by', user.id);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      setOrganizations(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createOrganization = async (orgData: Partial<Organization>) => {
    if (!user) throw new Error('Utilisateur non authentifié');
    if (!orgData.name) throw new Error('Le nom de l\'organisation est requis');

    const insertData: OrganizationInsert = {
      name: orgData.name,
      created_by: user.id,
      logo: orgData.logo,
      address: orgData.address,
      website: orgData.website
    };

    const { data, error } = await supabase
      .from('organizations')
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;

    setOrganizations(prev => [data, ...prev]);
    return data;
  };

  const updateOrganization = async (id: string, orgData: Partial<Organization>) => {
    const updateData: OrganizationUpdate = {
      name: orgData.name,
      logo: orgData.logo,
      address: orgData.address,
      website: orgData.website
    };

    const { data, error } = await supabase
      .from('organizations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    setOrganizations(prev => prev.map(org => 
      org.id === id ? { ...org, ...data } : org
    ));
    return data;
  };

  const deleteOrganization = async (id: string) => {
    const { error } = await supabase
      .from('organizations')
      .delete()
      .eq('id', id);

    if (error) throw error;

    setOrganizations(prev => prev.filter(org => org.id !== id));
  };

  const approveOrganization = async (id: string) => {
    if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
      throw new Error('Accès non autorisé');
    }

    // This would typically involve updating a status field
    // For now, we'll just log the action
    console.log('Approving organization:', id);
  };

  useEffect(() => {
    fetchOrganizations();
  }, [user]);

  return {
    organizations,
    loading,
    error,
    createOrganization,
    updateOrganization,
    deleteOrganization,
    approveOrganization,
    refetch: fetchOrganizations
  };
};
