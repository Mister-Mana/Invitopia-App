
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MousePointer, 
  Type, 
  Square, 
  Circle, 
  Triangle,
  Star,
  Heart,
  Image,
  Palette,
  Layers,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdvancedSidebarProps {
  activeTool: string;
  onToolChange: (tool: string) => void;
  showElementLibrary: boolean;
  onToggleElementLibrary: () => void;
  onAddElement: (type: string, data?: any) => void;
}

const AdvancedSidebar: React.FC<AdvancedSidebarProps> = ({
  activeTool,
  onToolChange,
  showElementLibrary,
  onToggleElementLibrary,
  onAddElement
}) => {
  const mainTools = [
    { id: 'select', icon: MousePointer, label: 'Sélection', shortcut: 'V' },
    { id: 'text', icon: Type, label: 'Texte', shortcut: 'T' },
    { id: 'shape', icon: Square, label: 'Formes', shortcut: 'R' },
    { id: 'image', icon: Image, label: 'Image', shortcut: 'I' }
  ];

  const textPresets = [
    { content: 'Titre Principal', fontSize: 32, fontWeight: 'bold' },
    { content: 'Sous-titre', fontSize: 24, fontWeight: '600' },
    { content: 'Corps de texte', fontSize: 16, fontWeight: 'normal' },
    { content: 'Note', fontSize: 12, fontWeight: 'normal' }
  ];

  const shapePresets = [
    { shape: 'rectangle', icon: Square, label: 'Rectangle' },
    { shape: 'ellipse', icon: Circle, label: 'Cercle' },
    { shape: 'triangle', icon: Triangle, label: 'Triangle' },
    { shape: 'star', icon: Star, label: 'Étoile' },
    { shape: 'heart', icon: Heart, label: 'Cœur' }
  ];

  const colorPalette = [
    { color: '#ef4444', name: 'Rouge' },
    { color: '#f97316', name: 'Orange' },
    { color: '#eab308', name: 'Jaune' },
    { color: '#22c55e', name: 'Vert' },
    { color: '#3b82f6', name: 'Bleu' },
    { color: '#8b5cf6', name: 'Violet' },
    { color: '#ec4899', name: 'Rose' },
    { color: '#64748b', name: 'Gris' }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Main Tools */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Outils</h3>
        <div className="space-y-1">
          {mainTools.map((tool) => (
            <Button
              key={tool.id}
              variant={activeTool === tool.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onToolChange(tool.id)}
              className={cn(
                "w-full justify-start px-3 py-2",
                activeTool === tool.id && "bg-blue-100 text-blue-700 border-blue-200"
              )}
            >
              <tool.icon className="h-4 w-4 mr-2" />
              <span className="flex-1 text-left">{tool.label}</span>
              <kbd className="ml-auto text-xs bg-gray-100 px-1 rounded">
                {tool.shortcut}
              </kbd>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Element Library */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Éléments</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleElementLibrary}
              className="h-6 w-6 p-0"
            >
              <Layers className="h-3 w-3" />
            </Button>
          </div>

          {showElementLibrary && (
            <div className="space-y-6">
              {/* Text Presets */}
              <div>
                <h4 className="text-xs font-medium text-gray-600 mb-2">Textes</h4>
                <div className="grid grid-cols-1 gap-1">
                  {textPresets.map((preset, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => onAddElement('text', preset)}
                      className="justify-start text-left h-auto p-2"
                    >
                      <div>
                        <div 
                          className="text-gray-900"
                          style={{ 
                            fontSize: `${Math.min(preset.fontSize / 2, 14)}px`,
                            fontWeight: preset.fontWeight 
                          }}
                        >
                          {preset.content}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Shape Presets */}
              <div>
                <h4 className="text-xs font-medium text-gray-600 mb-2">Formes</h4>
                <div className="grid grid-cols-2 gap-1">
                  {shapePresets.map((preset) => (
                    <Button
                      key={preset.shape}
                      variant="ghost"
                      size="sm"
                      onClick={() => onAddElement('shape', { shape: preset.shape })}
                      className="flex flex-col items-center p-2 h-auto"
                    >
                      <preset.icon className="h-6 w-6 mb-1" />
                      <span className="text-xs">{preset.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Palette */}
              <div>
                <h4 className="text-xs font-medium text-gray-600 mb-2">Couleurs</h4>
                <div className="grid grid-cols-4 gap-1">
                  {colorPalette.map((color) => (
                    <button
                      key={color.color}
                      className="w-8 h-8 rounded border border-gray-200 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color.color }}
                      onClick={() => onAddElement('shape', { 
                        shape: 'rectangle', 
                        backgroundColor: color.color 
                      })}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h4 className="text-xs font-medium text-gray-600 mb-2">Actions rapides</h4>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onAddElement('image')}
                    className="w-full justify-start"
                  >
                    <Image className="h-4 w-4 mr-2" />
                    Ajouter une image
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onAddElement('text', { content: 'Nouveau texte' })}
                    className="w-full justify-start"
                  >
                    <Type className="h-4 w-4 mr-2" />
                    Ajouter du texte
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AdvancedSidebar;
