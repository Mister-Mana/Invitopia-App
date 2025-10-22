
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/auth';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Building2, 
  Activity, 
  Settings, 
  Shield, 
  CreditCard, 
  AlertTriangle,
  MapPin,
  FileText,
  Award,
  Database,
  BarChart3,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useUsers } from '@/hooks/useUsers';
import { useBadges } from '@/hooks/useBadges';
import { usePayments } from '@/hooks/usePayments';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { users, loading: usersLoading } = useUsers();
  const { badges, loading: badgesLoading } = useBadges();
  const { payments, loading: paymentsLoading } = usePayments();
  
  const [todayEvents, setTodayEvents] = useState(0);
  const [newUsersThisMonth, setNewUsersThisMonth] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        
        // Fetch today's events
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const { count: eventsCount } = await supabase
          .from('events')
          .select('*', { count: 'exact', head: true })
          .gte('start_date', today.toISOString())
          .lt('start_date', tomorrow.toISOString());
        
        setTodayEvents(eventsCount || 0);
        
        // Calculate new users this month
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const newUsers = users.filter(u => {
          const createdDate = new Date(u.created_at);
          return createdDate >= firstDayOfMonth;
        });
        setNewUsersThisMonth(newUsers.length);
        
        // Calculate monthly revenue
        const monthPayments = payments.filter(p => {
          if (!p.created_at) return false;
          const paymentDate = new Date(p.created_at);
          return paymentDate >= firstDayOfMonth && p.status === 'completed';
        });
        const revenue = monthPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
        setMonthlyRevenue(revenue);
        
        // Count pending tasks (pending badges)
        const pendingBadges = badges.filter(b => b.status === 'pending');
        setPendingTasks(pendingBadges.length);
        
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setStatsLoading(false);
      }
    };

    if (!usersLoading && !badgesLoading && !paymentsLoading) {
      fetchStats();
    }
  }, [users, badges, payments, usersLoading, badgesLoading, paymentsLoading]);

  // Function to check if user has access to a specific setting section
  const hasAccess = (requiredRole: 'super_admin' | 'admin' | 'organizer') => {
    if (!user) return false;
    
    if (user.role === 'super_admin') return true;
    if (user.role === 'admin' && (requiredRole === 'admin' || requiredRole === 'organizer')) return true;
    if (user.role === 'organizer' && requiredRole === 'organizer') return true;
    
    return false;
  };

  if (!hasAccess('admin')) {
    return (
      <DashboardLayout>
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Accès non autorisé</h3>
              <p className="text-gray-500">Vous n'avez pas l'autorisation d'accéder au panneau d'administration.</p>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  const adminCards = [
    {
      title: 'Gestion des utilisateurs',
      description: 'Administrez les comptes utilisateurs et leurs permissions',
      icon: Users,
      href: '/admin/users',
      color: 'blue',
      stats: usersLoading ? '...' : `${users.length} utilisateurs`
    },
    {
      title: 'Gestion des organisations',
      description: 'Gérez les organisations et leurs demandes',
      icon: Building2,
      href: '/admin/organizations',
      color: 'green',
      stats: 'Gérer'
    },
    {
      title: 'Gestion des lieux',
      description: 'Administrez les lieux et salles d\'événements',
      icon: MapPin,
      href: '/admin/venues',
      color: 'purple',
      stats: 'Gérer'
    },
    {
      title: 'Validation des paiements',
      description: 'Validez et gérez les paiements',
      icon: CreditCard,
      href: '/admin/payments',
      color: 'yellow',
      stats: paymentsLoading ? '...' : `${payments.filter(p => p.status === 'pending').length} en attente`
    },
    {
      title: 'Gestion du contenu',
      description: 'Gérez le contenu du site web',
      icon: FileText,
      href: '/admin/content',
      color: 'indigo',
      stats: 'Gérer'
    },
    {
      title: 'Gestion des badges',
      description: 'Examinez les demandes de badges',
      icon: Award,
      href: '/admin/badges',
      color: 'pink',
      stats: badgesLoading ? '...' : `${badges.filter(b => b.status === 'pending').length} demandes`
    },
    {
      title: 'Gestion des fichiers',
      description: 'Administrez tous les fichiers téléchargés',
      icon: Database,
      href: '/admin/files',
      color: 'gray',
      stats: 'Gérer'
    }
  ];

  const superAdminCards = [
    {
      title: 'Super Administration',
      description: 'Accès complet aux fonctionnalités avancées',
      icon: Shield,
      href: '/admin/super',
      color: 'red'
    },
    {
      title: 'Surveillance système',
      description: 'Monitoring et performances du système',
      icon: Activity,
      href: '/admin/monitoring',
      color: 'orange'
    },
    {
      title: 'Contenu public',
      description: 'Gérez le contenu affiché publiquement',
      icon: Settings,
      href: '/admin/public-content',
      color: 'teal'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-200 hover:border-blue-300 hover:shadow-blue-100',
      green: 'border-green-200 hover:border-green-300 hover:shadow-green-100',
      purple: 'border-purple-200 hover:border-purple-300 hover:shadow-purple-100',
      yellow: 'border-yellow-200 hover:border-yellow-300 hover:shadow-yellow-100',
      indigo: 'border-indigo-200 hover:border-indigo-300 hover:shadow-indigo-100',
      pink: 'border-pink-200 hover:border-pink-300 hover:shadow-pink-100',
      gray: 'border-gray-200 hover:border-gray-300 hover:shadow-gray-100',
      red: 'border-red-200 hover:border-red-300 hover:shadow-red-100',
      orange: 'border-orange-200 hover:border-orange-300 hover:shadow-orange-100',
      teal: 'border-teal-200 hover:border-teal-300 hover:shadow-teal-100'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const getIconColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      yellow: 'text-yellow-600',
      indigo: 'text-indigo-600',
      pink: 'text-pink-600',
      gray: 'text-gray-600',
      red: 'text-red-600',
      orange: 'text-orange-600',
      teal: 'text-teal-600'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-invitopia-800 mb-2 flex items-center gap-2">
          <Shield className="h-6 w-6" />
          Panneau d'administration
        </h1>
        <p className="text-invitopia-600">
          Bienvenue dans votre espace d'administration Invitopia
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Événements aujourd'hui</p>
                <p className="text-2xl font-bold text-invitopia-600">
                  {statsLoading ? '...' : todayEvents}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-invitopia-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nouveaux utilisateurs</p>
                <p className="text-2xl font-bold text-green-600">
                  {statsLoading ? '...' : `+${newUsersThisMonth}`}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenus du mois</p>
                <p className="text-2xl font-bold text-blue-600">
                  {statsLoading ? '...' : `€${monthlyRevenue.toFixed(2)}`}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tâches en attente</p>
                <p className="text-2xl font-bold text-orange-600">
                  {statsLoading ? '...' : pendingTasks}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Management Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-invitopia-800 mb-4">Gestion administrative</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCards.map((card) => (
            <Card key={card.href} className={`transition-all duration-200 hover:shadow-lg ${getColorClasses(card.color)}`}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <card.icon className={`h-6 w-6 ${getIconColorClasses(card.color)}`} />
                  {card.title}
                </CardTitle>
                <CardDescription className="text-sm">{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{card.stats}</span>
                  <Button asChild variant="outline" size="sm">
                    <Link to={card.href}>
                      Gérer
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Super Admin Section */}
      {hasAccess('super_admin') && (
        <div>
          <h2 className="text-xl font-semibold text-invitopia-800 mb-4">Super Administration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {superAdminCards.map((card) => (
              <Card key={card.href} className={`transition-all duration-200 hover:shadow-lg ${getColorClasses(card.color)}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <card.icon className={`h-6 w-6 ${getIconColorClasses(card.color)}`} />
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-sm">{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to={card.href}>
                      Accéder
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
