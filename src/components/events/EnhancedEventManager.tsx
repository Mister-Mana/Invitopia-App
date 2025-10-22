import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Users, TableProperties, Bell, Share2, BarChart } from 'lucide-react';
import GuestManagement from './GuestManagement';
import TableManagement from './TableManagement';
import EventStatisticsRealtime from './EventStatisticsRealtime';
import ContactsAssociationDialog from './ContactsAssociationDialog';
import ShareInvitationDialog from './ShareInvitationDialog';

interface EnhancedEventManagerProps {
  eventId: string;
  event: any;
}

const EnhancedEventManager: React.FC<EnhancedEventManagerProps> = ({ eventId, event }) => {
  const [guests, setGuests] = useState<any[]>([]);
  const [showContactsDialog, setShowContactsDialog] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<any>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleRefreshGuests = () => {
    // This will be called when guests need to be refreshed
    window.location.reload();
  };

  const handleShareInvitation = (guest: any) => {
    setSelectedGuest(guest);
    setShowShareDialog(true);
  };

  // Check if event type supports table management
  const supportsTableManagement = ['wedding', 'conference', 'party', 'birthday', 'concert'].includes(event?.type);

  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <EventStatisticsRealtime eventId={eventId} />

      {/* Main Content Tabs */}
      <Tabs defaultValue="guests" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="guests" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Invités
          </TabsTrigger>
          {supportsTableManagement && (
            <TabsTrigger value="tables" className="flex items-center gap-2">
              <TableProperties className="h-4 w-4" />
              Tables
            </TabsTrigger>
          )}
          <TabsTrigger value="statistics" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Statistiques
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guests" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Gestion des invités</h3>
            <Button onClick={() => setShowContactsDialog(true)}>
              <Users className="h-4 w-4 mr-2" />
              Ajouter depuis contacts
            </Button>
          </div>
          <GuestManagement eventId={eventId} isOwner={true} />
        </TabsContent>

        {supportsTableManagement && (
          <TabsContent value="tables">
            <TableManagement eventId={eventId} guests={guests} />
          </TabsContent>
        )}

        <TabsContent value="statistics">
          <EventStatisticsRealtime eventId={eventId} />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <ContactsAssociationDialog
        eventId={eventId}
        isOpen={showContactsDialog}
        onClose={() => setShowContactsDialog(false)}
        onContactsAdded={handleRefreshGuests}
      />

      {selectedGuest && (
        <ShareInvitationDialog
          event={event}
          guest={selectedGuest}
          isOpen={showShareDialog}
          onClose={() => {
            setShowShareDialog(false);
            setSelectedGuest(null);
          }}
        />
      )}
    </div>
  );
};

export default EnhancedEventManager;
