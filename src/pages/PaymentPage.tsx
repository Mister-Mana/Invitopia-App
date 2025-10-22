
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, CreditCard, ArrowRight, Wallet, Receipt, Check, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [manualCode, setManualCode] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('payment.validatePayment') + ' ' + t('common.success'));
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };
  
  const generatePaymentCode = () => {
    const code = 'Inv' + Math.floor(1000000000 + Math.random() * 9000000000);
    setGeneratedCode(code);
    toast.success(t('payment.generateCode') + ' ' + t('common.success'));
  };
  
  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success('Code copié dans le presse-papier');
  };
  
  const validateManualPayment = () => {
    if (manualCode.trim() === '') {
      toast.error('Veuillez entrer un code de paiement');
      return;
    }
    
    toast.success(t('payment.validatePayment') + ' ' + t('common.success'));
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-invitopia-50">
        <Navbar />
        
        <main className="container mx-auto px-6 pt-24 pb-12">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="text-invitopia-600 hover:text-invitopia-800 mb-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {t('common.back')}
            </Button>
            <h1 className="text-3xl font-bold text-invitopia-900">{t('payment.methods')}</h1>
            <p className="text-invitopia-600 mt-1">Complétez votre paiement pour finaliser votre événement</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t('payment.methods')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="oneTime" className="w-full">
                    <TabsList className="grid grid-cols-2 mb-6">
                      <TabsTrigger value="oneTime">{t('payment.oneTime')}</TabsTrigger>
                      <TabsTrigger value="subscription">{t('payment.subscription')}</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="oneTime">
                      <form onSubmit={handlePaymentSubmit}>
                        <div className="space-y-6">
                          <div>
                            <Label className="text-base font-medium">Méthode de paiement</Label>
                            <RadioGroup 
                              value={paymentMethod} 
                              onValueChange={setPaymentMethod}
                              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3"
                            >
                              <div className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                paymentMethod === 'card' ? 'border-invitopia-700 bg-invitopia-50' : 'border-invitopia-200'
                              }`}>
                                <RadioGroupItem value="card" id="card" className="sr-only" />
                                <Label htmlFor="card" className="flex items-center cursor-pointer">
                                  <CreditCard className="h-5 w-5 mr-3 text-invitopia-600" />
                                  <div>
                                    <div className="font-medium">Carte bancaire</div>
                                    <div className="text-sm text-invitopia-500">VISA, Mastercard</div>
                                  </div>
                                </Label>
                              </div>
                              
                              <div className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                paymentMethod === 'mobile' ? 'border-invitopia-700 bg-invitopia-50' : 'border-invitopia-200'
                              }`}>
                                <RadioGroupItem value="mobile" id="mobile" className="sr-only" />
                                <Label htmlFor="mobile" className="flex items-center cursor-pointer">
                                  <Wallet className="h-5 w-5 mr-3 text-invitopia-600" />
                                  <div>
                                    <div className="font-medium">Mobile Money</div>
                                    <div className="text-sm text-invitopia-500">M-Pesa, Orange Money, Airtel Money</div>
                                  </div>
                                </Label>
                              </div>
                              
                              <div className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                paymentMethod === 'manual' ? 'border-invitopia-700 bg-invitopia-50' : 'border-invitopia-200'
                              }`}>
                                <RadioGroupItem value="manual" id="manual" className="sr-only" />
                                <Label htmlFor="manual" className="flex items-center cursor-pointer">
                                  <Receipt className="h-5 w-5 mr-3 text-invitopia-600" />
                                  <div>
                                    <div className="font-medium">Paiement manuel</div>
                                    <div className="text-sm text-invitopia-500">Code de paiement au bureau</div>
                                  </div>
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                          
                          {paymentMethod === 'card' && (
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="cardNumber">Numéro de carte</Label>
                                <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="expiryDate">Date d'expiration</Label>
                                  <Input id="expiryDate" placeholder="MM/AA" className="mt-1" />
                                </div>
                                <div>
                                  <Label htmlFor="cvv">CVV</Label>
                                  <Input id="cvv" placeholder="123" className="mt-1" />
                                </div>
                              </div>
                              
                              <div>
                                <Label htmlFor="nameOnCard">Nom sur la carte</Label>
                                <Input id="nameOnCard" placeholder="John Doe" className="mt-1" />
                              </div>
                            </div>
                          )}
                          
                          {paymentMethod === 'mobile' && (
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
                                <Input id="phoneNumber" placeholder="+243 123 456 789" className="mt-1" />
                              </div>
                              
                              <div>
                                <Label>Fournisseur</Label>
                                <RadioGroup defaultValue="mpesa" className="grid grid-cols-3 gap-2 mt-1">
                                  <div className="border rounded-md p-2 flex items-center justify-center">
                                    <RadioGroupItem value="mpesa" id="mpesa" className="sr-only" />
                                    <Label htmlFor="mpesa" className="cursor-pointer text-sm">M-Pesa</Label>
                                  </div>
                                  <div className="border rounded-md p-2 flex items-center justify-center">
                                    <RadioGroupItem value="orange" id="orange" className="sr-only" />
                                    <Label htmlFor="orange" className="cursor-pointer text-sm">Orange Money</Label>
                                  </div>
                                  <div className="border rounded-md p-2 flex items-center justify-center">
                                    <RadioGroupItem value="airtel" id="airtel" className="sr-only" />
                                    <Label htmlFor="airtel" className="cursor-pointer text-sm">Airtel Money</Label>
                                  </div>
                                </RadioGroup>
                              </div>
                            </div>
                          )}
                          
                          {paymentMethod === 'manual' && (
                            <div className="space-y-4">
                              {!generatedCode ? (
                                <Button 
                                  type="button" 
                                  onClick={generatePaymentCode}
                                  className="w-full"
                                >
                                  {t('payment.generateCode')}
                                </Button>
                              ) : (
                                <div className="border rounded-lg p-4">
                                  <div className="text-sm text-invitopia-600 mb-2">
                                    Votre code de paiement (à conserver):
                                  </div>
                                  <div className="flex items-center justify-between bg-invitopia-50 p-3 rounded-md">
                                    <div className="font-mono font-medium text-lg">{generatedCode}</div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={copyCodeToClipboard}
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <div className="text-sm text-invitopia-500 mt-2">
                                    Présentez ce code au bureau d'Invitopia pour compléter votre paiement.
                                  </div>
                                </div>
                              )}
                              
                              <div className="border-t pt-4">
                                <Label htmlFor="existingCode">Vous avez déjà un code?</Label>
                                <div className="flex mt-1">
                                  <Input 
                                    id="existingCode" 
                                    placeholder="Entrez votre code de paiement" 
                                    value={manualCode}
                                    onChange={(e) => setManualCode(e.target.value)}
                                    className="rounded-r-none"
                                  />
                                  <Button 
                                    type="button"
                                    onClick={validateManualPayment}
                                    className="rounded-l-none"
                                  >
                                    Valider
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {(paymentMethod === 'card' || paymentMethod === 'mobile') && (
                            <Button type="submit" className="w-full">
                              Payer maintenant
                            </Button>
                          )}
                        </div>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="subscription">
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="border-invitopia-200 hover:border-invitopia-300 cursor-pointer transition-all">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Basique</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <div className="text-3xl font-bold mb-2">$9<span className="text-sm font-normal text-invitopia-600">/mois</span></div>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-500" />
                                  Jusqu'à 3 événements
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-500" />
                                  50 invitations par mois
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-500" />
                                  Templates basiques
                                </li>
                              </ul>
                            </CardContent>
                            <CardFooter>
                              <Button variant="outline" className="w-full">Choisir</Button>
                            </CardFooter>
                          </Card>
                          
                          <Card className="border-invitopia-700 bg-invitopia-50 shadow cursor-pointer transition-all">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Premium</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <div className="text-3xl font-bold mb-2">$29<span className="text-sm font-normal text-invitopia-600">/mois</span></div>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-500" />
                                  Événements illimités
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-500" />
                                  250 invitations par mois
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-500" />
                                  Tous les templates premium
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-500" />
                                  Statistiques avancées
                                </li>
                              </ul>
                            </CardContent>
                            <CardFooter>
                              <Button className="w-full">Choisir</Button>
                            </CardFooter>
                          </Card>
                          
                          <Card className="border-invitopia-200 hover:border-invitopia-300 cursor-pointer transition-all">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Entreprise</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <div className="text-3xl font-bold mb-2">$99<span className="text-sm font-normal text-invitopia-600">/mois</span></div>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-500" />
                                  Événements illimités
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-500" />
                                  Invitations illimitées
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-500" />
                                  Templates personnalisés
                                </li>
                                <li className="flex items-center">
                                  <Check className="h-4 w-4 mr-2 text-green-500" />
                                  Support dédié
                                </li>
                              </ul>
                            </CardContent>
                            <CardFooter>
                              <Button variant="outline" className="w-full">Choisir</Button>
                            </CardFooter>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Résumé</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-invitopia-600">Événement</span>
                    <span>Mon Événement</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-invitopia-600">Type</span>
                    <span>Invitation</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-invitopia-600">Modèle</span>
                    <span>Premium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-invitopia-600">Invités</span>
                    <span>50</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium">
                      <span>Sous-total</span>
                      <span>$29.00</span>
                    </div>
                    <div className="flex justify-between text-invitopia-600 text-sm mt-2">
                      <span>TVA (16%)</span>
                      <span>$4.64</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>$33.64</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default PaymentPage;
