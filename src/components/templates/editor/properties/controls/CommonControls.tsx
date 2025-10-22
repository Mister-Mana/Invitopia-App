
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Slider } from '@/components/ui/slider';

interface CommonControlsProps {
  element: any;
  onUpdate: (properties: any) => void;
}

export const CommonControls: React.FC<CommonControlsProps> = ({ element, onUpdate }) => {
  const { t } = useLanguage();
  
  const handleOpacityChange = (value: number[]) => {
    onUpdate({ opacity: value[0] / 100 });
  };

  return (
    <div className="mb-4">
      <label className="block text-sm mb-1">{t('templates.editor.opacity')}</label>
      <div className="flex items-center">
        <Slider
          className="mr-2 flex-1"
          value={[element.opacity * 100]}
          min={0}
          max={100}
          step={1}
          onValueChange={handleOpacityChange}
        />
        <span className="text-sm whitespace-nowrap">{Math.round(element.opacity * 100)}%</span>
      </div>
    </div>
  );
};
