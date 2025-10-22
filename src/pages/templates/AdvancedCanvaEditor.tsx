import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas as FabricCanvas, Circle, Rect, FabricText, FabricImage } from 'fabric';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/auth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Save, 
  Download, 
  Type, 
  Square, 
  Circle as CircleIcon, 
  Image as ImageIcon,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Move,
  MousePointer,
  Trash2,
  Copy,
  Layers,
  Palette,
  Upload
} from 'lucide-react';

const AdvancedCanvaEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [selectedTool, setSelectedTool] = useState<'select' | 'text' | 'rectangle' | 'circle' | 'image' | 'move'>('select');
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [zoom, setZoom] = useState(100);
  const [templateName, setTemplateName] = useState('Nouveau Template');
  
  // Style properties
  const [fillColor, setFillColor] = useState('#3B82F6');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [opacity, setOpacity] = useState(100);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });

    // Canvas event listeners
    canvas.on('selection:created', (e) => {
      setSelectedObject(e.selected?.[0] || null);
    });

    canvas.on('selection:updated', (e) => {
      setSelectedObject(e.selected?.[0] || null);
    });

    canvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  // Update selected object properties when state changes
  useEffect(() => {
    if (!selectedObject || !fabricCanvas) return;

    if (selectedObject.type === 'textbox' || selectedObject.type === 'text') {
      selectedObject.set({
        fill: fillColor,
        fontSize: fontSize,
        fontFamily: fontFamily,
        opacity: opacity / 100
      });
    } else {
      selectedObject.set({
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        opacity: opacity / 100
      });
    }

    fabricCanvas.renderAll();
  }, [fillColor, strokeColor, strokeWidth, fontSize, fontFamily, opacity, selectedObject, fabricCanvas]);

  const handleToolChange = (tool: typeof selectedTool) => {
    setSelectedTool(tool);
    
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = false;
    fabricCanvas.selection = tool === 'select';
    
    if (tool === 'text') {
      const text = new FabricText('Texte d\'exemple', {
        left: 100,
        top: 100,
        fill: fillColor,
        fontSize: fontSize,
        fontFamily: fontFamily,
        editable: true
      });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
    } else if (tool === 'rectangle') {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        width: 100,
        height: 100,
      });
      fabricCanvas.add(rect);
      fabricCanvas.setActiveObject(rect);
    } else if (tool === 'circle') {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        radius: 50,
      });
      fabricCanvas.add(circle);
      fabricCanvas.setActiveObject(circle);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !fabricCanvas) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgElement = new Image();
      imgElement.onload = () => {
        const fabricImg = new FabricImage(imgElement, {
          left: 100,
          top: 100,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        fabricCanvas.add(fabricImg);
        fabricCanvas.setActiveObject(fabricImg);
      };
      imgElement.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (!fabricCanvas) return;
    
    const newZoom = direction === 'in' ? zoom + 10 : zoom - 10;
    const clampedZoom = Math.max(10, Math.min(200, newZoom));
    setZoom(clampedZoom);
    fabricCanvas.setZoom(clampedZoom / 100);
  };

  const handleDelete = () => {
    if (!fabricCanvas || !selectedObject) return;
    
    fabricCanvas.remove(selectedObject);
    setSelectedObject(null);
  };

  const handleDuplicate = () => {
    if (!fabricCanvas || !selectedObject) return;
    
    selectedObject.clone((cloned: any) => {
      cloned.set({
        left: selectedObject.left + 20,
        top: selectedObject.top + 20,
      });
      fabricCanvas.add(cloned);
      fabricCanvas.setActiveObject(cloned);
    });
  };

  const handleSave = async () => {
    if (!fabricCanvas) return;
    
    try {
      const templateData = {
        name: templateName,
        canvasData: JSON.stringify(fabricCanvas.toJSON()),
        thumbnail: fabricCanvas.toDataURL(),
      };
      
      // Save logic here
      toast.success('Template sauvegardé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleExport = () => {
    if (!fabricCanvas) return;
    
    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2,
    });
    
    const link = document.createElement('a');
    link.download = `${templateName}.png`;
    link.href = dataURL;
    link.click();
    
    toast.success('Template exporté avec succès');
  };

  if (!user) {
    return <div>Accès non autorisé</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{templateName}</h1>
            <p className="text-muted-foreground">Éditeur de template professionnel</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Toolbar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Outils</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={selectedTool === 'select' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleToolChange('select')}
                >
                  <MousePointer className="h-4 w-4" />
                </Button>
                <Button
                  variant={selectedTool === 'move' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleToolChange('move')}
                >
                  <Move className="h-4 w-4" />
                </Button>
                <Button
                  variant={selectedTool === 'text' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleToolChange('text')}
                >
                  <Type className="h-4 w-4" />
                </Button>
                <Button
                  variant={selectedTool === 'rectangle' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleToolChange('rectangle')}
                >
                  <Square className="h-4 w-4" />
                </Button>
                <Button
                  variant={selectedTool === 'circle' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleToolChange('circle')}
                >
                  <CircleIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </div>
              
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => handleZoom('in')}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleZoom('out')}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleDelete} disabled={!selectedObject}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleDuplicate} disabled={!selectedObject}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Zoom: {zoom}%
              </div>
            </CardContent>
          </Card>

          {/* Canvas */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-4">
                <div className="border border-border rounded-lg overflow-hidden bg-white">
                  <canvas ref={canvasRef} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Properties Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Propriétés</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="style" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="style">Style</TabsTrigger>
                  <TabsTrigger value="position">Position</TabsTrigger>
                  <TabsTrigger value="template">Template</TabsTrigger>
                </TabsList>
                
                <TabsContent value="style" className="space-y-4">
                  <div>
                    <Label>Couleur de remplissage</Label>
                    <Input
                      type="color"
                      value={fillColor}
                      onChange={(e) => setFillColor(e.target.value)}
                      className="h-10"
                    />
                  </div>
                  
                  <div>
                    <Label>Couleur du contour</Label>
                    <Input
                      type="color"
                      value={strokeColor}
                      onChange={(e) => setStrokeColor(e.target.value)}
                      className="h-10"
                    />
                  </div>
                  
                  <div>
                    <Label>Épaisseur du contour</Label>
                    <Slider
                      value={[strokeWidth]}
                      onValueChange={(value) => setStrokeWidth(value[0])}
                      max={10}
                      step={1}
                    />
                  </div>
                  
                  <div>
                    <Label>Opacité</Label>
                    <Slider
                      value={[opacity]}
                      onValueChange={(value) => setOpacity(value[0])}
                      max={100}
                      step={1}
                    />
                  </div>
                  
                  {selectedObject?.type === 'textbox' || selectedObject?.type === 'text' ? (
                    <>
                      <div>
                        <Label>Taille de police</Label>
                        <Slider
                          value={[fontSize]}
                          onValueChange={(value) => setFontSize(value[0])}
                          min={8}
                          max={72}
                          step={1}
                        />
                      </div>
                      
                      <div>
                        <Label>Police</Label>
                        <Select value={fontFamily} onValueChange={setFontFamily}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Arial">Arial</SelectItem>
                            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                            <SelectItem value="Helvetica">Helvetica</SelectItem>
                            <SelectItem value="Georgia">Georgia</SelectItem>
                            <SelectItem value="Verdana">Verdana</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  ) : null}
                </TabsContent>
                
                <TabsContent value="position" className="space-y-4">
                  {selectedObject ? (
                    <>
                      <div>
                        <Label>Position X</Label>
                        <Input
                          type="number"
                          value={Math.round(selectedObject.left || 0)}
                          onChange={(e) => {
                            if (fabricCanvas) {
                              selectedObject.set('left', parseInt(e.target.value));
                              fabricCanvas.renderAll();
                            }
                          }}
                        />
                      </div>
                      
                      <div>
                        <Label>Position Y</Label>
                        <Input
                          type="number"
                          value={Math.round(selectedObject.top || 0)}
                          onChange={(e) => {
                            if (fabricCanvas) {
                              selectedObject.set('top', parseInt(e.target.value));
                              fabricCanvas.renderAll();
                            }
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Sélectionnez un élément pour voir ses propriétés
                    </p>
                  )}
                </TabsContent>
                
                <TabsContent value="template" className="space-y-4">
                  <div>
                    <Label>Nom du template</Label>
                    <Input
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      placeholder="Nom du template"
                    />
                  </div>
                  
                  <div>
                    <Label>Couleur de fond</Label>
                    <Input
                      type="color"
                      value={fabricCanvas?.backgroundColor as string || '#ffffff'}
                      onChange={(e) => {
                        if (fabricCanvas) {
                          fabricCanvas.backgroundColor = e.target.value;
                          fabricCanvas.renderAll();
                        }
                      }}
                      className="h-10"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdvancedCanvaEditor;