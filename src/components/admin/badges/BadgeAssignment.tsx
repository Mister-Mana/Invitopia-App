
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Award, 
  Plus, 
  Search, 
  UserCheck,
  Clock,
  CheckCircle
} from 'lucide-react';

type BadgeType = Database['public']['Enums']['badge_type'];
type BadgeStatus = Database['public']['Enums']['badge_status'];
type PaymentStatus = Database['public']['Enums']['payment_status'];

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  organization?: string;
}

const BadgeAssignment: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const [assignmentData, setAssignmentData] = useState({
    badge_type: 'verified' as BadgeType,
    application_reason: '',
    expires_at: '',
    price: 0
  });

  const badgeTypes = [
    { value: 'verified' as BadgeType, label: 'Vérifié', color: 'bg-blue-500', price: 0 },
    { value: 'professional' as BadgeType, label: 'Professionnel', color: 'bg-purple-500', price: 29 },
    { value: 'premium' as BadgeType, label: 'Premium', color: 'bg-gold-500', price: 99 },
    { value: 'excellence' as BadgeType, label: 'Excellence', color: 'bg-emerald-500', price: 199 }
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(u => 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.organization?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('name');

      if (error) throw error;
      setUsers(data || []);
      setFilteredUsers(data || []);
    } catch (error: any) {
      toast.error('Erreur lors du chargement des utilisateurs');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const openAssignDialog = (targetUser: User) => {
    setSelectedUser(targetUser);
    setAssignmentData({
      badge_type: 'verified' as BadgeType,
      application_reason: `Attribution manuelle de badge pour ${targetUser.name}`,
      expires_at: '',
      price: 0
    });
    setIsAssignDialogOpen(true);
  };

  const handleAssignBadge = async () => {
    if (!selectedUser || !user) return;

    try {
      const selectedBadgeType = badgeTypes.find(type => type.value === assignmentData.badge_type);
      
      const badgeData = {
        user_id: selectedUser.id,
        badge_type: assignmentData.badge_type,
        application_reason: assignmentData.application_reason,
        status: 'approved' as BadgeStatus,
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
        applied_at: new Date().toISOString(),
        expires_at: assignmentData.expires_at || null,
        price: selectedBadgeType?.price || 0,
        payment_status: 'completed' as PaymentStatus
      };

      const { error } = await supabase
        .from('badges')
        .insert(badgeData);

      if (error) throw error;

      toast.success(`Badge ${selectedBadgeType?.label} attribué à ${selectedUser.name}`);
      setIsAssignDialogOpen(false);
      setSelectedUser(null);
    } catch (error: any) {
      toast.error('Erreur lors de l\'attribution du badge');
      console.error('Error assigning badge:', error);
    }
  };

  const getUserBadges = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('badges')
        .select('badge_type, status, expires_at')
        .eq('user_id', userId)
        .eq('status', 'approved');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching user badges:', error);
      return [];
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Attribution de badges</h3>
          <p className="text-gray-600">Attribuez des badges aux utilisateurs</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((targetUser) => (
          <UserCard 
            key={targetUser.id} 
            user={targetUser} 
            onAssignBadge={() => openAssignDialog(targetUser)}
            getUserBadges={getUserBadges}
          />
        ))}
      </div>

      {/* Assignment Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Attribuer un badge</DialogTitle>
            <DialogDescription>
              Attribuer un badge à {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Type de badge</Label>
              <Select 
                value={assignmentData.badge_type} 
                onValueChange={(value: BadgeType) => {
                  const selectedType = badgeTypes.find(type => type.value === value);
                  setAssignmentData({ 
                    ...assignmentData, 
                    badge_type: value,
                    price: selectedType?.price || 0
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {badgeTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${type.color} mr-2`} />
                        {type.label} {type.price > 0 && `(${type.price}€)`}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Raison de l'attribution</Label>
              <Textarea
                value={assignmentData.application_reason}
                onChange={(e) => setAssignmentData({ ...assignmentData, application_reason: e.target.value })}
                placeholder="Expliquez pourquoi ce badge est attribué..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Date d'expiration (optionnel)</Label>
              <Input
                type="datetime-local"
                value={assignmentData.expires_at}
                onChange={(e) => setAssignmentData({ ...assignmentData, expires_at: e.target.value })}
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Prix du badge:</span>
                <span className="text-lg font-bold">{assignmentData.price}€</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Ce badge sera marqué comme payé automatiquement lors de l'attribution manuelle.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAssignBadge}>
              <Award className="h-4 w-4 mr-2" />
              Attribuer le badge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const UserCard: React.FC<{
  user: User;
  onAssignBadge: () => void;
  getUserBadges: (userId: string) => Promise<any[]>;
}> = ({ user, onAssignBadge, getUserBadges }) => {
  const [badges, setBadges] = useState<any[]>([]);

  useEffect(() => {
    getUserBadges(user.id).then(setBadges);
  }, [user.id, getUserBadges]);

  const badgeColors: Record<string, string> = {
    verified: 'bg-blue-500',
    professional: 'bg-purple-500',
    premium: 'bg-yellow-500',
    excellence: 'bg-emerald-500'
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              {user.organization && (
                <p className="text-xs text-gray-500">{user.organization}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Rôle:</span>
            <Badge variant="outline" className="capitalize">
              {user.role}
            </Badge>
          </div>
          
          {badges.length > 0 && (
            <div>
              <span className="text-sm text-gray-600">Badges:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {badges.map((badge, index) => (
                  <Badge 
                    key={index} 
                    className={`text-white ${badgeColors[badge.badge_type] || 'bg-gray-500'}`}
                  >
                    {badge.badge_type}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button 
          onClick={onAssignBadge}
          className="w-full"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Attribuer un badge
        </Button>
      </CardContent>
    </Card>
  );
};

export default BadgeAssignment;
