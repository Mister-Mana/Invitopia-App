
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageTransition from '@/components/PageTransition';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Check, X, Copy, Clock } from 'lucide-react';

// Données de test pour les paiements en attente
const pendingPayments = [
  {
    id: 1,
    code: 'Inv12345678',
    amount: 100,
    userName: 'Jean Dupont',
    userEmail: 'jean@example.com',
    date: '2023-06-15',
    status: 'pending'
  },
  {
    id: 2,
    code: 'Inv87654321',
    amount: 250,
    userName: 'Marie Martin',
    userEmail: 'marie@example.com',
    date: '2023-06-14',
    status: 'pending'
  },
  {
    id: 3,
    code: 'Inv98765432',
    amount: 150,
    userName: 'Pierre Bernard',
    userEmail: 'pierre@example.com',
    date: '2023-06-13',
    status: 'pending'
  }
];

// Données de test pour les paiements récents
const recentPayments = [
  {
    id: 4,
    code: 'Inv45678901',
    amount: 100,
    userName: 'Sophie Thomas',
    userEmail: 'sophie@example.com',
    date: '2023-06-10',
    status: 'approved',
    activationCode: 'ACT123456'
  },
  {
    id: 5,
    code: 'Inv56789012',
    amount: 250,
    userName: 'Luc Richard',
    userEmail: 'luc@example.com',
    date: '2023-06-09',
    status: 'rejected',
    reason: 'Paiement non reçu'
  }
];

