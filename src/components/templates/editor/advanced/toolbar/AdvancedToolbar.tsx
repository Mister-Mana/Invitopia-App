
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Save, 
  Download, 
  Undo, 
  Redo,
  ZoomIn,
  ZoomOut,
  Grid3X3,
  Magnet,
  Eye,
  MousePointer,
  Type,
  Square,
  Image,
  Shapes
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdvancedToolbarProps {
  templateName: string;
  activeTool: string;
  onToolChange: (tool: string) => void;
  onSave: () => void;
  onExport: () => void;
  onBack: () => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  snapToGrid: boolean;
  onToggleSnap: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

const AdvancedToolbar: React.FC<AdvancedToolbarProps> = ({
  templateName,
  activeTool,
  onToolChange,
  onSave,
  onExport,
  onBack,
  zoom,
  onZoomChange,
  showGrid,
  onToggleGrid,
  snapToGrid,
  onToggleSnap,
  canUndo,
  canRedo,
  onUndo,
  onRedo
}) => {
  const tools = [
    { id: 'select', icon: MousePointer, label: 'Sélection' },
    { id: 'text', icon: Type, label: 'Texte' },
    { id: 'shape', icon: Square, label: 'Formes' },
    { id: 'image', icon: Image, label: 'Image' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Left Section - Navigation & Save */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          
          <Separator orientation="vertical" className="h-6" />
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900">{templateName}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onSave}>
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
            
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Center Section - Tools */}
        <div className="flex items-center space-x-1">
          {/* Undo/Redo */}
          <div className="flex items-center space-x-1 mr-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onUndo}
              disabled={!canUndo}
              title="Annuler"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRedo}
              disabled={!canRedo}
              title="Refaire"
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6 mr-4" />

          {/* Main Tools */}
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={activeTool === tool.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onToolChange(tool.id)}
              title={tool.label}
              className={cn(
                "px-3 py-2",
                activeTool === tool.id && "bg-blue-100 text-blue-700 border-blue-200"
              )}
            >
              <tool.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>

        {/* Right Section - View Controls */}
        <div className="flex items-center space-x-2">
          {/* Zoom Controls */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onZoomChange(Math.max(0.1, zoom - 0.1))}
              title="Zoom arrière"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            
            <span className="text-sm font-mono min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onZoomChange(Math.min(5, zoom + 0.1))}
              title="Zoom avant"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Grid Controls */}
          <Button
            variant={showGrid ? "default" : "ghost"}
            size="sm"
            onClick={onToggleGrid}
            title="Afficher/Masquer la grille"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>

          <Button
            variant={snapToGrid ? "default" : "ghost"}
            size="sm"
            onClick={onToggleSnap}
            title="Aligner sur la grille"
          >
            <Magnet className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline" size="sm" title="Aperçu">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedToolbar;
