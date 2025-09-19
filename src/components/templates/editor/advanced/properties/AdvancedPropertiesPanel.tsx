
import React from 'react';
import { TemplateEditorHook } from '@/hooks/useTemplateEditor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { X, Palette, Type, Move, RotateCw } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface AdvancedPropertiesPanelProps {
  editor: TemplateEditorHook;
  onClose: () => void;
}

const AdvancedPropertiesPanel: React.FC<AdvancedPropertiesPanelProps> = ({
  editor,
  onClose
}) => {
  const selectedElement = editor.selectedElement;

  const handlePropertyChange = (property: string, value: any) => {
    if (selectedElement) {
      editor.updateElement(selectedElement.id, { [property]: value });
    }
  };

  const fontFamilies = [
    'Inter', 'Roboto', 'Open Sans', 'Montserrat', 'Playfair Display', 
    'Dancing Script', 'Oswald', 'Source Sans Pro', 'Lato', 'Nunito',
    'Orbitron', 'JetBrains Mono'
  ];

  const fontWeights = [
    { value: 'normal', label: 'Normal' },
    { value: '500', label: 'Medium' },
    { value: 'bold', label: 'Gras' },
    { value: '900', label: 'Extra Gras' }
  ];

  const textAlignments = [
    { value: 'left', label: 'Gauche' },
    { value: 'center', label: 'Centre' },
    { value: 'right', label: 'Droite' }
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Propriétés</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {selectedElement ? (
            <>
              {/* Element Info */}
              <div>
                <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Élément sélectionné
                </Label>
                <p className="text-sm font-medium text-gray-900 mt-1 capitalize">
                  {selectedElement.type}
                </p>
              </div>

              {/* Position & Size */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Move className="h-4 w-4 text-gray-500" />
                  <Label className="text-sm font-medium">Position & Taille</Label>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="x" className="text-xs">X</Label>
                    <Input
                      id="x"
                      type="number"
                      value={Math.round(selectedElement.position.x)}
                      onChange={(e) => handlePropertyChange('position', {
                        ...selectedElement.position,
                        x: parseInt(e.target.value) || 0
                      })}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="y" className="text-xs">Y</Label>
                    <Input
                      id="y"
                      type="number"
                      value={Math.round(selectedElement.position.y)}
                      onChange={(e) => handlePropertyChange('position', {
                        ...selectedElement.position,
                        y: parseInt(e.target.value) || 0
                      })}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="width" className="text-xs">Largeur</Label>
                    <Input
                      id="width"
                      type="number"
                      value={Math.round(selectedElement.size.width)}
                      onChange={(e) => handlePropertyChange('size', {
                        ...selectedElement.size,
                        width: parseInt(e.target.value) || 0
                      })}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height" className="text-xs">Hauteur</Label>
                    <Input
                      id="height"
                      type="number"
                      value={Math.round(selectedElement.size.height)}
                      onChange={(e) => handlePropertyChange('size', {
                        ...selectedElement.size,
                        height: parseInt(e.target.value) || 0
                      })}
                      className="h-8"
                    />
                  </div>
                </div>
              </div>

              {/* Rotation & Opacity */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RotateCw className="h-4 w-4 text-gray-500" />
                  <Label className="text-sm font-medium">Rotation & Opacité</Label>
                </div>
                
                <div>
                  <Label htmlFor="rotation" className="text-xs">
                    Rotation: {selectedElement.rotation || 0}°
                  </Label>
                  <Slider
                    id="rotation"
                    value={[selectedElement.rotation || 0]}
                    onValueChange={(value) => handlePropertyChange('rotation', value[0])}
                    min={-180}
                    max={180}
                    step={1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="opacity" className="text-xs">
                    Opacité: {Math.round((selectedElement.opacity || 1) * 100)}%
                  </Label>
                  <Slider
                    id="opacity"
                    value={[(selectedElement.opacity || 1) * 100]}
                    onValueChange={(value) => handlePropertyChange('opacity', value[0] / 100)}
                    min={0}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Text Properties */}
              {selectedElement.type === 'text' && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Type className="h-4 w-4 text-gray-500" />
                    <Label className="text-sm font-medium">Texte</Label>
                  </div>
                  
                  <div>
                    <Label htmlFor="content" className="text-xs">Contenu</Label>
                    <Input
                      id="content"
                      value={selectedElement.content || ''}
                      onChange={(e) => handlePropertyChange('content', e.target.value)}
                      className="h-8"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="fontFamily" className="text-xs">Police</Label>
                    <Select
                      value={selectedElement.fontFamily || 'Inter'}
                      onValueChange={(value) => handlePropertyChange('fontFamily', value)}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontFamilies.map((font) => (
                          <SelectItem key={font} value={font}>
                            <span style={{ fontFamily: font }}>{font}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="fontSize" className="text-xs">Taille</Label>
                      <Input
                        id="fontSize"
                        type="number"
                        value={selectedElement.fontSize || 16}
                        onChange={(e) => handlePropertyChange('fontSize', parseInt(e.target.value) || 16)}
                        className="h-8"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fontWeight" className="text-xs">Poids</Label>
                      <Select
                        value={selectedElement.fontWeight || 'normal'}
                        onValueChange={(value) => handlePropertyChange('fontWeight', value)}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontWeights.map((weight) => (
                            <SelectItem key={weight.value} value={weight.value}>
                              {weight.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="textAlign" className="text-xs">Alignement</Label>
                    <Select
                      value={selectedElement.textAlign || 'left'}
                      onValueChange={(value) => handlePropertyChange('textAlign', value)}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {textAlignments.map((align) => (
                          <SelectItem key={align.value} value={align.value}>
                            {align.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="color" className="text-xs">Couleur</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <input
                        type="color"
                        value={selectedElement.color || '#000000'}
                        onChange={(e) => handlePropertyChange('color', e.target.value)}
                        className="w-8 h-8 rounded border border-gray-300"
                      />
                      <Input
                        value={selectedElement.color || '#000000'}
                        onChange={(e) => handlePropertyChange('color', e.target.value)}
                        className="h-8 flex-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Shape Properties */}
              {selectedElement.type === 'shape' && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Palette className="h-4 w-4 text-gray-500" />
                    <Label className="text-sm font-medium">Apparence</Label>
                  </div>
                  
                  <div>
                    <Label htmlFor="backgroundColor" className="text-xs">Couleur de fond</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <input
                        type="color"
                        value={selectedElement.backgroundColor || '#3B82F6'}
                        onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
                        className="w-8 h-8 rounded border border-gray-300"
                      />
                      <Input
                        value={selectedElement.backgroundColor || '#3B82F6'}
                        onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
                        className="h-8 flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="borderRadius" className="text-xs">
                      Rayon de bordure: {selectedElement.borderRadius || 0}px
                    </Label>
                    <Slider
                      id="borderRadius"
                      value={[selectedElement.borderRadius || 0]}
                      onValueChange={(value) => handlePropertyChange('borderRadius', value[0])}
                      min={0}
                      max={50}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="borderWidth" className="text-xs">
                      Épaisseur de bordure: {selectedElement.borderWidth || 0}px
                    </Label>
                    <Slider
                      id="borderWidth"
                      value={[selectedElement.borderWidth || 0]}
                      onValueChange={(value) => handlePropertyChange('borderWidth', value[0])}
                      min={0}
                      max={10}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  
                  {(selectedElement.borderWidth || 0) > 0 && (
                    <div>
                      <Label htmlFor="borderColor" className="text-xs">Couleur de bordure</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input
                          type="color"
                          value={selectedElement.borderColor || '#000000'}
                          onChange={(e) => handlePropertyChange('borderColor', e.target.value)}
                          className="w-8 h-8 rounded border border-gray-300"
                        />
                        <Input
                          value={selectedElement.borderColor || '#000000'}
                          onChange={(e) => handlePropertyChange('borderColor', e.target.value)}
                          className="h-8 flex-1"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Image Properties */}
              {selectedElement.type === 'image' && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Palette className="h-4 w-4 text-gray-500" />
                    <Label className="text-sm font-medium">Image</Label>
                  </div>
                  
                  <div>
                    <Label htmlFor="imageUrl" className="text-xs">URL de l'image</Label>
                    <Input
                      id="imageUrl"
                      value={selectedElement.imageUrl || ''}
                      onChange={(e) => handlePropertyChange('imageUrl', e.target.value)}
                      className="h-8"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs">Changer l'image</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-1"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              handlePropertyChange('imageUrl', e.target?.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        };
                        input.click();
                      }}
                    >
                      Sélectionner une image
                    </Button>
                  </div>
                </div>
              )}

              {/* Layer Controls */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Ordre des calques</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePropertyChange('zIndex', (selectedElement.zIndex || 0) + 1)}
                  >
                    Avant-plan
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePropertyChange('zIndex', Math.max(0, (selectedElement.zIndex || 0) - 1))}
                  >
                    Arrière-plan
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500">
                Sélectionnez un élément pour modifier ses propriétés
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AdvancedPropertiesPanel;
