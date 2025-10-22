
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Type, 
  Image as ImageIcon, 
  Square, 
  Palette, 
  LayoutGrid, 
  Upload, 
  FileText, 
  Layers,
  History,
  Settings
} from 'lucide-react';
import { TemplateEditorHook } from '@/hooks/useTemplateEditor';

interface EditorSidebarProps {
  onTogglePanel: (panel: string) => void;
  editor: TemplateEditorHook;
  showElementsLibrary: boolean;
  showImageLibrary: boolean;
  showFontSelector: boolean;
  showColorPicker: boolean;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ 
  onTogglePanel, 
  editor,
  showElementsLibrary,
  showImageLibrary,
  showFontSelector,
  showColorPicker
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <Tabs defaultValue="elements" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-5 gap-1 px-2 py-2">
          <TabsTrigger value="elements" className="px-2 py-2">
            <LayoutGrid className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="text" className="px-2 py-2">
            <Type className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="images" className="px-2 py-2">
            <ImageIcon className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="shapes" className="px-2 py-2">
            <Square className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="styles" className="px-2 py-2">
            <Palette className="h-5 w-5" />
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="elements" className="flex-1 p-4 overflow-y-auto">
          <h3 className="font-medium mb-4">{t('templates.editor.elements')}</h3>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2 justify-center items-center"
              onClick={() => onTogglePanel('elements')}
            >
              <LayoutGrid className="h-6 w-6" />
              <span className="text-xs">{t('common.browse')}</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2 justify-center items-center"
              onClick={() => {
                const center = { x: 750, y: 750 };
                editor.addTextElement(center, t('templates.editor.headerText'));
              }}
            >
              <Type className="h-6 w-6" />
              <span className="text-xs">{t('templates.editor.text')}</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2 justify-center items-center"
              onClick={() => {
                const center = { x: 750, y: 750 };
                editor.addShapeElement(center, 'rectangle');
              }}
            >
              <Square className="h-6 w-6" />
              <span className="text-xs">{t('common.shape')}</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2 justify-center items-center"
              onClick={() => onTogglePanel('images')}
            >
              <ImageIcon className="h-6 w-6" />
              <span className="text-xs">{t('templates.editor.images')}</span>
            </Button>
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">{t('common.tools')}</h4>
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm" 
                onClick={() => onTogglePanel('layers')}
              >
                <Layers className="h-4 w-4 mr-2" />
                {t('templates.editor.layers')}
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm" 
                onClick={() => onTogglePanel('history')}
              >
                <History className="h-4 w-4 mr-2" />
                {t('common.history')}
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm" 
                onClick={() => onTogglePanel('settings')}
              >
                <Settings className="h-4 w-4 mr-2" />
                {t('common.settings')}
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="text" className="flex-1 p-4 overflow-y-auto">
          <h3 className="font-medium mb-4">{t('templates.editor.text')}</h3>
          
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start text-2xl font-bold h-12"
              onClick={() => {
                const center = { x: 750, y: 750 };
                const id = editor.addTextElement(center, t('templates.editor.headerText'));
                editor.updateElement(id, { fontSize: 40, fontWeight: 'bold' });
              }}
            >
              {t('templates.editor.headerText')}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-xl h-12"
              onClick={() => {
                const center = { x: 750, y: 750 };
                const id = editor.addTextElement(center, t('templates.editor.bodyText'));
                editor.updateElement(id, { fontSize: 24 });
              }}
            >
              {t('templates.editor.bodyText')}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-sm h-12"
              onClick={() => {
                const center = { x: 750, y: 750 };
                const id = editor.addTextElement(center, t('templates.editor.footerText'));
                editor.updateElement(id, { fontSize: 16 });
              }}
            >
              {t('templates.editor.footerText')}
            </Button>
          </div>
          
          <div className="mt-6">
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => onTogglePanel('fonts')}
            >
              <FileText className="h-4 w-4 mr-2" />
              {t('templates.editor.fonts')}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="images" className="flex-1 p-4 overflow-y-auto">
          <h3 className="font-medium mb-4">{t('templates.editor.images')}</h3>
          
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full h-12"
              onClick={() => onTogglePanel('images')}
            >
              <Upload className="h-4 w-4 mr-2" />
              {t('templates.editor.images')}
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <div 
                className="aspect-square bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 flex items-center justify-center"
                onClick={() => {
                  const center = { x: 750, y: 750 };
                  editor.addImageElement(center, 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80');
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Sample" 
                  className="object-cover w-full h-full rounded-md" 
                />
              </div>
              <div 
                className="aspect-square bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 flex items-center justify-center"
                onClick={() => {
                  const center = { x: 750, y: 750 };
                  editor.addImageElement(center, 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80');
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Sample" 
                  className="object-cover w-full h-full rounded-md" 
                />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="shapes" className="flex-1 p-4 overflow-y-auto">
          <h3 className="font-medium mb-4">{t('common.shapes')}</h3>
          
          <div className="grid grid-cols-3 gap-2">
            <div 
              className="aspect-square bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 flex items-center justify-center"
              onClick={() => {
                const center = { x: 750, y: 750 };
                editor.addShapeElement(center, 'rectangle');
              }}
            >
              <div className="w-10 h-10 bg-invitopia-500 rounded-md"></div>
            </div>
            <div 
              className="aspect-square bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 flex items-center justify-center"
              onClick={() => {
                const center = { x: 750, y: 750 };
                editor.addShapeElement(center, 'ellipse');
              }}
            >
              <div className="w-10 h-10 bg-invitopia-500 rounded-full"></div>
            </div>
            <div 
              className="aspect-square bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 flex items-center justify-center"
              onClick={() => {
                const center = { x: 750, y: 750 };
                const id = editor.addShapeElement(center, 'rectangle');
                editor.updateElement(id, { borderRadius: 20 });
              }}
            >
              <div className="w-10 h-10 bg-invitopia-500 rounded-2xl"></div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="styles" className="flex-1 p-4 overflow-y-auto">
          <h3 className="font-medium mb-4">{t('templates.editor.style')}</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">{t('templates.editor.colors')}</h4>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onTogglePanel('colors')}
              >
                <Palette className="h-4 w-4 mr-2" />
                {t('templates.editor.colors')}
              </Button>
              
              <div className="grid grid-cols-6 gap-2 mt-2">
                {['#6E59A5', '#F43F5E', '#3B82F6', '#10B981', '#F59E0B', '#000000'].map((color) => (
                  <div 
                    key={color}
                    className="aspect-square rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      if (editor.selectedElement) {
                        if (editor.selectedElement.type === 'text') {
                          editor.updateElement(editor.selectedElement.id, { color });
                        } else if (editor.selectedElement.type === 'shape') {
                          editor.updateElement(editor.selectedElement.id, { backgroundColor: color });
                        }
                      }
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">{t('templates.editor.fonts')}</h4>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onTogglePanel('fonts')}
              >
                <FileText className="h-4 w-4 mr-2" />
                {t('templates.editor.fonts')}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditorSidebar;
