import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTeams } from '@/hooks/useTeams';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { 
  Users, 
  UserPlus, 
  Mail, 
  MoreVertical, 
  Search, 
  Plus,
  Crown,
  Shield,
  User,
  Clock,
  Check,
  X,
  Settings,
  Building,
  Phone,
  DollarSign,
  BarChart3,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Building2,
  MapPin,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const SuperAdminTeamManagement: React.FC = () => {
  const { user } = useAuth();
  const {
    teams,
    teamMembers,
    teamStats,
    loading,
    error,
    fetchTeams,
    fetchTeamMembers,
    createTeam,
    updateTeam,
    deleteTeam,
    inviteTeamMember,
    updateTeamMember,
    removeTeamMember
  } = useTeams();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isEditTeamOpen, setIsEditTeamOpen] = useState(false);
  const [isMemberDetailOpen, setIsMemberDetailOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  // Form states
  const [teamForm, setTeamForm] = useState({
    name: '',
    description: '',
    team_type: 'internal',
    contact_email: '',
    contact_phone: '',
    budget: 0,
    status: 'active'
  });

  const [inviteForm, setInviteForm] = useState({ 
    email: '', 
    role: 'member',
    full_name: '',
    position: '',
    department: ''
  });

  const teamTypes = [
    { value: 'internal', label: 'Équipe interne' },
    { value: 'external', label: 'Équipe externe' },
    { value: 'contractor', label: 'Prestataires' },
    { value: 'vendor', label: 'Fournisseurs' },
    { value: 'partner', label: 'Partenaires' }
  ];

  const accessLevels = [
    { value: 'standard', label: 'Standard' },
    { value: 'elevated', label: 'Élevé' },
    { value: 'admin', label: 'Administrateur' },
    { value: 'restricted', label: 'Restreint' }
  ];

  useEffect(() => {
    if (user?.role === 'super_admin') {
      fetchTeams();
      fetchTeamMembers();
    }
  }, [user]);

  const resetTeamForm = () => {
    setTeamForm({
      name: '',
      description: '',
      team_type: 'internal',
      contact_email: '',
      contact_phone: '',
      budget: 0,
      status: 'active'
    });
  };

  const resetInviteForm = () => {
    setInviteForm({
      email: '',
      role: 'member',
      full_name: '',
      position: '',
      department: ''
    });
  };

  const handleCreateTeam = async () => {
    if (!teamForm.name.trim()) {
      toast.error('Le nom de l\'équipe est requis');
      return;
    }

    try {
      await createTeam(teamForm);
      setIsCreateTeamOpen(false);
      resetTeamForm();
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleUpdateTeam = async () => {
    if (!selectedTeam || !teamForm.name.trim()) {
      toast.error('Le nom de l\'équipe est requis');
      return;
    }

    try {
      await updateTeam(selectedTeam.id, teamForm);
      setIsEditTeamOpen(false);
      setSelectedTeam(null);
      resetTeamForm();
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleInviteMember = async () => {
    if (!inviteForm.email.trim() || !selectedTeam) {
      toast.error('Email requis');
      return;
    }

    try {
      await inviteTeamMember(selectedTeam.id, inviteForm);
      setIsInviteOpen(false);
      resetInviteForm();
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleDeleteTeam = async (teamId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette équipe ?')) {
      try {
        await deleteTeam(teamId);
      } catch (error) {
        // Error handled in hook
      }
    }
  };

  const openCreateDialog = () => {
    resetTeamForm();
    setIsCreateTeamOpen(true);
  };

  const openEditDialog = (team: any) => {
    setTeamForm({
      name: team.name,
      description: team.description || '',
      team_type: team.team_type || 'internal',
      contact_email: team.contact_email || '',
      contact_phone: team.contact_phone || '',
      budget: team.budget || 0,
      status: team.status || 'active'
    });
    setSelectedTeam(team);
    setIsEditTeamOpen(true);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="h-4 w-4 text-yellow-600" />;
      case 'admin': return <Shield className="h-4 w-4 text-blue-600" />;
      default: return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactif</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspendu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTeamTypeBadge = (type: string) => {
    const typeConfig = teamTypes.find(t => t.value === type);
    const colors = {
      internal: 'bg-blue-100 text-blue-800',
      external: 'bg-purple-100 text-purple-800',
      contractor: 'bg-orange-100 text-orange-800',
      vendor: 'bg-cyan-100 text-cyan-800',
      partner: 'bg-green-100 text-green-800'
    };
    
    return (
      <Badge className={colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {typeConfig?.label || type}
      </Badge>
    );
  };

  const filteredTeams = teams.filter((team: any) => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.team_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (user?.role !== 'super_admin') {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600">Accès non autorisé</h2>
        <p className="text-gray-600">Seuls les super administrateurs peuvent accéder à cette section.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Équipes</p>
                <p className="text-2xl font-bold">{teamStats?.total_teams || teams.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserPlus className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Membres Actifs</p>
                <p className="text-2xl font-bold">{teamStats?.total_members || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Invitations en attente</p>
                <p className="text-2xl font-bold">{teamStats?.pending_invitations || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Types d'équipes</p>
                <p className="text-2xl font-bold">{Object.keys(teamStats?.teams_by_type || {}).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Équipes</h1>
          <p className="text-gray-600 mt-1">Gérez toutes les équipes de la plateforme Invitopia</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Créer une équipe
        </Button>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Rechercher une équipe..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="teams" className="w-full">
        <TabsList>
          <TabsTrigger value="teams">Toutes les équipes</TabsTrigger>
          <TabsTrigger value="members">Tous les membres</TabsTrigger>
          <TabsTrigger value="analytics">Analytiques</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-6">
          {filteredTeams.length === 0 ? (
            <Card className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {teams.length === 0 ? 'Aucune équipe' : 'Aucun résultat'}
              </h3>
              <p className="text-gray-500 mb-6">
                {teams.length === 0 
                  ? 'Créez la première équipe pour commencer' 
                  : 'Aucune équipe ne correspond à votre recherche'
                }
              </p>
              {teams.length === 0 && (
                <Button onClick={openCreateDialog}>Créer une équipe</Button>
              )}
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeams.map((team: any) => (
                <Card key={team.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={team.avatar_url} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {team.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{team.name}</CardTitle>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {getTeamTypeBadge(team.team_type)}
                            {getStatusBadge(team.status)}
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedTeam(team);
                            fetchTeamMembers(team.id);
                          }}>
                            <Users className="h-4 w-4 mr-2" />
                            Voir les membres
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedTeam(team);
                            setIsInviteOpen(true);
                          }}>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Inviter un membre
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditDialog(team)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteTeam(team.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{team.description}</CardDescription>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      {team.contact_email && (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {team.contact_email}
                        </div>
                      )}
                      {team.contact_phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {team.contact_phone}
                        </div>
                      )}
                      {team.budget > 0 && (
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Budget: {team.budget}€
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                      <Badge variant="outline">
                        {team.members || 0} membre{(team.members || 0) > 1 ? 's' : ''}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Créé le {new Date(team.created_at).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Tous les membres des équipes</CardTitle>
              <CardDescription>
                Gérez tous les membres de toutes les équipes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {(member.full_name || member.email)?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.full_name || member.email}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{member.role}</span>
                          {member.position && <span>• {member.position}</span>}
                          {member.department && <span>• {member.department}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={member.status === 'accepted' ? 'default' : 'secondary'}>
                        {member.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => {
                            setSelectedMember(member);
                            setIsMemberDetailOpen(true);
                          }}>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => removeTeamMember(member.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par type d'équipe</CardTitle>
              </CardHeader>
              <CardContent>
                {teamStats?.teams_by_type && Object.entries(teamStats.teams_by_type).map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center py-2">
                    <span className="capitalize">{type}</span>
                    <Badge>{count as number}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Statut des membres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Membres actifs</span>
                    <Badge className="bg-green-100 text-green-800">
                      {teamStats?.total_members || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Invitations en attente</span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {teamStats?.pending_invitations || 0}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create/Edit Team Dialog */}
      <Dialog open={isCreateTeamOpen || isEditTeamOpen} onOpenChange={(open) => {
        if (!open) {
          setIsCreateTeamOpen(false);
          setIsEditTeamOpen(false);
          setSelectedTeam(null);
          resetTeamForm();
        }
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditTeamOpen ? 'Modifier l\'équipe' : 'Créer une nouvelle équipe'}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations de l'équipe
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom de l'équipe *</Label>
                <Input
                  id="name"
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  placeholder="Ex: Équipe Marketing"
                />
              </div>
              <div>
                <Label htmlFor="team_type">Type d'équipe</Label>
                <Select 
                  value={teamForm.team_type} 
                  onValueChange={(value) => setTeamForm({ ...teamForm, team_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {teamTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={teamForm.description}
                onChange={(e) => setTeamForm({ ...teamForm, description: e.target.value })}
                placeholder="Décrivez l'objectif de cette équipe..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact_email">Email de contact</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={teamForm.contact_email}
                  onChange={(e) => setTeamForm({ ...teamForm, contact_email: e.target.value })}
                  placeholder="contact@exemple.com"
                />
              </div>
              <div>
                <Label htmlFor="contact_phone">Téléphone de contact</Label>
                <Input
                  id="contact_phone"
                  value={teamForm.contact_phone}
                  onChange={(e) => setTeamForm({ ...teamForm, contact_phone: e.target.value })}
                  placeholder="+33 1 23 45 67 89"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Budget (€)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={teamForm.budget}
                  onChange={(e) => setTeamForm({ ...teamForm, budget: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="status">Statut</Label>
                <Select 
                  value={teamForm.status} 
                  onValueChange={(value) => setTeamForm({ ...teamForm, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                    <SelectItem value="suspended">Suspendu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsCreateTeamOpen(false);
              setIsEditTeamOpen(false);
              resetTeamForm();
            }}>
              Annuler
            </Button>
            <Button onClick={isEditTeamOpen ? handleUpdateTeam : handleCreateTeam}>
              {isEditTeamOpen ? 'Mettre à jour' : 'Créer l\'équipe'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invite Member Dialog */}
      <Dialog open={isInviteOpen} onOpenChange={(open) => {
        if (!open) {
          setIsInviteOpen(false);
          resetInviteForm();
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inviter un membre</DialogTitle>
            <DialogDescription>
              Invitez un nouveau membre à rejoindre {selectedTeam?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Adresse email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  placeholder="nom@exemple.com"
                />
              </div>
              <div>
                <Label htmlFor="full_name">Nom complet</Label>
                <Input
                  id="full_name"
                  value={inviteForm.full_name}
                  onChange={(e) => setInviteForm({ ...inviteForm, full_name: e.target.value })}
                  placeholder="Prénom Nom"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="position">Poste</Label>
                <Input
                  id="position"
                  value={inviteForm.position}
                  onChange={(e) => setInviteForm({ ...inviteForm, position: e.target.value })}
                  placeholder="Développeur, Manager..."
                />
              </div>
              <div>
                <Label htmlFor="department">Département</Label>
                <Input
                  id="department"
                  value={inviteForm.department}
                  onChange={(e) => setInviteForm({ ...inviteForm, department: e.target.value })}
                  placeholder="IT, Marketing..."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="role">Rôle</Label>
              <Select
                value={inviteForm.role}
                onValueChange={(value) => setInviteForm({ ...inviteForm, role: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Membre</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="lead">Chef d'équipe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleInviteMember}>
              Envoyer l'invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuperAdminTeamManagement;