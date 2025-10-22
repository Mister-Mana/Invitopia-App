
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check } from 'lucide-react';

interface StyleTabProps {
  templateName: string;
  setTemplateName: (name: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
}

export const StyleTab: React.FC<StyleTabProps> = ({
  templateName,
  setTemplateName,
  selectedColor,
  setSelectedColor,
  fontSize,
  setFontSize
}) => {
  const { t } = useLanguage();
  const colors = ['#6E59A5', '#4ade80', '#f97316', '#f43f5e', '#3b82f6', '#ec4899'];
  const fonts = ['Inter', 'Poppins', 'Playfair Display', 'Montserrat', 'Roboto'];
  
  return (
    <div className="space-y-6">
      <div>
        <Label>Nom du Template</Label>
        <Input 
          value={templateName} 
          onChange={(e) => setTemplateName(e.target.value)}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label>{t('createEvent.customization.colorTheme')}</Label>
        <div className="grid grid-cols-6 gap-2 mt-2">
          {colors.map((color) => (
            <div 
              key={color}
              className="relative w-full aspect-square rounded-md cursor-pointer border-2 border-transparent hover:border-invitopia-700 transition-all"
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            >
              {selectedColor === color && (
                <Check className="absolute inset-0 m-auto text-white h-4 w-4" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <Label>Police</Label>
        <Select defaultValue="Inter">
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Choisir une police" />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((font) => (
              <SelectItem key={font} value={font}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <div className="flex justify-between">
          <Label>Taille de police</Label>
          <span className="text-invitopia-600 text-sm">{fontSize}px</span>
        </div>
        <Slider
          className="mt-2"
          value={[fontSize]}
          onValueChange={(value) => setFontSize(value[0])}
          min={12}
          max={24}
          step={1}
        />
      </div>
    </div>
  );
};
