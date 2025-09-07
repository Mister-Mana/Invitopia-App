
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface ColorPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  isOpen, 
  onClose,
  onSelectColor
}) => {
  const { t } = useLanguage();
  const [color, setColor] = useState('#6E59A5');
  const [recentColors, setRecentColors] = useState<string[]>([
    '#6E59A5', '#F43F5E', '#3B82F6', '#10B981', '#F59E0B', '#000000', '#FFFFFF'
  ]);
  
  const basicColors = [
    '#000000', '#FFFFFF', '#F43F5E', '#F97316', '#F59E0B', '#10B981', 
    '#3B82F6', '#6E59A5', '#8B5CF6', '#EC4899', '#D946EF', '#7E69AB'
  ];
  
  const handleColorSelect = (selectedColor: string) => {
    setColor(selectedColor);
    
    // Add to recent colors if not already present
    if (!recentColors.includes(selectedColor)) {
      setRecentColors([selectedColor, ...recentColors.slice(0, 9)]);
    }
  };
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };
  
  const handleApply = () => {
    onSelectColor(color);
    onClose();
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t('templates.editor.colors')}</SheetTitle>
        </SheetHeader>
        
        <div className="mt-4 space-y-4">
          <div 
            className="h-20 rounded-md"
            style={{ backgroundColor: color }}
          />
          
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Input 
                type="text" 
                value={color} 
                onChange={handleColorChange}
              />
            </div>
            <input 
              type="color" 
              value={color} 
              onChange={handleColorChange}
              className="h-9 w-9 rounded-md border cursor-pointer"
            />
          </div>
          
          <Tabs defaultValue="basic">
            <TabsList className="w-full mb-4 grid grid-cols-3">
              <TabsTrigger value="basic">{t('common.basic')}</TabsTrigger>
              <TabsTrigger value="recent">{t('common.recent')}</TabsTrigger>
              <TabsTrigger value="gradient">{t('common.gradient')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="mt-0">
              <div className="grid grid-cols-6 gap-2">
                {basicColors.map((colorHex) => (
                  <div 
                    key={colorHex}
                    className={`aspect-square rounded-md cursor-pointer hover:scale-105 transition-transform ${colorHex === '#FFFFFF' ? 'border border-gray-200' : ''}`}
                    style={{ backgroundColor: colorHex }}
                    onClick={() => handleColorSelect(colorHex)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="mt-0">
              <div className="grid grid-cols-6 gap-2">
                {recentColors.map((colorHex) => (
                  <div 
                    key={colorHex}
                    className={`aspect-square rounded-md cursor-pointer hover:scale-105 transition-transform ${colorHex === '#FFFFFF' ? 'border border-gray-200' : ''}`}
                    style={{ backgroundColor: colorHex }}
                    onClick={() => handleColorSelect(colorHex)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="gradient" className="mt-0">
              <div className="grid grid-cols-2 gap-2">
                <div 
                  className="aspect-[2/1] rounded-md cursor-pointer hover:scale-105 transition-transform"
                  style={{ background: 'linear-gradient(45deg, #F43F5E, #EC4899)' }}
                  onClick={() => handleColorSelect('#F43F5E')}
                />
                <div 
                  className="aspect-[2/1] rounded-md cursor-pointer hover:scale-105 transition-transform"
                  style={{ background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)' }}
                  onClick={() => handleColorSelect('#3B82F6')}
                />
                <div 
                  className="aspect-[2/1] rounded-md cursor-pointer hover:scale-105 transition-transform"
                  style={{ background: 'linear-gradient(45deg, #10B981, #3B82F6)' }}
                  onClick={() => handleColorSelect('#10B981')}
                />
                <div 
                  className="aspect-[2/1] rounded-md cursor-pointer hover:scale-105 transition-transform"
                  style={{ background: 'linear-gradient(45deg, #F59E0B, #F43F5E)' }}
                  onClick={() => handleColorSelect('#F59E0B')}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <Button className="w-full" onClick={handleApply}>
            {t('common.apply')}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ColorPicker;
