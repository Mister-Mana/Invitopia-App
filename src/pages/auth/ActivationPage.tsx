import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Key, CheckCircle, ArrowRight } from 'lucide-react';

const ActivationPage: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [activationCode, setActivationCode] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  
  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activationCode.trim()) {
      toast.error(t('activation.codeRequired'));
      return;
    }
    
    setIsActivating(true);
    
    try {
      // Simuler une requête d'activation à l'API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Vérifier si le code est valide (dans un cas réel, ce serait fait côté serveur)
      if (activationCode.startsWith('ACT')) {
        setIsActivated(true);
        toast.success(t('activation.success'));
      } else {
        toast.error(t('activation.invalidCode'));
      }
    } catch (error) {
      toast.error(t('activation.error'));
    } finally {
      setIsActivating(false);
    }
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-invitopia-50">
        <Navbar />
        
        <main className="container mx-auto px-6 pt-24 pb-12 flex justify-center">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">{t('activation.title')}</CardTitle>
              <CardDescription className="text-center">
                {t('activation.description')}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {isActivated ? (
                <div className="text-center space-y-6 my-8">
                  <div className="flex justify-center">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{t('activation.successHeading')}</h3>
                    <p className="text-invitopia-600 mt-2">{t('activation.successMessage')}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleActivate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="activationCode">{t('activation.code')}</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-invitopia-500" />
                      <Input
                        id="activationCode"
                        value={activationCode}
                        onChange={(e) => setActivationCode(e.target.value)}
                        placeholder={t('activation.codePlaceholder')}
                        className="pl-10 font-mono"
                      />
                    </div>
                    <p className="text-sm text-invitopia-500">{t('activation.codeHint')}</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                    <p className="text-sm text-blue-600">{t('activation.hint')}</p>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-invitopia-700 hover:bg-invitopia-600"
                    disabled={isActivating}
                  >
                    {isActivating ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {t('activation.activating')}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Key className="h-4 w-4 mr-2" />
                        {t('activation.activate')}
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
            
            <CardFooter>
              {isActivated && (
                <Button
                  className="w-full bg-invitopia-700 hover:bg-invitopia-600"
                  onClick={() => navigate('/dashboard')}
                >
                  <div className="flex items-center justify-center">
                    {t('common.goToDashboard')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Button>
              )}
            </CardFooter>
          </Card>
        </main>
      </div>
    </PageTransition>
  );
};

export default ActivationPage;
