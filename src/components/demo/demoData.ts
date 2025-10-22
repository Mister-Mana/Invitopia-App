
export const demoEvents = [
  {
    id: '1',
    title: 'Mariage de Sarah & Pierre',
    type: 'wedding',
    date: '2024-07-15',
    time: '14:00',
    location: 'Château de Versailles',
    guests: 120,
    confirmed: 85,
    pending: 25,
    declined: 10,
    status: 'published',
    description: 'Une célébration magique dans un cadre d\'exception',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    budget: 15000,
    spent: 12500
  },
  {
    id: '2',
    title: 'Anniversaire Corporate Tech Innovate',
    type: 'corporate',
    date: '2024-06-20',
    time: '18:30',
    location: 'Hotel Le Meurice',
    guests: 80,
    confirmed: 65,
    pending: 10,
    declined: 5,
    status: 'draft',
    description: 'Célébration des 10 ans de l\'entreprise',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    budget: 8000,
    spent: 6200
  },
  {
    id: '3',
    title: 'Soirée de Gala Caritative',
    type: 'gala',
    date: '2024-08-10',
    time: '19:00',
    location: 'Opéra de Paris',
    guests: 200,
    confirmed: 150,
    pending: 30,
    declined: 20,
    status: 'published',
    description: 'Collecte de fonds pour l\'association Les Restos du Cœur',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    budget: 25000,
    spent: 18750
  }
];

export const demoGuests = [
  {
    id: '1',
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    status: 'confirmed',
    table: 'Table 1',
    dietaryRestrictions: 'Végétarien',
    plusOne: true
  },
  {
    id: '2',
    name: 'Jean Martin',
    email: 'jean.martin@email.com',
    status: 'pending',
    table: 'Table 2',
    dietaryRestrictions: 'Aucune',
    plusOne: false
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@email.com',
    status: 'declined',
    table: '-',
    dietaryRestrictions: 'Sans gluten',
    plusOne: true
  }
];

export const demoTemplates = [
  {
    id: '1',
    name: 'Élégance Moderne',
    category: 'Mariage',
    image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: 'Gratuit',
    rating: 4.8,
    downloads: 1245
  },
  {
    id: '2',
    name: 'Corporate Chic',
    category: 'Entreprise',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: '9.99€',
    rating: 4.6,
    downloads: 892
  },
  {
    id: '3',
    name: 'Gala Premium',
    category: 'Événementiel',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    price: '19.99€',
    rating: 4.9,
    downloads: 567
  }
];
