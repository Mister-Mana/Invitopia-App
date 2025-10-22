
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { UserPlus, Users, X, Mail, Search } from 'lucide-react';
import { toast } from 'sonner';

// Types
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'guest';
  avatar?: string;
  status: 'active' | 'pending' | 'inactive';
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
}

interface EventTeam {
  teamId: string;
  permissions: 'full' | 'view' | 'invite';
}

interface EventTeamManagementProps {
  eventId: string;
  eventName: string;
}

const EventTeamManagement: React.FC<EventTeamManagementProps> = ({ eventId, eventName }) => {
  const { t } = useLanguage();
  const [isAddTeamOpen, setIsAddTeamOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitePermission, setInvitePermission] = useState<'full' | 'view' | 'invite'>('view');

  // Sample data
  const [availableTeams, setAvailableTeams] = useState<Team[]>([
    {
      id: '1',
      name: 'Équipe marketing',
      description: 'Gestion des événements marketing et promotions',
      members: [
        { id: '1', name: 'Jean Dupont', email: 'jean@example.com', role: 'admin', status: 'active' },
        { id: '2', name: 'Marie Martin', email: 'marie@example.com', role: 'member', status: 'active' }
      ]
    },
    {
      id: '2',
      name: 'Équipe événementielle',
      description: 'Organisation et logistique des événements',
      members: [
        { id: '1', name: 'Jean Dupont', email: 'jean@example.com', role: 'admin', status: 'active' },
        { id: '4', name: 'Sophie Petit', email: 'sophie@example.com', role: 'member', status: 'active' }
      ]
    }
  ]);

  const [eventTeams, setEventTeams] = useState<EventTeam[]>([
    { teamId: '1', permissions: 'full' }
  ]);
  
  const [eventMembers, setEventMembers] = useState<(TeamMember & { permissions: 'full' | 'view' | 'invite' })[]>([
    { id: '1', name: 'Jean Dupont', email: 'jean@example.com', role: 'admin', status: 'active', permissions: 'full' },
    { id: '2', name: 'Marie Martin', email: 'marie@example.com', role: 'member', status: 'active', permissions: 'view' }
  ]);

  // Handle adding a team to the event
  const handleAddTeam = (teamId: string, permissions: 'full' | 'view' | 'invite') => {
    // Check if team is already added
    if (eventTeams.some(team => team.teamId === teamId)) {
      toast.error(t('events.team.alreadyAdded'));
      return;
    }

    setEventTeams([...eventTeams, { teamId, permissions }]);
    setIsAddTeamOpen(false);
    toast.success(t('events.team.teamAdded'));
  };

  // Handle removing a team from the event
  const handleRemoveTeam = (teamId: string) => {
    setEventTeams(eventTeams.filter(team => team.teamId !== teamId));
    toast.success(t('events.team.teamRemoved'));
  };

  // Handle adding a member directly to the event
  const handleAddMember = () => {
    if (!inviteEmail.trim()) {
      toast.error(t('events.team.emailRequired'));
      return;
    }

    // Check if member is already added
    if (eventMembers.some(member => member.email === inviteEmail)) {
      toast.error(t('events.team.memberAlreadyAdded'));
      return;
    }

    const newMember = {
      id: `member-${Date.now()}`,
      name: inviteEmail.split('@')[0], // Temporary name based on email
      email: inviteEmail,
      role: 'guest' as const,
      status: 'pending' as const,
      permissions: invitePermission
    };

    setEventMembers([...eventMembers, newMember]);
    setInviteEmail('');
    setInvitePermission('view');
    setIsAddMemberOpen(false);
    toast.success(t('events.team.invitationSent'));
  };

  // Handle removing a member from the event
  const handleRemoveMember = (memberId: string) => {
    setEventMembers(eventMembers.filter(member => member.id !== memberId));
    toast.success(t('events.team.memberRemoved'));
  };

  // Get team details by id
  const getTeamById = (teamId: string) => {
    return availableTeams.find(team => team.id === teamId);
  };

  // Render permissions badge
  const renderPermissionBadge = (permission: 'full' | 'view' | 'invite') => {
    let className = '';
    
    switch (permission) {
      case 'full':
        className = 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
        break;
      case 'view':
        className = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        break;
      case 'invite':
        className = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        break;
    }
    
    return (
      <Badge variant="outline" className={className}>
        {t(`events.team.permissions.${permission}`)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">{t('events.team.eventTeam')}</h2>
        <div className="flex gap-2">
          <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <UserPlus className="h-4 w-4 mr-2" />
                {t('events.team.inviteMember')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('events.team.inviteMember')}</DialogTitle>
                <DialogDescription>
                  {t('events.team.inviteMemberDescription')}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">{t('common.email')}</label>
                  <Input
                    id="email"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder={t('teams.emailPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="permission" className="text-sm font-medium">{t('events.team.permission')}</label>
                  <Select value={invitePermission} onValueChange={(value: 'full' | 'view' | 'invite') => setInvitePermission(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('events.team.selectPermission')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">{t('events.team.permissions.full')}</SelectItem>
                      <SelectItem value="view">{t('events.team.permissions.view')}</SelectItem>
                      <SelectItem value="invite">{t('events.team.permissions.invite')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="font-medium">{t(`events.team.permissions.${invitePermission}`)}</span>: {t(`events.team.permissionDesc.${invitePermission}`)}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>{t('common.cancel')}</Button>
                <Button onClick={handleAddMember}>{t('events.team.sendInvitation')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddTeamOpen} onOpenChange={setIsAddTeamOpen}>
            <DialogTrigger asChild>
              <Button className="bg-invitopia-600 hover:bg-invitopia-700 text-white flex items-center">
                <Users className="h-4 w-4 mr-2" />
                {t('events.team.addTeam')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('events.team.addTeamToEvent')}</DialogTitle>
                <DialogDescription>
                  {t('events.team.addTeamDescription')}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="relative mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={t('teams.searchTeams')}
                    className="pl-9 pr-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {availableTeams
                    .filter(team => team.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(team => {
                      const isAdded = eventTeams.some(et => et.teamId === team.id);
                      return (
                        <div key={team.id} className="border rounded-md p-3 bg-gray-50">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{team.name}</h4>
                              <p className="text-sm text-gray-500">{team.description}</p>
                            </div>
                            {isAdded ? (
                              <Badge className="bg-green-100 text-green-800">{t('events.team.added')}</Badge>
                            ) : (
                              <Select onValueChange={(value: 'full' | 'view' | 'invite') => handleAddTeam(team.id, value)}>
                                <SelectTrigger className="w-[140px]">
                                  <SelectValue placeholder={t('events.team.addWithPermission')} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="full">{t('events.team.permissions.full')}</SelectItem>
                                  <SelectItem value="view">{t('events.team.permissions.view')}</SelectItem>
                                  <SelectItem value="invite">{t('events.team.permissions.invite')}</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          </div>
                          <div className="flex -space-x-2">
                            {team.members.slice(0, 5).map(member => (
                              <Avatar key={member.id} className="border-2 border-white">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            ))}
                            {team.members.length > 5 && (
                              <div className="h-8 w-8 rounded-full bg-invitopia-100 flex items-center justify-center text-xs">
                                +{team.members.length - 5}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">{t('events.team.nameEmail')}</TableHead>
              <TableHead>{t('events.team.source')}</TableHead>
              <TableHead>{t('events.team.permissions')}</TableHead>
              <TableHead>{t('events.team.status')}</TableHead>
              <TableHead className="text-right">{t('common.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Individual members */}
            {eventMembers.map(member => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>{member.name}</p>
                      <p className="text-xs text-gray-500">{member.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-gray-100">
                    {t('events.team.directInvite')}
                  </Badge>
                </TableCell>
                <TableCell>
                  {renderPermissionBadge(member.permissions)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    member.status === 'active' ? 'bg-green-100 text-green-800' :
                    member.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }>
                    {t(`teams.statuses.${member.status}`)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {member.id !== '1' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleRemoveMember(member.id)}
                      title={t('teams.removeMember')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            
            {/* Team members */}
            {eventTeams.map(eventTeam => {
              const team = getTeamById(eventTeam.teamId);
              if (!team) return null;
              
              return (
                <TableRow key={`team-${team.id}`}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 bg-invitopia-100 text-invitopia-700">
                        <AvatarFallback>
                          <Users className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{team.name}</p>
                        <p className="text-xs text-gray-500">{team.members.length} {t('teams.members')}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      {t('events.team.teamAssigned')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {renderPermissionBadge(eventTeam.permissions)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      {t('teams.statuses.active')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleRemoveTeam(team.id)}
                      title={t('events.team.removeTeam')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EventTeamManagement;
