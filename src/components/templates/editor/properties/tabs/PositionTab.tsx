
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { MoveUp, MoveDown } from 'lucide-react';

interface PositionTabProps {
  element: any;
  onUpdate: (properties: any) => void;
}

export const PositionTab: React.FC<PositionTabProps> = ({ element, onUpdate }) => {
  const { t } = useLanguage();
  
  const handleSizeChange = (width: number, height?: number) => {
    const newSize = {
      width,
      height: height !== undefined ? height : element.size.height
    };
    onUpdate({ size: newSize });
  };
  
  const handlePositionChange = (x: number, y?: number) => {
    const newPosition = {
      x,
      y: y !== undefined ? y : element.position.y
    };
    onUpdate({ position: newPosition });
  };
  
  const handleRotationChange = (value: number[]) => {
    onUpdate({ rotation: value[0] });
  };
  
  const handleZIndexChange = (direction: 'up' | 'down') => {
    const newZIndex = direction === 'up' ? element.zIndex + 1 : element.zIndex - 1;
    onUpdate({ zIndex: Math.max(0, newZIndex) });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm mb-1">{t('common.size')}</label>
        <div className="flex items-center space-x-2">
          <div className="flex-1 flex items-center">
            <span className="text-xs mr-2">W</span>
            <Input
              type="number"
              value={element.size.width}
              onChange={(e) => handleSizeChange(Number(e.target.value))}
              min={10}
            />
          </div>
          <div className="flex-1 flex items-center">
            <span className="text-xs mr-2">H</span>
            <Input
              type="number"
              value={element.size.height}
              onChange={(e) => handleSizeChange(element.size.width, Number(e.target.value))}
              min={10}
            />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm mb-1">{t('common.position')}</label>
        <div className="flex items-center space-x-2">
          <div className="flex-1 flex items-center">
            <span className="text-xs mr-2">X</span>
            <Input
              type="number"
              value={Math.round(element.position.x)}
              onChange={(e) => handlePositionChange(Number(e.target.value))}
            />
          </div>
          <div className="flex-1 flex items-center">
            <span className="text-xs mr-2">Y</span>
            <Input
              type="number"
              value={Math.round(element.position.y)}
              onChange={(e) => handlePositionChange(element.position.x, Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm mb-1">{t('common.rotation')}</label>
        <div className="flex items-center">
          <Slider
            className="mr-2 flex-1"
            value={[element.rotation]}
            min={0}
            max={360}
            step={1}
            onValueChange={handleRotationChange}
          />
          <span className="text-sm whitespace-nowrap">{element.rotation}°</span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm mb-1">{t('common.layer')}</label>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => handleZIndexChange('up')}
          >
            <MoveUp className="h-4 w-4 mr-1" />
            {t('common.forward')}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => handleZIndexChange('down')}
            disabled={element.zIndex <= 1}
          >
            <MoveDown className="h-4 w-4 mr-1" />
            {t('common.backward')}
          </Button>
        </div>
      </div>
    </div>
  );
};
