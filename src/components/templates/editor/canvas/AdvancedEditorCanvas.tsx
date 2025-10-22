
import React, { useRef, useState, useCallback } from 'react';
import { TemplateEditorHook } from '@/hooks/useTemplateEditor';
import { cn } from '@/lib/utils';
import CanvasElement from './CanvasElement';
import { generateUniqueId } from '@/lib/services/templateEditor/utils';

interface AdvancedEditorCanvasProps {
  editor: TemplateEditorHook;
  canvasRef: React.RefObject<HTMLDivElement>;
  isPreviewMode: boolean;
  onElementAdd?: (type: string, data?: any) => void;
}

const AdvancedEditorCanvas: React.FC<AdvancedEditorCanvasProps> = ({
  editor,
  canvasRef,
  isPreviewMode,
  onElementAdd
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectionBox, setSelectionBox] = useState<{
    start: { x: number; y: number };
    current: { x: number; y: number };
  } | null>(null);

  // Handle canvas click
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (isPreviewMode) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / editor.state.zoom;
    const y = (e.clientY - rect.top) / editor.state.zoom;

    // Add element based on current tool
    switch (editor.state.mode) {
      case 'text':
        const textId = generateUniqueId();
        editor.addTextElement({ x, y }, 'Nouveau texte');
        break;
      
      case 'shape':
        const shapeId = generateUniqueId();
        editor.addShapeElement({ x, y }, 'rectangle');
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
              const imageId = generateUniqueId();
              editor.addImageElement({ x, y }, e.target?.result as string);
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
        break;
      
      default:
        // Deselect current element
        editor.selectElement(null);
        break;
    }
  }, [editor, isPreviewMode, canvasRef]);

  // Handle element selection
  const handleElementSelect = useCallback((elementId: string) => {
    editor.selectElement(elementId);
  }, [editor]);

  // Handle element update
  const handleElementUpdate = useCallback((elementId: string, properties: any) => {
    editor.updateElement(elementId, properties);
  }, [editor]);

  // Handle element duplication
  const handleElementDuplicate = useCallback((elementId: string) => {
    editor.duplicateElement(elementId);
  }, [editor]);

  // Handle element deletion
  const handleElementDelete = useCallback((elementId: string) => {
    editor.removeElement(elementId);
  }, [editor]);

  if (!editor.state.template) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
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
    <div 
      className="flex-1 overflow-auto flex items-center justify-center p-8 bg-gray-100"
      ref={canvasRef}
    >
      <div
        className={cn(
          "relative mx-auto bg-white shadow-2xl border border-gray-300",
          !isPreviewMode && "hover:shadow-3xl transition-shadow duration-200"
        )}
        style={{
          width: width * editor.state.zoom,
          height: height * editor.state.zoom,
          background: canvasBackground,
          minWidth: width * editor.state.zoom,
          minHeight: height * editor.state.zoom
        }}
        onClick={handleCanvasClick}
      >
        {/* Grid overlay */}
        {!isPreviewMode && editor.state.showGrid && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundSize: `${editor.state.gridSize * editor.state.zoom}px ${editor.state.gridSize * editor.state.zoom}px`,
              backgroundImage: `
                linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
              `,
              opacity: 0.5
            }}
          />
        )}

        {/* Render all elements */}
        {editor.state.template.elements
          .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
          .map((element) => (
            <CanvasElement
              key={element.id}
              element={element}
              isSelected={editor.state.selectedElementId === element.id}
              zoom={editor.state.zoom}
              onSelect={() => handleElementSelect(element.id)}
              onUpdate={(properties) => handleElementUpdate(element.id, properties)}
              onDuplicate={() => handleElementDuplicate(element.id)}
              onDelete={() => handleElementDelete(element.id)}
              isPreviewMode={isPreviewMode}
            />
          ))}

        {/* Ruler guides (optionnel) */}
        {!isPreviewMode && (
          <>
            {/* Horizontal ruler */}
            <div className="absolute -top-6 left-0 right-0 h-6 bg-gray-50 border-b border-gray-200 flex items-end text-xs text-gray-500">
              {Array.from({ length: Math.ceil(width / 50) }, (_, i) => (
                <div
                  key={i}
                  className="absolute transform -translate-x-1/2"
                  style={{ left: `${(i * 50 / width) * 100}%` }}
                >
                  {i * 50}
                </div>
              ))}
            </div>
            
            {/* Vertical ruler */}
            <div className="absolute -left-6 top-0 bottom-0 w-6 bg-gray-50 border-r border-gray-200 flex flex-col justify-end text-xs text-gray-500">
              {Array.from({ length: Math.ceil(height / 50) }, (_, i) => (
                <div
                  key={i}
                  className="absolute transform -translate-y-1/2 -rotate-90 origin-center"
                  style={{ top: `${(i * 50 / height) * 100}%` }}
                >
                  {i * 50}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Center guides (optionnel) */}
        {!isPreviewMode && editor.state.selectedElementId && (
          <>
            <div 
              className="absolute border-dashed border-blue-300 border-t-2 pointer-events-none"
              style={{ 
                top: '50%', 
                left: 0, 
                right: 0,
                opacity: 0.5
              }}
            />
            <div 
              className="absolute border-dashed border-blue-300 border-l-2 pointer-events-none"
              style={{ 
                left: '50%', 
                top: 0, 
                bottom: 0,
                opacity: 0.5
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AdvancedEditorCanvas;
