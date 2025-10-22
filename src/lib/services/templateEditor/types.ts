
import { Template, ElementProperties } from '../../templates/template-definitions';

// Define the state of the editor
export interface EditorState {
  template: Template | null;
  selectedElementId: string | null;
  zoom: number;
  history: {
    past: Array<Partial<EditorState>>;
    future: Array<Partial<EditorState>>;
  };
  unsavedChanges: boolean;
  mode: 'select' | 'text' | 'image' | 'shape' | 'pan';
  showGrid: boolean;
  snapToGrid: boolean;
  gridSize: number;
}

// Define editor actions
export type EditorAction = 
  | { type: 'LOAD_TEMPLATE'; payload: Template }
  | { type: 'SELECT_ELEMENT'; payload: string | null }
  | { type: 'UPDATE_ELEMENT'; payload: { id: string, properties: Partial<ElementProperties> } }
  | { type: 'ADD_ELEMENT'; payload: ElementProperties }
  | { type: 'REMOVE_ELEMENT'; payload: string }
  | { type: 'DUPLICATE_ELEMENT'; payload: string }
  | { type: 'SET_ZOOM'; payload: number }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SET_MODE'; payload: EditorState['mode'] }
  | { type: 'UPDATE_TEMPLATE_PROPERTY'; payload: { property: string, value: any } }
  | { type: 'TOGGLE_GRID'; payload?: boolean }
  | { type: 'TOGGLE_SNAP_TO_GRID'; payload?: boolean }
  | { type: 'SET_GRID_SIZE'; payload: number }
  | { type: 'RESET_EDITOR' };

// Re-export ElementProperties from template-definitions
export type { ElementProperties } from '../../templates/template-definitions';
