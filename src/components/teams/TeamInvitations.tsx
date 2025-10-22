import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { 
  Mail, 
  Check, 
  X, 
  Clock,
  Users,
  Building
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TeamInvitation {
  id: string;
  team_id: string;
  team_name: string;
  team_description: string;
  team_avatar_url?: string;
  inviter_name: string;
  inviter_email: string;
  inviter_avatar?: string;
  role: 'admin' | 'member';
  message?: string;
  invited_at: string;
  expires_at: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
}

const TeamInvitations: React.FC = () => {
  const [invitations, setInvitations] = useState<TeamInvitation[]>([
    {
      id: '1',
      team_id: 'team-1',
      team_name: 'Équipe Design',
      team_description: 'Équipe responsable du design des événements',
      inviter_name: 'Marie Dubois',
      inviter_email: 'marie@invitopia.com',
      role: 'member',
      message: 'Rejoignez notre équipe design pour créer des événements exceptionnels !',
      invited_at: '2024-01-15T10:30:00Z',
      expires_at: '2024-01-22T10:30:00Z',
      status: 'pending'
    },
    {
      id: '2',
      team_id: 'team-2',
      team_name: 'Équipe Corporate',
      team_description: 'Gestion des événements d\'entreprise',
      inviter_name: 'Pierre Martin',
      inviter_email: 'pierre@invitopia.com',
      role: 'admin',
      message: 'Nous aimerions que vous rejoigniez notre équipe en tant qu\'administrateur.',
      invited_at: '2024-01-10T14:20:00Z',
      expires_at: '2024-01-17T14:20:00Z',
      status: 'pending'
    }
  ]);

  const [selectedInvitation, setSelectedInvitation] = useState<TeamInvitation | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleAcceptInvitation = async (invitationId: string) => {
    try {
      // Ici vous implémenteriez l'appel API pour accepter l'invitation
      setInvitations(prev => 
        prev.map(inv => 
          inv.id === invitationId 
            ? { ...inv, status: 'accepted' as const }
            : inv
        )
      );
      toast.success('Invitation acceptée avec succès');
    } catch (error) {
      toast.error('Erreur lors de l\'acceptation de l\'invitation');
    }
  };

  const handleDeclineInvitation = async (invitationId: string) => {
    try {
      // Ici vous implémenteriez l'appel API pour décliner l'invitation
      setInvitations(prev => 
        prev.map(inv => 
          inv.id === invitationId 
            ? { ...inv, status: 'declined' as const }
            : inv
        )
      );
      toast.success('Invitation déclinée');
    } catch (error) {
      toast.error('Erreur lors du déclin de l\'invitation');
    }
  };

  const getStatusBadge = (status: string, expiresAt: string) => {
    const isExpired = new Date(expiresAt) < new Date();
    
    if (isExpired && status === 'pending') {
      return <Badge variant="destructive">Expirée</Badge>;
    }
    
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800">Acceptée</Badge>;
      case 'declined':
        return <Badge className="bg-red-100 text-red-800">Déclinée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleIcon = (role: string) => {
    return role === 'admin' ? '👑' : '👤';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const pendingInvitations = invitations.filter(inv => 
    inv.status === 'pending' && new Date(inv.expires_at) > new Date()
  );

  const pastInvitations = invitations.filter(inv => 
    inv.status !== 'pending' || new Date(inv.expires_at) <= new Date()
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Invitations d'équipe</h2>
        <p className="text-gray-600 mt-1">Gérez vos invitations à rejoindre des équipes</p>
      </div>

      {/* Pending Invitations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Clock className="h-5 w-5 text-yellow-600" />
          Invitations en attente ({pendingInvitations.length})
        </h3>

        {pendingInvitations.length === 0 ? (
          <Card className="p-8 text-center">
            <Mail className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune invitation en attente</h3>
            <p className="text-gray-500">Vous n'avez pas d'invitations d'équipe en attente</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {pendingInvitations.map(invitation => (
              <Card key={invitation.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={invitation.team_avatar_url} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {invitation.team_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {invitation.team_name}
                          <span className="text-sm">{getRoleIcon(invitation.role)}</span>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {invitation.team_description}
                        </CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">{invitation.role}</Badge>
                          {getStatusBadge(invitation.status, invitation.expires_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={invitation.inviter_avatar} />
                        <AvatarFallback>{invitation.inviter_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Invité par {invitation.inviter_name}</p>
                        <p className="text-xs text-gray-500">{invitation.inviter_email}</p>
                      </div>
                    </div>

                    {invitation.message && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700 italic">"{invitation.message}"</p>
                      </div>
                    )}

                    <div className="text-xs text-gray-500">
                      Invité le {formatDate(invitation.invited_at)} • 
                      Expire le {formatDate(invitation.expires_at)}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Button
                        onClick={() => handleAcceptInvitation(invitation.id)}
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Accepter
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDeclineInvitation(invitation.id)}
                        size="sm"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Décliner
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedInvitation(invitation);
                          setIsDetailOpen(true);
                        }}
                      >
                        Voir les détails
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Past Invitations */}
      {pastInvitations.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-600" />
            Historique des invitations
          </h3>

          <div className="grid gap-3">
            {pastInvitations.map(invitation => (
              <Card key={invitation.id} className="opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={invitation.team_avatar_url} />
                        <AvatarFallback className="bg-gray-100 text-gray-600">
                          {invitation.team_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{invitation.team_name}</p>
                        <p className="text-sm text-gray-500">
                          {invitation.role} • Par {invitation.inviter_name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(invitation.status, invitation.expires_at)}
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(invitation.invited_at)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Invitation Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={selectedInvitation?.team_avatar_url} />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {selectedInvitation?.team_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div>{selectedInvitation?.team_name}</div>
                <Badge variant="outline" className="mt-1">
                  {selectedInvitation?.role}
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription>
              {selectedInvitation?.team_description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Invité par</h4>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={selectedInvitation?.inviter_avatar} />
                  <AvatarFallback>
                    {selectedInvitation?.inviter_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedInvitation?.inviter_name}</p>
                  <p className="text-sm text-gray-500">{selectedInvitation?.inviter_email}</p>
                </div>
              </div>
            </div>

            {selectedInvitation?.message && (
              <div>
                <h4 className="font-medium mb-2">Message</h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">"{selectedInvitation.message}"</p>
                </div>
              </div>
            )}

            <div>
              <h4 className="font-medium mb-2">Détails de l'invitation</h4>
              <div className="text-sm space-y-1">
                <p><span className="text-gray-500">Rôle:</span> {selectedInvitation?.role}</p>
                <p><span className="text-gray-500">Envoyée le:</span> {selectedInvitation && formatDate(selectedInvitation.invited_at)}</p>
                <p><span className="text-gray-500">Expire le:</span> {selectedInvitation && formatDate(selectedInvitation.expires_at)}</p>
                <p><span className="text-gray-500">Statut:</span> {selectedInvitation && getStatusBadge(selectedInvitation.status, selectedInvitation.expires_at)}</p>
              </div>
            </div>
          </div>

          {selectedInvitation?.status === 'pending' && new Date(selectedInvitation.expires_at) > new Date() && (
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  if (selectedInvitation) {
                    handleDeclineInvitation(selectedInvitation.id);
                    setIsDetailOpen(false);
                  }
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Décliner
              </Button>
              <Button
                onClick={() => {
                  if (selectedInvitation) {
                    handleAcceptInvitation(selectedInvitation.id);
                    setIsDetailOpen(false);
                  }
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check className="h-4 w-4 mr-2" />
                Accepter
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamInvitations;