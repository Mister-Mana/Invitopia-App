import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle, XCircle, Clock, QrCode, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { QRScanner } from './QRScanner';
import { useLanguage } from '@/contexts/LanguageContext';

interface EventCheckInProps {
  eventId: string;
}

export const EventCheckIn: React.FC<EventCheckInProps> = ({ eventId }) => {
  const { t } = useLanguage();
  const [guests, setGuests] = useState<any[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    fetchGuests();
  }, [eventId]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = guests.filter(guest =>
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGuests(filtered);
    } else {
      setFilteredGuests(guests);
    }
  }, [searchTerm, guests]);

  const fetchGuests = async () => {
    try {
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('event_id', eventId)
        .order('name');

      if (error) throw error;
      setGuests(data || []);
      setFilteredGuests(data || []);
    } catch (error) {
      console.error('Error fetching guests:', error);
      toast.error('Erreur lors du chargement des invités');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (guestId: string, currentStatus: boolean) => {
    setCheckingIn(guestId);
    
    try {
      const { error } = await supabase
        .from('guests')
        .update({
          checked_in: !currentStatus,
          check_in_time: !currentStatus ? new Date().toISOString() : null
        })
        .eq('id', guestId);

      if (error) throw error;

      // Update local state
      setGuests(prev => prev.map(g => 
        g.id === guestId 
          ? { ...g, checked_in: !currentStatus, check_in_time: !currentStatus ? new Date().toISOString() : null }
          : g
      ));

      toast.success(!currentStatus ? t('events.checkIn.guestCheckedIn') : 'Enregistrement annulé');
    } catch (error) {
      console.error('Error checking in guest:', error);
      toast.error('Erreur lors de l\'enregistrement');
    } finally {
      setCheckingIn(null);
    }
  };

  const handleScanSuccess = (guestId: string, guestData: any) => {
    // Update local state
    setGuests(prev => prev.map(g => 
      g.id === guestId 
        ? { ...g, checked_in: true, check_in_time: new Date().toISOString() }
        : g
    ));
    setShowScanner(false);
    fetchGuests(); // Refresh the list
  };

  const getStatusBadge = (guest: any) => {
    if (guest.checked_in) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Présent
        </Badge>
      );
    }
    
    if (guest.rsvp_status === 'confirmed') {
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          <Clock className="h-3 w-3 mr-1" />
          Confirmé
        </Badge>
      );
    }
    
    if (guest.rsvp_status === 'declined') {
      return (
        <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
          <XCircle className="h-3 w-3 mr-1" />
          Absent
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline">
        En attente
      </Badge>
    );
  };

  const stats = {
    total: guests.length,
    checkedIn: guests.filter(g => g.checked_in).length,
    confirmed: guests.filter(g => g.rsvp_status === 'confirmed').length,
    pending: guests.filter(g => g.rsvp_status === 'pending').length
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* QR Scanner */}
      {showScanner && (
        <div className="mb-6">
          <QRScanner
            eventId={eventId}
            onScanSuccess={handleScanSuccess}
            onClose={() => setShowScanner(false)}
          />
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total invités</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.checkedIn}</p>
              <p className="text-sm text-muted-foreground">Enregistrés</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.confirmed}</p>
              <p className="text-sm text-muted-foreground">Confirmés</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">{stats.pending}</p>
              <p className="text-sm text-muted-foreground">En attente</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              {t('events.checkIn.title')}
            </CardTitle>
            <Button
              onClick={() => setShowScanner(!showScanner)}
              variant={showScanner ? 'secondary' : 'default'}
              className="gap-2"
            >
              <Camera className="h-4 w-4" />
              {t('events.checkIn.scanQR')}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un invité par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Guest List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredGuests.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Aucun invité trouvé
              </p>
            ) : (
              filteredGuests.map((guest) => (
                <div
                  key={guest.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex-1">
                    <p className="font-medium">{guest.name}</p>
                    {guest.email && (
                      <p className="text-sm text-muted-foreground">{guest.email}</p>
                    )}
                    {guest.check_in_time && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Enregistré à {new Date(guest.check_in_time).toLocaleTimeString('fr-FR')}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getStatusBadge(guest)}
                    
                    <Button
                      size="sm"
                      variant={guest.checked_in ? 'outline' : 'default'}
                      onClick={() => handleCheckIn(guest.id, guest.checked_in)}
                      disabled={checkingIn === guest.id || guest.rsvp_status === 'declined'}
                    >
                      {checkingIn === guest.id ? (
                        'Traitement...'
                      ) : guest.checked_in ? (
                        <>
                          <XCircle className="h-4 w-4 mr-1" />
                          Annuler
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Enregistrer
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
