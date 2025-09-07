import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Check,
  X,
  MessageSquare,
  Heart,
  Wine,
  Coffee,
  Utensils,
  Car,
  Home,
  Accessibility
} from 'lucide-react';

const PublicEventRSVP: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rsvpStatus, setRsvpStatus] = useState<string>('');
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    phone: '',
    plusOnes: 0,
    message: '',
    dietaryRestrictions: [] as string[],
    beveragePreference: '',
    needsTransport: false,
    needsAccommodation: false,
    accessibilityNeeds: '',
    guestbookMessage: ''
  });
  const [step, setStep] = useState(1);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    // Simulate fetching event data
    setTimeout(() => {
      setEvent({
        id: eventId,
        title: 'Festival de Musique de Kinshasa 2024',
        description: 'Le plus grand festival de musique de la République Démocratique du Congo avec des artistes locaux et internationaux.',
        type: 'concert',
        start_date: '2024-07-15T18:00:00Z',
        end_date: '2024-07-16T02:00:00Z',
        location: {
          name: 'Stade des Martyrs',
          address: 'Avenue de la Libération, Kinshasa, RDC',
          coordinates: { lat: -4.3276, lng: 15.3136 }
        },
        cover_images: [
          'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=400&fit=crop'
        ],
        primary_cover_image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=400&fit=crop',
        organizer: {
          name: 'Festival Team',
          email: 'contact@festivalksa.cd'
        },
        capacity: 2000,
        allow_plus_ones: true,
        max_guests_per_invitation: 4,
        settings: {
          requireRSVP: true,
          showGuestList: false,
          enableComments: true,
          collectPreferences: true
        }
      });
      setLoading(false);
    }, 1000);
  }, [eventId]);

  const handleRSVPSubmit = async () => {
    if (!rsvpStatus || !guestInfo.name || !guestInfo.email) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Simulate API call
    try {
      // Here you would normally send data to your backend
      console.log('RSVP Data:', { rsvpStatus, ...guestInfo, eventId });
      
      setHasSubmitted(true);
      toast.success(
        rsvpStatus === 'accepted' 
          ? 'Votre confirmation a été enregistrée !' 
          : 'Votre réponse a été enregistrée.'
      );
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement de votre réponse');
    }
  };

  const handleDietaryChange = (restriction: string, checked: boolean) => {
    setGuestInfo(prev => ({
      ...prev,
      dietaryRestrictions: checked 
        ? [...prev.dietaryRestrictions, restriction]
        : prev.dietaryRestrictions.filter(r => r !== restriction)
    }));
  };

  const nextStep = () => {
    if (step === 1 && (!rsvpStatus || !guestInfo.name || !guestInfo.email)) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement de l'événement...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <X className="h-12 w-12 mx-auto text-destructive mb-4" />
            <h1 className="text-xl font-bold mb-2">Événement non trouvé</h1>
            <p className="text-muted-foreground">
              L'événement que vous recherchez n'existe pas ou n'est plus disponible.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (hasSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Image */}
        <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: `url(${event.primary_cover_image})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card>
            <CardContent className="pt-6 text-center">
              <Check className="h-16 w-16 mx-auto text-green-600 mb-4" />
              <h1 className="text-2xl font-bold mb-4">
                {rsvpStatus === 'accepted' ? 'Confirmation enregistrée !' : 'Réponse enregistrée !'}
              </h1>
              
              {rsvpStatus === 'accepted' ? (
                <>
                  <p className="text-muted-foreground mb-6">
                    Merci {guestInfo.name} ! Votre présence à l'événement "{event.title}" est confirmée.
                  </p>
                  
                  {guestInfo.guestbookMessage && (
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="text-lg">Votre message dans le livre d'or</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <p className="italic">"{guestInfo.guestbookMessage}"</p>
                          <p className="text-sm text-muted-foreground mt-2">- {guestInfo.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
                    <h3 className="font-medium text-green-800 mb-2">Détails de l'événement</h3>
                    <div className="space-y-2 text-sm text-green-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.start_date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(event.start_date).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location.name}</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground mb-6">
                  Merci {guestInfo.name} d'avoir répondu à l'invitation pour "{event.title}".
                </p>
              )}

              <Button 
                onClick={() => window.close()} 
                className="w-full"
              >
                Fermer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.start_date);
  const formattedDate = eventDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const formattedTime = eventDate.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: `url(${event.primary_cover_image})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-6">
            <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
            <p className="text-white/90">{event.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Event Info */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{formattedDate}</p>
                  <p className="text-sm text-muted-foreground">{formattedTime}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{event.location.name}</p>
                  <p className="text-sm text-muted-foreground">Kinshasa, RDC</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{event.capacity} places</p>
                  <p className="text-sm text-muted-foreground">Capacité max</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RSVP Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Répondre à l'invitation
              <Badge variant="outline">Étape {step} sur 3</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">Votre réponse *</Label>
                  <RadioGroup value={rsvpStatus} onValueChange={setRsvpStatus}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-green-50 transition-colors">
                      <RadioGroupItem value="accepted" id="accepted" />
                      <Label htmlFor="accepted" className="flex items-center gap-2 cursor-pointer">
                        <Check className="h-4 w-4 text-green-600" />
                        Oui, je participerai
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-red-50 transition-colors">
                      <RadioGroupItem value="declined" id="declined" />
                      <Label htmlFor="declined" className="flex items-center gap-2 cursor-pointer">
                        <X className="h-4 w-4 text-red-600" />
                        Non, je ne pourrai pas venir
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      value={guestInfo.name}
                      onChange={(e) => setGuestInfo(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={guestInfo.email}
                      onChange={(e) => setGuestInfo(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="votre.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={guestInfo.phone}
                    onChange={(e) => setGuestInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+243 xxx xxx xxx"
                  />
                </div>

                {event.allow_plus_ones && rsvpStatus === 'accepted' && (
                  <div>
                    <Label htmlFor="plusOnes">Nombre d'accompagnants</Label>
                    <Select 
                      value={guestInfo.plusOnes.toString()} 
                      onValueChange={(value) => setGuestInfo(prev => ({ ...prev, plusOnes: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: event.max_guests_per_invitation }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button onClick={nextStep} disabled={!rsvpStatus || !guestInfo.name || !guestInfo.email}>
                    Continuer
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && rsvpStatus === 'accepted' && event.settings.collectPreferences && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">Préférences alimentaires</Label>
                  <div className="space-y-3">
                    {[
                      { id: 'vegetarian', label: 'Végétarien', icon: '🥗' },
                      { id: 'vegan', label: 'Végétalien', icon: '🌱' },
                      { id: 'gluten-free', label: 'Sans gluten', icon: '🌾' },
                      { id: 'halal', label: 'Halal', icon: '🕌' },
                      { id: 'kosher', label: 'Casher', icon: '✡️' }
                    ].map((restriction) => (
                      <div key={restriction.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={restriction.id}
                          checked={guestInfo.dietaryRestrictions.includes(restriction.id)}
                          onCheckedChange={(checked) => handleDietaryChange(restriction.id, checked as boolean)}
                        />
                        <Label htmlFor={restriction.id} className="cursor-pointer">
                          {restriction.icon} {restriction.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-4 block flex items-center gap-2">
                    <Wine className="h-4 w-4" />
                    Préférence de boisson
                  </Label>
                  <Select 
                    value={guestInfo.beveragePreference} 
                    onValueChange={(value) => setGuestInfo(prev => ({ ...prev, beveragePreference: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une boisson" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wine">🍷 Vin</SelectItem>
                      <SelectItem value="beer">🍺 Bière</SelectItem>
                      <SelectItem value="juice">🧃 Jus de fruits</SelectItem>
                      <SelectItem value="water">💧 Eau</SelectItem>
                      <SelectItem value="soda">🥤 Soda</SelectItem>
                      <SelectItem value="none">❌ Aucune</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="transport"
                      checked={guestInfo.needsTransport}
                      onCheckedChange={(checked) => setGuestInfo(prev => ({ ...prev, needsTransport: checked as boolean }))}
                    />
                    <Label htmlFor="transport" className="cursor-pointer flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      J'ai besoin de transport
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="accommodation"
                      checked={guestInfo.needsAccommodation}
                      onCheckedChange={(checked) => setGuestInfo(prev => ({ ...prev, needsAccommodation: checked as boolean }))}
                    />
                    <Label htmlFor="accommodation" className="cursor-pointer flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      J'ai besoin d'hébergement
                    </Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="accessibility" className="flex items-center gap-2">
                    <Accessibility className="h-4 w-4" />
                    Besoins d'accessibilité
                  </Label>
                  <Textarea
                    id="accessibility"
                    value={guestInfo.accessibilityNeeds}
                    onChange={(e) => setGuestInfo(prev => ({ ...prev, accessibilityNeeds: e.target.value }))}
                    placeholder="Décrivez vos besoins spéciaux d'accessibilité..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Retour
                  </Button>
                  <Button onClick={nextStep}>
                    Continuer
                  </Button>
                </div>
              </div>
            )}

            {((step === 2 && rsvpStatus === 'declined') || (step === 3) || (step === 2 && !event.settings.collectPreferences)) && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="message" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Message pour l'organisateur (optionnel)
                  </Label>
                  <Textarea
                    id="message"
                    value={guestInfo.message}
                    onChange={(e) => setGuestInfo(prev => ({ ...prev, message: e.target.value }))}
                    placeholder={rsvpStatus === 'accepted' 
                      ? "Merci pour l'invitation ! J'ai hâte de participer..."
                      : "Merci pour l'invitation, malheureusement je ne pourrai pas..."
                    }
                    rows={3}
                  />
                </div>

                {rsvpStatus === 'accepted' && event.settings.enableComments && (
                  <div>
                    <Label htmlFor="guestbook" className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Message pour le livre d'or (optionnel)
                    </Label>
                    <Textarea
                      id="guestbook"
                      value={guestInfo.guestbookMessage}
                      onChange={(e) => setGuestInfo(prev => ({ ...prev, guestbookMessage: e.target.value }))}
                      placeholder="Laissez un message de félicitations ou des souhaits..."
                      rows={3}
                    />
                  </div>
                )}

                <div className="flex justify-between">
                  {((step === 3) || (step === 2 && event.settings.collectPreferences)) && (
                    <Button variant="outline" onClick={prevStep}>
                      Retour
                    </Button>
                  )}
                  <Button onClick={handleRSVPSubmit} className="ml-auto">
                    {rsvpStatus === 'accepted' ? 'Confirmer ma présence' : 'Envoyer ma réponse'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicEventRSVP;