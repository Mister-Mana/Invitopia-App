
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tag } from 'lucide-react';
import { ContactGroup } from '@/types/contacts';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface ContactsGroupsProps {
  groups?: ContactGroup[];
  activeGroup?: string | null;
  onSelectGroup?: (groupName: string | null) => void;
  onAddGroup?: (groupName: string) => void;
}

export const ContactsGroups: React.FC<ContactsGroupsProps> = ({ 
  groups = [], 
  activeGroup = null, 
  onSelectGroup = () => {}, 
  onAddGroup = () => {} 
}) => {
  const { tNested } = useLanguage();
  const [newGroup, setNewGroup] = useState('');
  const [open, setOpen] = useState(false);
  
  const handleAddGroup = () => {
    if (!newGroup.trim()) {
      toast.error(tNested('contacts.enterGroupName', 'Please enter a group name'));
      return;
    }
    
    onAddGroup(newGroup);
    setNewGroup('');
    setOpen(false);
    toast.success(tNested('contacts.groupAdded', 'Group added successfully'));
  };

  const totalContacts = groups.reduce((sum, group) => sum + group.count, 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-invitopia-100">
      <h2 className="font-medium text-invitopia-800 mb-4">{tNested('contacts.groups', 'Groups')}</h2>
      
      <div className="space-y-1 mb-4">
        <div 
          className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer hover:bg-invitopia-100 ${activeGroup === null ? 'bg-invitopia-100 font-medium' : ''}`}
          onClick={() => onSelectGroup(null)}
        >
          <span>{tNested('common.all', 'All')} {tNested('contacts.contacts', 'Contacts')}</span>
          <span className="text-invitopia-500 text-sm">{totalContacts}</span>
        </div>
        
        {groups.map((group) => (
          <div 
            key={group.id}
            className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer hover:bg-invitopia-100 ${activeGroup === group.name ? 'bg-invitopia-100 font-medium' : ''}`}
            onClick={() => onSelectGroup(group.name)}
          >
            <span>{group.name}</span>
            <span className="text-invitopia-500 text-sm">{group.count}</span>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <Tag className="h-4 w-4 mr-2" />
              {tNested('contacts.createGroup', 'Create Group')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{tNested('contacts.createGroup', 'Create Group')}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="groupName">{tNested('contacts.groupName', 'Group Name')}</Label>
                <Input 
                  id="groupName" 
                  value={newGroup}
                  onChange={(e) => setNewGroup(e.target.value)}
                  className="mt-1"
                  placeholder="Enter group name"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                {tNested('common.cancel', 'Cancel')}
              </Button>
              <Button type="submit" onClick={handleAddGroup}>
                {tNested('common.save', 'Save')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
