import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ContactGroup, Contact } from '@/types/contacts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tag, Edit, Trash2, MoreVertical, Users, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { Checkbox } from '@/components/ui/checkbox';

interface GroupsManagementProps {
  groups: ContactGroup[];
  contacts: Contact[];
  onRefetch: () => void;
}

export const GroupsManagement: React.FC<GroupsManagementProps> = ({ 
  groups, 
  contacts,
  onRefetch 
}) => {
  const { tNested } = useLanguage();
  const { user } = useAuth();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [manageMembersDialogOpen, setManageMembersDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<ContactGroup | null>(null);
  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });

  const fetchGroupMembers = async (groupId: string) => {
    try {
      const { data, error } = await supabase
        .from('contact_group_members')
        .select('contact_id')
        .eq('group_id', groupId);

      if (error) throw error;
      setGroupMembers(data?.map(m => m.contact_id) || []);
    } catch (error: any) {
      toast.error('Erreur lors du chargement des membres');
    }
  };

  const handleCreateGroup = async () => {
    if (!formData.name.trim()) {
      toast.error('Le nom du groupe est requis');
      return;
    }

    try {
      const { error } = await supabase
        .from('contact_groups')
        .insert({
          name: formData.name,
          description: formData.description,
          color: formData.color,
          user_id: user!.id
        });

      if (error) throw error;

      toast.success('Groupe créé avec succès');
      setCreateDialogOpen(false);
      setFormData({ name: '', description: '', color: '#3B82F6' });
      onRefetch();
    } catch (error: any) {
      toast.error('Erreur lors de la création du groupe');
    }
  };

  const handleUpdateGroup = async () => {
    if (!selectedGroup || !formData.name.trim()) {
      toast.error('Le nom du groupe est requis');
      return;
    }

    try {
      const { error } = await supabase
        .from('contact_groups')
        .update({
          name: formData.name,
          description: formData.description,
          color: formData.color
        })
        .eq('id', selectedGroup.id);

      if (error) throw error;

      toast.success('Groupe mis à jour avec succès');
      setEditDialogOpen(false);
      setSelectedGroup(null);
      setFormData({ name: '', description: '', color: '#3B82F6' });
      onRefetch();
    } catch (error: any) {
      toast.error('Erreur lors de la mise à jour du groupe');
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce groupe ?')) return;

    try {
      const { error } = await supabase
        .from('contact_groups')
        .delete()
        .eq('id', groupId);

      if (error) throw error;

      toast.success('Groupe supprimé avec succès');
      onRefetch();
    } catch (error: any) {
      toast.error('Erreur lors de la suppression du groupe');
    }
  };

  const openEditDialog = (group: ContactGroup) => {
    setSelectedGroup(group);
    setFormData({
      name: group.name,
      description: group.description || '',
      color: group.color
    });
    setEditDialogOpen(true);
  };

  const openManageMembersDialog = async (group: ContactGroup) => {
    setSelectedGroup(group);
    await fetchGroupMembers(group.id);
    setManageMembersDialogOpen(true);
  };

  const handleToggleMember = async (contactId: string, isChecked: boolean) => {
    if (!selectedGroup) return;

    try {
      if (isChecked) {
        const { error } = await supabase
          .from('contact_group_members')
          .insert({
            group_id: selectedGroup.id,
            contact_id: contactId
          });

        if (error) throw error;
        setGroupMembers(prev => [...prev, contactId]);
      } else {
        const { error } = await supabase
          .from('contact_group_members')
          .delete()
          .eq('group_id', selectedGroup.id)
          .eq('contact_id', contactId);

        if (error) throw error;
        setGroupMembers(prev => prev.filter(id => id !== contactId));
      }

      onRefetch();
    } catch (error: any) {
      toast.error('Erreur lors de la modification du membre');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Groupes</h2>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Créer un groupe
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: group.color }}
                  />
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openManageMembersDialog(group)}>
                      <Users className="h-4 w-4 mr-2" />
                      Gérer les membres
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openEditDialog(group)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeleteGroup(group.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              {group.description && (
                <CardDescription className="mb-2">{group.description}</CardDescription>
              )}
              <Badge variant="outline">
                {group.count || 0} membre{(group.count || 0) > 1 ? 's' : ''}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Group Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer un groupe</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name">Nom du groupe *</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
                placeholder="Ex: Famille, Amis, Collègues"
              />
            </div>
            <div>
              <Label htmlFor="description">Description (facultatif)</Label>
              <Input 
                id="description" 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1"
                placeholder="Description du groupe"
              />
            </div>
            <div>
              <Label htmlFor="color">Couleur</Label>
              <Input 
                id="color" 
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="mt-1 h-10"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateGroup}>
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Group Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le groupe</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="edit-name">Nom du groupe *</Label>
              <Input 
                id="edit-name" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description (facultatif)</Label>
              <Input 
                id="edit-description" 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-color">Couleur</Label>
              <Input 
                id="edit-color" 
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="mt-1 h-10"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpdateGroup}>
              Mettre à jour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Members Dialog */}
      <Dialog open={manageMembersDialogOpen} onOpenChange={setManageMembersDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[600px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Gérer les membres - {selectedGroup?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              {contacts.map((contact) => (
                <div key={contact.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                  <Checkbox 
                    checked={groupMembers.includes(contact.id)}
                    onCheckedChange={(checked) => handleToggleMember(contact.id, checked as boolean)}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{contact.name}</p>
                    {contact.email && <p className="text-sm text-gray-500">{contact.email}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setManageMembersDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
