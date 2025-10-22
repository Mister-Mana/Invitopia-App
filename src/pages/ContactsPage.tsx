
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SEO from '@/components/common/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { ContactsHeader } from '@/components/contacts/ContactsHeader';
import { ContactsTable } from '@/components/contacts/ContactsTable';
import { ContactsGroups } from '@/components/contacts/ContactsGroups';
import { GroupsManagement } from '@/components/contacts/GroupsManagement';
import { AddContactDialog } from '@/components/contacts/AddContactDialog';
import { EditContactDialog } from '@/components/contacts/EditContactDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Contact, ContactGroup } from '@/types/contacts';
import { useContacts } from '@/hooks/useContacts';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

const ContactsPage: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { contacts, contactGroups, loading, refetch } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const addContact = async (newContact: Omit<Contact, 'id' | 'created_at'>) => {
    try {
      if (!user) {
        toast.error('Vous devez être connecté pour ajouter un contact');
        return;
      }

      const contactWithUserId = {
        ...newContact,
        user_id: user.id
      };

      const { data, error } = await supabase
        .from('contacts')
        .insert(contactWithUserId)
        .select()
        .single();

      if (error) throw error;

      refetch();
      toast.success('Contact ajouté avec succès');
    } catch (error: any) {
      toast.error('Erreur lors de l\'ajout du contact');
    }
  };

  const updateContact = async (id: string, contactData: Partial<Contact>) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update(contactData)
        .eq('id', id);

      if (error) throw error;

      refetch();
    } catch (error: any) {
      toast.error('Erreur lors de la mise à jour du contact');
    }
  };

  const deleteContact = async (contactId: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', contactId);

      if (error) throw error;

      refetch();
      toast.success('Contact supprimé avec succès');
    } catch (error: any) {
      toast.error('Erreur lors de la suppression du contact');
    }
  };

  const addGroup = async (groupName: string) => {
    try {
      if (!user) {
        toast.error('Vous devez être connecté pour créer un groupe');
        return;
      }

      const { data, error } = await supabase
        .from('contact_groups')
        .insert({
          name: groupName,
          color: '#3B82F6',
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      refetch();
      toast.success('Groupe créé avec succès');
    } catch (error: any) {
      toast.error('Erreur lors de la création du groupe');
    }
  };

  const handleSelectGroup = (groupName: string | null) => {
    setSelectedGroup(groupName || 'all');
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setShowEditDialog(true);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-invitopia-600 mx-auto"></div>
            <p className="mt-4 text-invitopia-600">Chargement des contacts...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <SEO 
        title="Mes Contacts - Invitopia"
        description="Gérez votre carnet d'adresses : organisez vos contacts en groupes et simplifiez vos invitations."
        keywords="gestion contacts, carnet adresses, groupes contacts, contacts événements"
      />
      <div className="space-y-6">
        <ContactsHeader 
          onAddContact={() => setShowAddDialog(true)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="contacts">{t('contacts.allContacts')}</TabsTrigger>
            <TabsTrigger value="groups">{t('contacts.groups')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contacts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <ContactsGroups 
                  groups={contactGroups}
                  activeGroup={selectedGroup === 'all' ? null : selectedGroup}
                  onSelectGroup={handleSelectGroup}
                  onAddGroup={addGroup}
                />
              </div>
              
              <div className="lg:col-span-3">
                <ContactsTable 
                  contacts={contacts}
                  searchTerm={searchTerm}
                  selectedGroup={selectedGroup}
                  selectedContacts={selectedContacts}
                  onSelectedContactsChange={setSelectedContacts}
                  onContactEdit={handleEditContact}
                  onContactDelete={deleteContact}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="groups" className="space-y-6">
            <GroupsManagement 
              groups={contactGroups}
              contacts={contacts}
              onRefetch={refetch}
            />
          </TabsContent>
        </Tabs>
        
        <AddContactDialog 
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          onAddContact={addContact}
        />

        <EditContactDialog 
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          contact={editingContact}
          onUpdateContact={updateContact}
        />
      </div>
    </DashboardLayout>
  );
};

export default ContactsPage;
