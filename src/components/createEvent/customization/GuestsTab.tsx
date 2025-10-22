
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContacts } from '@/hooks/useContacts';
import { SendInvitationsDialog } from '@/components/events/SendInvitationsDialog';

interface GuestsTabProps {
  onSelectChange: (name: string, value: string | boolean) => void;
  eventTitle?: string;
  eventId?: string;
}

const GuestsTab: React.FC<GuestsTabProps> = ({ onSelectChange, eventTitle = '', eventId = 'temp-event-id' }) => {
  const { t } = useLanguage();
  const { contacts } = useContacts();
  const [selectedContacts, setSelectedContacts] = React.useState<string[]>([]);
  const [showInvitationDialog, setShowInvitationDialog] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium">Allow Plus Ones</Label>
            <p className="text-sm text-gray-500">Let guests bring additional attendees</p>
          </div>
          <Switch
            onCheckedChange={(checked) => onSelectChange('allowPlusOnes', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium">Require Approval</Label>
            <p className="text-sm text-gray-500">Review RSVPs before they're confirmed</p>
          </div>
          <Switch
            onCheckedChange={(checked) => onSelectChange('requireApproval', checked)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxGuestsPerInvitation">Maximum Guests per Invitation</Label>
          <Input
            id="maxGuestsPerInvitation"
            type="number"
            min="1"
            defaultValue="1"
            onChange={(e) => onSelectChange('maxGuestsPerInvitation', e.target.value)}
            className="invitopia-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rsvpDeadline">RSVP Deadline</Label>
          <Input
            id="rsvpDeadline"
            type="date"
            onChange={(e) => onSelectChange('rsvpDeadline', e.target.value)}
            className="invitopia-input"
          />
        </div>

        <div className="border-t pt-4">
          <Label className="text-base font-medium mb-3 block">Invitations</Label>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Vous pouvez envoyer des invitations une fois l'événement créé.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowInvitationDialog(true)}
              disabled={!eventTitle}
            >
              Gérer les invitations
            </Button>
          </div>
        </div>
      </div>

      <SendInvitationsDialog
        open={showInvitationDialog}
        onOpenChange={setShowInvitationDialog}
        eventId={eventId}
        eventTitle={eventTitle}
        selectedContacts={selectedContacts}
        contacts={contacts}
      />
    </div>
  );
};

export default GuestsTab;
