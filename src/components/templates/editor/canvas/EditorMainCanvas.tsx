
import React from 'react';
import { TemplateEditorHook } from '@/hooks/useTemplateEditor';
import EditorCanvasToolbar from './EditorCanvasToolbar';
import EditorCanvasContainer from './EditorCanvasContainer';

interface EditorMainCanvasProps {
  editor: TemplateEditorHook;
  canvasRef: React.RefObject<HTMLDivElement>;
  isPreviewMode: boolean;
}

const EditorMainCanvas: React.FC<EditorMainCanvasProps> = ({
  editor,
  canvasRef,
  isPreviewMode
}) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-100">
      {/* Toolbar */}
      <EditorCanvasToolbar editor={editor} />
      
      {/* Canvas */}
      <EditorCanvasContainer 
        editor={editor}
        canvasRef={canvasRef}
        isPreviewMode={isPreviewMode}
      />
    </div>
  );
};

export default EditorMainCanvas;
