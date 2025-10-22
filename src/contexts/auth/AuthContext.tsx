
import React, { createContext, useContext, ReactNode } from 'react';
import { AuthContextType } from './types';
import { useAuthProvider } from './useAuthProvider';
import * as authMethods from './methods';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { 
    user, 
    setUser, 
    isLoading, 
    setIsLoading, 
    error, 
    setError 
  } = useAuthProvider();

  const login = async (email: string, password: string) => {
    return authMethods.login(email, password, setIsLoading, setError, setUser);
  };

  const loginWithPhone = async (phone: string, code: string) => {
    return authMethods.loginWithPhone(phone, code, setIsLoading, setError, setUser);
  };

  const sendPhoneVerification = async (phone: string): Promise<void> => {
    return authMethods.sendPhoneVerification(phone, setIsLoading, setError);
  };

  const signup = async (name: string, email: string, password: string) => {
    return authMethods.signup(name, email, password, setIsLoading, setError, setUser);
  };

  const signupWithPhone = async (name: string, phone: string) => {
    return authMethods.signupWithPhone(name, phone, setIsLoading, setError);
  };

  const logout = () => {
    authMethods.logout(setUser);
  };

  const resetPassword = async (email: string) => {
    return authMethods.resetPassword(email, setIsLoading, setError);
  };

  const updateProfile = async (userData: Partial<typeof user>) => {
    if (user) {
      return authMethods.updateProfile(userData, user, setIsLoading, setError, setUser);
    }
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    loginWithPhone,
    sendPhoneVerification,
    signup,
    signupWithPhone,
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
