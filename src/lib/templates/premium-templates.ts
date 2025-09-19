
import { Template } from './template-types';

export const premiumInvitationTemplates: Template[] = [
  {
    id: 'elegant-wedding-01',
    name: 'Mariage Élégant - Rose Gold',
    type: 'invitation',
    category: 'wedding',
    thumbnail: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=600&fit=crop',
    previewImages: [],
    description: 'Template élégant pour mariage avec thème rose gold',
    isSystem: false,
    isPublic: true,
    popularity: 95,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['wedding', 'elegant', 'pink', 'romantic'],
    layout: {
      width: 400,
      height: 600,
      background: {
        type: 'gradient',
        value: '#fdf2f8',
        gradient: {
          type: 'linear',
          angle: 135,
          colors: ['#fdf2f8', '#fce7f3', '#fbcfe8'],
          stops: [0, 50, 100]
        }
      }
    },
    elements: [
      {
        id: 'header-flourish',
        type: 'image',
        position: { x: 200, y: 80 },
        size: { width: 300, height: 60 },
        rotation: 0,
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMzAwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTUwIDMwQzEzMCAyMCAxMTAgMjUgOTAgMzBDNzAgMzUgNTAgMzAgMzAgNDBDNTAgNTAgNzAgNDUgOTAgNDBDMTEwIDM1IDEzMCA0MCAxNTAgMzBaIiBmaWxsPSIjZjA2MjkyIiBmaWxsLW9wYWNpdHk9IjAuMyIvPgo8L3N2Zz4K',
        zIndex: 1,
        opacity: 1
      },
      {
        id: 'main-title',
        type: 'text',
        position: { x: 200, y: 150 },
        size: { width: 350, height: 60 },
        rotation: 0,
        content: 'Nous nous marions',
        fontFamily: 'Playfair Display',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#be185d',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'couple-names',
        type: 'text',
        position: { x: 200, y: 220 },
        size: { width: 350, height: 80 },
        rotation: 0,
        content: 'Marie & Pierre',
        fontFamily: 'Dancing Script',
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#881337',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'date-text',
        type: 'text',
        position: { x: 200, y: 320 },
        size: { width: 300, height: 40 },
        rotation: 0,
        content: 'Le 15 juin 2024 à 16h00',
        fontFamily: 'Inter',
        fontSize: 18,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#374151',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'location-text',
        type: 'text',
        position: { x: 200, y: 370 },
        size: { width: 300, height: 60 },
        rotation: 0,
        content: 'Château de Versailles\n78000 Versailles',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#6b7280',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'rsvp-text',
        type: 'text',
        position: { x: 200, y: 480 },
        size: { width: 280, height: 40 },
        rotation: 0,
        content: 'Merci de confirmer votre présence avant le 1er juin',
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#9ca3af',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'decorative-border',
        type: 'shape',
        position: { x: 200, y: 300 },
        size: { width: 360, height: 560 },
        rotation: 0,
        shape: 'rectangle',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#f9a8d4',
        borderRadius: 20,
        zIndex: 0,
        opacity: 0.7
      }
    ],
    defaultData: {},
    requiredFields: ['couple_names', 'event_date', 'event_time', 'venue_name', 'venue_address'],
    fonts: ['Playfair Display', 'Dancing Script', 'Inter'],
    colors: ['#be185d', '#881337', '#374151', '#6b7280', '#9ca3af', '#f9a8d4']
  },
  {
    id: 'modern-birthday-01',
    name: 'Anniversaire Moderne - Néon',
    type: 'invitation',
    category: 'birthday',
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=600&fit=crop',
    previewImages: [],
    description: 'Template moderne pour anniversaire avec effets néon',
    isSystem: false,
    isPublic: true,
    popularity: 88,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['birthday', 'modern', 'neon', 'party'],
    layout: {
      width: 400,
      height: 600,
      background: {
        type: 'gradient',
        value: '#1e1b4b',
        gradient: {
          type: 'radial',
          colors: ['#1e1b4b', '#312e81', '#4c1d95'],
          stops: [0, 50, 100]
        }
      }
    },
    elements: [
      {
        id: 'neon-title',
        type: 'text',
        position: { x: 200, y: 120 },
        size: { width: 350, height: 60 },
        rotation: 0,
        content: 'BIRTHDAY PARTY',
        fontFamily: 'Orbitron',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#00f5ff',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'age-circle',
        type: 'shape',
        position: { x: 200, y: 220 },
        size: { width: 120, height: 120 },
        rotation: 0,
        shape: 'ellipse',
        backgroundColor: '#ff006e',
        borderWidth: 4,
        borderColor: '#00f5ff',
        zIndex: 1,
        opacity: 0.9
      },
      {
        id: 'age-text',
        type: 'text',
        position: { x: 200, y: 220 },
        size: { width: 120, height: 120 },
        rotation: 0,
        content: '25',
        fontFamily: 'Orbitron',
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
        zIndex: 3,
        opacity: 1
      },
      {
        id: 'name-text',
        type: 'text',
        position: { x: 200, y: 320 },
        size: { width: 300, height: 40 },
        rotation: 0,
        content: 'ALEX MARTIN',
        fontFamily: 'Orbitron',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'date-neon',
        type: 'text',
        position: { x: 200, y: 380 },
        size: { width: 300, height: 30 },
        rotation: 0,
        content: 'SAMEDI 20 JUILLET 2024',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#00f5ff',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'time-location',
        type: 'text',
        position: { x: 200, y: 420 },
        size: { width: 300, height: 60 },
        rotation: 0,
        content: '20H00\nClub Paradise - 123 Rue de la Fête',
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#e2e8f0',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'glitch-effect',
        type: 'shape',
        position: { x: 50, y: 150 },
        size: { width: 300, height: 4 },
        rotation: 0,
        shape: 'rectangle',
        backgroundColor: '#00f5ff',
        zIndex: 0,
        opacity: 0.6
      }
    ],
    defaultData: {},
    requiredFields: ['birthday_person_name', 'age', 'event_date', 'event_time', 'venue_name'],
    fonts: ['Orbitron', 'Inter'],
    colors: ['#00f5ff', '#ff006e', '#ffffff', '#e2e8f0']
  },
  {
    id: 'corporate-conference-01',
    name: 'Conférence Corporate - Professionnel',
    type: 'ticket',
    category: 'corporate',
    thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop',
    previewImages: [],
    description: 'Template professionnel pour conférences d\'entreprise',
    isSystem: false,
    isPublic: true,
    popularity: 92,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['corporate', 'professional', 'conference', 'business'],
    layout: {
      width: 600,
      height: 300,
      background: {
        type: 'gradient',
        value: '#ffffff',
        gradient: {
          type: 'linear',
          angle: 45,
          colors: ['#ffffff', '#f8fafc', '#e2e8f0'],
          stops: [0, 50, 100]
        }
      }
    },
    elements: [
      {
        id: 'company-logo',
        type: 'shape',
        position: { x: 80, y: 60 },
        size: { width: 60, height: 60 },
        rotation: 0,
        shape: 'rectangle',
        backgroundColor: '#3b82f6',
        borderRadius: 12,
        zIndex: 1,
        opacity: 1
      },
      {
        id: 'conference-title',
        type: 'text',
        position: { x: 180, y: 50 },
        size: { width: 350, height: 30 },
        rotation: 0,
        content: 'INNOVATION SUMMIT 2024',
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#1e293b',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'subtitle',
        type: 'text',
        position: { x: 180, y: 80 },
        size: { width: 350, height: 20 },
        rotation: 0,
        content: 'Transforming Business Through Technology',
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: 'left',
        color: '#64748b',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'ticket-number',
        type: 'text',
        position: { x: 450, y: 30 },
        size: { width: 120, height: 20 },
        rotation: 0,
        content: 'TICKET #001234',
        fontFamily: 'JetBrains Mono',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#6b7280',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'attendee-name',
        type: 'text',
        position: { x: 80, y: 140 },
        size: { width: 250, height: 25 },
        rotation: 0,
        content: 'MARTIN DUBOIS',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#1e293b',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'event-details',
        type: 'text',
        position: { x: 80, y: 170 },
        size: { width: 300, height: 60 },
        rotation: 0,
        content: '15 Mars 2024 • 09:00-17:00\nCentre de Conférences La Défense\nParis, France',
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: 'normal',
        textAlign: 'left',
        color: '#475569',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'qr-placeholder',
        type: 'shape',
        position: { x: 480, y: 140 },
        size: { width: 80, height: 80 },
        rotation: 0,
        shape: 'rectangle',
        backgroundColor: '#f1f5f9',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        zIndex: 1,
        opacity: 1
      },
      {
        id: 'qr-text',
        type: 'text',
        position: { x: 480, y: 180 },
        size: { width: 80, height: 20 },
        rotation: 0,
        content: 'QR CODE',
        fontFamily: 'Inter',
        fontSize: 8,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#94a3b8',
        zIndex: 2,
        opacity: 1
      }
    ],
    defaultData: {},
    requiredFields: ['event_title', 'attendee_name', 'event_date', 'venue_name', 'ticket_number'],
    fonts: ['Inter', 'JetBrains Mono'],
    colors: ['#3b82f6', '#1e293b', '#64748b', '#6b7280', '#475569', '#94a3b8', '#f1f5f9', '#cbd5e1']
  }
];

