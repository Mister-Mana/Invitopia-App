
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { useImageUpload } from '@/hooks/useImageUpload';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Save, X } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';

interface ProfileEditFormProps {
  onCancel: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ onCancel }) => {
  const { user, updateProfile } = useAuth();
  const { uploadImage, isUploading } = useImageUpload();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.avatar || null);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    location: user?.location || '',
    organization: user?.organization || '',
  });

  const handleImageChange = (file: File | null, preview: string | null) => {
    setSelectedImageFile(file);
    setPreviewUrl(preview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateProfile) return;
    
    setIsLoading(true);
    try {
      let avatarUrl = user?.avatar;
      
      // Upload new image if selected
      if (selectedImageFile) {
        const uploadedUrl = await uploadImage(selectedImageFile);
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        } else {
          toast.error('Erreur lors du téléchargement de l\'image');
          return;
        }
      } else if (previewUrl === null) {
        // User removed the image
        avatarUrl = null;
      }
      
      const updateData = {
        ...formData,
        avatar: avatarUrl
      };
      
      await updateProfile(updateData);
      toast.success('Profil mis à jour avec succès');
      onCancel(); // Close edit mode
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la mise à jour');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      location: user?.location || '',
      organization: user?.organization || '',
    });
    setSelectedImageFile(null);
    setPreviewUrl(user?.avatar || null);
    onCancel();
  };

  const isSubmitDisabled = isLoading || isUploading;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Modifier mon profil</span>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isSubmitDisabled}
            >
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button
              type="submit"
              size="sm"
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Sauvegarde...' : isUploading ? 'Téléchargement...' : 'Sauvegarder'}
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Modifiez vos informations personnelles et votre photo de profil
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo de profil */}
          <div className="text-center">
            <ImageUpload
              currentImage={user?.avatar}
              onImageChange={handleImageChange}
              size="lg"
              fallbackText={user?.name?.charAt(0)?.toUpperCase() || 'U'}
            />
          </div>

          <Separator />

          {/* Informations de base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Votre nom complet"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+33 6 12 34 56 78"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization">Organisation</Label>
              <Input
                id="organization"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="Nom de votre organisation"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Localisation</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Ville, Pays"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biographie</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Parlez-nous de vous..."
              rows={4}
              className="resize-none"
            />
          </div>

          <Separator />

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitDisabled}
              className="w-full sm:w-auto"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitDisabled}
              className="w-full sm:w-auto"
            >
              {isLoading ? 'Sauvegarde...' : isUploading ? 'Téléchargement...' : 'Sauvegarder les modifications'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileEditForm;
