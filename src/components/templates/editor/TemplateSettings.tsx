
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { 
  Slider 
} from '@/components/ui/slider';
import {
  Label
} from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface TemplateSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  template: any;
  onUpdateTemplate: (property: string, value: any) => void;
}

const TemplateSettings: React.FC<TemplateSettingsProps> = ({ 
  isOpen, 
  onClose,
  template,
  onUpdateTemplate
}) => {
  const { t } = useLanguage();
  
  if (!template) {
    return null;
  }
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateTemplate('name', e.target.value);
  };
  
  const handleBackgroundChange = (color: string) => {
    onUpdateTemplate('layout', {
      ...template.layout,
      background: {
        type: 'color',
        value: color
      }
    });
  };
  
  const backgroundColors = [
    '#FFFFFF', '#F8F9FA', '#F1F3F5', '#E9ECEF', '#DEE2E6', '#6E59A5', 
    '#F43F5E', '#3B82F6', '#10B981', '#F59E0B', '#000000'
  ];
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t('common.settings')}</SheetTitle>
        </SheetHeader>
        
        <div className="mt-4 space-y-5">
          <Tabs defaultValue="general">
            <TabsList className="w-full mb-4 grid grid-cols-3">
              <TabsTrigger value="general">{t('common.general')}</TabsTrigger>
              <TabsTrigger value="size">{t('common.size')}</TabsTrigger>
              <TabsTrigger value="background">{t('templates.editor.background')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="mt-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('templates.templateName')}</Label>
                <Input 
                  id="name"
                  value={template.name} 
                  onChange={handleNameChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">{t('templates.templateType')}</Label>
                <Select 
                  value={template.type} 
                  onValueChange={(value) => onUpdateTemplate('type', value)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder={t('templates.templateType')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="invitation">{t('templates.invitation')}</SelectItem>
                    <SelectItem value="ticket">{t('templates.ticket')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">{t('templates.templateCategory')}</Label>
                <Select 
                  value={template.category} 
                  onValueChange={(value) => onUpdateTemplate('category', value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder={t('templates.templateCategory')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">{t('templates.categories.invitation')}</SelectItem>
                    <SelectItem value="birthday">{t('templates.categories.saveTheDate')}</SelectItem>
                    <SelectItem value="corporate">{t('templates.categories.rsvp')}</SelectItem>
                    <SelectItem value="conference">{t('templates.categories.thankYou')}</SelectItem>
                    <SelectItem value="concert">{t('templates.categories.program')}</SelectItem>
                    <SelectItem value="party">{t('templates.categories.menuCard')}</SelectItem>
                    <SelectItem value="charity">{t('templates.categories.seatingChart')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="size" className="mt-0 space-y-4">
              <div className="space-y-2">
                <Label>{t('common.width')} (px)</Label>
                <div className="flex items-center space-x-2">
                  <Slider
                    value={[template.layout.width]}
                    min={500}
                    max={3000}
                    step={10}
                    onValueChange={(value) => onUpdateTemplate('layout', {
                      ...template.layout,
                      width: value[0]
                    })}
                    className="flex-1"
                  />
                  <div className="w-12 text-center">{template.layout.width}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>{t('common.height')} (px)</Label>
                <div className="flex items-center space-x-2">
                  <Slider
                    value={[template.layout.height]}
                    min={500}
                    max={3000}
                    step={10}
                    onValueChange={(value) => onUpdateTemplate('layout', {
                      ...template.layout,
                      height: value[0]
                    })}
                    className="flex-1"
                  />
                  <div className="w-12 text-center">{template.layout.height}</div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onUpdateTemplate('layout', {
                    ...template.layout,
                    width: 1500,
                    height: 2100
                  })}
                >
                  Reset to A5 (1500 × 2100)
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="background" className="mt-0 space-y-4">
              <div className="space-y-2">
                <Label>{t('templates.editor.background')}</Label>
                <div className="grid grid-cols-6 gap-2">
                  {backgroundColors.map((color) => (
                    <div 
                      key={color}
                      className={`aspect-square rounded-md cursor-pointer hover:scale-105 transition-transform ${color === '#FFFFFF' ? 'border border-gray-200' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleBackgroundChange(color)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>{t('templates.editor.background')} URL</Label>
                <Input 
                  placeholder="https://example.com/image.jpg" 
                  onChange={(e) => {
                    if (e.target.value) {
                      onUpdateTemplate('layout', {
                        ...template.layout,
                        background: {
                          type: 'image',
                          value: e.target.value
                        }
                      });
                    }
                  }}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TemplateSettings;
