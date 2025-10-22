
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSiteContent } from '@/hooks/useSiteContent';
import { Globe, Plus, Edit, Trash2, Search, Eye, X, ChevronUp, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

const PublicContentManager: React.FC = () => {
  const { content, loading, error, createContent, updateContent, deleteContent } = useSiteContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    content_type: 'hero' as any,
    content: {},
    is_active: true,
    display_order: 0,
    image_url: '',
    metadata: {}
  });

  const contentTypes = [
    { value: 'hero', label: 'Section Hero' },
    { value: 'feature', label: 'Fonctionnalité' },
    { value: 'testimonial', label: 'Témoignage' },
    { value: 'pricing', label: 'Tarification' },
    { value: 'faq', label: 'FAQ' },
    { value: 'announcement', label: 'Annonce' },
    { value: 'footer', label: 'Pied de page' },
    { value: 'about', label: 'À propos' }
  ];

  const filteredContent = content.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingContent) {
        await updateContent(editingContent.id, formData);
        toast.success('Contenu mis à jour');
      } else {
        await createContent(formData);
        toast.success('Contenu créé');
      }
      resetForm();
    } catch (error: any) {
      toast.error('Erreur: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      content_type: 'hero' as any,
      content: {},
      is_active: true,
      display_order: 0,
      image_url: '',
      metadata: {}
    });
    setEditingContent(null);
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (item: any) => {
    setFormData({
      title: item.title,
      subtitle: item.subtitle || '',
      description: item.description || '',
      content_type: item.content_type,
      content: item.content || {},
      is_active: item.is_active,
      display_order: item.display_order || 0,
      image_url: item.image_url || '',
      metadata: item.metadata || {}
    });
    setEditingContent(item);
    setIsCreateDialogOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) {
      try {
        await deleteContent(id);
        toast.success('Contenu supprimé');
      } catch (error: any) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const handleToggleActive = async (item: any) => {
    try {
      await updateContent(item.id, { is_active: !item.is_active });
      toast.success(item.is_active ? 'Contenu désactivé' : 'Contenu activé');
    } catch (error: any) {
      toast.error('Erreur lors du changement de statut');
    }
  };

  const handleMoveUp = async (item: any) => {
    try {
      await updateContent(item.id, { display_order: (item.display_order || 0) - 1 });
      toast.success('Ordre modifié');
    } catch (error: any) {
      toast.error('Erreur lors du changement d\'ordre');
    }
  };

  const handleMoveDown = async (item: any) => {
    try {
      await updateContent(item.id, { display_order: (item.display_order || 0) + 1 });
      toast.success('Ordre modifié');
    } catch (error: any) {
      toast.error('Erreur lors du changement d\'ordre');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Gestion du contenu public
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher du contenu..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau contenu
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingContent ? 'Modifier le contenu' : 'Nouveau contenu'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Titre *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="content_type">Type de contenu *</Label>
                      <Select 
                        value={formData.content_type} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, content_type: value as any }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {contentTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subtitle">Sous-titre</Label>
                    <Input
                      id="subtitle"
                      value={formData.subtitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="image_url">URL de l'image</Label>
                    <Input
                      id="image_url"
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="display_order">Ordre d'affichage</Label>
                      <Input
                        id="display_order"
                        type="number"
                        value={formData.display_order}
                        onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-8">
                      <Switch
                        id="is_active"
                        checked={formData.is_active}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                      />
                      <Label htmlFor="is_active">Contenu actif</Label>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">
                      {editingContent ? 'Mettre à jour' : 'Créer'}
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
            {filteredContent
              .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
              .map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-lg">{item.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {contentTypes.find(t => t.value === item.content_type)?.label || item.content_type}
                      </Badge>
                      <Badge variant={item.is_active ? 'default' : 'secondary'} className="text-xs">
                        {item.is_active ? 'Actif' : 'Inactif'}
                      </Badge>
                      {item.display_order !== undefined && (
                        <Badge variant="outline" className="text-xs">
                          Ordre: {item.display_order}
                        </Badge>
                      )}
                    </div>
                    {item.subtitle && (
                      <p className="text-sm font-medium text-gray-700 mb-1">{item.subtitle}</p>
                    )}
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Créé le {formatDate(item.created_at)}
                      {item.updated_at !== item.created_at && (
                        <> • Modifié le {formatDate(item.updated_at)}</>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleMoveUp(item)}>
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleMoveDown(item)}>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleToggleActive(item)}
                      className={item.is_active ? 'text-orange-600' : 'text-green-600'}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id, item.title)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredContent.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Globe className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'Aucun contenu trouvé' : 'Aucun contenu public'}
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  {searchTerm 
                    ? 'Essayez de modifier votre recherche ou créez du nouveau contenu.' 
                    : 'Commencez par créer du contenu public pour votre site.'}
                </p>
                {!searchTerm && (
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Créer du contenu
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicContentManager;
