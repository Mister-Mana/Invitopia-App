
import React from 'react';
import { TemplateEditorHook } from '@/hooks/useTemplateEditor';
import EditorCanvas from '@/components/templates/editor/EditorCanvas';

interface EditorCanvasContainerProps {
  editor: TemplateEditorHook;
  canvasRef: React.RefObject<HTMLDivElement>;
  isPreviewMode: boolean;
}

const EditorCanvasContainer: React.FC<EditorCanvasContainerProps> = ({
  editor,
  canvasRef,
  isPreviewMode
}) => {
  return (
    <div className="flex-1 overflow-auto flex items-center justify-center p-8" ref={canvasRef}>
      <EditorCanvas 
        editor={editor}
        canvasRef={canvasRef}
        isPreviewMode={isPreviewMode}
      />
    </div>
  );
};

export default EditorCanvasContainer;
