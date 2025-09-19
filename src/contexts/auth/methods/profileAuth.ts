
import { User } from '../types';
import { 
  updateProfileWithSupabase, 
  logoutWithSupabase 
} from './supabaseAuth';

export const updateProfile = async (
  userData: Partial<User>,
  user: User | null,
  setIsLoading: (value: boolean) => void,
  setError: (value: string | null) => void,
  setUser: (user: User) => void
) => {
  return updateProfileWithSupabase(userData, user, setIsLoading, setError, setUser);
};

export const logout = (setUser: (user: User | null) => void) => {
  return logoutWithSupabase(setUser);
};
