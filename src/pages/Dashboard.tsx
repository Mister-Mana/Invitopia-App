
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SEO from '@/components/common/SEO';
import EventPreviewSection from '@/components/dashboard/EventPreviewSection';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import EventStatistics from '@/components/dashboard/EventStatistics';
import DashboardContent from '@/components/dashboard/DashboardContent';
import ActivityHistory from '@/components/dashboard/ActivityHistory';
import { Event } from '@/hooks/useEvents';
import { Notification } from '@/components/dashboard/NotificationItem';
import { useEvents } from '@/hooks/useEvents';
import { useActivities } from '@/hooks/useActivities';
import { useAuth } from '@/contexts/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { events, loading } = useEvents();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-8 md:h-10 w-64 md:w-80" />
            <Skeleton className="h-4 w-96 md:w-[500px]" />
          </div>
          
          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4 md:p-6">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <Card className="lg:col-span-2">
              <CardContent className="p-4 md:p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-16 w-16 rounded-lg" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 md:p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Use real events from database

  // Separate events by status
  const upcomingEvents = events
    .filter(event => event.status === 'published' && new Date(event.start_date) >= new Date());
  
  const pastEvents = events
    .filter(event => event.status === 'completed' || new Date(event.start_date) < new Date());

  // Sample notifications (can be enhanced with real data later)
  const recentNotifications: Notification[] = [
    { 
      id: 1, 
      message: `Bienvenue ${user?.name || 'Utilisateur'} ! Votre tableau de bord est prêt.`,
      time: "maintenant" 
    }
  ];

  return (
    <DashboardLayout>
      <SEO 
        title="Tableau de Bord - Invitopia"
        description="Gérez tous vos événements depuis votre tableau de bord Invitopia. Consultez les statistiques, les invités confirmés et l'historique de vos activités."
        keywords="dashboard invitopia, tableau de bord événements, gestion événements, statistiques événements"
      />
      <div className="space-y-6">
        <DashboardHeader />
        <EventStatistics upcomingEvents={upcomingEvents} />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DashboardContent 
              upcomingEvents={upcomingEvents}
              pastEvents={pastEvents}
              recentNotifications={recentNotifications}
            />
          </div>
          <div>
            <ActivityHistory />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
