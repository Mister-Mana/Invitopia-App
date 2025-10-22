// Template definitions for the advanced editor
// Re-export types from template-types for consistency
export type { 
  ElementProperties, 
  Template,
  TemplateType,
  TemplateCategory,
  ElementType
} from './template-types';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Background {
  type: 'color' | 'gradient' | 'image';
  value: string;
  gradient?: {
    type: 'linear' | 'radial';
    colors: string[];
    stops: number[];
    angle: number;
  };
  imageUrl?: string;
}

export interface Layout {
  width: number;
  height: number;
  background: Background;
}

// Default templates - using simplified template structure for the editor
export const defaultTemplates = [
  {
    id: 'wedding-classic',
    name: 'Mariage Classique',
    type: 'invitation' as const,
    category: 'wedding',
    thumbnail: '/placeholder.svg',
    previewImages: ['/placeholder.svg'],
    description: 'Template classique pour invitations de mariage',
    isSystem: true,
    isPublic: true,
    popularity: 95,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['mariage', 'classique', 'élégant'],
    layout: {
      width: 400,
      height: 600,
      background: {
        type: 'gradient' as const,
        value: '',
        gradient: {
          type: 'linear' as const,
          colors: ['#f8f9fa', '#e9ecef'],
          stops: [0, 100],
          angle: 45
        }
      },
      bleed: 0,
      margins: { top: 20, right: 20, bottom: 20, left: 20 }
    },
    elements: [
      {
        id: 'title',
        type: 'text' as const,
        position: { x: 200, y: 100 },
        size: { width: 300, height: 60 },
        rotation: 0,
        zIndex: 1,
        opacity: 1,
        content: 'Invitation',
        fontFamily: 'serif',
        fontSize: 32,
        fontWeight: 'bold' as const,
        textAlign: 'center' as const,
        color: '#6E59A5'
      },
      {
        id: 'names',
        type: 'text' as const,
        position: { x: 200, y: 200 },
        size: { width: 300, height: 40 },
        rotation: 0,
        zIndex: 1,
        opacity: 1,
        content: 'Julie & Marc',
        fontFamily: 'serif',
        fontSize: 24,
        fontWeight: 'bold' as const,
        textAlign: 'center' as const,
        color: '#6E59A5'
      },
      {
        id: 'description',
        type: 'text' as const,
        position: { x: 200, y: 280 },
        size: { width: 300, height: 60 },
        rotation: 0,
        zIndex: 1,
        opacity: 1,
        content: 'Ont le plaisir de vous convier à leur mariage',
        fontFamily: 'sans-serif',
        fontSize: 16,
        textAlign: 'center' as const,
        color: '#333333'
      },
      {
        id: 'date',
        type: 'text' as const,
        position: { x: 200, y: 380 },
        size: { width: 300, height: 40 },
        rotation: 0,
        zIndex: 1,
        opacity: 1,
        content: 'Le 12 juin 2024 à 15h00',
        fontFamily: 'sans-serif',
        fontSize: 16,
        fontWeight: 'medium' as const,
        textAlign: 'center' as const,
        color: '#333333'
      },
      {
        id: 'location',
        type: 'text' as const,
        position: { x: 200, y: 480 },
        size: { width: 300, height: 40 },
        rotation: 0,
        zIndex: 1,
        opacity: 1,
        content: 'Château de Versailles, Paris',
        fontFamily: 'sans-serif',
        fontSize: 14,
        fontStyle: 'italic' as const,
        textAlign: 'center' as const,
        color: '#666666'
      }
    ],
    defaultData: {},
    requiredFields: [],
    fonts: ['serif', 'sans-serif'],
    colors: ['#6E59A5', '#333333', '#666666']
  }
];

// Template utility functions
export const getTemplateById = (id: string) => {
  return defaultTemplates.find(template => template.id === id) || null;
};

export const createEmptyTemplate = (type: 'invitation' | 'ticket' = 'invitation') => {
  return {
    id: `new-${Date.now()}`,
    name: 'Nouveau Template',
    type,
    category: 'custom',
    thumbnail: '/placeholder.svg',
    previewImages: ['/placeholder.svg'],
    description: 'Template personnalisé',
    isSystem: false,
    isPublic: false,
    popularity: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: [],
    layout: {
      width: 400,
      height: 600,
      background: {
        type: 'color' as const,
        value: '#ffffff'
      },
      bleed: 0,
      margins: { top: 20, right: 20, bottom: 20, left: 20 }
    },
    elements: [],
    defaultData: {},
    requiredFields: [],
    fonts: [],
    colors: []
  };
};