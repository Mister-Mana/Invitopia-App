
import { UserRole } from '@/lib/i18n';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  organization?: string;
  bio?: string;
  location?: string;
  created_at?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phone: string, code: string) => Promise<void>;
  sendPhoneVerification: (phone: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  signupWithPhone: (name: string, phone: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}
