import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Eye, 
  Palette, 
  Settings,
  CheckCircle 
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface EventConfirmationStepProps {
  data: any;
  onChange: (data: any) => void;
}

const EventConfirmationStep: React.FC<EventConfirmationStepProps> = ({ data }) => {
  const getStatusColor = (visibility: string) => {
    switch (visibility) {
      case 'public': return 'bg-green-100 text-green-800';
      case 'unlisted': return 'bg-yellow-100 text-yellow-800';
      case 'private': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVisibilityLabel = (visibility: string) => {
    switch (visibility) {
      case 'public': return 'Public';
      case 'unlisted': return 'Non listé';
      case 'private': return 'Privé';
      default: return 'Privé';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'wedding': return '💒';
      case 'birthday': return '🎂';
      case 'corporate': return '🏢';
      case 'conference': return '📊';
      case 'concert': return '🎵';
      case 'party': return '🎉';
      case 'fundraiser': return '💝';
      default: return '📅';
    }
  };

  const totalGuests = (data.guestList?.contacts?.length || 0) + (data.guestList?.customInvites?.length || 0);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">
          Confirmation de l'événement
        </h2>
        <p className="text-muted-foreground">
          Vérifiez tous les détails avant de créer votre événement
        </p>
      </div>

      <div className="grid gap-6">
        {/* Informations générales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <div className="text-2xl mr-3">{getTypeIcon(data.type)}</div>
              Informations générales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-1">{data.title}</h3>
              {data.description && (
                <p className="text-muted-foreground">{data.description}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(data.settings?.visibility)}>
                {getVisibilityLabel(data.settings?.visibility)}
              </Badge>
              {data.category && (
                <Badge variant="outline">
                  {data.category}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Date et lieu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calendar className="h-5 w-5 mr-2" />
              Date et lieu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.date && (
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>
                  {format(new Date(data.date), 'EEEE d MMMM yyyy', { locale: fr })}
                  {data.time && ` à ${data.time}`}
                  {data.endDate && data.endTime && (
                    <span className="text-muted-foreground">
                      {' '}jusqu'au {format(new Date(data.endDate), 'd MMMM yyyy', { locale: fr })} à {data.endTime}
                    </span>
                  )}
                </span>
              </div>
            )}
            
            {data.location?.address && (
              <div className="flex items-start text-sm">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                <div>
                  {data.location.venue && (
                    <div className="font-medium">{data.location.venue}</div>
                  )}
                  <div>
                    {data.location.address}
                    {data.location.city && `, ${data.location.city}`}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Invités et capacité */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Users className="h-5 w-5 mr-2" />
              Invités et capacité
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium">Invités prévus</div>
                <div className="text-xl font-bold text-primary">
                  {totalGuests}
                </div>
              </div>
              <div>
                <div className="font-medium">Capacité maximale</div>
                <div className="text-xl font-bold">
                  {data.capacity || '∞'}
                </div>
              </div>
            </div>
            
            {data.settings?.allowPlusOnes && (
              <div className="text-sm text-muted-foreground">
                Accompagnants autorisés (max {data.settings.maxGuestsPerInvitation} par invitation)
              </div>
            )}
          </CardContent>
        </Card>

        {/* Paramètres */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Settings className="h-5 w-5 mr-2" />
              Paramètres
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Visibilité:</span>
                  <span className="font-medium">{getVisibilityLabel(data.settings?.visibility)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Approbation requise:</span>
                  <span className="font-medium">{data.settings?.requireApproval ? 'Oui' : 'Non'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accompagnants:</span>
                  <span className="font-medium">{data.settings?.allowPlusOnes ? 'Autorisés' : 'Non autorisés'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Liste d'attente:</span>
                  <span className="font-medium">{data.settings?.enableWaitlist ? 'Activée' : 'Désactivée'}</span>
                </div>
                {data.settings?.rsvpDeadline && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date limite RSVP:</span>
                    <span className="font-medium">
                      {format(new Date(data.settings.rsvpDeadline), 'd MMM yyyy', { locale: fr })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Apparence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Palette className="h-5 w-5 mr-2" />
              Apparence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Thème</div>
                <div className="font-medium capitalize">{data.design?.theme || 'Moderne'}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Couleur principale</div>
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2 border"
                    style={{ backgroundColor: data.design?.primaryColor || '#3B82F6' }}
                  />
                  <span className="font-medium">{data.design?.primaryColor || '#3B82F6'}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message de confirmation */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 mx-auto text-primary mb-3" />
              <h3 className="font-semibold mb-2">Prêt à créer votre événement !</h3>
              <p className="text-sm text-muted-foreground">
                Une fois créé, vous pourrez toujours modifier ces paramètres depuis la page de gestion de l'événement.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventConfirmationStep;