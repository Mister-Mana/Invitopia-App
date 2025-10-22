import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Users, UserCheck, UserX, Clock, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface EventStatisticsRealtimeProps {
  eventId: string;
}

const EventStatisticsRealtime: React.FC<EventStatisticsRealtimeProps> = ({ eventId }) => {
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    declined: 0,
    pending: 0,
    maybe: 0,
    capacity: 0,
    checkedIn: 0
  });

  const fetchStats = async () => {
    try {
      const { data: guests, error: guestsError } = await supabase
        .from('guests')
        .select('rsvp_status, checked_in, plus_ones')
        .eq('event_id', eventId);

      if (guestsError) throw guestsError;

      const { data: event, error: eventError } = await supabase
        .from('events')
        .select('capacity')
        .eq('id', eventId)
        .single();

      if (eventError) throw eventError;

      const confirmed = guests?.filter(g => g.rsvp_status === 'confirmed').length || 0;
      const declined = guests?.filter(g => g.rsvp_status === 'declined').length || 0;
      const pending = guests?.filter(g => g.rsvp_status === 'pending').length || 0;
      const maybe = guests?.filter(g => g.rsvp_status === 'maybe').length || 0;
      const checkedIn = guests?.filter(g => g.checked_in).length || 0;

      // Calculate total including plus ones
      const totalWithPlusOnes = guests?.reduce((acc, guest) => {
        if (guest.rsvp_status === 'confirmed') {
          return acc + 1 + (guest.plus_ones || 0);
        }
        return acc;
      }, 0) || 0;

      setStats({
        total: guests?.length || 0,
        confirmed,
        declined,
        pending,
        maybe,
        capacity: event?.capacity || 0,
        checkedIn
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  useEffect(() => {
    fetchStats();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('guest-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'guests',
          filter: `event_id=eq.${eventId}`
        },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventId]);

  const confirmationRate = stats.total > 0 
    ? Math.round((stats.confirmed / stats.total) * 100) 
    : 0;

  const capacityRate = stats.capacity > 0 
    ? Math.round((stats.confirmed / stats.capacity) * 100) 
    : 0;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Statistiques en temps réel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress bars */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Taux de confirmation</span>
                <span className="font-semibold">{confirmationRate}%</span>
              </div>
              <Progress value={confirmationRate} className="h-2" />
            </div>

            {stats.capacity > 0 && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Capacité utilisée</span>
                  <span className="font-semibold">{stats.confirmed}/{stats.capacity}</span>
                </div>
                <Progress value={capacityRate} className="h-2" />
              </div>
            )}
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm text-muted-foreground">Confirmés</span>
              </div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.confirmed}
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <UserX className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span className="text-sm text-muted-foreground">Déclinés</span>
              </div>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {stats.declined}
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm text-muted-foreground">En attente</span>
              </div>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {stats.pending}
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-muted-foreground">Enregistrés</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.checkedIn}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventStatisticsRealtime;
