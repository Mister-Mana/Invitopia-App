
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/common/SEO';
import { toast } from 'sonner';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import PageTransition from '@/components/PageTransition';
import { Mail, Phone } from 'lucide-react';
import PhoneAuth from '@/components/auth/PhoneAuth';
import AuthCard from '@/components/auth/AuthCard';
import EmailAuthForm from '@/components/auth/EmailAuthForm';
import AuthFooter from '@/components/auth/AuthFooter';
import HomeLink from '@/components/auth/HomeLink';
import { EmailAuthFormData } from '@/components/auth/EmailAuthForm';

const SignIn: React.FC = () => {
  const { t } = useLanguage();
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showResendConfirmation, setShowResendConfirmation] = useState(false);
  
  const handleEmailSubmit = async (data: EmailAuthFormData) => {
    try {
      await login(data.email, data.password);
      toast.success(t('auth.loginSuccess'));
      navigate('/dashboard');
    } catch (error: any) {
      // Check if error is about email confirmation
      if (error.message.includes('confirmer votre adresse email') || error.message.includes('email')) {
        toast.error(error.message);
        setShowResendConfirmation(true);
      } else {
        toast.error(error.message || t('auth.loginFailed'));
      }
    }
  };

  const handleAuthSuccess = () => {
    navigate('/dashboard');
  };
  
  return (
    <PageTransition>
      <SEO 
        title="Connexion - Invitopia"
        description="Connectez-vous à votre compte Invitopia pour gérer vos événements"
        keywords="connexion invitopia, login, se connecter, accès compte"
      />
      <div className="min-h-screen bg-gradient-to-br from-invitopia-50 via-white to-invitopia-100 relative">
        <HomeLink />
        
        <main className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <AuthCard 
              title={t('auth.signIn')}
              description={t('auth.enterCredentials')}
              footer={<AuthFooter mode="signin" />}
            >
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="email" className="text-xs sm:text-sm">
                    <Mail className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">{t('auth.withEmail')}</span>
                    <span className="sm:hidden">Email</span>
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="text-xs sm:text-sm">
                    <Phone className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">{t('auth.withPhone')}</span>
                    <span className="sm:hidden">SMS</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="email">
                  <EmailAuthForm 
                    mode="signin" 
                    onSubmit={handleEmailSubmit} 
                    isLoading={isLoading} 
                  />
                </TabsContent>
                
                <TabsContent value="phone">
                  <PhoneAuth mode="signin" onSuccess={handleAuthSuccess} />
                </TabsContent>
              </Tabs>
            </AuthCard>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default SignIn;
