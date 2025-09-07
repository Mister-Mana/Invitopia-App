
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ElementProperties } from '@/lib/templates/template-types';
import { cn } from '@/lib/utils';
import { Copy, Trash2, RotateCw, Eye, EyeOff } from 'lucide-react';

interface AdvancedCanvasElementProps {
  element: ElementProperties;
  isSelected: boolean;
  zoom: number;
  onSelect: () => void;
  onUpdate: (properties: Partial<ElementProperties>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  isPreviewMode?: boolean;
  snapToGrid?: boolean;
  gridSize?: number;
}

const AdvancedCanvasElement: React.FC<AdvancedCanvasElementProps> = ({
  element,
  isSelected,
  zoom,
  onSelect,
  onUpdate,
  onDuplicate,
  onDelete,
  isPreviewMode = false,
  snapToGrid = false,
  gridSize = 20
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementStart, setElementStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [resizeHandle, setResizeHandle] = useState<string>('');
  const elementRef = useRef<HTMLDivElement>(null);

  // Handle element drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    onSelect();
    
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setElementStart({ 
      x: element.position.x, 
      y: element.position.y,
      width: element.size.width,
      height: element.size.height
    });
  }, [isPreviewMode, onSelect, element]);

  // Handle resize start
  const handleResizeStart = useCallback((e: React.MouseEvent, handle: string) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    
    setIsResizing(true);
    setResizeHandle(handle);
    setDragStart({ x: e.clientX, y: e.clientY });
    setElementStart({ 
      x: element.position.x, 
      y: element.position.y,
      width: element.size.width,
      height: element.size.height
    });
  }, [isPreviewMode, element]);

  // Mouse move and up handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = (e.clientX - dragStart.x) / zoom;
        const dy = (e.clientY - dragStart.y) / zoom;
        
        let newX = elementStart.x + dx;
        let newY = elementStart.y + dy;
        
        // Apply grid snapping
        if (snapToGrid) {
          newX = Math.round(newX / gridSize) * gridSize;
          newY = Math.round(newY / gridSize) * gridSize;
        }
        
        onUpdate({
          position: { x: newX, y: newY }
        });
      } else if (isResizing) {
        const dx = (e.clientX - dragStart.x) / zoom;
        const dy = (e.clientY - dragStart.y) / zoom;
        
        let newWidth = elementStart.width;
        let newHeight = elementStart.height;
        let newX = elementStart.x;
        let newY = elementStart.y;
        
        // Handle different resize directions
        switch (resizeHandle) {
          case 'nw':
            newWidth = elementStart.width - dx;
            newHeight = elementStart.height - dy;
            newX = elementStart.x + dx;
            newY = elementStart.y + dy;
            break;
          case 'ne':
            newWidth = elementStart.width + dx;
            newHeight = elementStart.height - dy;
            newY = elementStart.y + dy;
            break;
          case 'sw':
            newWidth = elementStart.width - dx;
            newHeight = elementStart.height + dy;
            newX = elementStart.x + dx;
            break;
          case 'se':
            newWidth = elementStart.width + dx;
            newHeight = elementStart.height + dy;
            break;
          case 'n':
            newHeight = elementStart.height - dy;
            newY = elementStart.y + dy;
            break;
          case 's':
            newHeight = elementStart.height + dy;
            break;
          case 'w':
            newWidth = elementStart.width - dx;
            newX = elementStart.x + dx;
            break;
          case 'e':
            newWidth = elementStart.width + dx;
            break;
        }
        
        // Minimum size constraints
        newWidth = Math.max(20, newWidth);
        newHeight = Math.max(20, newHeight);
        
        onUpdate({
          position: { x: newX, y: newY },
          size: { width: newWidth, height: newHeight }
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeHandle('');
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, elementStart, zoom, snapToGrid, gridSize, onUpdate, resizeHandle]);

  // Double click to edit text
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPreviewMode || element.type !== 'text') return;
    
    const newText = prompt('Modifier le texte:', element.content);
    if (newText !== null) {
      onUpdate({ content: newText });
    }
  }, [isPreviewMode, element, onUpdate]);

  // Render element content
  const renderElementContent = () => {
    switch (element.type) {
      case 'text':
        return (
          <div
            className="w-full h-full flex items-center justify-center cursor-text overflow-hidden"
            style={{
              fontFamily: element.fontFamily || 'Inter',
              fontSize: `${(element.fontSize || 16) * zoom}px`,
              fontWeight: element.fontWeight || 'normal',
              fontStyle: element.fontStyle || 'normal',
              textAlign: element.textAlign || 'left',
              color: element.color || '#000000',
              lineHeight: 1.2,
              padding: `${4 * zoom}px`
            }}
            onDoubleClick={handleDoubleClick}
          >
            <span className="select-none">
              {element.content || 'Texte'}
            </span>
          </div>
        );

      case 'image':
        return (
          <img
            src={element.imageUrl}
            alt="Element"
            className="w-full h-full object-cover select-none"
            draggable={false}
            style={{ borderRadius: (element.borderRadius || 0) * zoom }}
          />
        );

      case 'shape':
        return (
          <div
            className="w-full h-full select-none"
            style={{
              backgroundColor: element.backgroundColor || '#3B82F6',
              borderRadius: element.shape === 'ellipse' ? '50%' : (element.borderRadius || 0) * zoom,
              border: element.borderWidth ? `${element.borderWidth * zoom}px solid ${element.borderColor}` : 'none',
              clipPath: element.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 
                       element.shape === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' :
                       element.shape === 'heart' ? 'path("M12,21.35L10.55,20.03C5.4,15.36 2.25,12.28 2.25,8.5C2.25,5.42 4.67,3 7.75,3C9.35,3 10.87,3.85 12,5.1C13.13,3.85 14.65,3 16.25,3C19.33,3 21.75,5.42 21.75,8.5C21.75,12.28 18.6,15.36 13.45,20.03L12,21.35Z")' :
                       'none'
            }}
          />
        );

      default:
        return null;
    }
  };

  const resizeHandles = [
    { position: 'nw', cursor: 'nw-resize', style: { top: -4, left: -4 } },
    { position: 'n', cursor: 'n-resize', style: { top: -4, left: '50%', transform: 'translateX(-50%)' } },
    { position: 'ne', cursor: 'ne-resize', style: { top: -4, right: -4 } },
    { position: 'e', cursor: 'e-resize', style: { top: '50%', right: -4, transform: 'translateY(-50%)' } },
    { position: 'se', cursor: 'se-resize', style: { bottom: -4, right: -4 } },
    { position: 's', cursor: 's-resize', style: { bottom: -4, left: '50%', transform: 'translateX(-50%)' } },
    { position: 'sw', cursor: 'sw-resize', style: { bottom: -4, left: -4 } },
    { position: 'w', cursor: 'w-resize', style: { top: '50%', left: -4, transform: 'translateY(-50%)' } }
  ];

  return (
    <div
      ref={elementRef}
      className={cn(
        "absolute select-none group",
        !isPreviewMode && "hover:outline hover:outline-1 hover:outline-blue-300",
        isSelected && !isPreviewMode && "outline outline-2 outline-blue-500",
        isDragging && "cursor-grabbing",
        !isDragging && !isPreviewMode && "cursor-grab"
      )}
      style={{
        left: element.position.x * zoom,
        top: element.position.y * zoom,
        width: element.size.width * zoom,
        height: element.size.height * zoom,
        transform: `rotate(${element.rotation || 0}deg)`,
        zIndex: element.zIndex,
        opacity: element.opacity || 1
      }}
      onMouseDown={handleMouseDown}
    >
      {renderElementContent()}

      {/* Selection handles and controls */}
      {isSelected && !isPreviewMode && (
        <>
          {/* Resize handles */}
          {resizeHandles.map((handle) => (
            <div
              key={handle.position}
              className="absolute w-2 h-2 bg-blue-500 border border-white cursor-pointer hover:bg-blue-600 transition-colors"
              style={{
                cursor: handle.cursor,
                ...handle.style
              }}
              onMouseDown={(e) => handleResizeStart(e, handle.position)}
            />
          ))}

          {/* Action buttons */}
          <div className="absolute -top-10 right-0 flex items-center space-x-1 bg-white shadow-lg rounded-md p-1 border opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-1 hover:bg-gray-100 rounded-sm text-gray-600 hover:text-gray-900"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
              title="Dupliquer"
            >
              <Copy className="w-3 h-3" />
            </button>
            
            <button
              className="p-1 hover:bg-gray-100 rounded-sm text-gray-600 hover:text-gray-900"
              onClick={(e) => {
                e.stopPropagation();
                onUpdate({ rotation: (element.rotation || 0) + 90 });
              }}
              title="Rotation"
            >
              <RotateCw className="w-3 h-3" />
            </button>
            
            <button
              className="p-1 hover:bg-gray-100 rounded-sm text-gray-600 hover:text-gray-900"
              onClick={(e) => {
                e.stopPropagation();
                onUpdate({ opacity: element.opacity === 1 ? 0.5 : 1 });
              }}
              title="Opacité"
            >
              {element.opacity === 1 ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            </button>
            
            <button
              className="p-1 hover:bg-red-100 rounded-sm text-red-600 hover:text-red-900"
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

export default AdvancedCanvasElement;
