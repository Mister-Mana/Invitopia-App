import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PageTransition from '@/components/PageTransition';
import { Lock, CheckCircle, ArrowLeft } from 'lucide-react';

const ResetPassword: React.FC = () => {
  const { t } = useLanguage();
  const { resetPassword, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      toast.error(t('auth.invalidToken'));
      navigate('/forgot-password');
    }
  }, [location, navigate, t]);
  
  const validateForm = () => {
    let isValid = true;
    
    if (!password) {
      setPasswordError(t('auth.passwordRequired'));
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError(t('auth.passwordLength'));
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    if (password !== confirmPassword) {
      setConfirmPasswordError(t('auth.passwordMismatch'));
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }
    
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      toast.success(t('auth.passwordResetSuccess'));
    } catch (error: any) {
      toast.error(error.message || t('auth.resetFailed'));
    }
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-invitopia-50">
        <Navbar />
        
        <main className="container mx-auto px-6 pt-24 pb-12 flex justify-center">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">{t('auth.resetPassword')}</CardTitle>
              <CardDescription className="text-center">
                {t('auth.createNewPassword')}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {isSuccess ? (
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold">{t('auth.passwordResetSuccess')}</h3>
                  <p className="text-invitopia-600">{t('auth.canSignIn')}</p>
                  <Button
                    className="mt-4 bg-invitopia-700 hover:bg-invitopia-600"
                    onClick={() => navigate('/signin')}
                  >
                    {t('auth.backToSignIn')}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">{t('auth.newPassword')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-invitopia-500" />
                      <Input
                        id="password"
                        type="password"
                        placeholder={t('auth.passwordPlaceholder')}
                        className={`pl-10 ${passwordError ? 'border-red-500' : ''}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-invitopia-500" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder={t('auth.confirmPasswordPlaceholder')}
                        className={`pl-10 ${confirmPasswordError ? 'border-red-500' : ''}`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
                  </div>
                  
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
                      t('auth.resetPassword')
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
            
            {!isSuccess && (
              <CardFooter className="flex justify-center">
                <Link to="/signin" className="flex items-center text-sm font-medium text-invitopia-700 hover:text-invitopia-800">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  {t('auth.backToSignIn')}
                </Link>
              </CardFooter>
            )}
          </Card>
        </main>
      </div>
    </PageTransition>
  );
};

export default ResetPassword;
