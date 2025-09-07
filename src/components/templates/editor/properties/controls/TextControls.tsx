
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic } from 'lucide-react';

interface TextControlsProps {
  element: any;
  onUpdate: (properties: any) => void;
}

export const TextControls: React.FC<TextControlsProps> = ({ element, onUpdate }) => {
  const { t } = useLanguage();
  
  const handleTextAlign = (align: 'left' | 'center' | 'right') => {
    onUpdate({ textAlign: align });
  };
  
  const handleFontWeight = (weight: 'normal' | 'bold') => {
    onUpdate({ fontWeight: weight });
  };
  
  const handleFontStyle = (style: 'normal' | 'italic') => {
    onUpdate({ fontStyle: style });
  };
  
  const handleTextContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ content: e.target.value });
  };

  return (
    <>
      <div className="mb-4">
        <label className="block text-sm mb-1">{t('common.content')}</label>
        <Input
          value={element.content}
          onChange={handleTextContent}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm mb-1">{t('templates.editor.fonts')}</label>
        <Select
          value={element.fontFamily}
          onValueChange={(value) => onUpdate({ fontFamily: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('templates.editor.fonts')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Inter">Inter</SelectItem>
            <SelectItem value="Montserrat">Montserrat</SelectItem>
            <SelectItem value="Playfair Display">Playfair Display</SelectItem>
            <SelectItem value="Roboto">Roboto</SelectItem>
            <SelectItem value="Poppins">Poppins</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm mb-1">{t('templates.editor.fontSize')}</label>
        <div className="flex items-center">
          <Slider
            className="mr-2 flex-1"
            value={[element.fontSize || 16]}
            min={8}
            max={72}
            step={1}
            onValueChange={(value) => onUpdate({ fontSize: value[0] })}
          />
          <span className="text-sm whitespace-nowrap">{element.fontSize || 16}px</span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm mb-1">{t('templates.editor.textAlign')}</label>
        <div className="flex space-x-1">
          <Button
            variant={element.textAlign === 'left' ? 'default' : 'outline'}
            size="sm"
            className="flex-1"
            onClick={() => handleTextAlign('left')}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant={element.textAlign === 'center' ? 'default' : 'outline'}
            size="sm"
            className="flex-1"
            onClick={() => handleTextAlign('center')}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant={element.textAlign === 'right' ? 'default' : 'outline'}
            size="sm"
            className="flex-1"
            onClick={() => handleTextAlign('right')}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm mb-1">{t('templates.editor.style')}</label>
        <div className="flex space-x-1">
          <Button
            variant={element.fontWeight === 'bold' ? 'default' : 'outline'}
            size="sm"
            className="flex-1"
            onClick={() => handleFontWeight(element.fontWeight === 'bold' ? 'normal' : 'bold')}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant={element.fontStyle === 'italic' ? 'default' : 'outline'}
            size="sm"
            className="flex-1"
            onClick={() => handleFontStyle(element.fontStyle === 'italic' ? 'normal' : 'italic')}
          >
            <Italic className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm mb-1">{t('templates.editor.colors')}</label>
        <div className="grid grid-cols-6 gap-2">
          {['#000000', '#FFFFFF', '#6E59A5', '#F43F5E', '#3B82F6', '#10B981'].map((color) => (
            <div
              key={color}
              className={`aspect-square rounded-md cursor-pointer hover:opacity-80 transition-opacity ${color === '#FFFFFF' ? 'border border-gray-200' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => onUpdate({ color })}
            />
          ))}
        </div>
      </div>
    </>
  );
};
