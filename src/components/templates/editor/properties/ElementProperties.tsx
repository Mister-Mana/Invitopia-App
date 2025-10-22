import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Bold, 
  Italic, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Copy,
  Trash2,
  X
} from 'lucide-react';

interface ElementPropertiesProps {
  element: any;
  onUpdate: (properties: any) => void;
  onDelete: () => void;
  onClose: () => void;
}

const ElementProperties: React.FC<ElementPropertiesProps> = ({
  element,
  onUpdate,
  onDelete,
  onClose
}) => {
  if (!element) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex items-center justify-center h-full">
        <p className="text-gray-500">Sélectionnez un élément pour voir ses propriétés</p>
      </div>
    );
  }

  const fontFamilies = [
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Helvetica, sans-serif', label: 'Helvetica' },
    { value: 'Times New Roman, serif', label: 'Times New Roman' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Verdana, sans-serif', label: 'Verdana' },
    { value: 'Courier New, monospace', label: 'Courier New' }
  ];

  const textAlignments = [
    { value: 'left', icon: AlignLeft },
    { value: 'center', icon: AlignCenter },
    { value: 'right', icon: AlignRight }
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Propriétés</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Actions */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={onDelete} className="flex-1">
            <Trash2 className="w-4 h-4 mr-2" />
            Supprimer
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <Tabs defaultValue="style" className="h-full">
          <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="position">Position</TabsTrigger>
          </TabsList>

          <div className="px-4 pb-4">
            <TabsContent value="style" className="space-y-4 mt-4">
              {/* Text Properties */}
              {element.type === 'text' && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Texte</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="content">Contenu</Label>
                      <Input
                        id="content"
                        value={element.content || ''}
                        onChange={(e) => onUpdate({ content: e.target.value })}
                        placeholder="Votre texte ici"
                      />
                    </div>

                    <div>
                      <Label htmlFor="fontFamily">Police</Label>
                      <Select 
                        value={element.fontFamily || 'Arial, sans-serif'} 
                        onValueChange={(value) => onUpdate({ fontFamily: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontFamilies.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="fontSize">Taille: {element.fontSize || 16}px</Label>
                      <Slider
                        value={[element.fontSize || 16]}
                        onValueChange={([value]) => onUpdate({ fontSize: value })}
                        min={8}
                        max={72}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Style</Label>
                      <div className="flex space-x-1 mt-2">
                        <Button
                          variant={element.fontWeight === 'bold' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => onUpdate({ 
                            fontWeight: element.fontWeight === 'bold' ? 'normal' : 'bold' 
                          })}
                        >
                          <Bold className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={element.fontStyle === 'italic' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => onUpdate({ 
                            fontStyle: element.fontStyle === 'italic' ? 'normal' : 'italic' 
                          })}
                        >
                          <Italic className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>Alignement</Label>
                      <div className="flex space-x-1 mt-2">
                        {textAlignments.map((align) => (
                          <Button
                            key={align.value}
                            variant={element.textAlign === align.value ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => onUpdate({ textAlign: align.value })}
                          >
                            <align.icon className="w-4 h-4" />
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="color">Couleur</Label>
                      <div className="flex space-x-2 mt-2">
                        <Input
                          type="color"
                          value={element.color || '#000000'}
                          onChange={(e) => onUpdate({ color: e.target.value })}
                          className="w-12 h-8 p-1 rounded"
                        />
                        <Input
                          value={element.color || '#000000'}
                          onChange={(e) => onUpdate({ color: e.target.value })}
                          placeholder="#000000"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Shape Properties */}
              {element.type === 'shape' && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Forme</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="backgroundColor">Couleur de fond</Label>
                      <div className="flex space-x-2 mt-2">
                        <Input
                          type="color"
                          value={element.backgroundColor || '#000000'}
                          onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
                          className="w-12 h-8 p-1 rounded"
                        />
                        <Input
                          value={element.backgroundColor || '#000000'}
                          onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
                          placeholder="#000000"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="borderWidth">Épaisseur du contour: {element.borderWidth || 0}px</Label>
                      <Slider
                        value={[element.borderWidth || 0]}
                        onValueChange={([value]) => onUpdate({ borderWidth: value })}
                        min={0}
                        max={20}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    {(element.borderWidth || 0) > 0 && (
                      <div>
                        <Label htmlFor="borderColor">Couleur du contour</Label>
                        <div className="flex space-x-2 mt-2">
                          <Input
                            type="color"
                            value={element.borderColor || '#000000'}
                            onChange={(e) => onUpdate({ borderColor: e.target.value })}
                            className="w-12 h-8 p-1 rounded"
                          />
                          <Input
                            value={element.borderColor || '#000000'}
                            onChange={(e) => onUpdate({ borderColor: e.target.value })}
                            placeholder="#000000"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    )}

                    {element.shape === 'rectangle' && (
                      <div>
                        <Label htmlFor="borderRadius">Arrondissement: {element.borderRadius || 0}px</Label>
                        <Slider
                          value={[element.borderRadius || 0]}
                          onValueChange={([value]) => onUpdate({ borderRadius: value })}
                          min={0}
                          max={50}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Common Properties */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Apparence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="opacity">Opacité: {Math.round((element.opacity || 1) * 100)}%</Label>
                    <Slider
                      value={[(element.opacity || 1) * 100]}
                      onValueChange={([value]) => onUpdate({ opacity: value / 100 })}
                      min={0}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="rotation">Rotation: {element.rotation || 0}°</Label>
                    <Slider
                      value={[element.rotation || 0]}
                      onValueChange={([value]) => onUpdate({ rotation: value })}
                      min={-180}
                      max={180}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="position" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Position et Taille</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="x">X</Label>
                      <Input
                        id="x"
                        type="number"
                        value={Math.round(element.position?.x || 0)}
                        onChange={(e) => onUpdate({ 
                          position: { 
                            ...element.position, 
                            x: parseInt(e.target.value) || 0 
                          } 
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="y">Y</Label>
                      <Input
                        id="y"
                        type="number"
                        value={Math.round(element.position?.y || 0)}
                        onChange={(e) => onUpdate({ 
                          position: { 
                            ...element.position, 
                            y: parseInt(e.target.value) || 0 
                          } 
                        })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="width">Largeur</Label>
                      <Input
                        id="width"
                        type="number"
                        value={Math.round(element.size?.width || 100)}
                        onChange={(e) => onUpdate({ 
                          size: { 
                            ...element.size, 
                            width: parseInt(e.target.value) || 100 
                          } 
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Hauteur</Label>
                      <Input
                        id="height"
                        type="number"
                        value={Math.round(element.size?.height || 100)}
                        onChange={(e) => onUpdate({ 
                          size: { 
                            ...element.size, 
                            height: parseInt(e.target.value) || 100 
                          } 
                        })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="zIndex">Ordre: {element.zIndex || 0}</Label>
                    <Slider
                      value={[element.zIndex || 0]}
                      onValueChange={([value]) => onUpdate({ zIndex: value })}
                      min={0}
                      max={10}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ElementProperties;