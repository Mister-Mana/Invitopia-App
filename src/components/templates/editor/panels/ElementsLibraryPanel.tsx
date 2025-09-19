import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Type, 
  Image as ImageIcon, 
  Square, 
  Circle, 
  Triangle, 
  Star, 
  Heart, 
  Palette,
  Search,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ElementsLibraryPanelProps {
  onAddElement: (type: string, data?: any) => void;
  onClose: () => void;
}

const ElementsLibraryPanel: React.FC<ElementsLibraryPanelProps> = ({
  onAddElement,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const textElements = [
    { 
      name: 'Titre', 
      type: 'text', 
      data: { 
        content: 'Titre', 
        fontSize: 32, 
        fontWeight: 'bold',
        color: '#000000'
      } 
    },
    { 
      name: 'Sous-titre', 
      type: 'text', 
      data: { 
        content: 'Sous-titre', 
        fontSize: 24, 
        fontWeight: 'medium',
        color: '#333333'
      } 
    },
    { 
      name: 'Texte', 
      type: 'text', 
      data: { 
        content: 'Votre texte ici', 
        fontSize: 16,
        color: '#666666'
      } 
    },
    { 
      name: 'Citation', 
      type: 'text', 
      data: { 
        content: '"Citation inspirante"', 
        fontSize: 18, 
        fontStyle: 'italic',
        color: '#444444'
      } 
    }
  ];

  const shapes = [
    { 
      name: 'Rectangle', 
      icon: Square, 
      type: 'shape', 
      data: { 
        shape: 'rectangle', 
        backgroundColor: '#3B82F6'
      } 
    },
    { 
      name: 'Cercle', 
      icon: Circle, 
      type: 'shape', 
      data: { 
        shape: 'ellipse', 
        backgroundColor: '#EF4444'
      } 
    },
    { 
      name: 'Triangle', 
      icon: Triangle, 
      type: 'shape', 
      data: { 
        shape: 'triangle', 
        backgroundColor: '#10B981'
      } 
    },
    { 
      name: 'Étoile', 
      icon: Star, 
      type: 'shape', 
      data: { 
        shape: 'star', 
        backgroundColor: '#F59E0B'
      } 
    },
    { 
      name: 'Cœur', 
      icon: Heart, 
      type: 'shape', 
      data: { 
        shape: 'heart', 
        backgroundColor: '#EC4899'
      } 
    }
  ];

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
    '#FFC0CB', '#A52A2A', '#808080', '#000080', '#008000',
    '#FF6347', '#4B0082', '#DA70D6', '#32CD32', '#FF1493'
  ];

  const images = [
    { name: 'Upload Image', type: 'upload' },
    { name: 'Placeholder', url: '/placeholder.svg' }
  ];

  const filteredElements = (elements: any[]) => {
    return elements.filter(element => 
      element.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          onAddElement('image', { 
            imageUrl: e.target?.result as string,
            position: { x: 200, y: 200 },
            size: { width: 150, height: 150 }
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Bibliothèque d'éléments</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher des éléments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="text" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mx-4 mt-4">
            <TabsTrigger value="text">
              <Type className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="shapes">
              <Square className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="images">
              <ImageIcon className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="colors">
              <Palette className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 px-4">
            <TabsContent value="text" className="space-y-2 mt-4">
              {filteredElements(textElements).map((element, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => onAddElement(element.type, element.data)}
                >
                  <div className="text-left">
                    <div className="font-medium">{element.name}</div>
                    <div 
                      className="text-sm text-gray-500 mt-1"
                      style={{
                        fontSize: Math.min(element.data.fontSize / 2, 14),
                        fontWeight: element.data.fontWeight,
                        fontStyle: element.data.fontStyle
                      }}
                    >
                      {element.data.content}
                    </div>
                  </div>
                </Button>
              ))}
            </TabsContent>

            <TabsContent value="shapes" className="space-y-2 mt-4">
              {filteredElements(shapes).map((shape, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-12"
                  onClick={() => onAddElement(shape.type, shape.data)}
                >
                  <shape.icon 
                    className="w-6 h-6 mr-3" 
                    style={{ color: shape.data.backgroundColor }}
                  />
                  {shape.name}
                </Button>
              ))}
            </TabsContent>

            <TabsContent value="images" className="space-y-2 mt-4">
              <Button
                variant="outline"
                className="w-full justify-start h-12"
                onClick={handleImageUpload}
              >
                <ImageIcon className="w-6 h-6 mr-3" />
                Télécharger une image
              </Button>
              
              {images.filter(img => img.type !== 'upload').map((image, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-12"
                  onClick={() => onAddElement('image', { 
                    imageUrl: image.url,
                    position: { x: 200, y: 200 },
                    size: { width: 150, height: 150 }
                  })}
                >
                  <ImageIcon className="w-6 h-6 mr-3" />
                  {image.name}
                </Button>
              ))}
            </TabsContent>

            <TabsContent value="colors" className="mt-4">
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-12 h-12 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors",
                      color === '#FFFFFF' && "border-gray-400"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => onAddElement('shape', { 
                      shape: 'rectangle',
                      backgroundColor: color,
                      position: { x: 200, y: 200 },
                      size: { width: 100, height: 100 }
                    })}
                    title={`Couleur ${color}`}
                  />
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
};

export default ElementsLibraryPanel;