
export interface EventCategory {
  id: string;
  name: string;
  color: string;
}

export interface EventLocation {
  address?: string;
  city?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface EventDesign {
  coverImage?: string;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  theme?: string;
}

export interface EventSettings {
  allowPlusOnes?: boolean;
  requireRSVP?: boolean;
  showGuestList?: boolean;
  enableComments?: boolean;
  imageUrl?: string;
}

export const EVENT_CATEGORIES: Record<string, EventCategory> = {
  wedding: { id: 'wedding', name: 'Mariage', color: '#EC4899' },
  birthday: { id: 'birthday', name: 'Anniversaire', color: '#F59E0B' },
  corporate: { id: 'corporate', name: 'Entreprise', color: '#3B82F6' },
  conference: { id: 'conference', name: 'Conférence', color: '#8B5CF6' },
  party: { id: 'party', name: 'Fête', color: '#10B981' },
  social: { id: 'social', name: 'Social', color: '#F97316' },
  fundraiser: { id: 'fundraiser', name: 'Collecte de fonds', color: '#EF4444' },
  other: { id: 'other', name: 'Autre', color: '#6B7280' }
};
