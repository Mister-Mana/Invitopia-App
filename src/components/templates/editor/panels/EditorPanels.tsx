
import React from 'react';
import { TemplateEditorHook } from '@/hooks/useTemplateEditor';
import ElementProperties from '@/components/templates/editor/properties/ElementProperties';
import LayersPanel from '@/components/templates/editor/LayersPanel';
import HistoryPanel from '@/components/templates/editor/HistoryPanel';

interface EditorPanelsProps {
  editor: TemplateEditorHook;
  showLayersPanel: boolean;
  showHistoryPanel: boolean;
  onCloseLayersPanel: () => void;
  onCloseHistoryPanel: () => void;
}

const EditorPanels: React.FC<EditorPanelsProps> = ({
  editor,
  showLayersPanel,
  showHistoryPanel,
  onCloseLayersPanel,
  onCloseHistoryPanel
}) => {
  return (
    <>
      {/* Right Sidebar - Properties */}
      {editor.selectedElement ? (
        <ElementProperties 
          element={editor.selectedElement}
          onUpdate={(properties) => editor.updateElement(editor.selectedElement!.id, properties)}
          onDelete={() => editor.removeElement(editor.selectedElement!.id)}
          onClose={() => {}}
        />
      ) : null}
      
      {/* Layers Panel */}
      {showLayersPanel && (
        <LayersPanel 
          elements={editor.state.template?.elements || []}
          selectedElementId={editor.state.selectedElementId}
          onSelectElement={editor.selectElement}
          onClose={onCloseLayersPanel}
        />
      )}
      
      {/* History Panel */}
      {showHistoryPanel && (
        <HistoryPanel 
          history={editor.state.history}
          onUndo={editor.undo}
          onRedo={editor.redo}
          onClose={onCloseHistoryPanel}
        />
      )}
    </>
  );
};

export default EditorPanels;
