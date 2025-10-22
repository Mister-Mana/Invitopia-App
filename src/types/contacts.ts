
export interface Contact {
  id: string;
  user_id: string;
  name: string;
  email?: string;
  phone?: string;
  organization?: string;
  tags: string[];
  notes?: string;
  avatar_url?: string;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactGroup {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  color: string;
  created_at: string;
  updated_at: string;
  count?: number;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  members?: number;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id?: string;
  email?: string;
  role: string;
  permissions: Record<string, any>;
  status: 'pending' | 'accepted' | 'declined';
  invited_by?: string;
  invited_at: string;
  joined_at?: string;
}
