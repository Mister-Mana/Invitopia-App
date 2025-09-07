import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const { t } = useLanguage();
  const { resetPassword, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
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
    
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await resetPassword(email);
      setIsSubmitted(true);
      toast.success(t('auth.resetLinkSent'));
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
              <CardTitle className="text-2xl font-bold text-center">{t('auth.forgotPassword')}</CardTitle>
              <CardDescription className="text-center">
                {t('auth.resetInstructions')}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {isSubmitted ? (
                <div className="text-center space-y-4">
                  <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md">
                    <p>{t('auth.checkEmail')}</p>
                    <p className="text-sm mt-2">{t('auth.checkSpam')}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setIsSubmitted(false)}
                  >
                    {t('auth.tryAnotherEmail')}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                      t('auth.sendResetLink')
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <Link to="/signin" className="flex items-center text-sm font-medium text-invitopia-700 hover:text-invitopia-800">
                <ArrowLeft className="h-4 w-4 mr-1" />
                {t('auth.backToSignIn')}
              </Link>
            </CardFooter>
          </Card>
        </main>
      </div>
    </PageTransition>
  );
};

export default ForgotPassword;
