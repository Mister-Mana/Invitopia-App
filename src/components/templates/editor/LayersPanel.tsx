
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Type, Image as ImageIcon, Square, MoreVertical, Lock, Unlock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayersPanelProps {
  elements: any[];
  selectedElementId: string | null;
  onSelectElement: (id: string) => void;
  onClose: () => void;
}

const LayersPanel: React.FC<LayersPanelProps> = ({ 
  elements, 
  selectedElementId, 
  onSelectElement,
  onClose
}) => {
  const { t } = useLanguage();
  
  // Sort elements by z-index (highest first)
  const sortedElements = [...elements].sort((a, b) => b.zIndex - a.zIndex);
  
  const getElementIcon = (element: any) => {
    switch (element.type) {
      case 'text':
        return <Type className="h-4 w-4" />;
      case 'image':
        return <ImageIcon className="h-4 w-4" />;
      case 'shape':
        return <Square className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getElementName = (element: any) => {
    switch (element.type) {
      case 'text':
        return element.content?.substring(0, 15) || t('templates.editor.text');
      case 'image':
        return t('templates.editor.image');
      case 'shape':
        return element.shape === 'ellipse' ? t('common.circle') : t('common.rectangle');
      default:
        return t('common.element');
    }
  };
  
  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t('templates.editor.layers')}</SheetTitle>
        </SheetHeader>
        
        <div className="mt-4">
          <div className="space-y-1">
            {sortedElements.map((element) => (
              <div 
                key={element.id}
                className={cn(
                  "flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors",
                  selectedElementId === element.id && "bg-gray-100"
                )}
                onClick={() => onSelectElement(element.id)}
              >
                <div className="mr-2 text-gray-500">
                  {element.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4 opacity-0 group-hover:opacity-100" />}
                </div>
                <div className="mr-2 text-gray-500">
                  {getElementIcon(element)}
                </div>
                <div className="flex-1 truncate">
                  {getElementName(element)}
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    {element.visible !== false ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LayersPanel;
