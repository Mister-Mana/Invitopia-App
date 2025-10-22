
import React from 'react';
import { TemplateEditorHook } from '@/hooks/useTemplateEditor';
import ElementsLibrary from '@/components/templates/editor/ElementsLibrary';
import ExportDialog from '@/components/templates/editor/ExportDialog';
import ImageLibrary from '@/components/templates/editor/ImageLibrary';
import FontSelector from '@/components/templates/editor/FontSelector';
import ColorPicker from '@/components/templates/editor/ColorPicker';
import TemplateSettings from '@/components/templates/editor/TemplateSettings';

interface EditorDialogsProps {
  editor: TemplateEditorHook;
  canvasRef: React.RefObject<HTMLDivElement>;
  showElementsLibrary: boolean;
  showImageLibrary: boolean;
  showExportDialog: boolean;
  showFontSelector: boolean;
  showColorPicker: boolean;
  showTemplateSettings: boolean;
  onCloseElementsLibrary: () => void;
  onCloseImageLibrary: () => void;
  onCloseExportDialog: () => void;
  onCloseFontSelector: () => void;
  onCloseColorPicker: () => void;
  onCloseTemplateSettings: () => void;
}

const EditorDialogs: React.FC<EditorDialogsProps> = ({
  editor,
  canvasRef,
  showElementsLibrary,
  showImageLibrary,
  showExportDialog,
  showFontSelector,
  showColorPicker,
  showTemplateSettings,
  onCloseElementsLibrary,
  onCloseImageLibrary,
  onCloseExportDialog,
  onCloseFontSelector,
  onCloseColorPicker,
  onCloseTemplateSettings
}) => {
  return (
    <>
      <ElementsLibrary 
        isOpen={showElementsLibrary} 
        onClose={onCloseElementsLibrary}
        onAddElement={(type, position) => {
          if (type === 'text') editor.addTextElement(position);
          else if (type === 'image') editor.addImageElement(position);
          else if (type === 'shape') editor.addShapeElement(position);
        }}
      />
      
      <ImageLibrary 
        isOpen={showImageLibrary}
        onClose={onCloseImageLibrary}
        onSelectImage={(imageUrl) => {
          const center = { 
            x: (canvasRef.current?.clientWidth || 0) / 2, 
            y: (canvasRef.current?.clientHeight || 0) / 2 
          };
          const elementId = editor.addImageElement(center, imageUrl);
          editor.selectElement(elementId);
        }}
      />
      
      <FontSelector 
        isOpen={showFontSelector}
        onClose={onCloseFontSelector}
        onSelectFont={(fontFamily) => {
          if (editor.selectedElement && editor.selectedElement.type === 'text') {
            editor.updateElement(editor.selectedElement.id, { fontFamily });
          }
        }}
      />
      
      <ColorPicker 
        isOpen={showColorPicker}
        onClose={onCloseColorPicker}
        onSelectColor={(color) => {
          if (editor.selectedElement) {
            if (editor.selectedElement.type === 'text') {
              editor.updateElement(editor.selectedElement.id, { color });
            } else if (editor.selectedElement.type === 'shape') {
              editor.updateElement(editor.selectedElement.id, { backgroundColor: color });
            }
          }
        }}
      />
      
      <TemplateSettings 
        isOpen={showTemplateSettings}
        onClose={onCloseTemplateSettings}
        template={editor.state.template}
        onUpdateTemplate={(property, value) => {
          editor.updateTemplateProperty(property, value);
        }}
      />
      
      <ExportDialog 
        isOpen={showExportDialog}
        onClose={onCloseExportDialog}
        template={editor.state.template}
      />
    </>
  );
};

export default EditorDialogs;
