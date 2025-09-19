
import { useEffect } from 'react';
import { TemplateEditorHook } from '@/hooks/useTemplateEditor';

export const useEditorKeyboardShortcuts = (editor: TemplateEditorHook) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events when typing in inputs, textareas, etc.
      if (e.target instanceof HTMLInputElement || 
          e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      // Ctrl/Cmd + Z for undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        editor.undo();
      }
      
      // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y for redo
      if ((e.ctrlKey || e.metaKey) && ((e.key === 'z' && e.shiftKey) || e.key === 'y')) {
        e.preventDefault();
        editor.redo();
      }
      
      // Delete or Backspace to remove selected element
      if ((e.key === 'Delete' || e.key === 'Backspace') && editor.selectedElement) {
        e.preventDefault();
        editor.removeElement(editor.selectedElement.id);
      }
      
      // Ctrl/Cmd + D to duplicate selected element
      if ((e.ctrlKey || e.metaKey) && e.key === 'd' && editor.selectedElement) {
        e.preventDefault();
        editor.duplicateElement(editor.selectedElement.id);
      }
      
      // Escape to deselect
      if (e.key === 'Escape') {
        e.preventDefault();
        editor.selectElement(null);
      }
      
      // Tool shortcuts (when not using modifiers)
      if (!e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
        // V for select tool
        if (e.key === 'v') {
          editor.setMode('select');
        }
        
        // T for text tool
        else if (e.key === 't') {
          editor.setMode('text');
        }
        
        // I for image tool
        else if (e.key === 'i') {
          editor.setMode('image');
        }
        
        // S for shape tool
        else if (e.key === 's') {
          editor.setMode('shape');
        }
        
        // H for pan tool
        else if (e.key === 'h') {
          editor.setMode('pan');
        }
        
        // G for toggle grid
        else if (e.key === 'g') {
          editor.toggleGrid();
        }
      }
      
      // Zoom keyboard shortcuts
      if (e.key === '=' || e.key === '+') {
        e.preventDefault();
        editor.setZoom(editor.state.zoom + 0.1);
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        editor.setZoom(editor.state.zoom - 0.1);
      } else if (e.key === '0' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        editor.setZoom(1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editor]);
};
