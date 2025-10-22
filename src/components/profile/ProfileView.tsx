
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Building,
  Edit3
} from 'lucide-react';

interface ProfileViewProps {
  onEdit: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onEdit }) => {
  const { user } = useAuth();

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'destructive';
      case 'admin':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Super Administrateur';
      case 'admin':
        return 'Administrateur';
      default:
        return 'Organisateur';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Profile Overview Card */}
      <Card className="lg:col-span-1">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-20 w-20 md:h-24 md:w-24">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="text-lg md:text-xl bg-invitopia-100 text-invitopia-700">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-lg md:text-xl">{user?.name}</CardTitle>
          <div className="flex justify-center mt-2">
            <Badge variant={getRoleBadgeVariant(user?.role || 'organizer')} className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              {getRoleLabel(user?.role || 'organizer')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            {user?.email && (
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="break-all">{user.email}</span>
              </div>
            )}
            {user?.phone && (
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="break-all">{user.phone}</span>
              </div>
            )}
            {user?.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="break-all">{user.location}</span>
              </div>
            )}
            {user?.organization && (
              <div className="flex items-center gap-2 text-gray-600">
                <Building className="h-4 w-4 flex-shrink-0" />
                <span className="break-all">{user.organization}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span className="text-xs">
                Membre depuis {new Date(user?.created_at || '').toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
          <Button onClick={onEdit} className="w-full" size="sm">
            <Edit3 className="h-4 w-4 mr-2" />
            Modifier le profil
          </Button>
        </CardContent>
      </Card>

      {/* Profile Details */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Informations personnelles</span>
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit3 className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Nom complet</Label>
              <p className="text-sm text-gray-600 mt-1">{user?.name || 'Non renseigné'}</p>
            </div>
            <div>
              <Label>Email</Label>
              <p className="text-sm text-gray-600 mt-1">{user?.email || 'Non renseigné'}</p>
            </div>
            <div>
              <Label>Téléphone</Label>
              <p className="text-sm text-gray-600 mt-1">{user?.phone || 'Non renseigné'}</p>
            </div>
            <div>
              <Label>Organisation</Label>
              <p className="text-sm text-gray-600 mt-1">{user?.organization || 'Non renseigné'}</p>
            </div>
            <div>
              <Label>Localisation</Label>
              <p className="text-sm text-gray-600 mt-1">{user?.location || 'Non renseigné'}</p>
            </div>
            <div>
              <Label>Rôle</Label>
              <p className="text-sm text-gray-600 mt-1">{getRoleLabel(user?.role || 'organizer')}</p>
            </div>
          </div>
          
          {user?.bio && (
            <div>
              <Label>Biographie</Label>
              <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                {user.bio}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="text-sm font-medium text-gray-900">{children}</label>
);

export default ProfileView;
