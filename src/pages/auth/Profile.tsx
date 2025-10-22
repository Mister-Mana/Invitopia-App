
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, MapPin, Calendar, Shield, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import UserBadgeDisplay from '@/components/badges/UserBadgeDisplay';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userBadge, setUserBadge] = useState<{
    badge_type: 'verified' | 'professional' | 'premium' | 'excellence';
    expires_at: string | null;
    status: string;
  } | null>(null);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    location: user?.location || '',
  });

  useEffect(() => {
    const fetchUserBadge = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('badges')
          .select('badge_type, expires_at, status')
          .eq('user_id', user.id)
          .eq('status', 'approved')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (data && !error) {
          setUserBadge(data);
        }
      } catch (error) {
        console.error('Error fetching badge:', error);
      }
    };

    fetchUserBadge();
  }, [user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateProfile) return;
    
    setIsLoading(true);
    try {
      await updateProfile(formData);
      toast.success('Profil mis à jour avec succès');
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la mise à jour');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      location: user?.location || '',
    });
    setIsEditing(false);
  };

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
        return 'Utilisateur';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-invitopia-800">
            Mon Profil
          </h1>
          <p className="text-invitopia-600 mt-2">
            Gérez vos informations personnelles et préférences de compte
          </p>
        </div>

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
              <CardDescription className="break-all text-sm">{user?.email}</CardDescription>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <Badge variant={getRoleBadgeVariant(user?.role || 'user')} className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  {getRoleLabel(user?.role || 'user')}
                </Badge>
                {userBadge && (
                  <UserBadgeDisplay
                    badgeType={userBadge.badge_type}
                    expiresAt={userBadge.expires_at}
                    size="sm"
                  />
                )}
              </div>
              {!userBadge && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full text-xs"
                  onClick={() => navigate('/badge-application')}
                >
                  <Award className="h-3 w-3 mr-1" />
                  Obtenir la certification
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
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
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span className="text-xs">
                    Membre depuis {new Date(user?.created_at || '').toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Edit Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg md:text-xl">Informations personnelles</span>
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="text-xs md:text-sm"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                )}
              </CardTitle>
              <CardDescription>
                Mettez à jour vos informations de profil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Nom complet
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      className="text-sm"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Téléphone
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                      placeholder="+33 6 12 34 56 78"
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">
                      Localisation
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Paris, France"
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium">
                    Biographie
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Parlez-nous de vous..."
                    rows={3}
                    className="text-sm resize-none"
                  />
                </div>

                {isEditing && (
                  <>
                    <Separator />
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="w-full sm:w-auto"
                      >
                        Annuler
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:w-auto"
                      >
                        {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
