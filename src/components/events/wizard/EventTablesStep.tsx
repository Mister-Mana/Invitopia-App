import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, Plus, X, Users, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface EventTablesStepProps {
  data: any;
  onChange: (data: any) => void;
}

interface TableData {
  id: string;
  name: string;
  capacity: number;
  shape: 'round' | 'rectangle' | 'square';
  category?: string;
  location?: string;
  notes?: string;
  assignments: string[];
}

const EventTablesStep: React.FC<EventTablesStepProps> = ({ data, onChange }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTable, setEditingTable] = useState<TableData | null>(null);
  const [formData, setFormData] = useState<Partial<TableData>>({
    name: '',
    capacity: 10,
    shape: 'round',
    category: '',
    location: '',
    notes: '',
    assignments: []
  });

  const tables: TableData[] = data.tables || [];
  const guests = [...(data.guestList?.customInvites || []), ...(data.guestList?.contacts || [])];

  const handleSubmit = () => {
    if (!formData.name || !formData.capacity) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (formData.capacity > 10) {
      toast.error('Le nombre de places maximum est de 10');
      return;
    }

    const newTable: TableData = {
      id: editingTable?.id || `table-${Date.now()}`,
      name: formData.name || '',
      capacity: formData.capacity || 10,
      shape: formData.shape || 'round',
      category: formData.category,
      location: formData.location,
      notes: formData.notes,
      assignments: formData.assignments || []
    };

    const updatedTables = editingTable
      ? tables.map(t => t.id === editingTable.id ? newTable : t)
      : [...tables, newTable];

    onChange({ tables: updatedTables });

    setIsDialogOpen(false);
    setEditingTable(null);
    setFormData({
      name: '',
      capacity: 10,
      shape: 'round',
      category: '',
      location: '',
      notes: '',
      assignments: []
    });

    toast.success(editingTable ? 'Table mise à jour' : 'Table créée avec succès');
  };

  const handleEdit = (table: TableData) => {
    setEditingTable(table);
    setFormData(table);
    setIsDialogOpen(true);
  };

  const handleDelete = (tableId: string) => {
    const updatedTables = tables.filter(t => t.id !== tableId);
    onChange({ tables: updatedTables });
    toast.success('Table supprimée');
  };

  const handleAssignGuest = (tableId: string, guestId: string) => {
    const updatedTables = tables.map(table => {
      if (table.id === tableId) {
        const assignments = table.assignments || [];
        const isAssigned = assignments.includes(guestId);
        
        if (isAssigned) {
          return { ...table, assignments: assignments.filter(id => id !== guestId) };
        } else if (assignments.length < table.capacity) {
          return { ...table, assignments: [...assignments, guestId] };
        } else {
          toast.error('Cette table est complète');
          return table;
        }
      }
      // Remove guest from other tables
      return { ...table, assignments: (table.assignments || []).filter(id => id !== guestId) };
    });

    onChange({ tables: updatedTables });
  };

  const getGuestName = (guestId: string) => {
    const guest = guests.find((g: any) => g.id === guestId || g === guestId);
    return guest?.name || guestId;
  };

  const totalCapacity = tables.reduce((sum, table) => sum + table.capacity, 0);
  const assignedGuests = tables.reduce((sum, table) => sum + (table.assignments?.length || 0), 0);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          Organisation des tables
        </h2>
        <p className="text-muted-foreground">
          Créez des tables et attribuez vos invités
        </p>
      </div>

      <div className="grid gap-6">
        {/* Statistiques */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{tables.length}</div>
                <div className="text-sm text-muted-foreground">Tables</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{totalCapacity}</div>
                <div className="text-sm text-muted-foreground">Places totales</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{assignedGuests}</div>
                <div className="text-sm text-muted-foreground">Invités placés</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bouton d'ajout */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" onClick={() => {
              setEditingTable(null);
              setFormData({
                name: '',
                capacity: 10,
                shape: 'round',
                category: '',
                location: '',
                notes: '',
                assignments: []
              });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une table
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTable ? 'Modifier la table' : 'Nouvelle table'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tableName">Nom de la table *</Label>
                <Input
                  id="tableName"
                  placeholder="Ex: Table 1, Table VIP..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Nombre de places * (max 10)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 10 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shape">Forme</Label>
                  <Select 
                    value={formData.shape} 
                    onValueChange={(value: any) => setFormData({ ...formData, shape: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="round">Ronde</SelectItem>
                      <SelectItem value="rectangle">Rectangle</SelectItem>
                      <SelectItem value="square">Carrée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Input
                  id="category"
                  placeholder="Ex: VIP, Famille, Amis..."
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Emplacement</Label>
                <Input
                  id="location"
                  placeholder="Ex: Salle principale, Jardin..."
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  placeholder="Notes supplémentaires"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <Button onClick={handleSubmit} className="w-full">
                {editingTable ? 'Mettre à jour' : 'Créer la table'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Liste des tables */}
        {tables.length > 0 ? (
          <div className="grid gap-4">
            {tables.map((table) => (
              <Card key={table.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <Table className="h-5 w-5 mr-2" />
                      {table.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {table.assignments?.length || 0}/{table.capacity}
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(table)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(table.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {table.category && (
                      <div>
                        <span className="text-muted-foreground">Catégorie: </span>
                        <span className="font-medium">{table.category}</span>
                      </div>
                    )}
                    {table.location && (
                      <div>
                        <span className="text-muted-foreground">Emplacement: </span>
                        <span className="font-medium">{table.location}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">Forme: </span>
                      <span className="font-medium">{table.shape === 'round' ? 'Ronde' : table.shape === 'rectangle' ? 'Rectangle' : 'Carrée'}</span>
                    </div>
                  </div>

                  {guests.length > 0 && (
                    <div className="space-y-2">
                      <Label>Attribuer des invités:</Label>
                      <Select onValueChange={(value) => handleAssignGuest(table.id, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un invité" />
                        </SelectTrigger>
                        <SelectContent>
                          {guests.map((guest: any) => (
                            <SelectItem key={guest.id || guest} value={guest.id || guest}>
                              {guest.name || guest}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {table.assignments && table.assignments.length > 0 && (
                    <div className="space-y-2">
                      <Label>Invités assignés:</Label>
                      <div className="flex flex-wrap gap-2">
                        {table.assignments.map((guestId) => (
                          <Badge key={guestId} variant="secondary" className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {getGuestName(guestId)}
                            <button
                              onClick={() => handleAssignGuest(table.id, guestId)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <Table className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">Aucune table créée</h3>
              <p className="text-sm text-muted-foreground">
                Cliquez sur le bouton ci-dessus pour créer votre première table
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EventTablesStep;
