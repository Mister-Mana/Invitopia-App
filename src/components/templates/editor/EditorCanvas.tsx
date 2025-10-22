
import React, { useRef, useState } from 'react';
import { TemplateEditorHook } from '@/hooks/useTemplateEditor';
import { cn } from '@/lib/utils';

interface EditorCanvasProps {
  editor: TemplateEditorHook;
  canvasRef: React.RefObject<HTMLDivElement>;
  isPreviewMode: boolean;
}

const EditorCanvas: React.FC<EditorCanvasProps> = ({ 
  editor, 
  canvasRef,
  isPreviewMode
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const elementRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  // Handle element selection
  const handleElementClick = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    if (!isPreviewMode) {
      editor.selectElement(elementId);
    }
  };
  
  // Handle canvas click to deselect
  const handleCanvasClick = () => {
    if (!isPreviewMode) {
      editor.selectElement(null);
    }
  };
  
  // Handle element drag start
  const handleDragStart = (e: React.MouseEvent, elementId: string) => {
    if (isPreviewMode) return;
    
    e.stopPropagation();
    setIsDragging(true);
    setDragStartPos({
      x: e.clientX,
      y: e.clientY
    });
    
    // Add event listeners for drag and drop
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };
  
  // Handle element dragging
  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging || !editor.selectedElement) return;
    
    const dx = e.clientX - dragStartPos.x;
    const dy = e.clientY - dragStartPos.y;
    
    setDragStartPos({
      x: e.clientX,
      y: e.clientY
    });
    
    // Update element position
    editor.updateElement(editor.selectedElement.id, {
      position: {
        x: editor.selectedElement.position.x + dx / editor.state.zoom,
        y: editor.selectedElement.position.y + dy / editor.state.zoom
      }
    });
  };
  
  // Handle element drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    
    // Remove event listeners
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
  };
  
  // Handle element double click
  const handleElementDoubleClick = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    if (isPreviewMode) return;
    
    const element = editor.state.template?.elements.find(el => el.id === elementId);
    if (element && element.type === 'text') {
      // Trigger editing mode - in a real implementation, this would show a text input
      console.log('Double-clicked text element:', element.content);
      const newText = prompt('Edit text:', element.content);
      if (newText !== null) {
        editor.updateElement(elementId, { content: newText });
      }
    }
  };

  // Handle element duplication
  const handleElementDuplicate = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    if (isPreviewMode) return;
    
    editor.duplicateElement(elementId);
  };
  
  // Render different element types
  const renderElement = (element: any) => {
    const isSelected = editor.state.selectedElementId === element.id;
    
    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            ref={(el) => elementRef.current[element.id] = el}
            className={cn(
              "absolute cursor-move",
              isSelected && !isPreviewMode && "outline outline-2 outline-blue-500"
            )}
            style={{
              left: element.position.x - element.size.width / 2,
              top: element.position.y - element.size.height / 2,
              width: element.size.width,
              height: element.size.height,
              transform: `rotate(${element.rotation}deg)`,
              zIndex: element.zIndex,
              opacity: element.opacity
            }}
            onClick={(e) => handleElementClick(e, element.id)}
            onDoubleClick={(e) => handleElementDoubleClick(e, element.id)}
            onMouseDown={(e) => handleDragStart(e, element.id)}
          >
            <div
              style={{
                fontFamily: element.fontFamily,
                fontSize: `${element.fontSize}px`,
                fontWeight: element.fontWeight,
                fontStyle: element.fontStyle,
                textAlign: element.textAlign as any,
                color: element.color,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: element.textAlign === 'center' ? 'center' : 
                              element.textAlign === 'right' ? 'flex-end' : 'flex-start'
              }}
            >
              {element.content}
            </div>
            
            {/* Element controls when selected */}
            {isSelected && !isPreviewMode && (
              <div className="absolute -top-10 right-0 flex space-x-1 bg-white shadow-sm rounded-md p-1 border border-gray-200">
                <button 
                  className="p-1 hover:bg-gray-100 rounded-sm"
                  onClick={(e) => handleElementDuplicate(e, element.id)}
                  title="Duplicate"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="8" y="8" width="12" height="12" rx="2" />
                    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        );
        
      case 'image':
        return (
          <div
            key={element.id}
            ref={(el) => elementRef.current[element.id] = el}
            className={cn(
              "absolute cursor-move",
              isSelected && !isPreviewMode && "outline outline-2 outline-blue-500"
            )}
            style={{
              left: element.position.x - element.size.width / 2,
              top: element.position.y - element.size.height / 2,
              width: element.size.width,
              height: element.size.height,
              transform: `rotate(${element.rotation}deg)`,
              zIndex: element.zIndex,
              opacity: element.opacity
            }}
            onClick={(e) => handleElementClick(e, element.id)}
            onMouseDown={(e) => handleDragStart(e, element.id)}
          >
            <img
              src={element.imageUrl}
              alt="Template element"
              className="w-full h-full object-cover"
            />
            
            {/* Element controls when selected */}
            {isSelected && !isPreviewMode && (
              <div className="absolute -top-10 right-0 flex space-x-1 bg-white shadow-sm rounded-md p-1 border border-gray-200">
                <button 
                  className="p-1 hover:bg-gray-100 rounded-sm"
                  onClick={(e) => handleElementDuplicate(e, element.id)}
                  title="Duplicate"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="8" y="8" width="12" height="12" rx="2" />
                    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        );
        
      case 'shape':
        return (
          <div
            key={element.id}
            ref={(el) => elementRef.current[element.id] = el}
            className={cn(
              "absolute cursor-move",
              isSelected && !isPreviewMode && "outline outline-2 outline-blue-500"
            )}
            style={{
              left: element.position.x - element.size.width / 2,
              top: element.position.y - element.size.height / 2,
              width: element.size.width,
              height: element.size.height,
              backgroundColor: element.backgroundColor,
              borderRadius: element.shape === 'ellipse' ? '50%' : (element.borderRadius || 0),
              transform: `rotate(${element.rotation}deg)`,
              border: element.borderWidth ? `${element.borderWidth}px solid ${element.borderColor}` : 'none',
              zIndex: element.zIndex,
              opacity: element.opacity
            }}
            onClick={(e) => handleElementClick(e, element.id)}
            onMouseDown={(e) => handleDragStart(e, element.id)}
          >
            {/* Element controls when selected */}
            {isSelected && !isPreviewMode && (
              <div className="absolute -top-10 right-0 flex space-x-1 bg-white shadow-sm rounded-md p-1 border border-gray-200">
                <button 
                  className="p-1 hover:bg-gray-100 rounded-sm"
                  onClick={(e) => handleElementDuplicate(e, element.id)}
                  title="Duplicate"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="8" y="8" width="12" height="12" rx="2" />
                    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  if (!editor.state.template) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Chargement du template...</p>
      </div>
    );
  }
  
  const { width, height, background } = editor.state.template.layout;
  
  // Calculate canvas background
  const canvasBackground = background.type === 'color' 
    ? background.value 
    : background.type === 'gradient' && background.gradient 
      ? `${background.gradient.type}-gradient(${background.gradient.type === 'linear' ? `${background.gradient.angle}deg` : ''}, ${background.gradient.colors.map((color, index) => `${color} ${background.gradient!.stops[index]}%`).join(', ')})`
      : 'white';
  
  return (
    <div 
      className="relative mx-auto bg-white shadow-lg"
      style={{
        width: width * editor.state.zoom,
        height: height * editor.state.zoom,
        background: canvasBackground,
        transform: `scale(${editor.state.zoom})`,
        transformOrigin: 'center center'
      }}
      onClick={handleCanvasClick}
    >
      {/* Render all elements */}
      {editor.state.template.elements.map(renderElement)}
      
      {/* Render grid for better visual reference (disabled in preview mode) */}
      {!isPreviewMode && editor.state.showGrid && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="w-full h-full" 
            style={{
              backgroundSize: `${editor.state.gridSize}px ${editor.state.gridSize}px`,
              backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
              opacity: 0.6
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EditorCanvas;
