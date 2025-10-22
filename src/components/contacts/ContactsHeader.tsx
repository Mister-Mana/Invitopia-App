
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus, Upload, Search } from 'lucide-react';

interface ContactsHeaderProps {
  onAddContact: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const ContactsHeader: React.FC<ContactsHeaderProps> = ({ 
  onAddContact, 
  searchTerm, 
  onSearchChange 
}) => {
  const { tNested } = useLanguage();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-invitopia-900">{tNested('contacts.contacts', 'Contacts')}</h1>
        <p className="text-invitopia-600 mt-1">{tNested('common.manageContacts', 'Manage your contacts to facilitate sending invitations')}</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-invitopia-500" />
          <Input
            placeholder={tNested('contacts.searchContacts', 'Search contacts...')}
            className="pl-10 w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button onClick={onAddContact} className="bg-invitopia-600 hover:bg-invitopia-700">
            <UserPlus className="h-4 w-4 mr-2" />
            {tNested('contacts.addContact', 'Add Contact')}
          </Button>
          
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            {tNested('contacts.importContacts', 'Import Contacts')}
          </Button>
        </div>
      </div>
    </div>
  );
};
