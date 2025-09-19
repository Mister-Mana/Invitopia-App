import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
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
import { Copy, CreditCard, FileText, ArrowRight } from 'lucide-react';

// Fonction pour générer un code de paiement unique
const generatePaymentCode = (userId: string) => {
  const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
  return `Inv${randomDigits}`;
};

const ManualPaymentPage: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [paymentCode, setPaymentCode] = useState('');
  const [amount, setAmount] = useState(0);
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  
  useEffect(() => {
    if (user) {
      // Générer un code de paiement unique
      const code = generatePaymentCode(user.id);
      setPaymentCode(code);
      
      // Définir un montant factice (dans une vraie application, cela viendrait du plan choisi)
      setAmount(100);
    }
  }, [user]);
  
  const copyToClipboard = () => {
    if (paymentCode) {
      navigator.clipboard.writeText(paymentCode);
      setIsCodeCopied(true);
      toast.success(t('payment.codeCopied'));
      
      // Réinitialiser l'état après 3 secondes
      setTimeout(() => {
        setIsCodeCopied(false);
      }, 3000);
    }
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-invitopia-50">
        <Navbar />
        
        <main className="container mx-auto px-6 pt-24 pb-12 flex justify-center">
          <Card className="w-full max-w-lg shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">{t('payment.manualPayment')}</CardTitle>
              <CardDescription className="text-center">
                {t('payment.manualInstructions')}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-invitopia-100 p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-invitopia-600">{t('payment.paymentCode')}</p>
                    <div className="flex items-center justify-between bg-white p-3 rounded-md border border-invitopia-200">
                      <div className="font-mono text-lg font-semibold">{paymentCode}</div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={copyToClipboard}
                        className="ml-2"
                      >
                        {isCodeCopied ? (
                          <span className="text-green-600 flex items-center">
                            <Copy className="h-4 w-4 mr-1" />
                            {t('payment.copied')}
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Copy className="h-4 w-4 mr-1" />
                            {t('payment.copy')}
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-invitopia-600">{t('payment.amount')}</p>
                    <div className="bg-white p-3 rounded-md border border-invitopia-200">
                      <div className="font-semibold text-lg">${amount} USD</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">{t('payment.howToPay')}</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <div className="bg-invitopia-100 h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="font-semibold text-invitopia-700">1</span>
                    </div>
                    <p>{t('payment.step1')}</p>
                  </div>
                  <div className="flex">
                    <div className="bg-invitopia-100 h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="font-semibold text-invitopia-700">2</span>
                    </div>
                    <p>{t('payment.step2')}</p>
                  </div>
                  <div className="flex">
                    <div className="bg-invitopia-100 h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="font-semibold text-invitopia-700">3</span>
                    </div>
                    <p>{t('payment.step3')}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">{t('payment.note')}</h4>
                    <p className="text-sm text-yellow-600 mt-1">{t('payment.paymentNote')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button
                className="w-full bg-invitopia-700 hover:bg-invitopia-600"
                onClick={() => navigate('/dashboard')}
              >
                <div className="flex items-center justify-center">
                  {t('common.backToDashboard')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Button>
              
              <div className="text-center text-sm text-invitopia-600">
                <p>{t('payment.preferOnline')}</p>
                <button
                  className="text-invitopia-700 hover:text-invitopia-800 font-medium"
                  onClick={() => navigate('/payment')}
                >
                  <div className="flex items-center justify-center mt-1">
                    <CreditCard className="h-4 w-4 mr-1" />
                    {t('payment.payOnline')}
                  </div>
                </button>
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </PageTransition>
  );
};

export default ManualPaymentPage;
