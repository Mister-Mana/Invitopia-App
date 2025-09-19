
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Slider } from '@/components/ui/slider';

interface ShapeControlsProps {
  element: any;
  onUpdate: (properties: any) => void;
}

export const ShapeControls: React.FC<ShapeControlsProps> = ({ element, onUpdate }) => {
  const { t } = useLanguage();

  return (
    <>
      <div className="mb-4">
        <label className="block text-sm mb-1">{t('templates.editor.colors')}</label>
        <div className="grid grid-cols-6 gap-2">
          {['#000000', '#FFFFFF', '#6E59A5', '#F43F5E', '#3B82F6', '#10B981'].map((color) => (
            <div
              key={color}
              className={`aspect-square rounded-md cursor-pointer hover:opacity-80 transition-opacity ${color === '#FFFFFF' ? 'border border-gray-200' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => onUpdate({ backgroundColor: color })}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm mb-1">{t('templates.editor.borderRadius')}</label>
        <div className="flex items-center">
          <Slider
            className="mr-2 flex-1"
            value={[element.borderRadius || 0]}
            min={0}
            max={50}
            step={1}
            onValueChange={(value) => onUpdate({ borderRadius: value[0] })}
          />
          <span className="text-sm whitespace-nowrap">{element.borderRadius || 0}px</span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm mb-1">{t('templates.editor.borderWidth')}</label>
        <div className="flex items-center">
          <Slider
            className="mr-2 flex-1"
            value={[element.borderWidth || 0]}
            min={0}
            max={10}
            step={1}
            onValueChange={(value) => onUpdate({ borderWidth: value[0] })}
          />
          <span className="text-sm whitespace-nowrap">{element.borderWidth || 0}px</span>
        </div>
      </div>
      
      {element.borderWidth > 0 && (
        <div className="mb-4">
          <label className="block text-sm mb-1">{t('templates.editor.borderColor')}</label>
          <div className="grid grid-cols-6 gap-2">
            {['#000000', '#FFFFFF', '#6E59A5', '#F43F5E', '#3B82F6', '#10B981'].map((color) => (
              <div
                key={color}
                className={`aspect-square rounded-md cursor-pointer hover:opacity-80 transition-opacity ${color === '#FFFFFF' ? 'border border-gray-200' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => onUpdate({ borderColor: color })}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
