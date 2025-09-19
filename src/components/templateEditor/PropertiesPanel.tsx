
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { StyleTab } from './tabs/StyleTab';
import { ContentTab } from './tabs/ContentTab';
import { LayoutTab } from './tabs/LayoutTab';
import { Palette, Type, Layout } from 'lucide-react';

interface PropertiesPanelProps {
  templateName: string;
  setTemplateName: (name: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  templateName,
  setTemplateName,
  selectedColor,
  setSelectedColor,
  fontSize,
  setFontSize
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-invitopia-100 p-4">
      <Tabs defaultValue="style">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="style" className="flex-1">
            <Palette className="h-4 w-4 mr-1" />
            Style
          </TabsTrigger>
          <TabsTrigger value="content" className="flex-1">
            <Type className="h-4 w-4 mr-1" />
            Contenu
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex-1">
            <Layout className="h-4 w-4 mr-1" />
            Layout
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="style">
          <StyleTab 
            templateName={templateName}
            setTemplateName={setTemplateName}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        </TabsContent>
        
        <TabsContent value="content">
          <ContentTab />
        </TabsContent>
        
        <TabsContent value="layout">
          <LayoutTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertiesPanel;
