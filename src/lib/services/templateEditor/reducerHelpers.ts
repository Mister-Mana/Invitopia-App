
import { EditorState } from './types';

/**
 * Creates a historical state entry for undo/redo functionality
 */
export const pushToHistory = (state: EditorState, newState: EditorState): EditorState => {
  // Create a shallow copy of the current state for the history
  const historicalState = {
    template: state.template,
    selectedElementId: state.selectedElementId
  };
  
  return {
    ...newState,
    history: {
      past: [...state.history.past, historicalState],
      future: []
    },
    unsavedChanges: true
  };
};
