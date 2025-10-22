
import React, { useRef, useState, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import PageTransition from '@/components/PageTransition';
import { toast } from 'sonner';
import { useTemplateEditor } from '@/hooks/useTemplateEditor';

// Advanced Editor Components
import Navbar from '@/components/Navbar';
import AdvancedToolbar from './toolbar/AdvancedToolbar';
import AdvancedCanvas from './canvas/AdvancedCanvas';
import AdvancedSidebar from './sidebar/AdvancedSidebar';
import AdvancedPropertiesPanel from './properties/AdvancedPropertiesPanel';
import AdvancedLayersPanel from './layers/AdvancedLayersPanel';

const AdvancedTemplateEditor: React.FC = () => {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isPreviewMode = searchParams.get('preview') === 'true';
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Editor state
  const editor = useTemplateEditor(id);
  
  // UI state
  const [activeTool, setActiveTool] = useState('select');
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(true);
  const [showLayersPanel, setShowLayersPanel] = useState(false);
  const [showElementLibrary, setShowElementLibrary] = useState(false);

  // Handle tool changes
  const handleToolChange = useCallback((tool: string) => {
    setActiveTool(tool);
    editor.setMode(tool as any);
    
    // Auto-open element library for certain tools
    if (['text', 'shape', 'image'].includes(tool)) {
      setShowElementLibrary(true);
    }
  }, [editor]);

  // Handle save
  const handleSave = async () => {
    try {
      await editor.saveTemplate();
      toast.success('Template sauvegardé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
      console.error('Save error:', error);
    }
  };

  // Handle export
  const handleExport = useCallback(() => {
    if (!editor.state.template) {
      toast.error('Aucun template à exporter');
      return;
    }

    // Export as JSON for now - could be extended to support PDF, PNG, etc.
    const dataStr = JSON.stringify(editor.state.template, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${editor.state.template.name || 'template'}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Template exporté avec succès');
  }, [editor.state.template]);

  return (
    <PageTransition>
      <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
        {/* Top Navigation */}
        <Navbar minimal />
        
        {/* Advanced Toolbar */}
        <AdvancedToolbar
          templateName={editor.state.template?.name || 'Nouveau Template'}
          activeTool={activeTool}
          onToolChange={handleToolChange}
          onSave={handleSave}
          onExport={handleExport}
          onBack={() => navigate('/templates')}
          zoom={editor.state.zoom}
          onZoomChange={editor.setZoom}
          showGrid={editor.state.showGrid}
          onToggleGrid={editor.toggleGrid}
          snapToGrid={editor.state.snapToGrid}
          onToggleSnap={editor.toggleSnapToGrid}
          canUndo={editor.state.history.past.length > 0}
          canRedo={editor.state.history.future.length > 0}
          onUndo={editor.undo}
          onRedo={editor.redo}
        />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar */}
          <AdvancedSidebar
            activeTool={activeTool}
            onToolChange={handleToolChange}
            showElementLibrary={showElementLibrary}
            onToggleElementLibrary={() => setShowElementLibrary(!showElementLibrary)}
            onAddElement={(type, data) => {
              const position = data?.position || { x: 200, y: 200 };
              
              switch (type) {
                case 'text':
                  editor.addTextElement(position, data?.content || 'Nouveau texte');
                  break;
                case 'image':
                  editor.addImageElement(position, data?.imageUrl);
                  break;
                case 'shape':
                  editor.addShapeElement(position, data?.shape || 'rectangle');
                  break;
              }
              
              toast.success('Élément ajouté au canvas');
            }}
          />
          
          {/* Main Canvas Area */}
          <AdvancedCanvas
            editor={editor}
            canvasRef={canvasRef}
            isPreviewMode={isPreviewMode}
            activeTool={activeTool}
          />
          
          {/* Right Panels */}
          <div className="flex">
            {showPropertiesPanel && (
              <AdvancedPropertiesPanel
                editor={editor}
                onClose={() => setShowPropertiesPanel(false)}
              />
            )}
            
            {showLayersPanel && (
              <AdvancedLayersPanel
                editor={editor}
                onClose={() => setShowLayersPanel(false)}
              />
            )}
          </div>
        </div>
        
        {/* Floating Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col space-y-2">
          <button
            className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 p-3 rounded-full shadow-lg transition-colors"
            onClick={() => setShowPropertiesPanel(!showPropertiesPanel)}
            title="Propriétés"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </button>
          
          <button
            className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 p-3 rounded-full shadow-lg transition-colors"
            onClick={() => setShowLayersPanel(!showLayersPanel)}
            title="Calques"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdvancedTemplateEditor;
