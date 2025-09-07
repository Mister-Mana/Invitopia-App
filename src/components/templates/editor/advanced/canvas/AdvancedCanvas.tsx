
import React, { useState, useCallback } from 'react';
import { TemplateEditorHook } from '@/hooks/useTemplateEditor';
import { cn } from '@/lib/utils';
import AdvancedCanvasElement from './AdvancedCanvasElement';
import { generateUniqueId } from '@/lib/services/templateEditor/utils';

interface AdvancedCanvasProps {
  editor: TemplateEditorHook;
  canvasRef: React.RefObject<HTMLDivElement>;
  isPreviewMode: boolean;
  activeTool: string;
}

const AdvancedCanvas: React.FC<AdvancedCanvasProps> = ({
  editor,
  canvasRef,
  isPreviewMode,
  activeTool
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Handle canvas interactions
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (isPreviewMode) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / editor.state.zoom;
    const y = (e.clientY - rect.top) / editor.state.zoom;

    // Add elements based on active tool
    switch (activeTool) {
      case 'text':
        const textId = editor.addTextElement({ x, y }, 'Cliquez pour modifier');
        editor.selectElement(textId);
        break;
      
      case 'shape':
        const shapeId = editor.addShapeElement({ x, y }, 'rectangle');
        editor.selectElement(shapeId);
        break;
      
      case 'image':
        // Open file dialog
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const imageId = editor.addImageElement({ x, y }, e.target?.result as string);
              editor.selectElement(imageId);
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
        break;
      
      default:
        // Deselect on canvas click
        editor.selectElement(null);
        break;
    }
  }, [editor, isPreviewMode, activeTool, canvasRef]);

  if (!editor.state.template) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement du template...</p>
        </div>
      </div>
    );
  }

  const { width, height, background } = editor.state.template.layout;

  // Calculate canvas background
  let canvasBackground = 'white';
  if (background.type === 'color') {
    canvasBackground = background.value;
  } else if (background.type === 'gradient' && background.gradient) {
    const { type, colors, stops, angle } = background.gradient;
    const colorStops = colors.map((color, index) => `${color} ${stops[index]}%`).join(', ');
    canvasBackground = type === 'linear' 
      ? `linear-gradient(${angle}deg, ${colorStops})`
      : `radial-gradient(circle, ${colorStops})`;
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-100 p-8" ref={canvasRef}>
      {/* Canvas Rulers */}
      {!isPreviewMode && (
        <>
          {/* Horizontal Ruler */}
          <div className="absolute top-8 left-8 right-8 h-6 bg-white border-b border-gray-200 flex items-end text-xs text-gray-500">
            {Array.from({ length: Math.ceil((width * editor.state.zoom) / 50) }, (_, i) => (
              <div
                key={i}
                className="absolute transform -translate-x-1/2"
                style={{ left: `${(i * 50)}px` }}
              >
                <div className="w-px h-2 bg-gray-300 mb-1"></div>
                <span className="block text-center">{i * 50}</span>
              </div>
            ))}
          </div>

          {/* Vertical Ruler */}
          <div className="absolute top-8 left-8 bottom-8 w-6 bg-white border-r border-gray-200 flex flex-col justify-end text-xs text-gray-500">
            {Array.from({ length: Math.ceil((height * editor.state.zoom) / 50) }, (_, i) => (
              <div
                key={i}
                className="absolute transform -translate-y-1/2"
                style={{ top: `${(i * 50)}px` }}
              >
                <div className="h-px w-2 bg-gray-300 mr-1 inline-block"></div>
                <span className="transform -rotate-90 origin-center block text-center">{i * 50}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Main Canvas */}
      <div
        className={cn(
          "relative mx-auto bg-white shadow-2xl border border-gray-300 cursor-crosshair",
          !isPreviewMode && "hover:shadow-3xl transition-shadow duration-200",
          activeTool !== 'select' && "cursor-crosshair"
        )}
        style={{
          width: width * editor.state.zoom,
          height: height * editor.state.zoom,
          background: canvasBackground,
          marginLeft: isPreviewMode ? 'auto' : '32px',
          marginTop: isPreviewMode ? 'auto' : '32px'
        }}
        onClick={handleCanvasClick}
      >
        {/* Grid Overlay */}
        {!isPreviewMode && editor.state.showGrid && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundSize: `${editor.state.gridSize * editor.state.zoom}px ${editor.state.gridSize * editor.state.zoom}px`,
              backgroundImage: `
                linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
              `,
              opacity: 0.3
            }}
          />
        )}

        {/* Canvas Elements */}
        {editor.state.template.elements
          .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
          .map((element) => (
            <AdvancedCanvasElement
              key={element.id}
              element={element}
              isSelected={editor.state.selectedElementId === element.id}
              zoom={editor.state.zoom}
              onSelect={() => editor.selectElement(element.id)}
              onUpdate={(properties) => editor.updateElement(element.id, properties)}
              onDuplicate={() => editor.duplicateElement(element.id)}
              onDelete={() => editor.removeElement(element.id)}
              isPreviewMode={isPreviewMode}
              snapToGrid={editor.state.snapToGrid}
              gridSize={editor.state.gridSize}
            />
          ))}

        {/* Selection Box (for multi-select) */}
        {isDragging && (
          <div
            className="absolute border-2 border-blue-500 bg-blue-100 bg-opacity-20 pointer-events-none"
            style={{
              left: Math.min(dragStart.x, dragStart.x + 100),
              top: Math.min(dragStart.y, dragStart.y + 100),
              width: Math.abs(100),
              height: Math.abs(100)
            }}
          />
        )}

        {/* Center Guidelines */}
        {!isPreviewMode && editor.state.selectedElementId && (
          <>
            <div 
              className="absolute border-dashed border-blue-300 border-t-2 pointer-events-none"
              style={{ 
                top: '50%', 
                left: 0, 
                right: 0,
                opacity: 0.4
              }}
            />
            <div 
              className="absolute border-dashed border-blue-300 border-l-2 pointer-events-none"
              style={{ 
                left: '50%', 
                top: 0, 
                bottom: 0,
                opacity: 0.4
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AdvancedCanvas;
