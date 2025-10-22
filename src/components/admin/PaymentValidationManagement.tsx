import React, { useState } from 'react';
import { usePayments } from '@/hooks/usePayments';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, Search, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { formatDate } from 'date-fns';
import { fr } from 'date-fns/locale';

export const PaymentValidationManagement: React.FC = () => {
  const { payments, loading, updatePaymentStatus, refetch } = usePayments();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const isSuperAdmin = user?.role === 'super_admin';

  const filteredPayments = payments.filter(payment => 
    payment.stripe_payment_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.payment_method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleValidatePayment = async (id: string, newStatus: string) => {
    try {
      await updatePaymentStatus(id, newStatus);
      toast.success(`Paiement ${newStatus === 'completed' ? 'validé' : 'mis à jour'} avec succès`);
      refetch();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du paiement');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      'completed': { variant: 'default', icon: <CheckCircle className="h-3 w-3" />, label: 'Complété' },
      'pending': { variant: 'secondary', icon: <Clock className="h-3 w-3" />, label: 'En attente' },
      'failed': { variant: 'destructive', icon: <XCircle className="h-3 w-3" />, label: 'Échoué' },
      'refunded': { variant: 'outline', icon: <XCircle className="h-3 w-3" />, label: 'Remboursé' }
    };

    const config = variants[status] || variants.pending;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  if (!isSuperAdmin) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Accès refusé</h3>
          <p className="text-muted-foreground">Seuls les super administrateurs peuvent accéder à cette page.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <DollarSign className="h-6 w-6" />
            Validation des Paiements
          </h2>
          <p className="text-muted-foreground">Gérez et validez les paiements des utilisateurs</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{payments.length}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Complétés</p>
                <p className="text-2xl font-bold text-green-600">
                  {payments.filter(p => p.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En attente</p>
                <p className="text-2xl font-bold text-orange-600">
                  {payments.filter(p => p.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Montant total</p>
                <p className="text-2xl font-bold">
                  {payments.reduce((sum, p) => sum + p.amount, 0).toFixed(2)} {payments[0]?.currency || 'EUR'}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un paiement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Transaction</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Méthode</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono text-sm">
                    {payment.stripe_payment_id || payment.id.slice(0, 8)}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {payment.amount} {payment.currency}
                  </TableCell>
                  <TableCell className="capitalize">{payment.payment_method}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>
                    {formatDate(new Date(payment.created_at), 'dd/MM/yyyy HH:mm', { locale: fr })}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedPayment(payment)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Détails du paiement</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium">ID Transaction</p>
                              <p className="text-sm text-muted-foreground">{payment.stripe_payment_id || payment.id}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Montant</p>
                              <p className="text-sm text-muted-foreground">{payment.amount} {payment.currency}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Montant net</p>
                              <p className="text-sm text-muted-foreground">
                                {payment.net_amount || payment.amount} {payment.currency}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Frais de transaction</p>
                              <p className="text-sm text-muted-foreground">
                                {payment.transaction_fee || 0} {payment.currency}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Méthode de paiement</p>
                              <p className="text-sm text-muted-foreground capitalize">{payment.payment_method}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Date de création</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(new Date(payment.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                              </p>
                            </div>
                            {payment.processed_at && (
                              <div>
                                <p className="text-sm font-medium">Date de traitement</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(new Date(payment.processed_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                                </p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      {payment.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleValidatePayment(payment.id, 'completed')}
                            title="Valider"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleValidatePayment(payment.id, 'failed')}
                            title="Rejeter"
                          >
                            <XCircle className="h-4 w-4 text-destructive" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
