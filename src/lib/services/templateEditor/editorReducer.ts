
import { EditorState, EditorAction } from './types';
import { 
  handleUpdateElement, 
  handleAddElement, 
  handleDuplicateElement, 
  handleRemoveElement 
} from './reducers/elementReducers';
import { 
  handleUndo, 
  handleRedo 
} from './reducers/historyReducers';
import { 
  handleSelectElement, 
  handleSetZoom, 
  handleToggleGrid, 
  handleToggleSnapToGrid, 
  handleSetGridSize, 
  handleSetMode 
} from './reducers/uiReducers';
import { 
  handleLoadTemplate, 
  handleUpdateTemplateProperty, 
  handleResetEditor 
} from './reducers/templateReducers';

// Editor reducer function
export const editorReducer = (state: EditorState, action: EditorAction): EditorState => {
  switch (action.type) {
    case 'LOAD_TEMPLATE':
      return handleLoadTemplate(state, action);
      
    case 'SELECT_ELEMENT':
      return handleSelectElement(state, action);
      
    case 'UPDATE_ELEMENT':
      return handleUpdateElement(state, action);
      
    case 'ADD_ELEMENT':
      return handleAddElement(state, action);
      
    case 'DUPLICATE_ELEMENT':
      return handleDuplicateElement(state, action);
      
    case 'REMOVE_ELEMENT':
      return handleRemoveElement(state, action);
      
    case 'SET_ZOOM':
      return handleSetZoom(state, action);
      
    case 'TOGGLE_GRID':
      return handleToggleGrid(state, action);
      
    case 'TOGGLE_SNAP_TO_GRID':
      return handleToggleSnapToGrid(state, action);
      
    case 'SET_GRID_SIZE':
      return handleSetGridSize(state, action);
      
    case 'UNDO':
      return handleUndo(state, action);
      
    case 'REDO':
      return handleRedo(state, action);
      
    case 'SET_MODE':
      return handleSetMode(state, action);
      
    case 'UPDATE_TEMPLATE_PROPERTY':
      return handleUpdateTemplateProperty(state, action);
      
    case 'RESET_EDITOR':
      return handleResetEditor(state, action);
      
    default:
      return state;
  }
};
