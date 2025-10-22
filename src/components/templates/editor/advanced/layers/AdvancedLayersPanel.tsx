
import React from 'react';
import { TemplateEditorHook } from '@/hooks/useTemplateEditor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { X, Eye, EyeOff, Lock, Unlock, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdvancedLayersPanelProps {
  editor: TemplateEditorHook;
  onClose: () => void;
}

const AdvancedLayersPanel: React.FC<AdvancedLayersPanelProps> = ({
  editor,
  onClose
}) => {
  const elements = editor.state.template?.elements || [];
  const sortedElements = [...elements].sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0));

  const getElementIcon = (type: string) => {
    switch (type) {
      case 'text':
        return 'T';
      case 'image':
        return '🖼';
      case 'shape':
        return '⬜';
      default:
        return '?';
    }
  };

  const getElementName = (element: any) => {
    switch (element.type) {
      case 'text':
        return element.content || 'Texte';
      case 'image':
        return 'Image';
      case 'shape':
        return `Forme ${element.shape || 'rectangle'}`;
      default:
        return 'Élément';
    }
  };

  return (
    <div className="w-64 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Calques</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {sortedElements.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500">Aucun calque</p>
            </div>
          ) : (
            <div className="space-y-1">
              {sortedElements.map((element, index) => (
                <div
                  key={element.id}
                  className={cn(
                    "flex items-center space-x-2 p-2 rounded-md cursor-pointer hover:bg-gray-50 group",
                    editor.state.selectedElementId === element.id && "bg-blue-50 border border-blue-200"
                  )}
                  onClick={() => editor.selectElement(element.id)}
                >
                  {/* Element Icon */}
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-mono">
                    {getElementIcon(element.type)}
                  </div>

                  {/* Element Name */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {getElementName(element)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {element.type} • z:{element.zIndex || 0}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        editor.updateElement(element.id, {
                          opacity: element.opacity === 1 ? 0.5 : 1
                        });
                      }}
                      title={element.opacity === 1 ? "Masquer" : "Afficher"}
                    >
                      {element.opacity === 1 ? (
                        <Eye className="h-3 w-3" />
                      ) : (
                        <EyeOff className="h-3 w-3" />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        editor.removeElement(element.id);
                      }}
                      title="Supprimer"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Layer Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <div className="text-xs text-gray-500 mb-2">Actions sur les calques</div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!editor.selectedElement}
            onClick={() => {
              if (editor.selectedElement) {
                editor.duplicateElement(editor.selectedElement.id);
              }
            }}
          >
            Dupliquer
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            disabled={!editor.selectedElement}
            onClick={() => {
              if (editor.selectedElement) {
                editor.removeElement(editor.selectedElement.id);
              }
            }}
          >
            Supprimer
          </Button>
        </div>

        {editor.selectedElement && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (editor.selectedElement) {
                  editor.updateElement(editor.selectedElement.id, {
                    zIndex: (editor.selectedElement.zIndex || 0) + 1
                  });
                }
              }}
            >
              ↑ Avant
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (editor.selectedElement) {
                  editor.updateElement(editor.selectedElement.id, {
                    zIndex: Math.max(0, (editor.selectedElement.zIndex || 0) - 1)
                  });
                }
              }}
            >
              ↓ Arrière
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedLayersPanel;
