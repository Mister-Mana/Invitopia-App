
import { Template } from './template-types';

// Generate ticket templates
export const ticketTemplates: Template[] = [
  {
    id: 'concert-vip-1',
    name: 'Concert VIP',
    type: 'ticket',
    category: 'concert',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Un billet VIP élégant et moderne pour les concerts et performances musicales.',
    isSystem: true,
    isPublic: true,
    popularity: 178,
    createdAt: '2023-03-05T00:00:00Z',
    updatedAt: '2023-08-12T00:00:00Z',
    tags: ['concert', 'vip', 'musique', 'événement', 'premium'],
    layout: {
      width: 2100,
      height: 900,
      background: {
        type: 'gradient',
        value: 'linear-gradient',
        gradient: {
          type: 'linear',
          colors: ['#111111', '#333333'],
          stops: [0, 100],
          angle: 180
        }
      }
    },
    elements: [
      {
        id: 'title',
        type: 'text',
        position: { x: 400, y: 150 },
        size: { width: 700, height: 100 },
        rotation: 0,
        zIndex: 10,
        content: 'WORLD TOUR 2024',
        fontFamily: 'Montserrat',
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'left',
        color: '#f43f5e',
        opacity: 1
      },
      {
        id: 'artist',
        type: 'text',
        position: { x: 400, y: 220 },
        size: { width: 700, height: 120 },
        rotation: 0,
        zIndex: 11,
        content: 'TAYLOR SWIFT',
        fontFamily: 'Montserrat',
        fontSize: 64,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#ffffff',
        opacity: 1
      }
    ],
    defaultData: {
      title: 'WORLD TOUR 2024',
      artist: 'TAYLOR SWIFT',
      date: '10 AOÛT 2024',
      time: '20:00',
      venue: 'STADE DE FRANCE, PARIS',
      seat: 'SECTION A, RANG 12, SIÈGE 34',
      ticketType: 'VIP PACKAGE',
      price: '€350.00',
      ticketId: 'TICKET-ID-12345678',
      barcode: '12345678901234'
    },
    requiredFields: ['artist', 'date', 'venue', 'ticketId', 'barcode'],
    fonts: ['Montserrat'],
    colors: ['#111111', '#333333', '#ffffff', '#f43f5e']
  },
  {
    id: 'conference-tech-1',
    name: 'Conférence Tech',
    type: 'ticket',
    category: 'conference',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Un billet moderne pour les conférences technologiques et événements professionnels.',
    isSystem: true,
    isPublic: true,
    popularity: 135,
    createdAt: '2023-04-18T00:00:00Z',
    updatedAt: '2023-09-22T00:00:00Z',
    tags: ['conférence', 'technologie', 'professionnel', 'business', 'digital'],
    layout: {
      width: 2100,
      height: 900,
      background: {
        type: 'color',
        value: '#ffffff'
      }
    },
    elements: [
      {
        id: 'conference-logo',
        type: 'text',
        position: { x: 400, y: 150 },
        size: { width: 700, height: 100 },
        rotation: 0,
        zIndex: 10,
        content: 'TECH SUMMIT 2024',
        fontFamily: 'Inter',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#3b82f6',
        opacity: 1
      }
    ],
    defaultData: {
      title: 'TECH SUMMIT 2024',
      date: '15-17 SEPTEMBRE 2024',
      venue: 'CENTRE DE CONFÉRENCES, PARIS',
      name: 'Alex Dupont',
      ticketType: 'ALL ACCESS PASS',
      price: '€499.00'
    },
    requiredFields: ['title', 'date', 'name', 'ticketType'],
    fonts: ['Inter', 'Roboto'],
    colors: ['#ffffff', '#3b82f6', '#111111', '#F1F5F9']
  },
  {
    id: 'theater-classic-1',
    name: 'Théâtre Classique',
    type: 'ticket',
    category: 'theater',
    thumbnail: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Un billet élégant et traditionnel pour les représentations théâtrales.',
    isSystem: true,
    isPublic: true,
    popularity: 92,
    createdAt: '2023-05-22T00:00:00Z',
    updatedAt: '2023-10-15T00:00:00Z',
    tags: ['théâtre', 'classique', 'spectacle', 'culture', 'art'],
    layout: {
      width: 2100,
      height: 900,
      background: {
        type: 'gradient',
        value: 'linear-gradient',
        gradient: {
          type: 'linear',
          colors: ['#7C2D12', '#DC2626'],
          stops: [0, 100],
          angle: 45
        }
      }
    },
    elements: [
      {
        id: 'theater-name',
        type: 'text',
        position: { x: 400, y: 120 },
        size: { width: 800, height: 80 },
        rotation: 0,
        zIndex: 10,
        content: 'THÉÂTRE NATIONAL',
        fontFamily: 'Playfair Display',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#FEF3C7',
        opacity: 1
      },
      {
        id: 'play-title',
        type: 'text',
        position: { x: 400, y: 200 },
        size: { width: 800, height: 120 },
        rotation: 0,
        zIndex: 11,
        content: 'ROMÉO ET JULIETTE',
        fontFamily: 'Playfair Display',
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#ffffff',
        opacity: 1
      }
    ],
    defaultData: {
      theaterName: 'THÉÂTRE NATIONAL',
      playTitle: 'ROMÉO ET JULIETTE',
      date: '25 OCTOBRE 2024',
      time: '20H30',
      seat: 'ORCHESTRE - RANG 15 - SIÈGE 12',
      price: '€75.00',
      ticketId: 'TH-2024-089567'
    },
    requiredFields: ['playTitle', 'date', 'seat', 'ticketId'],
    fonts: ['Playfair Display', 'Crimson Text'],
    colors: ['#7C2D12', '#DC2626', '#ffffff', '#FEF3C7']
  },
  {
    id: 'sports-match-1',
    name: 'Match Sportif',
    type: 'ticket',
    category: 'sports',
    thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Un billet dynamique et énergique pour les événements sportifs.',
    isSystem: true,
    isPublic: true,
    popularity: 156,
    createdAt: '2023-06-08T00:00:00Z',
    updatedAt: '2023-11-20T00:00:00Z',
    tags: ['sport', 'match', 'football', 'stade', 'équipe'],
    layout: {
      width: 2100,
      height: 900,
      background: {
        type: 'gradient',
        value: 'linear-gradient',
        gradient: {
          type: 'linear',
          colors: ['#065F46', '#10B981'],
          stops: [0, 100],
          angle: 135
        }
      }
    },
    elements: [
      {
        id: 'league',
        type: 'text',
        position: { x: 400, y: 120 },
        size: { width: 600, height: 60 },
        rotation: 0,
        zIndex: 10,
        content: 'LIGUE 1 - SAISON 2024',
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#A7F3D0',
        opacity: 1
      },
      {
        id: 'teams',
        type: 'text',
        position: { x: 400, y: 200 },
        size: { width: 900, height: 120 },
        rotation: 0,
        zIndex: 11,
        content: 'PSG vs MARSEILLE',
        fontFamily: 'Roboto',
        fontSize: 52,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#ffffff',
        opacity: 1
      }
    ],
    defaultData: {
      league: 'LIGUE 1 - SAISON 2024',
      teams: 'PSG vs MARSEILLE',
      date: '15 DÉCEMBRE 2024',
      time: '21H00',
      stadium: 'PARC DES PRINCES',
      section: 'TRIBUNE PRÉSIDENTIELLE',
      seat: 'BLOC P - RANG 8 - SIÈGE 15',
      price: '€120.00',
      ticketId: 'SP-2024-156789'
    },
    requiredFields: ['teams', 'date', 'stadium', 'seat', 'ticketId'],
    fonts: ['Roboto', 'Open Sans'],
    colors: ['#065F46', '#10B981', '#ffffff', '#A7F3D0']
  }
];
