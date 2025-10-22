
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface ImageControlsProps {
  element: any;
  onUpdate: (properties: any) => void;
}

export const ImageControls: React.FC<ImageControlsProps> = ({ element, onUpdate }) => {
  const { t } = useLanguage();

  return (
    <div className="mb-4">
      <img
        src={element.imageUrl}
        alt="Selected element"
        className="w-full h-auto rounded-md mb-2"
      />
      <Button variant="outline" className="w-full">
        {t('common.replace')}
      </Button>
    </div>
  );
};
