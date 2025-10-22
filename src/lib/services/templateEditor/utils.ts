
import { ElementProperties } from './types';

// Function to snap a position to the grid
export const snapToGrid = (x: number, y: number, gridSize: number) => {
  return {
    x: Math.round(x / gridSize) * gridSize,
    y: Math.round(y / gridSize) * gridSize
  };
};

// Function to apply snapping when needed - fixed parameter naming to avoid collision
export const applySnapping = (position: { x: number, y: number }, shouldSnapToGrid: boolean, gridSize: number) => {
  if (shouldSnapToGrid) {
    return snapToGrid(position.x, position.y, gridSize);
  }
  return position;
};

// Generate a unique ID
export const generateUniqueId = (): string => {
  return 'element-' + Math.random().toString(36).substr(2, 9);
};
