
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/auth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Save, Eye, Image, Upload, LayoutGrid } from 'lucide-react';

const AdminTemplateCreator: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [templateName, setTemplateName] = useState('');
  const [templateType, setTemplateType] = useState('invitation');
  const [templateCategory, setTemplateCategory] = useState('wedding');
  const [isPublic, setIsPublic] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Redirect non-admin users
  if (user?.role !== 'admin' && user?.role !== 'super_admin') {
    return (
      <DashboardLayout>
        <div className="py-12 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{t('common.accessDenied')}</h2>
          <p>{t('common.noPermission')}</p>
        </div>
      </DashboardLayout>
    );
  }

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      toast.error(t('templates.nameRequired'));
      return;
    }
    
    // Logic to save template
    toast.success(t('templates.saveSuccess'));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-invitopia-900">{t('admin.templateCreator')}</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              {t('common.preview')}
            </Button>
            <Button variant="default" size="sm" onClick={handleSaveTemplate}>
              <Save className="h-4 w-4 mr-2" />
              {t('common.save')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas/Preview Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] overflow-hidden">
              <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b">
                <CardTitle className="text-sm">{t('templates.preview')}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full flex items-center justify-center bg-white dark:bg-gray-900">
                {previewImage ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={previewImage} 
                      alt="Template Preview" 
                      className="object-contain w-full h-full" 
                    />
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <LayoutGrid className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">{t('templates.noPreview')}</p>
                    <Button variant="outline" className="mt-4" onClick={() => document.getElementById('upload-image')?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      {t('common.uploadImage')}
                    </Button>
                    <input 
                      id="upload-image" 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t('templates.properties')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="info">
                  <TabsList className="w-full">
                    <TabsTrigger value="info" className="flex-1">{t('common.info')}</TabsTrigger>
                    <TabsTrigger value="style" className="flex-1">{t('common.style')}</TabsTrigger>
                    <TabsTrigger value="content" className="flex-1">{t('common.content')}</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="name">{t('templates.name')}</Label>
                      <Input 
                        id="name" 
                        value={templateName} 
                        onChange={(e) => setTemplateName(e.target.value)} 
                        placeholder={t('templates.namePlaceholder')} 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="type">{t('templates.type')}</Label>
                      <Select value={templateType} onValueChange={setTemplateType}>
                        <SelectTrigger id="type">
                          <SelectValue placeholder={t('templates.selectType')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="invitation">{t('templates.invitation')}</SelectItem>
                          <SelectItem value="ticket">{t('templates.ticket')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="category">{t('templates.category')}</Label>
                      <Select value={templateCategory} onValueChange={setTemplateCategory}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder={t('templates.selectCategory')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedding">{t('events.types.wedding')}</SelectItem>
                          <SelectItem value="birthday">{t('events.types.birthday')}</SelectItem>
                          <SelectItem value="corporate">{t('events.types.corporate')}</SelectItem>
                          <SelectItem value="party">{t('events.types.party')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="public"
                        checked={isPublic}
                        onCheckedChange={setIsPublic}
                      />
                      <Label htmlFor="public">{t('templates.makePublic')}</Label>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">{t('common.description')}</Label>
                      <Textarea 
                        id="description" 
                        placeholder={t('templates.descriptionPlaceholder')} 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="thumbnail">{t('templates.thumbnail')}</Label>
                      <div className="mt-1 flex items-center">
                        <Button variant="outline" className="w-full" onClick={() => document.getElementById('upload-image')?.click()}>
                          <Image className="h-4 w-4 mr-2" />
                          {previewImage ? t('common.changeImage') : t('common.uploadImage')}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="style" className="space-y-4 pt-4">
                    {/* Style controls will go here */}
                    <div>
                      <Label>{t('templates.primaryColor')}</Label>
                      <Input type="color" defaultValue="#6E59A5" className="h-10" />
                    </div>
                    
                    <div>
                      <Label>{t('templates.secondaryColor')}</Label>
                      <Input type="color" defaultValue="#FFFFFF" className="h-10" />
                    </div>
                    
                    <div>
                      <Label>{t('templates.fontFamily')}</Label>
                      <Select defaultValue="sans">
                        <SelectTrigger>
                          <SelectValue placeholder={t('templates.selectFont')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sans">Sans-serif</SelectItem>
                          <SelectItem value="serif">Serif</SelectItem>
                          <SelectItem value="mono">Monospace</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="content" className="space-y-4 pt-4">
                    {/* Content placeholders will go here */}
                    <div>
                      <Label>{t('templates.editor.title')}</Label>
                      <Input defaultValue="Template Title" />
                    </div>
                    
                    <div>
                      <Label>{t('templates.editor.description')}</Label>
                      <Textarea defaultValue="Template description text goes here" />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminTemplateCreator;
