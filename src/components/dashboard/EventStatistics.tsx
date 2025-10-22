
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import StatisticsCard from '@/components/dashboard/StatisticsCard';
import { useGuests } from '@/hooks/useGuests';
import { Calendar, Users, Mail } from 'lucide-react';
import { Event } from '@/hooks/useEvents';

interface EventStatisticsProps {
  upcomingEvents: Event[];
}

const EventStatistics: React.FC<EventStatisticsProps> = ({ upcomingEvents }) => {
  const { t } = useLanguage();
  const { getGuestStats } = useGuests();
  const guestStats = getGuestStats();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatisticsCard
        title="Événements à venir"
        value={upcomingEvents.length}
        description="Prochains 30 jours"
        icon={Calendar}
      />
      
      <StatisticsCard
        title="Invités en attente"
        value={guestStats.pending}
        description="N'ont pas encore répondu"
        icon={Users}
      />
      
      <StatisticsCard
        title="Invités confirmés"
        value={guestStats.confirmed}
        description="Total confirmé"
        icon={Mail}
      />
    </div>
  );
};

export default EventStatistics;
