import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import { useTemplateEditor } from '@/hooks/useTemplateEditor';
import { Button } from '@/components/ui/button';
import { Save, Download, Undo, Redo, ZoomIn, ZoomOut, Grid, Move, Type, Image, Square } from 'lucide-react';
import { toast } from 'sonner';
import AdvancedCanvasElement from '@/components/templates/editor/advanced/canvas/AdvancedCanvasElement';
import { Separator } from '@/components/ui/separator';

const AdvancedTemplateEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const editor = useTemplateEditor(id);
  const [activeTool, setActiveTool] = React.useState<'select' | 'text' | 'image' | 'shape'>('select');

  const handleSave = async () => {
    const result = await editor.saveTemplate();
    if (result) {
      toast.success('Template saved successfully');
    }
  };

  const handleExport = () => {
    if (!editor.state.template) return;
    
    const dataStr = JSON.stringify(editor.state.template, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${editor.state.template.name || 'template'}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Template exported');
  };

  const handleToolChange = (tool: typeof activeTool) => {
    setActiveTool(tool);
    editor.setMode(tool === 'select' ? 'select' : tool);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool === 'select') return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / editor.state.zoom;
    const y = (e.clientY - rect.top) / editor.state.zoom;
    
    switch (activeTool) {
      case 'text':
        editor.addTextElement({ x, y }, 'Double-click to edit');
        break;
      case 'image':
        editor.addImageElement({ x, y });
        break;
      case 'shape':
        editor.addShapeElement({ x, y });
        break;
    }
    
    setActiveTool('select');
    editor.setMode('select');
  };

  if (!editor.state.template) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">Loading template...</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20">
          {/* Top Toolbar */}
          <div className="border-b bg-card px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={activeTool === 'select' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleToolChange('select')}
              >
                <Move className="h-4 w-4 mr-2" />
                Select
              </Button>
              <Button
                variant={activeTool === 'text' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleToolChange('text')}
              >
                <Type className="h-4 w-4 mr-2" />
                Text
              </Button>
              <Button
                variant={activeTool === 'image' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleToolChange('image')}
              >
                <Image className="h-4 w-4 mr-2" />
                Image
              </Button>
              <Button
                variant={activeTool === 'shape' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleToolChange('shape')}
              >
                <Square className="h-4 w-4 mr-2" />
                Shape
              </Button>
            </div>

            <Separator orientation="vertical" className="h-8" />

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={editor.undo}
                disabled={editor.state.history.past.length === 0}
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={editor.redo}
                disabled={editor.state.history.future.length === 0}
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-8" />

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => editor.setZoom(editor.state.zoom - 0.1)}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[60px] text-center">
                {Math.round(editor.state.zoom * 100)}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => editor.setZoom(editor.state.zoom + 0.1)}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-8" />

            <Button
              variant="outline"
              size="sm"
              onClick={() => editor.toggleGrid()}
            >
              <Grid className="h-4 w-4 mr-2" />
              Grid
            </Button>

            <div className="flex-1" />

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex items-center justify-center p-8 min-h-[calc(100vh-200px)]">
            <div
              className="relative bg-white shadow-2xl rounded-lg overflow-hidden"
              style={{
                width: `${editor.state.template.layout.width * editor.state.zoom}px`,
                height: `${editor.state.template.layout.height * editor.state.zoom}px`,
                cursor: activeTool === 'select' ? 'default' : 'crosshair'
              }}
              onClick={handleCanvasClick}
            >
              {/* Background */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    editor.state.template.layout.background.type === 'color'
                      ? editor.state.template.layout.background.value
                      : editor.state.template.layout.background.type === 'image'
                      ? `url(${editor.state.template.layout.background.value})`
                      : `linear-gradient(${editor.state.template.layout.background.gradient?.angle || 0}deg, ${editor.state.template.layout.background.gradient?.colors.join(', ')})`
                }}
              />

              {/* Grid */}
              {editor.state.showGrid && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: `${editor.state.gridSize * editor.state.zoom}px ${editor.state.gridSize * editor.state.zoom}px`
                  }}
                />
              )}

              {/* Elements */}
              {editor.state.template.elements.map((element) => (
                <AdvancedCanvasElement
                  key={element.id}
                  element={element}
                  isSelected={editor.state.selectedElementId === element.id}
                  zoom={editor.state.zoom}
                  onSelect={() => editor.selectElement(element.id)}
                  onUpdate={(properties) => editor.updateElement(element.id, properties)}
                  onDuplicate={() => editor.duplicateElement(element.id)}
                  onDelete={() => editor.removeElement(element.id)}
                  snapToGrid={editor.state.snapToGrid}
                  gridSize={editor.state.gridSize}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default AdvancedTemplateEditor;
