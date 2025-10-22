import React from 'react';
import { usePayments } from '@/hooks/usePayments';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Clock, CheckCircle, XCircle, Users } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const PaymentsOverview: React.FC = () => {
  const { payments, loading } = usePayments();
  const { t } = useLanguage();

  if (loading) {
    return <div className="flex items-center justify-center p-8">Chargement...</div>;
  }

  // Calculate statistics
  const totalRevenue = payments.reduce((sum, p) => sum + (p.net_amount || p.amount), 0);
  const pendingPayments = payments.filter(p => p.status === 'pending');
  const completedPayments = payments.filter(p => p.status === 'completed');
  const failedPayments = payments.filter(p => p.status === 'failed');
  const thisMonthRevenue = payments
    .filter(p => {
      const paymentDate = new Date(p.created_at);
      const now = new Date();
      return paymentDate.getMonth() === now.getMonth() && 
             paymentDate.getFullYear() === now.getFullYear() &&
             p.status === 'completed';
    })
    .reduce((sum, p) => sum + (p.net_amount || p.amount), 0);

  const stats = [
    {
      title: 'Revenu Total',
      value: `${totalRevenue.toFixed(2)} €`,
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Ce Mois',
      value: `${thisMonthRevenue.toFixed(2)} €`,
      icon: TrendingUp,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'En Attente',
      value: pendingPayments.length,
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      title: 'Complétés',
      value: completedPayments.length,
      icon: CheckCircle,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      title: 'Échoués',
      value: failedPayments.length,
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      title: 'Total Transactions',
      value: payments.length,
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
      completed: { variant: 'default', label: 'Complété' },
      pending: { variant: 'secondary', label: 'En attente' },
      failed: { variant: 'destructive', label: 'Échoué' },
      refunded: { variant: 'outline', label: 'Remboursé' }
    };
    return variants[status] || { variant: 'outline', label: status };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Gestion des Paiements</h1>
        <p className="text-muted-foreground mt-2">
          Vue d'ensemble de tous les paiements et transactions
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Paiements Récents</CardTitle>
          <CardDescription>
            Les 10 dernières transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.slice(0, 10).map((payment) => {
              const statusInfo = getStatusBadge(payment.status);
              return (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Badge variant={statusInfo.variant}>
                        {statusInfo.label}
                      </Badge>
                      <span className="font-medium">
                        {payment.amount.toFixed(2)} {payment.currency.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {payment.payment_method} • {format(new Date(payment.created_at), 'PPP', { locale: fr })}
                    </p>
                    {payment.stripe_payment_id && (
                      <p className="text-xs text-muted-foreground mt-1">
                        ID: {payment.stripe_payment_id}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    Détails
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsOverview;
