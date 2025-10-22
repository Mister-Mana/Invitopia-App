
import { resetPasswordWithSupabase } from './supabaseAuth';

export const resetPassword = async (
  email: string,
  setIsLoading: (value: boolean) => void,
  setError: (value: string | null) => void
) => {
  return resetPasswordWithSupabase(email, setIsLoading, setError);
};
