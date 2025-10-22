
import React from 'react';
import { TemplateEditorHook } from '@/hooks/useTemplateEditor';
import EditorToolbar from '@/components/templates/editor/EditorToolbar';

interface EditorCanvasToolbarProps {
  editor: TemplateEditorHook;
}

const EditorCanvasToolbar: React.FC<EditorCanvasToolbarProps> = ({ editor }) => {
  return (
    <EditorToolbar 
      editor={editor}
      onUndo={editor.undo}
      onRedo={editor.redo}
      onZoomIn={() => editor.setZoom(editor.state.zoom + 0.1)}
      onZoomOut={() => editor.setZoom(editor.state.zoom - 0.1)}
      onResetZoom={() => editor.setZoom(1)}
      zoom={editor.state.zoom}
    />
  );
};

export default EditorCanvasToolbar;
