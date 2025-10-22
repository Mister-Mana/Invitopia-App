
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface ElementsLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onAddElement: (type: 'text' | 'image' | 'shape', position: { x: number, y: number }) => void;
}

const ElementsLibrary: React.FC<ElementsLibraryProps> = ({ 
  isOpen, 
  onClose,
  onAddElement
}) => {
  const { t } = useLanguage();
  
  const defaultPosition = { x: 750, y: 750 };
  
  const textElements = [
    { name: 'Titre', style: 'text-2xl font-bold' },
    { name: 'Sous-titre', style: 'text-xl' },
    { name: 'Paragraphe', style: 'text-base' },
    { name: 'Citation', style: 'text-lg italic' }
  ];
  
  const shapeElements = [
    { name: 'Rectangle', type: 'rectangle' },
    { name: 'Cercle', type: 'ellipse' },
    { name: 'Rectangle arrondi', type: 'roundedRect' }
  ];
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t('templates.editor.elements')}</SheetTitle>
        </SheetHeader>
        
        <div className="relative mt-4 mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input placeholder={t('common.search')} className="pl-10" />
        </div>
        
        <Tabs defaultValue="text">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="text" className="flex-1">{t('templates.editor.text')}</TabsTrigger>
            <TabsTrigger value="shapes" className="flex-1">{t('common.shapes')}</TabsTrigger>
            <TabsTrigger value="graphics" className="flex-1">{t('common.graphics')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="mt-0">
            <div className="grid grid-cols-2 gap-2">
              {textElements.map((element, index) => (
                <div 
                  key={index}
                  className="border rounded-md p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => onAddElement('text', defaultPosition)}
                >
                  <div className={element.style}>{element.name}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="shapes" className="mt-0">
            <div className="grid grid-cols-3 gap-4">
              {shapeElements.map((element, index) => (
                <div 
                  key={index}
                  className="aspect-square border rounded-md cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center"
                  onClick={() => onAddElement('shape', defaultPosition)}
                >
                  {element.type === 'rectangle' && (
                    <div className="w-16 h-16 bg-invitopia-500"></div>
                  )}
                  {element.type === 'ellipse' && (
                    <div className="w-16 h-16 bg-invitopia-500 rounded-full"></div>
                  )}
                  {element.type === 'roundedRect' && (
                    <div className="w-16 h-16 bg-invitopia-500 rounded-xl"></div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="graphics" className="mt-0">
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div 
                  key={index}
                  className="aspect-square border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => onAddElement('image', defaultPosition)}
                >
                  <img 
                    src={`https://picsum.photos/200/200?random=${index}`} 
                    alt="Sample graphic"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default ElementsLibrary;
