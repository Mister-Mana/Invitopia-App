
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  MousePointer,
  Type,
  Image as ImageIcon,
  Square,
  Circle,
  Triangle,
  Minus,
  Star,
  Heart,
  Hexagon,
  Upload,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Layers,
  RotateCcw,
  RotateCw,
  Group,
  Ungroup,
  BringToFront,
  SendToBack
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdvancedToolbarProps {
  activeTool: string;
  onToolChange: (tool: string) => void;
  onAddElement: (type: string, data?: any) => void;
  selectedElement?: any;
  onUpdateElement?: (properties: any) => void;
}

const AdvancedToolbar: React.FC<AdvancedToolbarProps> = ({
  activeTool,
  onToolChange,
  onAddElement,
  selectedElement,
  onUpdateElement
}) => {
  const { t } = useLanguage();
  const [showShapes, setShowShapes] = useState(false);
  const [showTextStyles, setShowTextStyles] = useState(false);

  const shapes = [
    { name: 'rectangle', icon: Square, label: 'Rectangle' },
    { name: 'ellipse', icon: Circle, label: 'Ellipse' },
    { name: 'triangle', icon: Triangle, label: 'Triangle' },
    { name: 'line', icon: Minus, label: 'Ligne' },
    { name: 'star', icon: Star, label: 'Étoile' },
    { name: 'heart', icon: Heart, label: 'Cœur' },
    { name: 'hexagon', icon: Hexagon, label: 'Hexagone' }
  ];

  const textAlignments = [
    { name: 'left', icon: AlignLeft },
    { name: 'center', icon: AlignCenter },
    { name: 'right', icon: AlignRight }
  ];

  return (
    <div className="bg-white border-b border-gray-200 p-2">
      <div className="flex items-center space-x-2 flex-wrap">
        {/* Selection Tool */}
        <Button
          variant={activeTool === 'select' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onToolChange('select')}
          className="flex-shrink-0"
        >
          <MousePointer className="w-4 h-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Text Tools */}
        <div className="relative">
          <Button
            variant={activeTool === 'text' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              onToolChange('text');
              setShowTextStyles(!showTextStyles);
            }}
            className="flex-shrink-0"
          >
            <Type className="w-4 h-4" />
          </Button>
          
          {showTextStyles && (
            <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-2 z-50 min-w-48">
              <div className="grid grid-cols-3 gap-1 mb-2">
                {textAlignments.map((align) => (
                  <Button
                    key={align.name}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (selectedElement && onUpdateElement) {
                        onUpdateElement({ textAlign: align.name });
                      }
                    }}
                    className={cn(
                      "w-full",
                      selectedElement?.textAlign === align.name && "bg-blue-100"
                    )}
                  >
                    <align.icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (selectedElement && onUpdateElement) {
                      onUpdateElement({ 
                        fontWeight: selectedElement.fontWeight === 'bold' ? 'normal' : 'bold' 
                      });
                    }
                  }}
                  className={cn(
                    selectedElement?.fontWeight === 'bold' && "bg-blue-100"
                  )}
                >
                  <Bold className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (selectedElement && onUpdateElement) {
                      onUpdateElement({ 
                        fontStyle: selectedElement.fontStyle === 'italic' ? 'normal' : 'italic' 
                      });
                    }
                  }}
                  className={cn(
                    selectedElement?.fontStyle === 'italic' && "bg-blue-100"
                  )}
                >
                  <Italic className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Image Tool */}
        <Button
          variant={activeTool === 'image' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onToolChange('image')}
          className="flex-shrink-0"
        >
          <ImageIcon className="w-4 h-4" />
        </Button>

        {/* Shapes Tool */}
        <div className="relative">
          <Button
            variant={activeTool === 'shape' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              onToolChange('shape');
              setShowShapes(!showShapes);
            }}
            className="flex-shrink-0"
          >
            <Square className="w-4 h-4" />
          </Button>
          
          {showShapes && (
            <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-2 z-50">
              <div className="grid grid-cols-4 gap-1 w-48">
                {shapes.map((shape) => (
                  <Button
                    key={shape.name}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onAddElement('shape', { shape: shape.name });
                      setShowShapes(false);
                    }}
                    className="w-full aspect-square"
                    title={shape.label}
                  >
                    <shape.icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Upload Tool */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  onAddElement('image', { imageUrl: e.target?.result });
                };
                reader.readAsDataURL(file);
              }
            };
            input.click();
          }}
          className="flex-shrink-0"
        >
          <Upload className="w-4 h-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Layer Controls */}
        {selectedElement && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (onUpdateElement) {
                  onUpdateElement({ zIndex: (selectedElement.zIndex || 1) + 1 });
                }
              }}
              title="Amener au premier plan"
            >
              <BringToFront className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (onUpdateElement) {
                  onUpdateElement({ zIndex: Math.max(0, (selectedElement.zIndex || 1) - 1) });
                }
              }}
              title="Envoyer à l'arrière-plan"
            >
              <SendToBack className="w-4 h-4" />
            </Button>
            
            <Separator orientation="vertical" className="h-6" />

            {/* Rotation Controls */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (onUpdateElement) {
                  onUpdateElement({ rotation: (selectedElement.rotation || 0) - 15 });
                }
              }}
              title="Rotation gauche"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (onUpdateElement) {
                  onUpdateElement({ rotation: (selectedElement.rotation || 0) + 15 });
                }
              }}
              title="Rotation droite"
            >
              <RotateCw className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdvancedToolbar;
