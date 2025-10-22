import React, { useState } from 'react';
import { useMasterOfCeremonies } from '@/hooks/useMasterOfCeremonies';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Award, Plus, Edit, Trash2, Search, CheckCircle, XCircle, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const MCManagement: React.FC = () => {
  const { mcs, loading, createMCProfile, updateMCProfile, refetch } = useMasterOfCeremonies();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMC, setEditingMC] = useState<any>(null);
  const [formData, setFormData] = useState({
    business_name: '',
    bio: '',
    location: '',
    specialties: [] as string[],
    experience_years: 0,
    pricing_info: {},
    contact_info: {},
  });

  const isSuperAdmin = user?.role === 'super_admin';

  const filteredMCs = mcs.filter(mc => 
    mc.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mc.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMC) {
        await updateMCProfile(editingMC.id, formData);
        toast.success('MC mis à jour avec succès');
      } else {
        await createMCProfile({
          ...formData,
          user_id: user?.id,
        });
        toast.success('MC créé avec succès');
      }
      setIsDialogOpen(false);
      resetForm();
      refetch();
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce MC ?')) return;
    
    try {
      const { error } = await supabase
        .from('master_of_ceremonies')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('MC supprimé avec succès');
      refetch();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleToggleVerification = async (id: string, currentStatus: boolean) => {
    try {
      await updateMCProfile(id, { is_verified: !currentStatus });
      toast.success(`Badge de vérification ${!currentStatus ? 'attribué' : 'retiré'}`);
      refetch();
    } catch (error) {
      toast.error('Erreur lors de la modification du badge');
    }
  };

  const handleShare = (mc: any) => {
    const shareUrl = `${window.location.origin}/mc/${mc.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Lien copié dans le presse-papier');
  };

  const resetForm = () => {
    setFormData({
      business_name: '',
      bio: '',
      location: '',
      specialties: [],
      experience_years: 0,
      pricing_info: {},
      contact_info: {},
    });
    setEditingMC(null);
  };

  const openEditDialog = (mc: any) => {
    setEditingMC(mc);
    setFormData({
      business_name: mc.business_name,
      bio: mc.bio || '',
      location: mc.location || '',
      specialties: mc.specialties || [],
      experience_years: mc.experience_years || 0,
      pricing_info: mc.pricing_info || {},
      contact_info: mc.contact_info || {},
    });
    setIsDialogOpen(true);
  };

  if (!isSuperAdmin) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Accès refusé</h3>
          <p className="text-muted-foreground">Seuls les super administrateurs peuvent accéder à cette page.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Award className="h-6 w-6" />
            Gestion des Maîtres de Cérémonie
          </h2>
          <p className="text-muted-foreground">Gérez les profils des maîtres de cérémonie</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau MC
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingMC ? 'Modifier le MC' : 'Créer un nouveau MC'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="business_name">Nom commercial*</Label>
                <Input
                  id="business_name"
                  value={formData.business_name}
                  onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Localisation</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="bio">Biographie</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="experience_years">Années d'expérience</Label>
                <Input
                  id="experience_years"
                  type="number"
                  value={formData.experience_years}
                  onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="specialties">Spécialités (séparées par des virgules)</Label>
                <Input
                  id="specialties"
                  value={formData.specialties.join(', ')}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    specialties: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  {editingMC ? 'Mettre à jour' : 'Créer'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un MC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom commercial</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>Expérience</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMCs.map((mc) => (
                <TableRow key={mc.id}>
                  <TableCell className="font-medium">{mc.business_name}</TableCell>
                  <TableCell>{mc.location || '-'}</TableCell>
                  <TableCell>{mc.experience_years || 0} ans</TableCell>
                  <TableCell>{mc.rating}/5 ({mc.total_reviews})</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Badge variant={mc.is_verified ? 'default' : 'secondary'}>
                        {mc.is_verified ? 'Vérifié' : 'Non vérifié'}
                      </Badge>
                      <Badge variant={mc.is_active ? 'default' : 'destructive'}>
                        {mc.is_active ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleVerification(mc.id, mc.is_verified)}
                        title={mc.is_verified ? 'Retirer la vérification' : 'Vérifier'}
                      >
                        {mc.is_verified ? (
                          <XCircle className="h-4 w-4 text-destructive" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(mc)}
                        title="Partager"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(mc)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(mc.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
