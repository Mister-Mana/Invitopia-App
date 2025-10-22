
import config from '@/lib/config';

// Define template types
export type TemplateType = 'invitation' | 'ticket';
export type TemplateCategory = 'wedding' | 'birthday' | 'corporate' | 'conference' | 'concert' | 'party' | 'charity' | 'sports' | 'education' | 'graduation' | 'baby-shower' | 'housewarming' | 'theater' | 'other';

// Define base template structure
export interface TemplateBase {
  id: string;
  name: string;
  type: TemplateType;
  category: TemplateCategory;
  thumbnail: string;
  previewImages: string[];
  description: string;
  isSystem: boolean;
  isPublic: boolean;
  popularity: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

// Define template element types
export type ElementType = 'text' | 'image' | 'shape' | 'qrcode' | 'barcode' | 'dynamic-field';

// Define template element properties
export interface ElementProperties {
  id: string;
  type: ElementType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  rotation: number;
  zIndex: number;
  locked?: boolean;
  content?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | 'light' | 'medium';
  fontStyle?: 'normal' | 'italic';
  textAlign?: 'left' | 'center' | 'right';
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
  opacity?: number;
  imageUrl?: string;
  shape?: 'rectangle' | 'ellipse' | 'triangle' | 'star' | 'heart' | 'hexagon' | 'line' | 'polygon';
  borderWidth?: number;
  borderColor?: string;
  dynamicField?: string;
  placeholder?: string;
}

// Complete template definition
export interface Template extends TemplateBase {
  layout: {
    width: number;
    height: number;
    background: {
      type: 'color' | 'image' | 'gradient';
      value: string;
      gradient?: {
        type: 'linear' | 'radial';
        colors: string[];
        stops: number[];
        angle?: number;
      };
    };
    bleed?: number;
    margins?: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
  elements: ElementProperties[];
  defaultData: Record<string, any>;
  requiredFields: string[];
  fonts: string[];
  colors: string[];
}
