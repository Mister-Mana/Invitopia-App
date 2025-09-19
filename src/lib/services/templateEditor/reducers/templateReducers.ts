
import { EditorState, EditorAction } from '../types';
import { createInitialEditorState } from '../editorState';
import { pushToHistory } from '../reducerHelpers';

export const handleLoadTemplate = (state: EditorState, action: EditorAction): EditorState => {
  if (action.type !== 'LOAD_TEMPLATE') return state;
  
  return {
    ...createInitialEditorState(),
    template: action.payload
  };
};

export const handleUpdateTemplateProperty = (state: EditorState, action: EditorAction): EditorState => {
  if (action.type !== 'UPDATE_TEMPLATE_PROPERTY' || !state.template) return state;
  
  // Use a dynamic property update with type safety
  const updatedTemplate = {
    ...state.template,
    [action.payload.property]: action.payload.value
  };
  
  const newStateAfterUpdate = {
    ...state,
    template: updatedTemplate
  };
  
  return pushToHistory(state, newStateAfterUpdate);
};

export const handleResetEditor = (state: EditorState, action: EditorAction): EditorState => {
  if (action.type !== 'RESET_EDITOR') return state;
  
  return createInitialEditorState();
};
