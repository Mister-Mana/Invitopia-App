
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePayments } from '@/hooks/usePayments';
import { CreditCard, Check, X, Eye, AlertTriangle, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const EnhancedPaymentValidation: React.FC = () => {
  const { payments, loading, error, updatePaymentStatus } = usePayments();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      setProcessingId(id);
      await updatePaymentStatus(id, status);
      toast.success(`Paiement ${status === 'completed' ? 'approuvé' : 'rejeté'} avec succès`);
    } catch (error: any) {
      toast.error('Erreur lors de la mise à jour du paiement');
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const pendingPayments = payments.filter(p => p.status === 'pending');
  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

  if (loading) return <div>Chargement des paiements...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Paiements en attente</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingPayments.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Montant en attente</p>
                <p className="text-2xl font-bold text-blue-600">€{totalPending.toFixed(2)}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total des paiements</p>
                <p className="text-2xl font-bold text-green-600">{payments.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments List */}
      <Card>
        <CardHeader>
          <CardTitle>Gestion des paiements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={getStatusBadge(payment.status)}>
                        {payment.status}
                      </Badge>
                      <span className="font-medium">
                        {formatAmount(payment.amount, payment.currency)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {payment.payment_method}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>ID: {payment.id}</p>
                      <p>Créé: {new Date(payment.created_at).toLocaleDateString('fr-FR')}</p>
                      {payment.stripe_payment_id && (
                        <p>Stripe ID: {payment.stripe_payment_id}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Détails du paiement</DialogTitle>
                          <DialogDescription>
                            Informations complètes sur ce paiement
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Montant</label>
                              <p>{formatAmount(payment.amount, payment.currency)}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Statut</label>
                              <p className="capitalize">{payment.status}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Méthode</label>
                              <p>{payment.payment_method}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Frais</label>
                              <p>{payment.transaction_fee ? `€${payment.transaction_fee}` : 'N/A'}</p>
                            </div>
                          </div>
                          {payment.metadata && Object.keys(payment.metadata).length > 0 && (
                            <div>
                              <label className="text-sm font-medium">Métadonnées</label>
                              <pre className="text-xs bg-gray-100 p-2 rounded mt-1">
                                {JSON.stringify(payment.metadata, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {payment.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(payment.id, 'completed')}
                          disabled={processingId === payment.id}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approuver
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleStatusUpdate(payment.id, 'failed')}
                          disabled={processingId === payment.id}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Rejeter
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {payments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucun paiement trouvé
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedPaymentValidation;
