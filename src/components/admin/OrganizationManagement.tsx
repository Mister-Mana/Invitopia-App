
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useOrganizations } from '@/hooks/useOrganizations';
import { Building2, Plus, Edit, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const OrganizationManagement: React.FC = () => {
  const { organizations, loading, error, createOrganization, updateOrganization, deleteOrganization } = useOrganizations();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    website: '',
    logo: ''
  });

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingOrg) {
        await updateOrganization(editingOrg.id, formData);
        toast.success('Organisation mise à jour');
      } else {
        await createOrganization(formData);
        toast.success('Organisation créée');
      }
      resetForm();
    } catch (error: any) {
      toast.error('Erreur: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', address: '', website: '', logo: '' });
    setEditingOrg(null);
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (org: any) => {
    setFormData({
      name: org.name,
      address: org.address || '',
      website: org.website || '',
      logo: org.logo || ''
    });
    setEditingOrg(org);
    setIsCreateDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette organisation ?')) {
      try {
        await deleteOrganization(id);
        toast.success('Organisation supprimée');
      } catch (error: any) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Gestion des organisations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher une organisation..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle organisation
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingOrg ? 'Modifier l\'organisation' : 'Nouvelle organisation'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Site web</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">
                      {editingOrg ? 'Mettre à jour' : 'Créer'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Annuler
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredOrganizations.map((org) => (
              <div key={org.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{org.name}</h3>
                    {org.address && <p className="text-gray-600">{org.address}</p>}
                    {org.website && (
                      <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {org.website}
                      </a>
                    )}
                    <p className="text-sm text-gray-500">
                      Créée le {new Date(org.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(org)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(org.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredOrganizations.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucune organisation trouvée
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationManagement;
