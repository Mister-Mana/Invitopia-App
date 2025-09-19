
import { Template } from './template-types';

// Generate invitation templates
export const invitationTemplates: Template[] = [
  {
    id: 'wedding-elegant-1',
    name: 'Élégant Minimaliste',
    type: 'invitation',
    category: 'wedding',
    thumbnail: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1607190075866-485d7a9dc3c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Un design simple et élégant pour votre invitation de mariage avec des accents floraux subtils.',
    isSystem: true,
    isPublic: true,
    popularity: 156,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-06-22T00:00:00Z',
    tags: ['élégant', 'minimaliste', 'floral', 'mariage', 'premium'],
    layout: {
      width: 1500,
      height: 2100,
      background: {
        type: 'color',
        value: '#ffffff'
      },
      bleed: 3,
      margins: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40
      }
    },
    elements: [
      {
        id: 'title',
        type: 'text',
        position: { x: 750, y: 500 },
        size: { width: 1000, height: 100 },
        rotation: 0,
        zIndex: 10,
        content: 'Invitation',
        fontFamily: 'Playfair Display',
        fontSize: 72,
        fontWeight: 'normal',
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#6E59A5',
        opacity: 1
      },
      {
        id: 'names',
        type: 'text',
        position: { x: 750, y: 700 },
        size: { width: 900, height: 120 },
        rotation: 0,
        zIndex: 11,
        content: 'Julie & Marc',
        fontFamily: 'Montserrat',
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#6E59A5',
        opacity: 1
      },
      {
        id: 'description',
        type: 'text',
        position: { x: 750, y: 900 },
        size: { width: 800, height: 100 },
        rotation: 0,
        zIndex: 12,
        content: 'Ont le plaisir de vous convier à leur mariage',
        fontFamily: 'Montserrat',
        fontSize: 24,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#4B4B4B',
        opacity: 1
      },
      {
        id: 'date',
        type: 'text',
        position: { x: 750, y: 1050 },
        size: { width: 700, height: 80 },
        rotation: 0,
        zIndex: 13,
        content: 'Le 12 juin 2024',
        fontFamily: 'Montserrat',
        fontSize: 28,
        fontWeight: 'medium',
        textAlign: 'center',
        color: '#4B4B4B',
        opacity: 1
      },
      {
        id: 'time',
        type: 'text',
        position: { x: 750, y: 1120 },
        size: { width: 700, height: 80 },
        rotation: 0,
        zIndex: 14,
        content: 'à 15h00',
        fontFamily: 'Montserrat',
        fontSize: 28,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#4B4B4B',
        opacity: 1
      },
      {
        id: 'location',
        type: 'text',
        position: { x: 750, y: 1250 },
        size: { width: 800, height: 80 },
        rotation: 0,
        zIndex: 15,
        content: 'Château de Versailles, Paris',
        fontFamily: 'Playfair Display',
        fontSize: 24,
        fontWeight: 'normal',
        fontStyle: 'italic',
        textAlign: 'center',
        color: '#4B4B4B',
        opacity: 1
      },
      {
        id: 'decorative-line-top',
        type: 'shape',
        position: { x: 750, y: 350 },
        size: { width: 200, height: 2 },
        rotation: 0,
        zIndex: 5,
        shape: 'rectangle',
        backgroundColor: '#6E59A5',
        opacity: 0.8
      },
      {
        id: 'decorative-line-bottom',
        type: 'shape',
        position: { x: 750, y: 1400 },
        size: { width: 200, height: 2 },
        rotation: 0,
        zIndex: 5,
        shape: 'rectangle',
        backgroundColor: '#6E59A5',
        opacity: 0.8
      }
    ],
    defaultData: {
      names: 'Julie & Marc',
      date: 'Le 12 juin 2024',
      time: 'à 15h00',
      location: 'Château de Versailles, Paris',
      description: 'Ont le plaisir de vous convier à leur mariage'
    },
    requiredFields: ['names', 'date', 'location'],
    fonts: ['Playfair Display', 'Montserrat'],
    colors: ['#6E59A5', '#4B4B4B', '#ffffff']
  },
  {
    id: 'birthday-fun-1',
    name: 'Anniversaire Festif',
    type: 'invitation',
    category: 'birthday',
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Une invitation d\'anniversaire colorée et festive pour célébrer en grand style!',
    isSystem: true,
    isPublic: true,
    popularity: 142,
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-07-15T00:00:00Z',
    tags: ['anniversaire', 'coloré', 'festif', 'amusant', 'célébration'],
    layout: {
      width: 1500,
      height: 2100,
      background: {
        type: 'gradient',
        value: 'linear-gradient',
        gradient: {
          type: 'linear',
          colors: ['#FF9A8B', '#FF6B95'],
          stops: [0, 100],
          angle: 135
        }
      }
    },
    elements: [
      {
        id: 'title',
        type: 'text',
        position: { x: 750, y: 500 },
        size: { width: 1000, height: 100 },
        rotation: 0,
        zIndex: 10,
        content: 'Fête d\'anniversaire!',
        fontFamily: 'Poppins',
        fontSize: 64,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#ffffff',
        opacity: 1
      }
    ],
    defaultData: {
      title: 'Fête d\'anniversaire!',
      name: 'Emma',
      age: '30',
      date: 'Samedi 15 juin 2024',
      time: '19h00',
      location: 'Restaurant Le Festif, Paris'
    },
    requiredFields: ['name', 'date', 'location'],
    fonts: ['Poppins', 'Roboto'],
    colors: ['#FF9A8B', '#FF6B95', '#ffffff', '#333333']
  },
  {
    id: 'corporate-professional-1',
    name: 'Conférence Professionnelle',
    type: 'invitation',
    category: 'corporate',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Une invitation professionnelle et moderne pour vos événements d\'entreprise.',
    isSystem: true,
    isPublic: true,
    popularity: 89,
    createdAt: '2023-03-20T00:00:00Z',
    updatedAt: '2023-08-10T00:00:00Z',
    tags: ['professionnel', 'entreprise', 'conférence', 'moderne', 'business'],
    layout: {
      width: 1500,
      height: 2100,
      background: {
        type: 'color',
        value: '#ffffff'
      }
    },
    elements: [
      {
        id: 'title',
        type: 'text',
        position: { x: 750, y: 400 },
        size: { width: 1200, height: 120 },
        rotation: 0,
        zIndex: 10,
        content: 'INNOVATION SUMMIT 2024',
        fontFamily: 'Inter',
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1E40AF',
        opacity: 1
      },
      {
        id: 'subtitle',
        type: 'text',
        position: { x: 750, y: 550 },
        size: { width: 1000, height: 80 },
        rotation: 0,
        zIndex: 11,
        content: 'L\'avenir de la technologie',
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#64748B',
        opacity: 1
      }
    ],
    defaultData: {
      title: 'INNOVATION SUMMIT 2024',
      subtitle: 'L\'avenir de la technologie',
      date: '15 septembre 2024',
      time: '9h00 - 17h00',
      location: 'Centre de Conférences, Paris',
      organizer: 'TechCorp'
    },
    requiredFields: ['title', 'date', 'location'],
    fonts: ['Inter', 'Roboto'],
    colors: ['#1E40AF', '#64748B', '#ffffff', '#F8FAFC']
  },
  {
    id: 'graduation-elegant-1',
    name: 'Remise de Diplômes',
    type: 'invitation',
    category: 'graduation',
    thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Une invitation solennelle et élégante pour célébrer la réussite académique.',
    isSystem: true,
    isPublic: true,
    popularity: 67,
    createdAt: '2023-04-05T00:00:00Z',
    updatedAt: '2023-09-01T00:00:00Z',
    tags: ['diplôme', 'graduation', 'académique', 'élégant', 'cérémonie'],
    layout: {
      width: 1500,
      height: 2100,
      background: {
        type: 'gradient',
        value: 'linear-gradient',
        gradient: {
          type: 'linear',
          colors: ['#1E3A8A', '#3B82F6'],
          stops: [0, 100],
          angle: 45
        }
      }
    },
    elements: [
      {
        id: 'title',
        type: 'text',
        position: { x: 750, y: 450 },
        size: { width: 1200, height: 100 },
        rotation: 0,
        zIndex: 10,
        content: 'CÉRÉMONIE DE REMISE DE DIPLÔMES',
        fontFamily: 'Playfair Display',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
        opacity: 1
      }
    ],
    defaultData: {
      title: 'CÉRÉMONIE DE REMISE DE DIPLÔMES',
      studentName: 'Marie Dubois',
      degree: 'Master en Informatique',
      university: 'Université de Paris',
      date: '20 juin 2024',
      time: '14h00',
      location: 'Grand Amphithéâtre'
    },
    requiredFields: ['studentName', 'degree', 'date', 'location'],
    fonts: ['Playfair Display', 'Inter'],
    colors: ['#1E3A8A', '#3B82F6', '#ffffff', '#F1F5F9']
  },
  {
    id: 'baby-shower-cute-1',
    name: 'Baby Shower Pastel',
    type: 'invitation',
    category: 'baby-shower',
    thumbnail: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Une invitation douce et tendre pour célébrer l\'arrivée de bébé.',
    isSystem: true,
    isPublic: true,
    popularity: 98,
    createdAt: '2023-05-12T00:00:00Z',
    updatedAt: '2023-10-05T00:00:00Z',
    tags: ['baby shower', 'pastel', 'doux', 'bébé', 'famille'],
    layout: {
      width: 1500,
      height: 2100,
      background: {
        type: 'gradient',
        value: 'linear-gradient',
        gradient: {
          type: 'radial',
          colors: ['#FCE7F3', '#F3E8FF'],
          stops: [0, 100]
        }
      }
    },
    elements: [
      {
        id: 'title',
        type: 'text',
        position: { x: 750, y: 500 },
        size: { width: 1000, height: 100 },
        rotation: 0,
        zIndex: 10,
        content: 'Baby Shower',
        fontFamily: 'Caveat',
        fontSize: 64,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#BE185D',
        opacity: 1
      }
    ],
    defaultData: {
      title: 'Baby Shower',
      momName: 'Sophie',
      message: 'Célébrons l\'arrivée de notre petit miracle',
      date: '25 mai 2024',
      time: '15h00',
      location: 'Chez Grand-maman'
    },
    requiredFields: ['momName', 'date', 'location'],
    fonts: ['Caveat', 'Nunito'],
    colors: ['#BE185D', '#FCE7F3', '#F3E8FF', '#6B46C1']
  },
  {
    id: 'housewarming-warm-1',
    name: 'Pendaison de Crémaillère',
    type: 'invitation',
    category: 'housewarming',
    thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Une invitation chaleureuse pour célébrer votre nouveau chez-vous.',
    isSystem: true,
    isPublic: true,
    popularity: 76,
    createdAt: '2023-06-18T00:00:00Z',
    updatedAt: '2023-11-12T00:00:00Z',
    tags: ['maison', 'pendaison de crémaillère', 'nouveau logement', 'chaleureux'],
    layout: {
      width: 1500,
      height: 2100,
      background: {
        type: 'color',
        value: '#FFFBEB'
      }
    },
    elements: [
      {
        id: 'title',
        type: 'text',
        position: { x: 750, y: 480 },
        size: { width: 1200, height: 120 },
        rotation: 0,
        zIndex: 10,
        content: 'Pendaison de Crémaillère',
        fontFamily: 'Dancing Script',
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#92400E',
        opacity: 1
      }
    ],
    defaultData: {
      title: 'Pendaison de Crémaillère',
      hosts: 'Amélie & Thomas',
      message: 'Venez découvrir notre nouveau chez-nous !',
      date: '10 juillet 2024',
      time: '18h30',
      address: '15 rue des Fleurs, 75001 Paris'
    },
    requiredFields: ['hosts', 'date', 'address'],
    fonts: ['Dancing Script', 'Open Sans'],
    colors: ['#92400E', '#FFFBEB', '#FEF3C7', '#D97706']
  }
];
