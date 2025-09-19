
import { EditorState, EditorAction } from '../types';
import { pushToHistory } from '../reducerHelpers';
import { generateUniqueId } from '../utils';

export const handleUpdateElement = (state: EditorState, action: EditorAction): EditorState => {
  if (action.type !== 'UPDATE_ELEMENT' || !state.template) return state;
  
  const updatedElements = state.template.elements.map(element => 
    element.id === action.payload.id 
      ? { ...element, ...action.payload.properties } 
      : element
  );
  
  const newState = {
    ...state,
    template: {
      ...state.template,
      elements: updatedElements
    }
  };
  
  return pushToHistory(state, newState);
};

export const handleAddElement = (state: EditorState, action: EditorAction): EditorState => {
  if (action.type !== 'ADD_ELEMENT' || !state.template) return state;
  
  // Apply grid snapping if enabled
  let elementToAdd = action.payload;
  if (state.snapToGrid) {
    const snappedPosition = {
      x: Math.round(elementToAdd.position.x / state.gridSize) * state.gridSize,
      y: Math.round(elementToAdd.position.y / state.gridSize) * state.gridSize
    };
    elementToAdd = {
      ...elementToAdd,
      position: snappedPosition
    };
  }
  
  const newStateWithElement = {
    ...state,
    template: {
      ...state.template,
      elements: [...state.template.elements, elementToAdd]
    },
    selectedElementId: elementToAdd.id
  };
  
  return pushToHistory(state, newStateWithElement);
};

export const handleDuplicateElement = (state: EditorState, action: EditorAction): EditorState => {
  if (action.type !== 'DUPLICATE_ELEMENT' || !state.template || !action.payload) return state;
  
  const elementToDuplicate = state.template.elements.find(
    el => el.id === action.payload
  );
  
  if (!elementToDuplicate) return state;
  
  // Create a duplicate with a new ID and slightly offset position
  const duplicatedElement = {
    ...elementToDuplicate,
    id: generateUniqueId(),
    position: {
      x: elementToDuplicate.position.x + 20,
      y: elementToDuplicate.position.y + 20
    }
  };
  
  const newStateWithDuplicate = {
    ...state,
    template: {
      ...state.template,
      elements: [...state.template.elements, duplicatedElement]
    },
    selectedElementId: duplicatedElement.id
  };
  
  return pushToHistory(state, newStateWithDuplicate);
};

export const handleRemoveElement = (state: EditorState, action: EditorAction): EditorState => {
  if (action.type !== 'REMOVE_ELEMENT' || !state.template) return state;
  
  const elementsAfterRemoval = state.template.elements.filter(
    element => element.id !== action.payload
  );
  
  const newStateAfterRemoval = {
    ...state,
    template: {
      ...state.template,
      elements: elementsAfterRemoval
    },
    selectedElementId: null
  };
  
  return pushToHistory(state, newStateAfterRemoval);
};