export const premiumTicketTemplates: Template[] = [
  {
    id: 'concert-ticket-01',
    name: 'Billet Concert - Rock Festival',
    type: 'ticket',
    category: 'concert',
    thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=300&fit=crop',
    previewImages: [],
    description: 'Template de billet pour concerts et festivals de musique',
    isSystem: false,
    isPublic: true,
    popularity: 90,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['concert', 'music', 'ticket', 'festival'],
    layout: {
      width: 600,
      height: 250,
      background: {
        type: 'gradient',
        value: '#1a1a1a',
        gradient: {
          type: 'linear',
          angle: 135,
          colors: ['#1a1a1a', '#4c1d95', '#7c3aed'],
          stops: [0, 50, 100]
        }
      }
    },
    elements: [
      {
        id: 'festival-logo',
        type: 'text',
        position: { x: 80, y: 40 },
        size: { width: 200, height: 35 },
        rotation: 0,
        content: 'ROCK FESTIVAL',
        fontFamily: 'Orbitron',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#ffffff',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'artist-name',
        type: 'text',
        position: { x: 80, y: 80 },
        size: { width: 300, height: 40 },
        rotation: 0,
        content: 'THE ROLLING STONES',
        fontFamily: 'Impact',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#fbbf24',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'venue-date',
        type: 'text',
        position: { x: 80, y: 130 },
        size: { width: 280, height: 40 },
        rotation: 0,
        content: 'STADE DE FRANCE\n25 JUIN 2024 - 20:00',
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#e5e7eb',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'price-section',
        type: 'text',
        position: { x: 80, y: 180 },
        size: { width: 150, height: 40 },
        rotation: 0,
        content: 'FOSSE\n85,00 €',
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#10b981',
        zIndex: 2,
        opacity: 1
      },
      {
        id: 'ticket-stub',
        type: 'shape',
        position: { x: 480, y: 125 },
        size: { width: 2, height: 200 },
        rotation: 0,
        shape: 'rectangle',
        backgroundColor: '#ffffff',
        zIndex: 1,
        opacity: 0.3
      },
      {
        id: 'barcode-area',
        type: 'shape',
        position: { x: 520, y: 80 },
        size: { width: 60, height: 120 },
        rotation: 0,
        shape: 'rectangle',
        backgroundColor: '#ffffff',
        borderRadius: 4,
        zIndex: 1,
        opacity: 1
      },
      {
        id: 'ticket-number-stub',
        type: 'text',
        position: { x: 500, y: 220 },
        size: { width: 80, height: 15 },
        rotation: 0,
        content: '#RS240625001',
        fontFamily: 'JetBrains Mono',
        fontSize: 8,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#ffffff',
        zIndex: 2,
        opacity: 0.8
      }
    ],
    defaultData: {},
    requiredFields: ['artist_name', 'venue_name', 'event_date', 'event_time', 'price', 'ticket_type'],
    fonts: ['Orbitron', 'Impact', 'Inter', 'JetBrains Mono'],
    colors: ['#ffffff', '#fbbf24', '#e5e7eb', '#10b981']
  }
];

export const getAllPremiumTemplates = (): Template[] => {
  return [...premiumInvitationTemplates, ...premiumTicketTemplates];
};
