
import { supabase } from '@/integrations/supabase/client';
import { User } from '../types';

export const loginWithSupabase = async (
  email: string,
  password: string,
  setIsLoading: (value: boolean) => void,
  setError: (value: string | null) => void,
  setUser: (user: User) => void
) => {
  setIsLoading(true);
  setError(null);

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (!profileError && profile) {
        const userData: User = {
          id: profile.id,
          name: profile.name,
          email: profile.email || data.user.email || '',
          phone: profile.phone,
          role: profile.role,
          avatar: profile.avatar,
          organization: profile.organization,
          bio: '', // Default empty values for new fields
          location: '',
          created_at: profile.created_at
        };
        setUser(userData);
      }
    }
  } catch (error: any) {
    setError(error.message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

export const signupWithSupabase = async (
  name: string,
  email: string,
  password: string,
  setIsLoading: (value: boolean) => void,
  setError: (value: string | null) => void,
  setUser: (user: User) => void
) => {
  setIsLoading(true);
  setError(null);

  try {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: name,
        }
      }
    });

    if (error) throw error;

    if (data.user) {
      // Profile will be created automatically by the trigger
      const userData: User = {
        id: data.user.id,
        name: name,
        email: email,
        role: 'organizer',
        bio: '',
        location: '',
        created_at: new Date().toISOString()
      };
      setUser(userData);
    }
  } catch (error: any) {
    setError(error.message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

export const updateProfileWithSupabase = async (
  userData: Partial<User>,
  user: User | null,
  setIsLoading: (value: boolean) => void,
  setError: (value: string | null) => void,
  setUser: (user: User) => void
) => {
  if (!user) throw new Error('Utilisateur non connecté');

  setIsLoading(true);
  setError(null);

  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        organization: userData.organization,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) throw error;

    // Update local user state
    const updatedUser: User = {
      ...user,
      ...userData,
    };
    setUser(updatedUser);
  } catch (error: any) {
    setError(error.message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

export const logoutWithSupabase = async (setUser: (user: User | null) => void) => {
  await supabase.auth.signOut();
  setUser(null);
};

export const resetPasswordWithSupabase = async (
  email: string,
  setIsLoading: (value: boolean) => void,
  setError: (value: string | null) => void
) => {
  setIsLoading(true);
  setError(null);

  try {
    const redirectUrl = `${window.location.origin}/reset-password`;
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) throw error;
  } catch (error: any) {
    setError(error.message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

export const sendPhoneVerificationWithSupabase = async (
  phone: string,
  setIsLoading: (value: boolean) => void,
  setError: (value: string | null) => void
) => {
  setIsLoading(true);
  setError(null);

  try {
    const { error } = await supabase.auth.signInWithOtp({
      phone: phone,
    });

    if (error) throw error;
  } catch (error: any) {
    setError(error.message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

export const loginWithPhoneSupabase = async (
  phone: string,
  token: string,
  setIsLoading: (value: boolean) => void,
  setError: (value: string | null) => void,
  setUser: (user: User) => void
) => {
  setIsLoading(true);
  setError(null);

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone: phone,
      token: token,
      type: 'sms'
    });

    if (error) throw error;

    if (data.user) {
      // Fetch or create user profile
      let { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const newProfile = {
          id: data.user.id,
          name: data.user.phone || 'Utilisateur',
          phone: data.user.phone,
          role: 'organizer' as const
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();

        if (createError) throw createError;
        profile = createdProfile;
      } else if (profileError) {
        throw profileError;
      }

      if (profile) {
        const userData: User = {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          role: profile.role,
          avatar: profile.avatar,
          organization: profile.organization,
          bio: '',
          location: '',
          created_at: profile.created_at
        };
        setUser(userData);
      }
    }
  } catch (error: any) {
    setError(error.message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

export const signupWithPhoneSupabase = async (
  name: string,
  phone: string,
  setIsLoading: (value: boolean) => void,
  setError: (value: string | null) => void
) => {
  setIsLoading(true);
  setError(null);

  try {
    const { error } = await supabase.auth.signInWithOtp({
      phone: phone,
      options: {
        data: {
          name: name,
        }
      }
    });

    if (error) throw error;
  } catch (error: any) {
    setError(error.message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};
