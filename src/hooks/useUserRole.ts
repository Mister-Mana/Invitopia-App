import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';

export type AppRole = 'super_admin' | 'admin' | 'organizer' | 'mc' | 'guest';

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.id) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch user role from user_roles table
        const { data, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })
          .limit(1)
          .single();

        if (roleError) {
          // User might not have a role yet
          if (roleError.code === 'PGRST116') {
            setRole('organizer'); // Default role
          } else {
            throw roleError;
          }
        } else {
          setRole(data.role as AppRole);
        }
      } catch (err: any) {
        console.error('Error fetching user role:', err);
        setError(err.message);
        setRole('organizer'); // Fallback to default role
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user?.id]);

  const hasRole = (requiredRole: AppRole | AppRole[]): boolean => {
    if (!role) return false;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(role);
    }
    
    return role === requiredRole;
  };

  const isAdmin = (): boolean => {
    return hasRole(['admin', 'super_admin']);
  };

  const isSuperAdmin = (): boolean => {
    return hasRole('super_admin');
  };

  return {
    role,
    loading,
    error,
    hasRole,
    isAdmin,
    isSuperAdmin
  };
};
