
import React, { useRef, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import PageTransition from '@/components/PageTransition';
import { toast } from 'sonner';
import { useTemplateEditor } from '@/hooks/useTemplateEditor';
import { useEditorPanels } from '@/hooks/useEditorPanels';
import { useEditorKeyboardShortcuts } from '@/hooks/useEditorKeyboardShortcuts';

// Components
import Navbar from '@/components/Navbar';
import EditorSidebar from '@/components/templates/editor/EditorSidebar';
import EditorTopBar from '@/components/templates/editor/EditorTopBar';
import EditorMainCanvas from '@/components/templates/editor/canvas/EditorMainCanvas';
import EditorPanels from '@/components/templates/editor/panels/EditorPanels';
import EditorDialogs from '@/components/templates/editor/dialogs/EditorDialogs';

const CanvaEditor: React.FC = () => {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isPreviewMode = searchParams.get('preview') === 'true';
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Editor state and hooks
  const editor = useTemplateEditor(id);
  const panels = useEditorPanels();
  
  // Setup keyboard shortcuts
  useEditorKeyboardShortcuts(editor);
  
  // Initialize template with search params if creating new
  useEffect(() => {
    if (id?.startsWith('new-')) {
      const templateName = searchParams.get('name') || t('templates.newTemplate');
      const templateType = searchParams.get('type') as 'invitation' | 'ticket' || 'invitation';
      
      editor.updateTemplateProperty('name', templateName);
      editor.updateTemplateProperty('type', templateType);
    }
  }, [id, searchParams, editor, t]);
  
  const handleSave = async () => {
    try {
      await editor.saveTemplate();
      toast.success(t('common.saved'));
    } catch (error) {
      toast.error(t('common.error'));
      console.error('Error saving template:', error);
    }
  };
  
  const handleExport = () => {
    panels.setShowExportDialog(true);
  };
  
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
          <EditorTopBar 
            templateName={editor.state.template?.name || t('templates.newTemplate')}
            onSave={handleSave}
            onExport={handleExport}
            onBack={handleBack}
            isPreviewMode={isPreviewMode}
          />
          
          <div className="flex-1 flex overflow-hidden">
            {/* Left Sidebar - Tools */}
            <EditorSidebar 
              onTogglePanel={panels.togglePanel}
              editor={editor}
              showElementsLibrary={panels.showElementsLibrary}
              showImageLibrary={panels.showImageLibrary}
              showFontSelector={panels.showFontSelector}
              showColorPicker={panels.showColorPicker}
            />
            
            {/* Main Canvas Area */}
            <EditorMainCanvas
              editor={editor}
              canvasRef={canvasRef}
              isPreviewMode={isPreviewMode}
            />
            
            {/* Right Sidebar Panels */}
            <EditorPanels
              editor={editor}
              showLayersPanel={panels.showLayersPanel}
              showHistoryPanel={panels.showHistoryPanel}
              onCloseLayersPanel={() => panels.setShowLayersPanel(false)}
              onCloseHistoryPanel={() => panels.setShowHistoryPanel(false)}
            />
          </div>
        </div>
        
        {/* Modals and Dialogs */}
        <EditorDialogs
          editor={editor}
          canvasRef={canvasRef}
          showElementsLibrary={panels.showElementsLibrary}
          showImageLibrary={panels.showImageLibrary}
          showExportDialog={panels.showExportDialog}
          showFontSelector={panels.showFontSelector}
          showColorPicker={panels.showColorPicker}
          showTemplateSettings={panels.showTemplateSettings}
          onCloseElementsLibrary={() => panels.setShowElementsLibrary(false)}
          onCloseImageLibrary={() => panels.setShowImageLibrary(false)}
          onCloseExportDialog={() => panels.setShowExportDialog(false)}
          onCloseFontSelector={() => panels.setShowFontSelector(false)}
          onCloseColorPicker={() => panels.setShowColorPicker(false)}
          onCloseTemplateSettings={() => panels.setShowTemplateSettings(false)}
        />
      </div>
    </PageTransition>
  );
};

export default CanvaEditor;
