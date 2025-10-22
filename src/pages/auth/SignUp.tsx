
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
import EmailConfirmationMessage from '@/components/auth/EmailConfirmationMessage';
import { EmailAuthFormData } from '@/components/auth/EmailAuthForm';

const SignUp: React.FC = () => {
  const { t } = useLanguage();
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
  
  const handleEmailSubmit = async (data: EmailAuthFormData) => {
    try {
      if (data.name) {
        await signup(data.name, data.email, data.password);
        // Show confirmation message instead of navigating
        setRegisteredEmail(data.email);
        toast.success('Compte créé avec succès ! Vérifiez votre email.');
      }
    } catch (error: any) {
      toast.error(error.message || t('auth.signupFailed'));
    }
  };

  const handleAuthSuccess = () => {
    navigate('/dashboard');
  };

  // Show confirmation message if email registration succeeded
  if (registeredEmail) {
    return (
      <PageTransition>
        <SEO 
          title="Confirmation Email - Invitopia"
          description="Confirmez votre adresse email pour activer votre compte Invitopia"
        />
        <div className="min-h-screen bg-gradient-to-br from-invitopia-50 via-white to-invitopia-100 relative">
          <HomeLink />
          <main className="min-h-screen flex items-center justify-center p-4">
            <EmailConfirmationMessage email={registeredEmail} />
          </main>
        </div>
      </PageTransition>
    );
  }
  
  return (
    <PageTransition>
      <SEO 
        title="Inscription - Invitopia"
        description="Créez votre compte Invitopia et commencez à organiser des événements mémorables"
        keywords="inscription invitopia, créer compte, s'inscrire, nouveau compte"
      />
      <div className="min-h-screen bg-gradient-to-br from-invitopia-50 via-white to-invitopia-100 relative">
        <HomeLink />
        
        <main className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <AuthCard 
              title={t('auth.createAccount')}
              description={t('auth.enterDetails')}
              footer={<AuthFooter mode="signup" />}
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
                    mode="signup" 
                    onSubmit={handleEmailSubmit} 
                    isLoading={isLoading} 
                  />
                </TabsContent>
                
                <TabsContent value="phone">
                  <PhoneAuth mode="signup" onSuccess={handleAuthSuccess} />
                </TabsContent>
              </Tabs>
            </AuthCard>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default SignUp;
