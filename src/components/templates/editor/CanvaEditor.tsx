
import React, { useRef, useState, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import PageTransition from '@/components/PageTransition';
import { toast } from 'sonner';
import { useTemplateEditor } from '@/hooks/useTemplateEditor';

// Components
import Navbar from '@/components/Navbar';
import AdvancedToolbar from './tools/AdvancedToolbar';
import AdvancedEditorCanvas from './canvas/AdvancedEditorCanvas';
import ElementsLibraryPanel from './panels/ElementsLibraryPanel';
import EditorTopBar from './EditorTopBar';

const CanvaEditor: React.FC = () => {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isPreviewMode = searchParams.get('preview') === 'true';
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Local state for UI
  const [activeTool, setActiveTool] = useState('select');
  const [showElementsLibrary, setShowElementsLibrary] = useState(false);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(true);
  
  // Editor state
  const editor = useTemplateEditor(id);
  
  // Handle tool change
  const handleToolChange = useCallback((tool: string) => {
    setActiveTool(tool);
    editor.setMode(tool as any);
  }, [editor]);

  // Handle element addition from library
  const handleAddElementFromLibrary = useCallback((type: string, data: any = {}) => {
    const position = data.position || { x: 100, y: 100 };
    const size = data.size || { width: 100, height: 100 };
    
    const elementData = {
      position,
      size,
      rotation: 0,
      zIndex: editor.state.template?.elements.length || 0,
      ...data
    };

    switch (type) {
      case 'text':
        editor.addTextElement(position, data.content || 'Nouveau texte');
        if (data.fontSize || data.fontWeight || data.fontStyle) {
          setTimeout(() => {
            const newElement = editor.state.template?.elements[editor.state.template.elements.length - 1];
            if (newElement) {
              editor.updateElement(newElement.id, {
                fontSize: data.fontSize,
                fontWeight: data.fontWeight,
                fontStyle: data.fontStyle
              });
            }
          }, 0);
        }
        break;
      case 'shape':
        editor.addShapeElement(position, data.shape || 'rectangle');
        setTimeout(() => {
          const newElement = editor.state.template?.elements[editor.state.template.elements.length - 1];
          if (newElement && data.backgroundColor) {
            editor.updateElement(newElement.id, {
              backgroundColor: data.backgroundColor
            });
          }
        }, 0);
        break;
      case 'image':
        editor.addImageElement(position, data.imageUrl);
        break;
      case 'icon':
        // For icons, we'll create a text element with the icon name for now
        editor.addTextElement(position, data.icon);
        setTimeout(() => {
          const newElement = editor.state.template?.elements[editor.state.template.elements.length - 1];
          if (newElement) {
            editor.updateElement(newElement.id, {
              fontSize: 24,
              color: data.color
            });
          }
        }, 0);
        break;
    }
    
    toast.success('Élément ajouté au canvas');
  }, [editor]);

  // Handle save
  const handleSave = async () => {
    try {
      await editor.saveTemplate();
      toast.success(t('common.saved'));
    } catch (error) {
      toast.error(t('common.error'));
      console.error('Error saving template:', error);
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate('/templates');
  };

  return (
    <PageTransition>
      <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
        {/* Top Navigation */}
        <Navbar minimal />
        
        {/* Editor Interface */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <EditorTopBar 
            templateName={editor.state.template?.name || t('templates.newTemplate')}
            onSave={handleSave}
            onExport={() => toast.info('Export en développement')}
            onBack={handleBack}
            isPreviewMode={isPreviewMode}
          />
          
          {/* Advanced Toolbar */}
          <AdvancedToolbar
            activeTool={activeTool}
            onToolChange={handleToolChange}
            onAddElement={handleAddElementFromLibrary}
            selectedElement={editor.selectedElement}
            onUpdateElement={(properties) => {
              if (editor.selectedElement) {
                editor.updateElement(editor.selectedElement.id, properties);
              }
            }}
          />
          
          <div className="flex-1 flex overflow-hidden">
            {/* Main Canvas Area */}
            <div className="flex-1 flex">
              <AdvancedEditorCanvas
                editor={editor}
                canvasRef={canvasRef}
                isPreviewMode={isPreviewMode}
                onElementAdd={handleAddElementFromLibrary}
              />
            </div>
            
            {/* Right Panel - Elements Library */}
            {showElementsLibrary && (
              <ElementsLibraryPanel
                onAddElement={handleAddElementFromLibrary}
                onClose={() => setShowElementsLibrary(false)}
              />
            )}
          </div>
        </div>
        
        {/* Floating Action Buttons */}
        <div className="absolute bottom-6 left-6 flex flex-col space-y-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors"
            onClick={() => setShowElementsLibrary(!showElementsLibrary)}
            title="Ouvrir la bibliothèque d'éléments"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

export default CanvaEditor;
