
import React, { useState } from 'react';
import { useSiteContent } from '@/hooks/useSiteContent';
import { useImageUpload } from '@/hooks/useImageUpload';
import { toast } from 'sonner';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Save,
  X,
  Image as ImageIcon
} from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';

const ContentManagement: React.FC = () => {
  const { content, loading, createContent, updateContent, deleteContent } = useSiteContent();
  const { uploadImage, isUploading } = useImageUpload();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    content_type: 'banner' as any,
    is_active: true,
    display_order: 0
  });

  const contentTypes = [
    { value: 'banner', label: 'Bannière' },
    { value: 'home_hero', label: 'Section Hero (Image d\'accueil)' },
    { value: 'feature', label: 'Fonctionnalité' },
    { value: 'testimonial', label: 'Témoignage' },
    { value: 'news', label: 'Actualité' },
    { value: 'faq', label: 'FAQ' },
    { value: 'about', label: 'À propos' }
  ];

  const handleImageChange = (file: File | null, preview: string | null) => {
    setSelectedImage(file);
    setPreviewUrl(preview);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      content_type: 'banner',
      is_active: true,
      display_order: 0
    });
    setSelectedImage(null);
    setPreviewUrl(null);
    setEditingContent(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (contentItem: any) => {
    setFormData({
      title: contentItem.title,
      subtitle: contentItem.subtitle || '',
      description: contentItem.description || '',
      content_type: contentItem.content_type,
      is_active: contentItem.is_active,
      display_order: contentItem.display_order || 0
    });
    setPreviewUrl(contentItem.image_url);
    setEditingContent(contentItem);
    setIsCreateDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = editingContent?.image_url || null;
      
      // Upload new image if selected
      if (selectedImage) {
        const uploadedUrl = await uploadImage(selectedImage);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      } else if (previewUrl === null) {
        imageUrl = null;
      }

      const contentData = {
        ...formData,
        image_url: imageUrl
      };

      if (editingContent) {
        await updateContent(editingContent.id, contentData);
        toast.success('Contenu mis à jour avec succès');
      } else {
        await createContent(contentData);
        toast.success('Contenu créé avec succès');
      }

      setIsCreateDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contenu ?')) {
      try {
        await deleteContent(id);
        toast.success('Contenu supprimé avec succès');
      } catch (error: any) {
        toast.error(error.message || 'Erreur lors de la suppression');
      }
    }
  };

  const toggleActive = async (contentItem: any) => {
    try {
      await updateContent(contentItem.id, { is_active: !contentItem.is_active });
      toast.success(`Contenu ${contentItem.is_active ? 'désactivé' : 'activé'}`);
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la modification');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Gestion du contenu public</h2>
          <p className="text-gray-600">Gérez tout le contenu affiché sur le site public, y compris l'image de la page d'accueil</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau contenu
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item) => (
          <Card key={item.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="capitalize">
                    {contentTypes.find(type => type.value === item.content_type)?.label}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleActive(item)}
                    title={item.is_active ? 'Désactiver' : 'Activer'}
                  >
                    {item.is_active ? (
                      <Eye className="h-4 w-4 text-green-600" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
              )}
              
              {item.subtitle && (
                <p className="text-sm font-medium text-gray-700 mb-2">{item.subtitle}</p>
              )}
              
              {item.description && (
                <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
              )}
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <span className="text-xs text-gray-500">
                  Ordre: {item.display_order}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.is_active ? 'Actif' : 'Inactif'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingContent ? 'Modifier le contenu' : 'Créer un nouveau contenu'}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations pour {editingContent ? 'modifier' : 'créer'} le contenu public.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Titre du contenu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content_type">Type de contenu *</Label>
                <Select 
                  value={formData.content_type} 
                  onValueChange={(value) => setFormData({ ...formData, content_type: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Sous-titre</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Sous-titre optionnel"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description du contenu"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Image du contenu</Label>
              <ImageUpload
                currentImage={previewUrl}
                onImageChange={handleImageChange}
                size="md"
                fallbackText="IMG"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="display_order">Ordre d'affichage</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label>État</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <span className="text-sm">
                    {formData.is_active ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!formData.title || isUploading}
            >
              <Save className="h-4 w-4 mr-2" />
              {isUploading ? 'Téléchargement...' : editingContent ? 'Mettre à jour' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentManagement;
