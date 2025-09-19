import React, { useState } from 'react';
import { useGuests } from '@/hooks/useGuests';
import { useContacts } from '@/hooks/useContacts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Users, 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  UserPlus, 
  Filter,
  MoreVertical,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

interface GuestManagementProps {
  eventId: string;
  isOwner: boolean;
}

const GuestManagement: React.FC<GuestManagementProps> = ({ eventId, isOwner }) => {
  const { guests, loading, createGuest, updateGuest, deleteGuest } = useGuests(eventId);
  const { contacts } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addGuestDialogOpen, setAddGuestDialogOpen] = useState(false);
  const [newGuestForm, setNewGuestForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (guest.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || guest.rsvp_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'declined': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestForm.name.trim()) {
      toast.error('Le nom est requis');
      return;
    }

    try {
      await createGuest({
        name: newGuestForm.name.trim(),
        email: newGuestForm.email.trim() || null,
        phone: newGuestForm.phone.trim() || null,
        rsvp_status: 'pending' as any
      });
      
      setNewGuestForm({ name: '', email: '', phone: '' });
      setAddGuestDialogOpen(false);
      toast.success('Invité ajouté avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      toast.error('Erreur lors de l\'ajout de l\'invité');
    }
  };

  const handleAddFromContacts = async (contact: any) => {
    try {
      await createGuest({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        rsvp_status: 'pending' as any
      });
      
      toast.success(`${contact.name} ajouté aux invités`);
      setAddGuestDialogOpen(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      toast.error('Erreur lors de l\'ajout de l\'invité');
    }
  };

  const handleUpdateStatus = async (guestId: string, status: string) => {
    try {
      await updateGuest(guestId, { rsvp_status: status as any });
      toast.success('Statut mis à jour');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  const handleDeleteGuest = async (guestId: string, guestName: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${guestName} de la liste des invités ?`)) {
      try {
        await deleteGuest(guestId);
        toast.success('Invité supprimé');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        toast.error('Erreur lors de la suppression de l\'invité');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = {
    total: guests.length,
    accepted: guests.filter(g => g.rsvp_status === 'confirmed').length,
    pending: guests.filter(g => g.rsvp_status === 'pending').length,
    declined: guests.filter(g => g.rsvp_status === 'declined').length
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
            <div className="text-sm text-muted-foreground">Confirmés</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">En attente</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.declined}</div>
            <div className="text-sm text-muted-foreground">Refusés</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un invité..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="confirmed">Confirmés</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="declined">Refusés</SelectItem>
          </SelectContent>
        </Select>

        {isOwner && (
          <Dialog open={addGuestDialogOpen} onOpenChange={setAddGuestDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un invité
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Ajouter un invité</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Add from contacts */}
                {contacts.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Depuis vos contacts</h4>
                    <div className="max-h-32 overflow-y-auto space-y-2">
                      {contacts.slice(0, 5).map((contact) => (
                        <div
                          key={contact.id}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-gray-500">{contact.email}</div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAddFromContacts(contact)}
                          >
                            <UserPlus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Manual add */}
                <div className="space-y-3">
                  <h4 className="font-medium">Ajouter manuellement</h4>
                  <form onSubmit={handleAddGuest} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Nom complet *"
                        value={newGuestForm.name}
                        onChange={(e) => setNewGuestForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={newGuestForm.email}
                        onChange={(e) => setNewGuestForm(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Input
                        type="tel"
                        placeholder="Téléphone"
                        value={newGuestForm.phone}
                        onChange={(e) => setNewGuestForm(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setAddGuestDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button type="submit">
                        Ajouter
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Guest List */}
      {filteredGuests.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {guests.length === 0 ? "Aucun invité" : "Aucun résultat"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {guests.length === 0 
                ? "Commencez par ajouter vos premiers invités" 
                : "Essayez de modifier vos critères de recherche"}
            </p>
            {isOwner && guests.length === 0 && (
              <Button onClick={() => setAddGuestDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter le premier invité
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredGuests.map((guest) => (
            <Card key={guest.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{guest.name}</h4>
                        {getStatusIcon(guest.rsvp_status)}
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        {guest.email && (
                          <div className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {guest.email}
                          </div>
                        )}
                        {guest.phone && (
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {guest.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(guest.rsvp_status)}>
                      {guest.rsvp_status === 'confirmed' ? 'Confirmé' :
                       guest.rsvp_status === 'declined' ? 'Refusé' : 'En attente'}
                    </Badge>

                    {isOwner && (
                      <div className="flex space-x-1">
                        <Select
                          value={guest.rsvp_status}
                          onValueChange={(value) => handleUpdateStatus(guest.id, value)}
                        >
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">En attente</SelectItem>
                            <SelectItem value="confirmed">Confirmé</SelectItem>
                            <SelectItem value="declined">Refusé</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteGuest(guest.id, guest.name)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuestManagement;