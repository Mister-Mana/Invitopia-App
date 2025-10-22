import React, { useState, useMemo } from 'react';
import { usePayments } from '@/hooks/usePayments';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Search, CheckCircle, XCircle, Clock, Eye, Download, Filter, TrendingUp, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { formatDate, startOfMonth, endOfMonth, startOfWeek, endOfWeek, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';

export const EnhancedPaymentManagement: React.FC = () => {
  const { payments, loading, updatePaymentStatus, refetch } = usePayments();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');

  const isSuperAdmin = user?.role === 'super_admin';

  // Filter payments based on all criteria
  const filteredPayments = useMemo(() => {
    let result = payments;

    // Search filter
    if (searchTerm) {
      result = result.filter(payment =>
        payment.stripe_payment_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.payment_method.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(payment => payment.status === statusFilter);
    }

    // Method filter
    if (methodFilter !== 'all') {
      result = result.filter(payment => payment.payment_method === methodFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      result = result.filter(payment => {
        const paymentDate = new Date(payment.created_at);
        switch (dateFilter) {
          case 'today':
            return paymentDate.toDateString() === now.toDateString();
          case 'week':
            return paymentDate >= startOfWeek(now) && paymentDate <= endOfWeek(now);
          case 'month':
            return paymentDate >= startOfMonth(now) && paymentDate <= endOfMonth(now);
          case 'lastMonth':
            const lastMonth = subMonths(now, 1);
            return paymentDate >= startOfMonth(lastMonth) && paymentDate <= endOfMonth(lastMonth);
          default:
            return true;
        }
      });
    }

    return result;
  }, [payments, searchTerm, statusFilter, methodFilter, dateFilter]);

  // Statistics calculations
  const stats = useMemo(() => {
    const total = filteredPayments.length;
    const completed = filteredPayments.filter(p => p.status === 'completed').length;
    const pending = filteredPayments.filter(p => p.status === 'pending').length;
    const failed = filteredPayments.filter(p => p.status === 'failed').length;
    const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
    const completedAmount = filteredPayments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
    const avgTransaction = total > 0 ? totalAmount / total : 0;

    return { total, completed, pending, failed, totalAmount, completedAmount, avgTransaction };
  }, [filteredPayments]);

  const handleValidatePayment = async (id: string, newStatus: string) => {
    try {
      await updatePaymentStatus(id, newStatus);
      toast.success(`Paiement ${newStatus === 'completed' ? 'validé' : 'mis à jour'} avec succès`);
      refetch();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du paiement');
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Montant', 'Devise', 'Méthode', 'Statut', 'Transaction ID'];
    const rows = filteredPayments.map(p => [
      p.id,
      formatDate(new Date(p.created_at), 'dd/MM/yyyy HH:mm'),
      p.amount,
      p.currency,
      p.payment_method,
      p.status,
      p.stripe_payment_id || ''
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paiements-${formatDate(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    toast.success('Export CSV réussi');
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
            Gestion Avancée des Paiements
          </h2>
          <p className="text-muted-foreground">Tableau de bord complet pour gérer tous les paiements</p>
        </div>
        <Button onClick={handleExportCSV} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Exporter CSV
        </Button>
      </div>

      {/* Enhanced Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Moyenne: {stats.avgTransaction.toFixed(2)} €
                </p>
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
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0}% du total
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
                <p className="text-sm text-muted-foreground">En Attente</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Action requise
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
                <p className="text-sm text-muted-foreground">Revenu Total</p>
                <p className="text-2xl font-bold">{stats.completedAmount.toFixed(2)} €</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Complétés uniquement
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="completed">Complétés</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="failed">Échoués</SelectItem>
                <SelectItem value="refunded">Remboursés</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les périodes</SelectItem>
                <SelectItem value="today">Aujourd'hui</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="lastMonth">Mois dernier</SelectItem>
              </SelectContent>
            </Select>

            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Méthode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les méthodes</SelectItem>
                <SelectItem value="stripe">Stripe</SelectItem>
                <SelectItem value="mobile_money">Mobile Money</SelectItem>
                <SelectItem value="bank_transfer">Virement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions ({filteredPayments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>ID Transaction</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Méthode</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      {formatDate(new Date(payment.created_at), 'dd/MM/yyyy HH:mm', { locale: fr })}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {payment.stripe_payment_id || payment.id.slice(0, 8)}...
                    </TableCell>
                    <TableCell className="font-semibold">
                      {payment.amount.toFixed(2)} {payment.currency}
                    </TableCell>
                    <TableCell className="capitalize">{payment.payment_method}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Détails du Paiement</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">ID Transaction</p>
                                  <p className="text-sm font-mono">{payment.stripe_payment_id || payment.id}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Montant Brut</p>
                                  <p className="text-sm font-semibold">{payment.amount.toFixed(2)} {payment.currency}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Frais</p>
                                  <p className="text-sm">{(payment.transaction_fee || 0).toFixed(2)} {payment.currency}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Montant Net</p>
                                  <p className="text-sm font-semibold">{(payment.net_amount || payment.amount).toFixed(2)} {payment.currency}</p>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Méthode</p>
                                  <p className="text-sm capitalize">{payment.payment_method}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Statut</p>
                                  {getStatusBadge(payment.status)}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Date de création</p>
                                  <p className="text-sm">{formatDate(new Date(payment.created_at), 'PPPp', { locale: fr })}</p>
                                </div>
                                {payment.processed_at && (
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Date de traitement</p>
                                    <p className="text-sm">{formatDate(new Date(payment.processed_at), 'PPPp', { locale: fr })}</p>
                                  </div>
                                )}
                              </div>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
