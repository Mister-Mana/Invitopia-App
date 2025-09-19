import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/auth';
import { useTeams } from '@/hooks/useTeams';
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
  Settings
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

interface TeamMember {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  status: 'active' | 'pending' | 'suspended';
  avatar_url?: string;
  joined_at: string;
  permissions: string[];
}

interface Team {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  members: TeamMember[];
  created_at: string;
  avatar_url?: string;
}

const TeamManagement: React.FC = () => {
  const { user } = useAuth();
  const {
    teams,
    teamMembers,
    loading,
    error,
    fetchTeams,
    fetchTeamMembers,
    createTeam,
    inviteTeamMember,
    updateTeamMember,
    removeTeamMember
  } = useTeams();

  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isMemberDetailOpen, setIsMemberDetailOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Form states
  const [newTeam, setNewTeam] = useState({ name: '', description: '' });
  const [inviteForm, setInviteForm] = useState({ 
    email: '', 
    role: 'member' as 'admin' | 'member',
    message: '' 
  });

  const handleCreateTeam = async () => {
    if (!newTeam.name.trim()) {
      toast.error('Le nom de l\'équipe est requis');
      return;
    }

    try {
      await createTeam({
        name: newTeam.name,
        description: newTeam.description
      });
      setNewTeam({ name: '', description: '' });
      setIsCreateTeamOpen(false);
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
      await inviteTeamMember(selectedTeam.id, {
        email: inviteForm.email,
        role: inviteForm.role
      });
      setInviteForm({ email: '', role: 'member', message: '' });
      setIsInviteOpen(false);
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleUpdateMemberRole = (memberId: string, newRole: 'admin' | 'member') => {
    updateTeamMember(memberId, { role: newRole });
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
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspendu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion d'équipe</h1>
          <p className="text-gray-600 mt-1">Gérez vos équipes et collaborateurs</p>
        </div>
        <Button onClick={() => setIsCreateTeamOpen(true)} className="bg-blue-600 hover:bg-blue-700">
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
          <TabsTrigger value="teams">Mes équipes</TabsTrigger>
          <TabsTrigger value="invitations">Invitations reçues</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-6">
          {filteredTeams.length === 0 ? (
            <Card className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune équipe</h3>
              <p className="text-gray-500 mb-6">Créez votre première équipe pour commencer</p>
              <Button onClick={() => setIsCreateTeamOpen(true)}>Créer une équipe</Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeams.map(team => (
                <Card key={team.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={team.avatar_url} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {team.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{team.name}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {team.members || 0} membre{(team.members || 0) > 1 ? 's' : ''}
                          </Badge>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedTeam(team)}>
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
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Settings className="h-4 w-4 mr-2" />
                            Paramètres
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{team.description}</CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <div className="text-sm text-gray-500">
                          Voir les détails de l'équipe
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTeam(team)}
                      >
                        Gérer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="invitations">
          <Card className="p-6 text-center">
            <Mail className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune invitation</h3>
            <p className="text-gray-500">Vous n'avez pas d'invitations en attente</p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Team Dialog */}
      <Dialog open={isCreateTeamOpen} onOpenChange={setIsCreateTeamOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer une nouvelle équipe</DialogTitle>
            <DialogDescription>
              Créez une équipe pour collaborer sur vos événements
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nom de l'équipe</label>
              <Input
                value={newTeam.name}
                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                placeholder="Ex: Équipe Marketing"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description (optionnel)</label>
              <Textarea
                value={newTeam.description}
                onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                placeholder="Décrivez l'objectif de cette équipe..."
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateTeamOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateTeam}>Créer l'équipe</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invite Member Dialog */}
      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inviter un membre</DialogTitle>
            <DialogDescription>
              Invitez un nouveau membre à rejoindre {selectedTeam?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Adresse email</label>
              <Input
                type="email"
                value={inviteForm.email}
                onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                placeholder="nom@exemple.com"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Rôle</label>
              <Select
                value={inviteForm.role}
                onValueChange={(value: 'admin' | 'member') => 
                  setInviteForm({ ...inviteForm, role: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Membre - Peut gérer les événements</SelectItem>
                  <SelectItem value="admin">Admin - Peut gérer les événements et inviter des membres</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Message personnalisé (optionnel)</label>
              <Textarea
                value={inviteForm.message}
                onChange={(e) => setInviteForm({ ...inviteForm, message: e.target.value })}
                placeholder="Ajoutez un message d'invitation..."
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleInviteMember}>Envoyer l'invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Team Members Detail Dialog */}
      <Dialog open={Boolean(selectedTeam)} onOpenChange={() => setSelectedTeam(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={selectedTeam?.avatar_url} />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {selectedTeam?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div>{selectedTeam?.name}</div>
                <div className="text-sm text-gray-500 font-normal">
                  Gestion de l'équipe
                </div>
              </div>
            </DialogTitle>
            <DialogDescription>{selectedTeam?.description}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Membres de l'équipe</h3>
              <Button
                size="sm"
                onClick={() => setIsInviteOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Inviter
              </Button>
            </div>
            
            <div className="space-y-3">
              {teamMembers.filter(member => member.team_id === selectedTeam?.id).map(member => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{(member.full_name || member.email)?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{member.full_name || member.email}</span>
                        {getRoleIcon(member.role)}
                      </div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusBadge(member.status)}
                        <span className="text-xs text-gray-400">
                          Invité le {new Date(member.invited_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {member.role !== 'owner' && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleUpdateMemberRole(member.id, member.role === 'admin' ? 'member' : 'admin')}
                          >
                            {member.role === 'admin' ? 'Rétrograder en membre' : 'Promouvoir en admin'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => removeTeamMember(member.id)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamManagement;