
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tag, Trash, MoreHorizontal, Edit } from 'lucide-react';
import { Contact } from '@/types/contacts';

interface ContactsTableProps {
  contacts: Contact[];
  searchTerm: string;
  selectedGroup: string;
  selectedContacts: string[];
  onSelectedContactsChange: (contacts: string[]) => void;
  onContactEdit: (contact: Contact) => void;
  onContactDelete: (contactId: string) => void;
}

export const ContactsTable: React.FC<ContactsTableProps> = ({
  contacts,
  searchTerm,
  selectedGroup,
  selectedContacts,
  onSelectedContactsChange,
  onContactEdit,
  onContactDelete,
}) => {
  const { tNested } = useLanguage();

  // Filter contacts based on search term and selected group
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (contact.organization && contact.organization.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // For now, we'll just show all contacts when "all" is selected
    // Group filtering will be implemented when contact group relationships are set up
    const matchesGroup = selectedGroup === 'all';
    
    return matchesSearch && matchesGroup;
  });

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      onSelectedContactsChange([]);
    } else {
      onSelectedContactsChange(filteredContacts.map(c => c.id));
    }
  };

  const handleSelectContact = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      onSelectedContactsChange(selectedContacts.filter(id => id !== contactId));
    } else {
      onSelectedContactsChange([...selectedContacts, contactId]);
    }
  };

  const handleDeleteSelected = () => {
    selectedContacts.forEach(contactId => {
      onContactDelete(contactId);
    });
    onSelectedContactsChange([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-invitopia-100 overflow-hidden">
      {selectedContacts.length > 0 && (
        <div className="p-4 border-b bg-invitopia-50">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Tag className="h-4 w-4 mr-1" />
              {tNested('contacts.addToGroup', 'Add to Group')}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDeleteSelected}>
              <Trash className="h-4 w-4 mr-1" />
              {tNested('common.delete', 'Delete')} ({selectedContacts.length})
            </Button>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>{tNested('contacts.name', 'Name')}</TableHead>
              <TableHead>{tNested('contacts.email', 'Email')}</TableHead>
              <TableHead>{tNested('contacts.phone', 'Phone')}</TableHead>
              <TableHead>{tNested('contacts.organization', 'Organization')}</TableHead>
              <TableHead>{tNested('contacts.tags', 'Tags')}</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-invitopia-500">
                  {tNested('common.noResults', 'No results found')}
                </TableCell>
              </TableRow>
            ) : (
              filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedContacts.includes(contact.id)}
                      onCheckedChange={() => handleSelectContact(contact.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.organization}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-invitopia-100 text-invitopia-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{tNested('common.actions', 'Actions')}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onContactEdit(contact)}>
                          <Edit className="h-4 w-4 mr-2" />
                          {tNested('common.edit', 'Edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Tag className="h-4 w-4 mr-2" />
                          {tNested('contacts.manageGroups', 'Manage Groups')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => onContactDelete(contact.id)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          {tNested('common.delete', 'Delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
