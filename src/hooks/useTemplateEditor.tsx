
import { useReducer, useCallback, useEffect } from 'react';
import { 
  EditorState, 
  EditorAction, 
  editorReducer, 
  createInitialEditorState,
  generateUniqueId,
  createTextElement,
  createImageElement,
  createShapeElement,
  applySnapping
} from '@/lib/services/templateEditor';
import { getTemplateById } from '@/lib/templates';
import { toast } from 'sonner';

export const useTemplateEditor = (templateId?: string) => {
  // Initialize the editor state
  const [state, dispatch] = useReducer(editorReducer, createInitialEditorState(templateId));
  
  // Load template when ID changes
  useEffect(() => {
    if (templateId && templateId !== 'new') {
      const template = getTemplateById(templateId);
      if (template) {
        dispatch({ type: 'LOAD_TEMPLATE', payload: template });
      } else {
        // Check if template data is in URL params
        const urlParams = new URLSearchParams(window.location.search);
        const templateData = urlParams.get('template');
        if (templateData) {
          try {
            const parsedTemplate = JSON.parse(decodeURIComponent(templateData));
            dispatch({ type: 'LOAD_TEMPLATE', payload: parsedTemplate });
          } catch (error) {
            console.error('Error parsing template data:', error);
            toast.error('Erreur lors du chargement du template');
          }
        }
      }
    } else if (templateId === 'new') {
      // Create a blank template for new editor
      const urlParams = new URLSearchParams(window.location.search);
      const templateData = urlParams.get('template');
      
      if (templateData) {
        try {
          const parsedTemplate = JSON.parse(decodeURIComponent(templateData));
          dispatch({ type: 'LOAD_TEMPLATE', payload: parsedTemplate });
        } catch (error) {
          console.error('Error parsing template data:', error);
        }
      }
    }
  }, [templateId]);
  
  // Select an element
  const selectElement = useCallback((elementId: string | null) => {
    dispatch({ type: 'SELECT_ELEMENT', payload: elementId });
  }, []);
  
  // Update an element
  const updateElement = useCallback((elementId: string, properties: any) => {
    // Apply snapping if position is being updated and snap-to-grid is enabled
    if (properties.position && state.snapToGrid) {
      properties.position = applySnapping(properties.position, state.snapToGrid, state.gridSize);
    }
    
    dispatch({ 
      type: 'UPDATE_ELEMENT', 
      payload: { id: elementId, properties } 
    });
  }, [state.snapToGrid, state.gridSize]);
  
  // Add various element types
  const addTextElement = useCallback((position: { x: number, y: number }, text?: string) => {
    const id = generateUniqueId();
    const element = createTextElement(id, position, text);
    dispatch({ type: 'ADD_ELEMENT', payload: element });
    return id;
  }, []);
  
  const addImageElement = useCallback((position: { x: number, y: number }, imageUrl?: string) => {
    const id = generateUniqueId();
    const element = createImageElement(id, position, imageUrl);
    dispatch({ type: 'ADD_ELEMENT', payload: element });
    return id;
  }, []);
  
  const addShapeElement = useCallback((
    position: { x: number, y: number }, 
    shape: 'rectangle' | 'ellipse' = 'rectangle'
  ) => {
    const id = generateUniqueId();
    const element = createShapeElement(id, position, shape);
    dispatch({ type: 'ADD_ELEMENT', payload: element });
    return id;
  }, []);
  
  // Remove element
  const removeElement = useCallback((elementId: string) => {
    dispatch({ type: 'REMOVE_ELEMENT', payload: elementId });
  }, []);
  
  // Duplicate element
  const duplicateElement = useCallback((elementId: string) => {
    dispatch({ type: 'DUPLICATE_ELEMENT', payload: elementId });
  }, []);
  
  // Undo/Redo
  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);
  
  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);
  
  // Set editor mode
  const setMode = useCallback((mode: EditorState['mode']) => {
    dispatch({ type: 'SET_MODE', payload: mode });
  }, []);
  
  // Set zoom level
  const setZoom = useCallback((zoom: number) => {
    dispatch({ type: 'SET_ZOOM', payload: Math.max(0.1, Math.min(5, zoom)) });
  }, []);
  
  // Grid controls
  const toggleGrid = useCallback((showGrid?: boolean) => {
    dispatch({ type: 'TOGGLE_GRID', payload: showGrid });
  }, []);
  
  const toggleSnapToGrid = useCallback((snapToGrid?: boolean) => {
    dispatch({ type: 'TOGGLE_SNAP_TO_GRID', payload: snapToGrid });
  }, []);
  
  const setGridSize = useCallback((size: number) => {
    dispatch({ type: 'SET_GRID_SIZE', payload: size });
  }, []);
  
  // Apply preset zoom levels
  const applyZoomPreset = useCallback((preset: 'fit' | '50' | '100' | '150' | '200') => {
    switch (preset) {
      case 'fit':
        setZoom(0.8); // Approximate fit to screen
        break;
      case '50':
        setZoom(0.5);
        break;
      case '100':
        setZoom(1);
        break;
      case '150':
        setZoom(1.5);
        break;
      case '200':
        setZoom(2);
        break;
    }
  }, [setZoom]);
  
  // Update template properties
  const updateTemplateProperty = useCallback((property: string, value: any) => {
    dispatch({ 
      type: 'UPDATE_TEMPLATE_PROPERTY', 
      payload: { property, value } 
    });
  }, []);
  
  // Save template
  const saveTemplate = useCallback(async () => {
    if (!state.template) {
      toast.error('No template to save');
      return;
    }
    
    try {
      // In a real app, this would save to Firestore
      console.log('Saving template', state.template);
      toast.success('Template saved successfully');
      return state.template.id;
    } catch (error) {
      console.error('Error saving template', error);
      toast.error('Failed to save template');
      return null;
    }
  }, [state.template]);
  
  // Get the selected element
  const selectedElement = state.template && state.selectedElementId
    ? state.template.elements.find(el => el.id === state.selectedElementId)
    : null;
  
  return {
    state,
    selectedElement,
    selectElement,
    updateElement,
    addTextElement,
    addImageElement,
    addShapeElement,
    removeElement,
    duplicateElement,
    undo,
    redo,
    setMode,
    setZoom,
    applyZoomPreset,
    toggleGrid,
    toggleSnapToGrid,
    setGridSize,
    updateTemplateProperty,
    saveTemplate
  };
};

export type TemplateEditorHook = ReturnType<typeof useTemplateEditor>;
