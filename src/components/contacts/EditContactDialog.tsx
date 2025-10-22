
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Contact } from '@/types/contacts';

interface EditContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: Contact | null;
  onUpdateContact: (id: string, contact: Partial<Contact>) => void;
}

export const EditContactDialog: React.FC<EditContactDialogProps> = ({ 
  open, 
  onOpenChange, 
  contact,
  onUpdateContact 
}) => {
  const { tNested } = useLanguage();
  const [editedContact, setEditedContact] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    notes: '',
    tags: [] as string[]
  });

  useEffect(() => {
    if (contact) {
      setEditedContact({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        organization: contact.organization || '',
        notes: contact.notes || '',
        tags: contact.tags || []
      });
    }
  }, [contact]);

  const handleUpdateContact = () => {
    if (!contact) return;
    
    // Validate form
    if (!editedContact.name || !editedContact.email) {
      toast.error(tNested('contacts.requiredFields', 'Please fill in all required fields'));
      return;
    }
    
    const contactData: Partial<Contact> = {
      ...editedContact,
      updated_at: new Date().toISOString(),
    };
    
    onUpdateContact(contact.id, contactData);
    onOpenChange(false);
    toast.success(tNested('contacts.contactUpdated', 'Contact updated successfully'));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            {tNested('contacts.editContact', 'Edit Contact')}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="edit-name">{tNested('contacts.name', 'Name')} *</Label>
            <Input 
              id="edit-name" 
              value={editedContact.name}
              onChange={(e) => setEditedContact({ ...editedContact, name: e.target.value })}
              className="mt-1"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <Label htmlFor="edit-email">{tNested('contacts.email', 'Email')} *</Label>
            <Input 
              id="edit-email" 
              type="email"
              value={editedContact.email}
              onChange={(e) => setEditedContact({ ...editedContact, email: e.target.value })}
              className="mt-1"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <Label htmlFor="edit-phone">{tNested('contacts.phone', 'Phone')}</Label>
            <Input 
              id="edit-phone" 
              value={editedContact.phone}
              onChange={(e) => setEditedContact({ ...editedContact, phone: e.target.value })}
              className="mt-1"
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <Label htmlFor="edit-organization">{tNested('contacts.organization', 'Organization')}</Label>
            <Input 
              id="edit-organization" 
              value={editedContact.organization}
              onChange={(e) => setEditedContact({ ...editedContact, organization: e.target.value })}
              className="mt-1"
              placeholder="Enter organization"
            />
          </div>
          <div>
            <Label htmlFor="edit-notes">{tNested('contacts.notes', 'Notes')}</Label>
            <Textarea 
              id="edit-notes" 
              value={editedContact.notes}
              onChange={(e) => setEditedContact({ ...editedContact, notes: e.target.value })}
              className="mt-1"
              placeholder="Add any notes about this contact"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {tNested('common.cancel', 'Cancel')}
          </Button>
          <Button type="submit" onClick={handleUpdateContact}>
            {tNested('common.save', 'Save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
