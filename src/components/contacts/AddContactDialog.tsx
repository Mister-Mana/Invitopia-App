
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Contact } from '@/types/contacts';

interface AddContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddContact: (contact: Omit<Contact, 'id' | 'created_at'>) => void;
}

export const AddContactDialog: React.FC<AddContactDialogProps> = ({ 
  open, 
  onOpenChange, 
  onAddContact 
}) => {
  const { tNested } = useLanguage();
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    notes: '',
    tags: [] as string[]
  });

  const handleAddContact = () => {
    // Validate form
    if (!newContact.name || !newContact.email) {
      toast.error(tNested('contacts.requiredFields', 'Please fill in all required fields'));
      return;
    }
    
    // Create contact with all required properties
    const contactData: Omit<Contact, 'id' | 'created_at'> = {
      ...newContact,
      user_id: '', // This will be set by the parent component with actual user ID
      updated_at: new Date().toISOString(),
      is_favorite: false,
      avatar_url: undefined
    };
    
    onAddContact(contactData);
    
    // Reset form and close dialog
    setNewContact({
      name: '',
      email: '',
      phone: '',
      organization: '',
      notes: '',
      tags: []
    });
    onOpenChange(false);
    toast.success(tNested('contacts.contactAdded', 'Contact added successfully'));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            {tNested('contacts.addContact', 'Add Contact')}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="name">{tNested('contacts.name', 'Name')} *</Label>
            <Input 
              id="name" 
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              className="mt-1"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <Label htmlFor="email">{tNested('contacts.email', 'Email')} *</Label>
            <Input 
              id="email" 
              type="email"
              value={newContact.email}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              className="mt-1"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <Label htmlFor="phone">{tNested('contacts.phone', 'Phone')}</Label>
            <Input 
              id="phone" 
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              className="mt-1"
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <Label htmlFor="organization">{tNested('contacts.organization', 'Organization')}</Label>
            <Input 
              id="organization" 
              value={newContact.organization}
              onChange={(e) => setNewContact({ ...newContact, organization: e.target.value })}
              className="mt-1"
              placeholder="Enter organization"
            />
          </div>
          <div>
            <Label htmlFor="notes">{tNested('contacts.notes', 'Notes')}</Label>
            <Textarea 
              id="notes" 
              value={newContact.notes}
              onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
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
          <Button type="submit" onClick={handleAddContact}>
            {tNested('common.save', 'Save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
