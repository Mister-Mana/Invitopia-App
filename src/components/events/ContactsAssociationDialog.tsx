import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Search, UserPlus, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth/AuthContext';

interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  organization?: string;
}

interface ContactsAssociationDialogProps {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  onContactsAdded: () => void;
}

const ContactsAssociationDialog: React.FC<ContactsAssociationDialogProps> = ({
  eventId,
  isOpen,
  onClose,
  onContactsAdded
}) => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      fetchContacts();
    }
  }, [isOpen, user]);

  const fetchContacts = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', user.id)
        .order('name');

      if (error) throw error;

      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Erreur lors du chargement des contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleContact = (contactId: string) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(contactId)) {
      newSelected.delete(contactId);
    } else {
      newSelected.add(contactId);
    }
    setSelectedContacts(newSelected);
  };

  const handleAddContacts = async () => {
    if (selectedContacts.size === 0) {
      toast.error('Veuillez sélectionner au moins un contact');
      return;
    }

    setAdding(true);
    try {
      // Get contact details
      const contactsToAdd = contacts.filter(c => selectedContacts.has(c.id));

      // Create guests from contacts
      const guestsData = contactsToAdd.map(contact => ({
        event_id: eventId,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        rsvp_status: 'pending' as const,
        invitation_sent: false
      }));

      const { error } = await supabase
        .from('guests')
        .insert(guestsData);

      if (error) throw error;

      toast.success(`${selectedContacts.size} contact(s) ajouté(s) à l'événement`);
      setSelectedContacts(new Set());
      onContactsAdded();
      onClose();
    } catch (error) {
      console.error('Error adding contacts:', error);
      toast.error('Erreur lors de l\'ajout des contacts');
    } finally {
      setAdding(false);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone?.includes(searchTerm) ||
    contact.organization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Ajouter des contacts à l'événement
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Selected Count */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{selectedContacts.size} contact(s) sélectionné(s)</span>
            {selectedContacts.size > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedContacts(new Set())}
              >
                Désélectionner tout
              </Button>
            )}
          </div>

          {/* Contacts List */}
          <ScrollArea className="h-[400px] border rounded-lg p-4">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <p>Chargement...</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">
                  {searchTerm ? 'Aucun contact trouvé' : 'Aucun contact disponible'}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleToggleContact(contact.id)}
                  >
                    <Checkbox
                      checked={selectedContacts.has(contact.id)}
                      onCheckedChange={() => handleToggleContact(contact.id)}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{contact.name}</p>
                      <div className="text-sm text-muted-foreground space-y-1">
                        {contact.email && <p>📧 {contact.email}</p>}
                        {contact.phone && <p>📱 {contact.phone}</p>}
                        {contact.organization && <p>🏢 {contact.organization}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button
              onClick={handleAddContacts}
              disabled={selectedContacts.size === 0 || adding}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              {adding ? 'Ajout...' : `Ajouter ${selectedContacts.size > 0 ? `(${selectedContacts.size})` : ''}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactsAssociationDialog;
