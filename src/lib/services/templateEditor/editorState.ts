
import { Template } from '../../templates/template-definitions';
import { EditorState } from './types';
import { getTemplateById } from '../../templates/template-definitions';

// Create initial editor state
export const createInitialEditorState = (templateId?: string): EditorState => {
  let template = null;
  
  if (templateId) {
    template = getTemplateById(templateId) || null;
  }
  
  return {
    template,
    selectedElementId: null,
    zoom: 1,
    history: {
      past: [],
      future: []
    },
    unsavedChanges: false,
    mode: 'select',
    showGrid: true,
    snapToGrid: false,
    gridSize: 20
  };
};
