
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Copy, Lock, Unlock, Trash2 } from 'lucide-react';

interface ElementHeaderProps {
  element: any;
  onDuplicate: () => void;
  onLockToggle: () => void;
  onDelete: () => void;
}

export const ElementHeader: React.FC<ElementHeaderProps> = ({
  element,
  onDuplicate,
  onLockToggle,
  onDelete
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-medium">
        {element.type === 'text' ? t('templates.editor.text') : 
         element.type === 'image' ? t('templates.editor.images') : 
         element.type === 'shape' ? t('common.shape') : 
         t('common.element')}
      </h3>
      <div className="flex space-x-1">
        <Button variant="ghost" size="icon" onClick={onDuplicate}>
          <Copy className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onLockToggle}>
          {element.locked ? 
            <Lock className="h-4 w-4" /> : 
            <Unlock className="h-4 w-4" />
          }
        </Button>
        <Button variant="ghost" size="icon" className="text-red-500" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
