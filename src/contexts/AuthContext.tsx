
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { UserRole } from '@/lib/i18n';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  organization?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // For demo, retrieve from localStorage
        const storedUser = localStorage.getItem('invitopia_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, you'd call your authentication API here
      // For demo purposes, we'll simulate a successful login
      if (email && password) {
        // Mock user data
        const userData: User = {
          id: '123456',
          name: 'User Demo',
          email: email,
          role: 'organizer', // Default role for demo
          avatar: 'https://i.pravatar.cc/150?u=' + email
        };

        setUser(userData);
        localStorage.setItem('invitopia_user', JSON.stringify(userData));
      } else {
        throw new Error('Email et mot de passe requis');
      }
    } catch (error: any) {
      setError(error.message || 'Échec de connexion');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, you'd call your registration API here
      if (name && email && password) {
        // Mock user data
        const userData: User = {
          id: '123456',
          name: name,
          email: email,
          role: 'organizer', // Default role for new users
          avatar: 'https://i.pravatar.cc/150?u=' + email
        };

        setUser(userData);
        localStorage.setItem('invitopia_user', JSON.stringify(userData));
      } else {
        throw new Error('Tous les champs sont requis');
      }
    } catch (error: any) {
      setError(error.message || 'Échec d\'inscription');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('invitopia_user');
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, you'd call your password reset API here
      if (!email) {
        throw new Error('Email requis');
      }
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error: any) {
      setError(error.message || 'Échec de réinitialisation du mot de passe');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (userData: Partial<User>) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, you'd call your update profile API here
      if (user) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem('invitopia_user', JSON.stringify(updatedUser));
      } else {
        throw new Error('Utilisateur non connecté');
      }
    } catch (error: any) {
      setError(error.message || 'Échec de mise à jour du profil');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    resetPassword,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
