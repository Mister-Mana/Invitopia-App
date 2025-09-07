
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGuests } from '@/hooks/useGuests';
import GuestStatistics from '@/components/GuestStatistics';
import EventsSection from '@/components/dashboard/EventsSection';
import { Event } from '@/hooks/useEvents';
import NotificationsCard from '@/components/dashboard/NotificationsCard';
import { Notification } from '@/components/dashboard/NotificationItem';

interface DashboardContentProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
  recentNotifications: Notification[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({ 
  upcomingEvents, 
  pastEvents, 
  recentNotifications 
}) => {
  const { t } = useLanguage();
  const { getGuestStats } = useGuests();
  const guestStats = getGuestStats();
  
  return (
    <>
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <EventsSection 
            title={t('dashboard.upcomingEvents')} 
            events={upcomingEvents} 
          />
        </div>
        
        <div className="space-y-6">
          <NotificationsCard notifications={recentNotifications} />
          
          <GuestStatistics 
            accepted={guestStats.confirmed}
            declined={guestStats.declined}
            pending={guestStats.pending}
          />
        </div>
      </div>

      {/* Past Events */}
      <EventsSection 
        title={t('dashboard.pastEvents')} 
        events={pastEvents}
        layout="grid"
      />
    </>
  );
};

export default DashboardContent;
