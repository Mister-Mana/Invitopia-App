
import { ElementProperties } from './types';

export const createTextElement = (
  id: string,
  position: { x: number; y: number },
  content?: string
): ElementProperties => ({
  id,
  type: 'text',
  position,
  size: { width: 200, height: 50 },
  rotation: 0,
  zIndex: 1,
  content: content || 'Nouveau texte',
  fontFamily: 'Inter',
  fontSize: 16,
  fontWeight: 'normal',
  fontStyle: 'normal',
  textAlign: 'left',
  color: '#000000',
  opacity: 1
});

export const createImageElement = (
  id: string,
  position: { x: number; y: number },
  imageUrl?: string
): ElementProperties => ({
  id,
  type: 'image',
  position,
  size: { width: 150, height: 150 },
  rotation: 0,
  zIndex: 1,
  imageUrl: imageUrl || 'https://via.placeholder.com/150',
  opacity: 1
});

export const createShapeElement = (
  id: string,
  position: { x: number; y: number },
  shape: 'rectangle' | 'ellipse' | 'triangle' | 'star' | 'heart' | 'hexagon' = 'rectangle'
): ElementProperties => ({
  id,
  type: 'shape',
  position,
  size: { width: 100, height: 100 },
  rotation: 0,
  zIndex: 1,
  shape,
  backgroundColor: '#3B82F6',
  borderRadius: shape === 'rectangle' ? 0 : undefined,
  borderWidth: 0,
  borderColor: '#000000',
  opacity: 1
});

// Note: QRCode, Barcode, and Dynamic Field elements are not implemented in the basic editor
// They would require additional dependencies and complex rendering logic
