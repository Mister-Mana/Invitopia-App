import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Palette, Settings, Eye, Users, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useImageUpload } from '@/hooks/useImageUpload';
import { toast } from 'sonner';

interface EventCustomizationStepProps {
  data: any;
  onChange: (data: any) => void;
}

const themes = [
  { id: 'modern', name: 'Moderne', description: 'Design épuré et contemporain' },
  { id: 'classic', name: 'Classique', description: 'Style traditionnel et élégant' },
  { id: 'festive', name: 'Festif', description: 'Coloré et joyeux' },
  { id: 'professional', name: 'Professionnel', description: 'Sobre et business' },
  { id: 'elegant', name: 'Élégant', description: 'Raffiné et sophistiqué' }
];

const colors = [
  { value: '#3B82F6', name: 'Bleu' },
  { value: '#EF4444', name: 'Rouge' },
  { value: '#10B981', name: 'Vert' },
  { value: '#F59E0B', name: 'Orange' },
  { value: '#8B5CF6', name: 'Violet' },
  { value: '#EC4899', name: 'Rose' },
  { value: '#6B7280', name: 'Gris' },
  { value: '#1F2937', name: 'Noir' }
];

const EventCustomizationStep: React.FC<EventCustomizationStepProps> = ({ data, onChange }) => {
  const { uploadImage, isUploading } = useImageUpload();

  const handleDesignChange = (field: string, value: any) => {
    onChange({
      design: {
        ...data.design,
        [field]: value
      }
    });
  };

  const handleSettingsChange = (field: string, value: any) => {
    onChange({
      settings: {
        ...data.settings,
        [field]: value
      }
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        handleDesignChange('coverImage', imageUrl);
        // Also set it as primary cover image for the event
        onChange({
          primary_cover_image: imageUrl,
          cover_images: [imageUrl]
        });
        toast.success('Image téléchargée avec succès');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Erreur lors du téléchargement de l\'image');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          Personnalisation
        </h2>
        <p className="text-muted-foreground">
          Personnalisez l'apparence et les paramètres de votre événement
        </p>
      </div>

      <div className="grid gap-6">
        {/* Apparence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Palette className="h-5 w-5 mr-2" />
              Apparence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Thème</Label>
              <Select
                value={data.design?.theme || 'modern'}
                onValueChange={(value) => handleDesignChange('theme', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un thème" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id}>
                      <div>
                        <div className="font-medium">{theme.name}</div>
                        <div className="text-sm text-muted-foreground">{theme.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Couleur principale</Label>
              <div className="grid grid-cols-4 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    className={`h-10 rounded-md border-2 ${
                      data.design?.primaryColor === color.value
                        ? 'border-gray-900 shadow-md'
                        : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleDesignChange('primaryColor', color.value)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Image de couverture</Label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                {isUploading && (
                  <p className="text-sm text-muted-foreground">Téléchargement en cours...</p>
                )}
                {data.design?.coverImage && (
                  <div className="mt-2">
                    <img
                      src={data.design.coverImage}
                      alt="Aperçu"
                      className="w-full h-32 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Paramètres de visibilité */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Eye className="h-5 w-5 mr-2" />
              Visibilité et accès
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Visibilité de l'événement</Label>
              <Select
                value={data.settings?.visibility || 'private'}
                onValueChange={(value) => handleSettingsChange('visibility', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div>
                      <div className="font-medium">Public</div>
                      <div className="text-sm text-muted-foreground">
                        Visible par tous, référencé dans les moteurs de recherche
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div>
                      <div className="font-medium">Privé</div>
                      <div className="text-sm text-muted-foreground">
                        Accessible uniquement aux invités
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="unlisted">
                    <div>
                      <div className="font-medium">Non répertorié</div>
                      <div className="text-sm text-muted-foreground">
                        Accessible via lien, mais non référencé
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Approbation requise</Label>
                <p className="text-sm text-muted-foreground">
                  Les inscriptions doivent être approuvées
                </p>
              </div>
              <Switch
                checked={data.settings?.requireApproval || false}
                onCheckedChange={(checked) => handleSettingsChange('requireApproval', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Paramètres des invités */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Users className="h-5 w-5 mr-2" />
              Paramètres des invités
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Autoriser les accompagnants</Label>
                <p className="text-sm text-muted-foreground">
                  Les invités peuvent amener des accompagnants
                </p>
              </div>
              <Switch
                checked={data.settings?.allowPlusOnes || false}
                onCheckedChange={(checked) => handleSettingsChange('allowPlusOnes', checked)}
              />
            </div>

            {data.settings?.allowPlusOnes && (
              <div className="space-y-2">
                <Label>Nombre maximum d'accompagnants par invitation</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={data.settings?.maxGuestsPerInvitation || 1}
                  onChange={(e) => handleSettingsChange('maxGuestsPerInvitation', parseInt(e.target.value))}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Activer la liste d'attente</Label>
                <p className="text-sm text-muted-foreground">
                  Gérer automatiquement les inscriptions en cas de capacité atteinte
                </p>
              </div>
              <Switch
                checked={data.settings?.enableWaitlist || false}
                onCheckedChange={(checked) => handleSettingsChange('enableWaitlist', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label>Date limite de RSVP (optionnel)</Label>
              <Input
                type="datetime-local"
                value={data.settings?.rsvpDeadline || ''}
                onChange={(e) => handleSettingsChange('rsvpDeadline', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Paramètres avancés */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Settings className="h-5 w-5 mr-2" />
              Paramètres avancés
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Capacité maximale (optionnel)</Label>
              <Input
                type="number"
                min="1"
                placeholder="Nombre maximum de participants"
                value={data.capacity || ''}
                onChange={(e) => onChange({ capacity: parseInt(e.target.value) || undefined })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventCustomizationStep;