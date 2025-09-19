
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Mail, Lock, LogIn, User, UserPlus, Eye, EyeOff } from 'lucide-react';

interface EmailAuthFormProps {
  mode: 'signin' | 'signup';
  onSubmit: (data: EmailAuthFormData) => void;
  isLoading: boolean;
}

export interface EmailAuthFormData {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
}

const EmailAuthForm: React.FC<EmailAuthFormProps> = ({ mode, onSubmit, isLoading }) => {
  const { t } = useLanguage();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const validateForm = () => {
    let isValid = true;
    
    // Email validation
    if (!email.trim()) {
      setEmailError(t('auth.emailRequired'));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(t('auth.invalidEmail'));
      isValid = false;
    } else {
      setEmailError('');
    }
    
    // Password validation
    if (!password) {
      setPasswordError(t('auth.passwordRequired'));
      isValid = false;
    } else if (mode === 'signup' && password.length < 8) {
      setPasswordError(t('auth.passwordLength'));
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    if (mode === 'signup') {
      // Name validation
      if (!name.trim()) {
        setNameError(t('auth.nameRequired'));
        isValid = false;
      } else {
        setNameError('');
      }
      
      // Confirm password validation
      if (password !== confirmPassword) {
        setConfirmPasswordError(t('auth.passwordMismatch'));
        isValid = false;
      } else {
        setConfirmPasswordError('');
      }
    }
    
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSubmit({
      email,
      password,
      name: mode === 'signup' ? name : undefined,
      confirmPassword: mode === 'signup' ? confirmPassword : undefined
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'signup' && (
        <div className="space-y-2">
          <Label htmlFor="name">{t('auth.name')}</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-invitopia-500" />
            <Input
              id="name"
              type="text"
              placeholder={t('auth.namePlaceholder')}
              className={`pl-10 ${nameError ? 'border-red-500' : ''}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">{t('auth.email')}</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-invitopia-500" />
          <Input
            id="email"
            type="email"
            placeholder={t('auth.emailPlaceholder')}
            className={`pl-10 ${emailError ? 'border-red-500' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password">{t('auth.password')}</Label>
          {mode === 'signin' && (
            <Link to="/forgot-password" className="text-sm text-invitopia-600 hover:text-invitopia-800">
              {t('auth.forgotPassword')}?
            </Link>
          )}
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-invitopia-500 z-10" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder={t('auth.passwordPlaceholder')}
            className={`pl-10 pr-10 ${passwordError ? 'border-red-500' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-invitopia-500 hover:text-invitopia-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
      </div>
      
      {mode === 'signup' && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-invitopia-500 z-10" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t('auth.confirmPasswordPlaceholder')}
              className={`pl-10 pr-10 ${confirmPasswordError ? 'border-red-500' : ''}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-invitopia-500 hover:text-invitopia-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
        </div>
      )}
      
      <Button
        type="submit"
        className="w-full bg-invitopia-700 hover:bg-invitopia-600"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {t('common.loading')}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            {mode === 'signin' ? (
              <>
                <LogIn className="h-4 w-4 mr-2" />
                {t('auth.signIn')}
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                {t('auth.signUp')}
              </>
            )}
          </div>
        )}
      </Button>
    </form>
  );
};

export default EmailAuthForm;