// Générer un code d'activation unique
const generateActivationCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'ACT';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const ManualPaymentValidation: React.FC = () => {
  const { t } = useLanguage();
  const [searchCode, setSearchCode] = useState('');
  const [payments, setPayments] = useState(pendingPayments);
  const [recentValidations, setRecentValidations] = useState(recentPayments);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [activationCode, setActivationCode] = useState('');
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  
  const handleSearch = () => {
    if (!searchCode.trim()) {
      setPayments(pendingPayments);
      return;
    }
    
    const filtered = pendingPayments.filter(payment => 
      payment.code.toLowerCase().includes(searchCode.toLowerCase()) ||
      payment.userName.toLowerCase().includes(searchCode.toLowerCase()) ||
      payment.userEmail.toLowerCase().includes(searchCode.toLowerCase())
    );
    
    setPayments(filtered);
  };
  
  const handleApprove = (payment: any) => {
    setSelectedPayment(payment);
    const newCode = generateActivationCode();
    setActivationCode(newCode);
    
    // Dans une application réelle, ici vous mettriez à jour la base de données
    // Pour cette démo, nous allons simplement mettre à jour l'état local
    const updatedPayments = payments.filter(p => p.id !== payment.id);
    setPayments(updatedPayments);
    
    const updatedRecentValidations = [
      {
        ...payment,
        status: 'approved',
        activationCode: newCode
      },
      ...recentValidations
    ];
    setRecentValidations(updatedRecentValidations);
    
    toast.success(`Paiement approuvé pour ${payment.userName}`);
  };
  
  const handleReject = (payment: any) => {
    // Dans une application réelle, ici vous mettriez à jour la base de données
    // Pour cette démo, nous allons simplement mettre à jour l'état local
    const updatedPayments = payments.filter(p => p.id !== payment.id);
    setPayments(updatedPayments);
    
    const updatedRecentValidations = [
      {
        ...payment,
        status: 'rejected',
        reason: 'Paiement non reçu'
      },
      ...recentValidations
    ];
    setRecentValidations(updatedRecentValidations);
    
    toast.error(`Paiement rejeté pour ${payment.userName}`);
  };
  
  const copyToClipboard = () => {
    if (activationCode) {
      navigator.clipboard.writeText(activationCode);
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
        
        <main className="container mx-auto px-6 pt-24 pb-12">
          <h1 className="text-3xl font-bold text-invitopia-900 mb-6">{t('admin.paymentValidation')}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>{t('admin.pendingPayments')}</CardTitle>
                  <CardDescription>{t('admin.validatePayments')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-invitopia-500" />
                      <Input
                        placeholder={t('admin.searchPayment')}
                        value={searchCode}
                        onChange={(e) => setSearchCode(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button 
                      onClick={handleSearch}
                      className="ml-2 bg-invitopia-700 hover:bg-invitopia-600"
                    >
                      {t('common.search')}
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('admin.paymentCode')}</TableHead>
                          <TableHead>{t('admin.amount')}</TableHead>
                          <TableHead>{t('admin.customer')}</TableHead>
                          <TableHead>{t('admin.date')}</TableHead>
                          <TableHead>{t('admin.actions')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payments.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-invitopia-500">
                              {t('admin.noPayments')}
                            </TableCell>
                          </TableRow>
                        ) : (
                          payments.map((payment) => (
                            <TableRow key={payment.id}>
                              <TableCell className="font-mono">{payment.code}</TableCell>
                              <TableCell className="font-semibold">${payment.amount}</TableCell>
                              <TableCell>
                                <div>{payment.userName}</div>
                                <div className="text-invitopia-500 text-sm">{payment.userEmail}</div>
                              </TableCell>
                              <TableCell>{payment.date}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="border-green-300 text-green-600 hover:bg-green-50"
                                    onClick={() => handleApprove(payment)}
                                  >
                                    <Check className="h-4 w-4 mr-1" />
                                    {t('admin.approve')}
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="border-red-300 text-red-600 hover:bg-red-50"
                                    onClick={() => handleReject(payment)}
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    {t('admin.reject')}
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>{t('admin.recentValidations')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('admin.paymentCode')}</TableHead>
                          <TableHead>{t('admin.customer')}</TableHead>
                          <TableHead>{t('admin.amount')}</TableHead>
                          <TableHead>{t('admin.status')}</TableHead>
                          <TableHead>{t('admin.activationCode')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentValidations.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-invitopia-500">
                              {t('admin.noRecentValidations')}
                            </TableCell>
                          </TableRow>
                        ) : (
                          recentValidations.map((payment) => (
                            <TableRow key={payment.id}>
                              <TableCell className="font-mono">{payment.code}</TableCell>
                              <TableCell>
                                <div>{payment.userName}</div>
                                <div className="text-invitopia-500 text-sm">{payment.userEmail}</div>
                              </TableCell>
                              <TableCell className="font-semibold">${payment.amount}</TableCell>
                              <TableCell>
                                {payment.status === 'approved' ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <Check className="h-3 w-3 mr-1" />
                                    {t('admin.approved')}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    <X className="h-3 w-3 mr-1" />
                                    {t('admin.rejected')}
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>
                                {payment.status === 'approved' ? (
                                  <div className="font-mono text-sm">{payment.activationCode}</div>
                                ) : (
                                  <div className="text-invitopia-500 text-sm italic">{payment.reason}</div>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              {selectedPayment && (
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>{t('admin.paymentApproved')}</CardTitle>
                    <CardDescription>{t('admin.shareActivationCode')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>{t('admin.customer')}</Label>
                      <div className="bg-invitopia-50 p-3 rounded-md">
                        <div className="font-medium">{selectedPayment.userName}</div>
                        <div className="text-invitopia-500 text-sm">{selectedPayment.userEmail}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>{t('admin.activationCode')}</Label>
                      <div className="flex items-center justify-between bg-invitopia-100 p-3 rounded-md">
                        <div className="font-mono text-lg font-semibold">{activationCode}</div>
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
                      <Label>{t('admin.instructions')}</Label>
                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md text-sm text-yellow-600">
                        <p>{t('admin.activationInstructions')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>{t('admin.paymentStats')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-invitopia-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-invitopia-600 text-sm">{t('admin.pendingCount')}</div>
                          <div className="text-2xl font-bold text-invitopia-800">{payments.length}</div>
                        </div>
                        <Clock className="h-8 w-8 text-invitopia-500" />
                      </div>
                    </div>
                    
                    <div className="bg-green-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-green-600 text-sm">{t('admin.approvedCount')}</div>
                          <div className="text-2xl font-bold text-green-800">
                            {recentValidations.filter(p => p.status === 'approved').length}
                          </div>
                        </div>
                        <Check className="h-8 w-8 text-green-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-blue-600 text-sm">{t('admin.totalRevenue')}</div>
                        <div className="text-2xl font-bold text-blue-800">
                          ${recentValidations.filter(p => p.status === 'approved').reduce((sum, p) => sum + p.amount, 0)}
                        </div>
                      </div>
                      <div className="text-blue-500 font-medium">{t('admin.thisMonth')}</div>
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

export default ManualPaymentValidation;
