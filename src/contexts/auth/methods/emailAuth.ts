
import { User } from '../types';
import { 
  loginWithSupabase, 
  signupWithSupabase 
} from './supabaseAuth';

export const login = async (
  email: string, 
  password: string,
  setIsLoading: (value: boolean) => void,
  setError: (value: string | null) => void,
  setUser: (user: User) => void
) => {
  return loginWithSupabase(email, password, setIsLoading, setError, setUser);
};

export const signup = async (
  name: string, 
  email: string, 
  password: string,
  setIsLoading: (value: boolean) => void,
  setError: (value: string | null) => void,
  setUser: (user: User) => void
) => {
  return signupWithSupabase(name, email, password, setIsLoading, setError, setUser);
};
