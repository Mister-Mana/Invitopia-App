
import React from 'react';
import { Image, Users, Settings } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';

// Import tab components
import AppearanceTab from './customization/AppearanceTab';
import GuestsTab from './customization/GuestsTab';
import SettingsTab from './customization/SettingsTab';

interface EventCustomizationFormProps {
  onSelectChange: (name: string, value: string) => void;
  onImageUpload?: (file: File) => void;
  coverImageUrl?: string;
}

const EventCustomizationForm: React.FC<EventCustomizationFormProps> = ({ 
  onSelectChange, 
  onImageUpload,
  coverImageUrl 
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="appearance">
        <TabsList className="mb-4">
          <TabsTrigger value="appearance" className="flex items-center">
            <Image className="h-4 w-4 mr-2" />
            {t('createEvent.appearance')}
          </TabsTrigger>
          <TabsTrigger value="guests" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            {t('createEvent.guests')}
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            {t('createEvent.settings')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance">
          <AppearanceTab 
            onSelectChange={onSelectChange}
            onImageUpload={onImageUpload}
            coverImageUrl={coverImageUrl}
          />
        </TabsContent>
        
        <TabsContent value="guests">
          <GuestsTab onSelectChange={onSelectChange} />
        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsTab onSelectChange={onSelectChange} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventCustomizationForm;
