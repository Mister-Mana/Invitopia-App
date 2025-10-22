
import React, { useState, useRef, useEffect } from 'react';
import { ElementProperties } from '@/lib/templates/template-types';
import { cn } from '@/lib/utils';
import { RotateCcw, Copy, Trash2, Move, Square } from 'lucide-react';

interface CanvasElementProps {
  element: ElementProperties;
  isSelected: boolean;
  zoom: number;
  onSelect: () => void;
  onUpdate: (properties: Partial<ElementProperties>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  isPreviewMode?: boolean;
}

const CanvasElement: React.FC<CanvasElementProps> = ({
  element,
  isSelected,
  zoom,
  onSelect,
  onUpdate,
  onDuplicate,
  onDelete,
  isPreviewMode = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementStart, setElementStart] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  // Handle element drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    onSelect();
    
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setElementStart({ x: element.position.x, y: element.position.y });
  };

  // Handle resize
  const handleResizeStart = (e: React.MouseEvent, corner: string) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    setIsResizing(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = (e.clientX - dragStart.x) / zoom;
        const dy = (e.clientY - dragStart.y) / zoom;
        
        onUpdate({
          position: {
            x: elementStart.x + dx,
            y: elementStart.y + dy
          }
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, elementStart, zoom, onUpdate]);

  // Render element content based on type
  const renderElementContent = () => {
    switch (element.type) {
      case 'text':
        return (
          <div
            className="w-full h-full flex items-center justify-center cursor-text"
            style={{
              fontFamily: element.fontFamily || 'Inter',
              fontSize: `${element.fontSize || 16}px`,
              fontWeight: element.fontWeight || 'normal',
              fontStyle: element.fontStyle || 'normal',
              textAlign: element.textAlign || 'left',
              color: element.color || '#000000',
              lineHeight: 1.2
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              if (!isPreviewMode) {
                const newText = prompt('Modifier le texte:', element.content);
                if (newText !== null) {
                  onUpdate({ content: newText });
                }
              }
            }}
          >
            {element.content || 'Texte'}
          </div>
        );

      case 'image':
        return (
          <img
            src={element.imageUrl}
            alt="Element"
            className="w-full h-full object-cover"
            draggable={false}
          />
        );

      case 'shape':
        return (
          <div
            className="w-full h-full"
            style={{
              backgroundColor: element.backgroundColor || '#3B82F6',
              borderRadius: element.shape === 'ellipse' ? '50%' : (element.borderRadius || 0),
              border: element.borderWidth ? `${element.borderWidth}px solid ${element.borderColor}` : 'none'
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        "absolute select-none",
        !isPreviewMode && "hover:outline hover:outline-1 hover:outline-blue-300",
        isSelected && !isPreviewMode && "outline outline-2 outline-blue-500",
        isDragging && "cursor-grabbing"
      )}
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
        transform: `rotate(${element.rotation || 0}deg)`,
        zIndex: element.zIndex,
        opacity: element.opacity || 1,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      {renderElementContent()}

      {/* Selection handles */}
      {isSelected && !isPreviewMode && (
        <>
          {/* Resize handles */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 border border-white cursor-nw-resize"
               onMouseDown={(e) => handleResizeStart(e, 'nw')} />
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 border border-white cursor-n-resize"
               onMouseDown={(e) => handleResizeStart(e, 'n')} />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 border border-white cursor-ne-resize"
               onMouseDown={(e) => handleResizeStart(e, 'ne')} />
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-blue-500 border border-white cursor-e-resize"
               onMouseDown={(e) => handleResizeStart(e, 'e')} />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 border border-white cursor-se-resize"
               onMouseDown={(e) => handleResizeStart(e, 'se')} />
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 border border-white cursor-s-resize"
               onMouseDown={(e) => handleResizeStart(e, 's')} />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 border border-white cursor-sw-resize"
               onMouseDown={(e) => handleResizeStart(e, 'sw')} />
          <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-blue-500 border border-white cursor-w-resize"
               onMouseDown={(e) => handleResizeStart(e, 'w')} />

          {/* Action buttons */}
          <div className="absolute -top-10 right-0 flex space-x-1 bg-white shadow-lg rounded-md p-1 border">
            <button
              className="p-1 hover:bg-gray-100 rounded-sm"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
              title="Dupliquer"
            >
              <Copy className="w-3 h-3" />
            </button>
            <button
              className="p-1 hover:bg-gray-100 rounded-sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              title="Supprimer"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CanvasElement;
