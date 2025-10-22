
import { EditorState, EditorAction } from '../types';

export const handleUndo = (state: EditorState, action: EditorAction): EditorState => {
  if (action.type !== 'UNDO' || state.history.past.length === 0) return state;
  
  const previous = state.history.past[state.history.past.length - 1];
  const newPast = state.history.past.slice(0, state.history.past.length - 1);
  
  return {
    ...state,
    template: previous.template || state.template,
    selectedElementId: previous.selectedElementId,
    history: {
      past: newPast,
      future: [
        { 
          template: state.template,
          selectedElementId: state.selectedElementId
        },
        ...state.history.future
      ]
    }
  };
};

export const handleRedo = (state: EditorState, action: EditorAction): EditorState => {
  if (action.type !== 'REDO' || state.history.future.length === 0) return state;
  
  const next = state.history.future[0];
  const newFuture = state.history.future.slice(1);
  
  return {
    ...state,
    template: next.template || state.template,
    selectedElementId: next.selectedElementId,
    history: {
      past: [
        ...state.history.past,
        {
          template: state.template,
          selectedElementId: state.selectedElementId
        }
      ],
      future: newFuture
    }
  };
};
