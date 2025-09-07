import React, { useState } from 'react';
import { useAppConfiguration } from '@/hooks/useAppConfiguration';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from '@/components/ui/ImageUpload';
import { toast } from 'sonner';
import { Settings, Upload, Save, RotateCcw } from 'lucide-react';

const AppConfigurationManagement: React.FC = () => {
  const { t } = useLanguage();
  const { config, loading, updateAppConfiguration, uploadAppAsset } = useAppConfiguration();
  const [formData, setFormData] = useState({
    app_title: config?.app_title || 'Invitopia',
    meta_description: config?.meta_description || '',
    app_icon_url: config?.app_icon_url || '',
    favicon_url: config?.favicon_url || ''
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  React.useEffect(() => {
    if (config) {
      setFormData({
        app_title: config.app_title,
        meta_description: config.meta_description || '',
        app_icon_url: config.app_icon_url || '',
        favicon_url: config.favicon_url || ''
      });
    }
  }, [config]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateAppConfiguration(formData);
      toast.success('Configuration mise à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de la mise à jour de la configuration');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File | null, previewUrl: string | null, type: 'icon' | 'favicon') => {
    if (!file) {
      setFormData(prev => ({
        ...prev,
        [type === 'icon' ? 'app_icon_url' : 'favicon_url']: ''
      }));
      return;
    }

    setUploading(true);
    try {
      const url = await uploadAppAsset(file, type);
      setFormData(prev => ({
        ...prev,
        [type === 'icon' ? 'app_icon_url' : 'favicon_url']: url
      }));
      toast.success(`${type === 'icon' ? 'Icône' : 'Favicon'} uploadé avec succès`);
    } catch (error) {
      console.error('Erreur upload:', error);
      toast.error(`Erreur lors de l'upload de ${type === 'icon' ? "l'icône" : 'le favicon'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    if (config) {
      setFormData({
        app_title: config.app_title,
        meta_description: config.meta_description || '',
        app_icon_url: config.app_icon_url || '',
        favicon_url: config.favicon_url || ''
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Settings className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Configuration de l'Application</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations Générales</CardTitle>
            <CardDescription>
              Configurez les informations de base de votre application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="app_title">Titre de l'Application</Label>
              <Input
                id="app_title"
                value={formData.app_title}
                onChange={(e) => setFormData(prev => ({ ...prev, app_title: e.target.value }))}
                placeholder="Invitopia"
                required
              />
              <p className="text-sm text-muted-foreground">
                Ce titre apparaîtra dans l'onglet du navigateur
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_description">Description</Label>
              <Textarea
                id="meta_description"
                value={formData.meta_description}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                placeholder="Plateforme de gestion d'événements et d'invitations"
                rows={3}
              />
              <p className="text-sm text-muted-foreground">
                Description utilisée pour le SEO et les réseaux sociaux
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images et Icônes</CardTitle>
            <CardDescription>
              Configurez les icônes et images de votre application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Icône de l'Application</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Icône utilisée dans l'interface (format recommandé: PNG, 64x64px)
                </p>
                <ImageUpload
                  onImageChange={(file, previewUrl) => handleImageUpload(file, previewUrl, 'icon')}
                  currentImage={formData.app_icon_url}
                  size="lg"
                  fallbackText="🎉"
                />
              </div>

              <div>
                <Label>Favicon</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Icône affichée dans l'onglet du navigateur (format recommandé: PNG/ICO, 32x32px)
                </p>
                <ImageUpload
                  onImageChange={(file, previewUrl) => handleImageUpload(file, previewUrl, 'favicon')}
                  currentImage={formData.favicon_url}
                  size="sm"
                  fallbackText="⭐"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={saving}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
          <Button
            type="submit"
            disabled={saving || uploading}
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AppConfigurationManagement;