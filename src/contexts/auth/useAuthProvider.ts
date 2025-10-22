
import { useState, useEffect } from 'react';
import { User } from './types';
import { supabase } from '@/integrations/supabase/client';

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (import.meta.env.DEV) {
          console.log('Auth state changed:', event);
        }
        
        setSession(session);
        
        if (session?.user) {
          // Defer the profile fetch to avoid blocking the auth state change
          setTimeout(async () => {
            try {
              const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

              if (!profileError && profile) {
                // Fetch user role from user_roles table
                const { data: roleData } = await supabase
                  .from('user_roles')
                  .select('role')
                  .eq('user_id', session.user.id)
                  .order('created_at', { ascending: true })
                  .limit(1)
                  .single();

                const userData: User = {
                  id: profile.id,
                  name: profile.name,
                  email: profile.email || session.user.email || '',
                  role: roleData?.role || 'organizer',
                  avatar: profile.avatar,
                  organization: profile.organization,
                  phone: profile.phone,
                  bio: '',
                  location: '',
                  created_at: profile.created_at
                };
                setUser(userData);
              }
            } catch (error) {
              if (import.meta.env.DEV) {
                console.error('Error fetching profile:', error);
              }
            }
          }, 0);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    if (!sessionChecked) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setSessionChecked(true);
        if (!session?.user) {
          setIsLoading(false);
        }
      });
    }

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    setUser,
    session,
    setSession,
    isLoading,
    setIsLoading,
    error,
    setError
  };
};
