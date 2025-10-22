import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, Save, X, UserMinus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Table {
  id: string;
  name: string;
  capacity: number;
  category?: string | null;
  location?: string | null;
  shape?: string | null;
  notes?: string | null;
  assignments?: any;
}

interface Guest {
  id: string;
  name: string;
  email?: string;
  table_assignment?: string | null;
}

interface TableManagementProps {
  eventId: string;
  guests: Guest[];
}

const TableManagement: React.FC<TableManagementProps> = ({ eventId, guests }) => {
  const [tables, setTables] = useState<Table[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    capacity: 8,
    category: '',
    location: '',
    shape: 'round',
    notes: ''
  });

  React.useEffect(() => {
    fetchTables();
  }, [eventId]);

  const fetchTables = async () => {
    const { data, error } = await supabase
      .from('tables')
      .select('*')
      .eq('event_id', eventId);

    if (error) {
      toast.error('Erreur lors du chargement des tables');
      return;
    }

    setTables(data || []);
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error('Le nom de la table est requis');
      return;
    }

    const tableData = {
      event_id: eventId,
      name: formData.name,
      capacity: formData.capacity,
      category: formData.category,
      location: formData.location,
      shape: formData.shape,
      notes: formData.notes,
      assignments: []
    };

    if (editingTable) {
      const { error } = await supabase
        .from('tables')
        .update(tableData)
        .eq('id', editingTable.id);

      if (error) {
        toast.error('Erreur lors de la mise à jour de la table');
        return;
      }

      toast.success('Table mise à jour avec succès');
    } else {
      const { error } = await supabase
        .from('tables')
        .insert(tableData);

      if (error) {
        toast.error('Erreur lors de la création de la table');
        return;
      }

      toast.success('Table créée avec succès');
    }

    setIsDialogOpen(false);
    setEditingTable(null);
    setFormData({ name: '', capacity: 8, category: '', location: '', shape: 'round', notes: '' });
    fetchTables();
  };

  const handleEdit = (table: Table) => {
    setEditingTable(table);
    setFormData({
      name: table.name,
      capacity: table.capacity,
      category: table.category || '',
      location: table.location || '',
      shape: table.shape || 'round',
      notes: table.notes || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (tableId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette table ?')) return;

    const { error } = await supabase
      .from('tables')
      .delete()
      .eq('id', tableId);

    if (error) {
      toast.error('Erreur lors de la suppression de la table');
      return;
    }

    toast.success('Table supprimée avec succès');
    fetchTables();
  };

  const handleAssignGuest = async (tableId: string, guestId: string) => {
    const table = tables.find(t => t.id === tableId);
    if (!table) return;

    // Check if table is full
    const currentAssignments = Array.isArray(table.assignments) ? table.assignments : [];
    if (currentAssignments.length >= table.capacity) {
      toast.error(`La table ${table.name} est pleine (${table.capacity} places)`);
      return;
    }

    // Check if guest is already assigned to this table
    const alreadyAssigned = currentAssignments.some((a: any) => a.guest_id === guestId);
    if (alreadyAssigned) {
      toast.error('Cet invité est déjà assigné à cette table');
      return;
    }

    try {
      // Update guest's table assignment
      const { error: guestError } = await supabase
        .from('guests')
        .update({ table_assignment: tableId })
        .eq('id', guestId);

      if (guestError) throw guestError;

      // Get guest details
      const guest = guests.find(g => g.id === guestId);

      // Update table's assignments
      const newAssignments = [
        ...currentAssignments,
        {
          guest_id: guestId,
          guest_name: guest?.name || 'Invité',
          assigned_at: new Date().toISOString()
        }
      ];

      const { error: tableError } = await supabase
        .from('tables')
        .update({ assignments: newAssignments })
        .eq('id', tableId);

      if (tableError) throw tableError;

      toast.success(`${guest?.name || 'Invité'} assigné(e) à ${table.name}`);
      fetchTables();
    } catch (error) {
      console.error('Error assigning guest:', error);
      toast.error('Erreur lors de l\'affectation de l\'invité');
    }
  };

  const handleUnassignGuest = async (tableId: string, guestId: string) => {
    const table = tables.find(t => t.id === tableId);
    if (!table) return;

    try {
      // Update guest's table assignment
      const { error: guestError } = await supabase
        .from('guests')
        .update({ table_assignment: null })
        .eq('id', guestId);

      if (guestError) throw guestError;

      // Update table's assignments
      const currentAssignments = Array.isArray(table.assignments) ? table.assignments : [];
      const newAssignments = currentAssignments.filter((a: any) => a.guest_id !== guestId);

      const { error: tableError } = await supabase
        .from('tables')
        .update({ assignments: newAssignments })
        .eq('id', tableId);

      if (tableError) throw tableError;

      toast.success('Invité retiré de la table');
      fetchTables();
    } catch (error) {
      console.error('Error unassigning guest:', error);
      toast.error('Erreur lors du retrait de l\'invité');
    }
  };

  const getGuestName = (guestId: string) => {
    const guest = guests.find(g => g.id === guestId);
    return guest?.name || 'Invité inconnu';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Tables</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Table
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTable ? 'Modifier la table' : 'Nouvelle table'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nom de la table *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Table Orchidée, Table 12"
                />
              </div>

              <div>
                <Label htmlFor="capacity">Capacité</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  min="1"
                />
              </div>

              <div>
                <Label htmlFor="shape">Forme</Label>
                <Select value={formData.shape} onValueChange={(value) => setFormData({ ...formData, shape: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="round">Ronde</SelectItem>
                    <SelectItem value="rectangular">Rectangulaire</SelectItem>
                    <SelectItem value="square">Carrée</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Catégorie</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Ex: VIP, Standard"
                />
              </div>

              <div>
                <Label htmlFor="location">Emplacement</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ex: Salle principale, Terrasse"
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Remarques supplémentaires"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Annuler
                </Button>
                <Button onClick={handleSubmit}>
                  <Save className="h-4 w-4 mr-2" />
                  Enregistrer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((table) => (
          <Card key={table.id}>
            <CardHeader className="pb-3">
              <CardTitle className="flex justify-between items-center text-base">
                <span>{table.name}</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(table)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(table.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Capacité: {Array.isArray(table.assignments) ? table.assignments.length : 0}/{table.capacity}</span>
                  </div>
                  {table.capacity > 0 && (
                    <div className="text-xs text-muted-foreground">
                      {Math.round(((Array.isArray(table.assignments) ? table.assignments.length : 0) / table.capacity) * 100)}%
                    </div>
                  )}
                </div>

                {table.category && (
                  <div className="text-muted-foreground">Catégorie: {table.category}</div>
                )}
                {table.location && (
                  <div className="text-muted-foreground">Emplacement: {table.location}</div>
                )}
                {table.shape && (
                  <div className="text-muted-foreground">Forme: {table.shape}</div>
                )}

                {/* Assigned Guests */}
                {Array.isArray(table.assignments) && table.assignments.length > 0 && (
                  <div className="pt-2 border-t">
                    <Label className="text-xs mb-2 block">Invités assignés</Label>
                    <div className="space-y-1">
                      {table.assignments.map((assignment: any, index: number) => (
                        <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                          <span className="text-xs">{assignment.guest_name || getGuestName(assignment.guest_id)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUnassignGuest(table.id, assignment.guest_id)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Assign Guest */}
                {(!Array.isArray(table.assignments) || table.assignments.length < table.capacity) && (
                  <div className="pt-2">
                    <Label className="text-xs">Affecter un invité</Label>
                    <Select onValueChange={(guestId) => handleAssignGuest(table.id, guestId)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        {guests
                          .filter(g => !g.table_assignment || g.table_assignment === table.id)
                          .map((guest) => (
                            <SelectItem key={guest.id} value={guest.id}>
                              {guest.name} {guest.email ? `(${guest.email})` : ''}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TableManagement;
