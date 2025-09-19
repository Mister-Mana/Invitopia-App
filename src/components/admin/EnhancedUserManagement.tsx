import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  UserCheck, 
  Search, 
  Filter, 
  Shield, 
  Crown, 
  User, 
  Edit, 
  Trash2,
  MoreHorizontal,
  AlertTriangle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'organizer' | 'admin' | 'super_admin' | 'guest';
  organization?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

const EnhancedUserManagement: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  const hasAccess = user?.role === 'admin' || user?.role === 'super_admin';

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasAccess) {
      fetchUsers();
    }
  }, [hasAccess]);

  const canManageUser = (targetUser: UserProfile) => {
    if (user?.role === 'super_admin') return true;
    if (user?.role === 'admin') {
      // Admin peut gérer organisateurs et autres admins, mais pas super_admin
      return targetUser.role !== 'super_admin';
    }
    return false;
  };

  const canChangeRole = (targetRole: string) => {
    if (user?.role === 'super_admin') return true;
    if (user?.role === 'admin') {
      // Admin peut attribuer organisateur et admin, mais pas super_admin
      return targetRole !== 'super_admin';
    }
    return false;
  };

  const updateUserRole = async (userId: string, newRole: 'organizer' | 'admin' | 'super_admin' | 'guest') => {
    if (!canChangeRole(newRole)) {
      toast.error('Vous n\'avez pas l\'autorisation d\'attribuer ce rôle');
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) throw error;

      setUsers(prev => prev.map(u => 
        u.id === userId 
          ? { ...u, role: newRole, updated_at: new Date().toISOString() }
          : u
      ));

      toast.success('Rôle utilisateur mis à jour avec succès');
    } catch (err: any) {
      toast.error(`Erreur: ${err.message}`);
    }
  };

  const deleteUser = async (userId: string, targetUser: UserProfile) => {
    if (userId === user?.id) {
      toast.error('Vous ne pouvez pas supprimer votre propre compte');
      return;
    }

    if (!canManageUser(targetUser)) {
      toast.error('Vous n\'avez pas l\'autorisation de supprimer cet utilisateur');
      return;
    }

    if (!confirm(`Êtes-vous sûr de vouloir supprimer définitivement l'utilisateur "${targetUser.name}" ?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      setUsers(prev => prev.filter(u => u.id !== userId));
      toast.success('Utilisateur supprimé avec succès');
    } catch (err: any) {
      toast.error(`Erreur: ${err.message}`);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Crown className="h-4 w-4 text-purple-600" />;
      case 'admin':
        return <Shield className="h-4 w-4 text-blue-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      super_admin: 'bg-purple-100 text-purple-800',
      admin: 'bg-blue-100 text-blue-800',
      organizer: 'bg-gray-100 text-gray-800',
      guest: 'bg-green-100 text-green-800'
    };

    return (
      <Badge className={variants[role as keyof typeof variants] || variants.organizer}>
        {role === 'super_admin' ? 'Super Admin' : 
         role === 'admin' ? 'Admin' : 
         role === 'guest' ? 'Invité' : 'Organisateur'}
      </Badge>
    );
  };

  const filteredUsers = users.filter(userProfile => {
    const matchesSearch = 
      userProfile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userProfile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (userProfile.organization && userProfile.organization.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = selectedRole === 'all' || userProfile.role === selectedRole;
    
    // Filter based on user permissions
    let hasPermission = true;
    if (user?.role === 'admin') {
      // Admin ne peut voir que les organisateurs et autres admins
      hasPermission = userProfile.role !== 'super_admin';
    }
    
    return matchesSearch && matchesRole && hasPermission;
  });

  if (!hasAccess) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Accès non autorisé</h3>
            <p className="text-gray-500">Vous n'avez pas l'autorisation d'accéder à cette section.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Gestion des utilisateurs
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher par nom, email ou organisation..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-invitopia-500"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="all">Tous les rôles</option>
              <option value="organizer">Organisateurs</option>
              <option value="admin">Admins</option>
              <option value="super_admin">Super Admins</option>
              <option value="guest">Invités</option>
            </select>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-invitopia-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 py-4">
              <AlertTriangle className="h-4 w-4" />
              <p>Erreur lors du chargement des utilisateurs : {error}</p>
            </div>
          )}

          {/* Users Table */}
          {!loading && !error && (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Organisation</TableHead>
                    <TableHead>Date d'inscription</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((userProfile) => (
                    <TableRow key={userProfile.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {userProfile.avatar ? (
                            <img
                              src={userProfile.avatar}
                              alt={userProfile.name}
                              className="h-8 w-8 rounded-full"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-invitopia-500 text-white flex items-center justify-center text-sm font-bold">
                              {userProfile.name.charAt(0)}
                            </div>
                          )}
                          <span className="font-medium">{userProfile.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{userProfile.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getRoleIcon(userProfile.role)}
                          {getRoleBadge(userProfile.role)}
                        </div>
                      </TableCell>
                      <TableCell>{userProfile.organization || '-'}</TableCell>
                      <TableCell>
                        {new Date(userProfile.created_at).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {canChangeRole('organizer') && (
                              <DropdownMenuItem
                                onClick={() => updateUserRole(userProfile.id, 'organizer')}
                                disabled={userProfile.role === 'organizer'}
                              >
                                Définir comme Organisateur
                              </DropdownMenuItem>
                            )}
                            {canChangeRole('admin') && (
                              <DropdownMenuItem
                                onClick={() => updateUserRole(userProfile.id, 'admin')}
                                disabled={userProfile.role === 'admin'}
                              >
                                Définir comme Admin
                              </DropdownMenuItem>
                            )}
                            {canChangeRole('super_admin') && (
                              <DropdownMenuItem
                                onClick={() => updateUserRole(userProfile.id, 'super_admin')}
                                disabled={userProfile.role === 'super_admin'}
                              >
                                Définir comme Super Admin
                              </DropdownMenuItem>
                            )}
                            {canManageUser(userProfile) && userProfile.id !== user?.id && (
                              <DropdownMenuItem
                                onClick={() => deleteUser(userProfile.id, userProfile)}
                                className="text-red-600"
                              >
                                Supprimer l'utilisateur
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <UserCheck className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun utilisateur trouvé</h3>
              <p className="text-gray-500">
                Aucun utilisateur ne correspond à vos critères de recherche.
              </p>
            </div>
          )}

          {/* Stats */}
          {!loading && !error && users.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-invitopia-600">{users.length}</div>
                <div className="text-sm text-gray-500">Total utilisateurs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {users.filter(u => u.role === 'organizer').length}
                </div>
                <div className="text-sm text-gray-500">Organisateurs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {users.filter(u => u.role === 'admin').length}
                </div>
                <div className="text-sm text-gray-500">Admins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {users.filter(u => u.role === 'super_admin').length}
                </div>
                <div className="text-sm text-gray-500">Super Admins</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedUserManagement;