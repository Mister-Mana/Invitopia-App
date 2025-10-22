import { User } from '../types';

export const sendPhoneVerification = async (
  phone: string,
  setIsLoading: (value: boolean) => void,
  setError: (value: string | null) => void
): Promise<void> => {
  setIsLoading(true);
  setError(null);

  try {
    if (!phone) {
      throw new Error('Numéro de téléphone requis');
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    localStorage.setItem('invitopia_phone_pending', phone);
  } catch (error: any) {
    setError(error.message || 'Échec d\'envoi du code');
    throw error;
  } finally {
    setIsLoading(false);
  }
};

export const loginWithPhone = async (
  phone: string, 
  code: string,
  setIsLoading: (value: boolean) => void,
  setError: (value: string | null) => void,
  setUser: (user: User) => void
) => {
  setIsLoading(true);
  setError(null);

  try {
    if (!phone || !code) {
      throw new Error('Numéro de téléphone et code requis');
    }
    
    if (code.length !== 6 || !/^\d+$/.test(code)) {
      throw new Error('Code invalide');
    }
    
    const pendingPhone = localStorage.getItem('invitopia_phone_pending');
    if (phone !== pendingPhone) {
      throw new Error('Numéro de téléphone non reconnu');
    }
    
    const userData: User = {
      id: '7890123',
      name: 'Phone User',
      phone: phone,
      role: 'organizer',
      avatar: `https://i.pravatar.cc/150?u=${phone}`
    };

    setUser(userData);
    localStorage.setItem('invitopia_user', JSON.stringify(userData));
    localStorage.removeItem('invitopia_phone_pending');
  } catch (error: any) {
    setError(error.message || 'Échec de connexion');
    throw error;
  } finally {
    setIsLoading(false);
  }
};

export const signupWithPhone = async (
  name: string, 
  phone: string,
  setIsLoading: (value: boolean) => void,
  setError: (value: string | null) => void
) => {
  setIsLoading(true);
  setError(null);

  try {
    if (!name || !phone) {
      throw new Error('Nom et numéro de téléphone requis');
    }
    
    await sendPhoneVerification(phone, setIsLoading, setError);
  } catch (error: any) {
    setError(error.message || 'Échec d\'inscription');
    throw error;
  } finally {
    setIsLoading(false);
  }
};
