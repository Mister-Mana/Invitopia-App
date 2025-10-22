
import { EditorState, EditorAction } from '../types';
import { pushToHistory } from '../reducerHelpers';

export const handleSelectElement = (state: EditorState, action: EditorAction): EditorState => {
  if (action.type !== 'SELECT_ELEMENT') return state;
  
  return {
    ...state,
    selectedElementId: action.payload
  };
};

export const handleSetZoom = (state: EditorState, action: EditorAction): EditorState => {
  if (action.type !== 'SET_ZOOM') return state;
  
  return {
    ...state,
    zoom: action.payload
  };
};

export const handleToggleGrid = (state: EditorState, action: EditorAction): EditorState => {
  if (action.type !== 'TOGGLE_GRID') return state;
  
  return {
    ...state,
    showGrid: action.payload !== undefined ? action.payload : !state.showGrid
  };
};

export const handleToggleSnapToGrid = (state: EditorState, action: EditorAction): EditorState => {
  if (action.type !== 'TOGGLE_SNAP_TO_GRID') return state;
  
  return {
    ...state,
    snapToGrid: action.payload !== undefined ? action.payload : !state.snapToGrid
  };
};

export const handleSetGridSize = (state: EditorState, action: EditorAction): EditorState => {
  if (action.type !== 'SET_GRID_SIZE') return state;
  
  return {
    ...state,
    gridSize: action.payload
  };
};

export const handleSetMode = (state: EditorState, action: EditorAction): EditorState => {
  if (action.type !== 'SET_MODE') return state;
  
  return {
    ...state,
    mode: action.payload
  };
};
