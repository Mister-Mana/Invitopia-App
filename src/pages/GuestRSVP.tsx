import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/common/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Calendar, MapPin, Clock, Users, Wine, UtensilsCrossed, MessageSquare, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'qrcode';
import Navbar from '@/components/Navbar';
import Footer from '@/components/home/Footer';
import { formatDate, differenceInDays, differenceInHours, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { guestRSVPSchema, type GuestRSVPFormData } from '@/lib/validation/schemas';

const GuestRSVP: React.FC = () => {
  const { eventId, guestId } = useParams<{ eventId: string; guestId: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // SECURITY: Get secret token from URL
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState<any>(null);
  const [guest, setGuest] = useState<any>(null);
  const [organizer, setOrganizer] = useState<any>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false); // Control form visibility
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  
  // Form fields
  const [rsvpStatus, setRsvpStatus] = useState<'confirmed' | 'declined' | 'maybe'>('confirmed');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  
  // Preferences
  const [beveragePreferences, setBeveragePreferences] = useState<string[]>([]);
  const [otherBeverage, setOtherBeverage] = useState('');
  const [foodPreferences, setFoodPreferences] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [goldenBookMessage, setGoldenBookMessage] = useState('');
  
  // QR Code
  const [qrCodeData, setQrCodeData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!eventId || !guestId || !token) {
        toast.error('Lien d\'invitation invalide');
        setLoading(false);
        return;
      }

      try {
        // Fetch event details
        const { data: eventData, error: eventError } = await supabase
          .from('events')
          .select('*')
          .eq('id', eventId)
          .single();

        if (eventError) throw eventError;

        // SECURITY: Fetch guest details with token verification
        // The RLS policy will check the secret_token matches
        const { data: guestData, error: guestError } = await supabase
          .from('guests')
          .select('*')
          .eq('id', guestId)
          .eq('event_id', eventId)
          .eq('secret_token', token)
          .single();

        if (guestError) {
          toast.error('Invitation non trouvée ou expirée');
          throw guestError;
        }

        // Fetch organizer profile
        if (eventData) {
          const { data: organizerData } = await supabase
            .from('profiles')
            .select('name, avatar, organization')
            .eq('id', eventData.organizer_id)
            .single();
          
          if (organizerData) {
            setOrganizer(organizerData);
          }

          // Fetch team members
          const { data: teamsData } = await supabase
            .from('teams')
            .select('id')
            .eq('owner_id', eventData.organizer_id);

          if (teamsData && teamsData.length > 0) {
            const teamIds = teamsData.map(t => t.id);
            
            const { data: teamData } = await supabase
              .from('team_members')
              .select(`
                id,
                full_name,
                position,
                email,
                profiles:user_id (
                  name,
                  avatar
                )
              `)
              .eq('status', 'accepted')
              .in('team_id', teamIds);

            if (teamData && teamData.length > 0) {
              setTeamMembers(teamData);
            }
          }
        }

        setEvent(eventData);
        setGuest(guestData);
        setGuestName(guestData.name || '');
        setGuestEmail(guestData.email || '');
        setGuestPhone(guestData.phone || '');
        
        // Load existing preferences if any
        if (guestData.beverage_preferences) {
          try {
            // Parse JSON string to array
            const parsed = JSON.parse(guestData.beverage_preferences);
            if (Array.isArray(parsed)) {
              setBeveragePreferences(parsed);
            }
          } catch {
            // If not JSON, treat as comma-separated string
            setBeveragePreferences(guestData.beverage_preferences.split(',').map((s: string) => s.trim()));
          }
        }
        if (guestData.food_preferences) {
          setFoodPreferences(guestData.food_preferences);
        }
        if (guestData.dietary_restrictions) {
          setDietaryRestrictions(guestData.dietary_restrictions);
        }
        if (guestData.golden_book_message) {
          setGoldenBookMessage(guestData.golden_book_message);
        }
        
        // Check if already responded (ignore 'pending' status)
        if (guestData.rsvp_status && guestData.rsvp_status !== 'pending' && guestData.response_date) {
          setSubmitted(true);
          // Type assertion safe here as we filtered out 'pending'
          setRsvpStatus(guestData.rsvp_status as 'confirmed' | 'declined' | 'maybe');
          if (guestData.qr_code) {
            setQrCodeData(guestData.qr_code);
          }
        }
      } catch (error) {
        // Error already handled
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId, guestId, token]);

  const calculateProgress = (eventDate: string, createdDate?: string) => {
    const now = new Date();
    const eventDateTime = parseISO(eventDate);
    const startDate = createdDate ? parseISO(createdDate) : new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const totalDuration = eventDateTime.getTime() - startDate.getTime();
    const elapsed = now.getTime() - startDate.getTime();
    const progressPercentage = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
    
    setProgress(progressPercentage);
    
    // Calculate time remaining
    const daysLeft = differenceInDays(eventDateTime, now);
    const hoursLeft = differenceInHours(eventDateTime, now) % 24;
    
    if (daysLeft > 0) {
      setTimeRemaining(`${daysLeft} jour${daysLeft > 1 ? 's' : ''} restant${daysLeft > 1 ? 's' : ''}`);
    } else if (hoursLeft > 0) {
      setTimeRemaining(`${hoursLeft} heure${hoursLeft > 1 ? 's' : ''} restante${hoursLeft > 1 ? 's' : ''}`);
    } else {
      setTimeRemaining('Événement imminent');
    }
  };

  const handleBeverageChange = (beverage: string, checked: boolean) => {
    if (checked) {
      setBeveragePreferences([...beveragePreferences, beverage]);
    } else {
      setBeveragePreferences(beveragePreferences.filter(b => b !== beverage));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Étape 1: Collecte des informations de base
    if (currentStep === 1) {
      if (!guestName || !guestEmail) {
        toast.error('Veuillez remplir tous les champs obligatoires');
        return;
      }
      
      // Si l'utilisateur confirme sa présence, passer à l'étape 2 pour les préférences
      if (rsvpStatus === 'confirmed') {
        setCurrentStep(2);
        toast.info('Veuillez maintenant renseigner vos préférences culinaires');
        return;
      }
      
      // Si l'utilisateur décline, soumettre directement
      if (rsvpStatus === 'declined') {
        await submitRSVP();
        return;
      }
    }
    
    // Étape 2: Soumettre avec les préférences
    if (currentStep === 2) {
      await submitRSVP();
    }
  };

  const submitRSVP = async () => {
    setSubmitting(true);

    try {
      // SECURITY: Validate all inputs before submission
      const formData: GuestRSVPFormData = {
        name: guestName,
        email: guestEmail || undefined,
        phone: guestPhone || undefined,
        beveragePreferences: [...beveragePreferences, ...(otherBeverage ? [otherBeverage] : [])],
        foodPreferences: foodPreferences || undefined,
        dietaryRestrictions: dietaryRestrictions || undefined,
        goldenBookMessage: goldenBookMessage || undefined,
        rsvpStatus: rsvpStatus as 'confirmed' | 'declined' | 'maybe',
        plusOnes: 0
      };

      const validatedData = guestRSVPSchema.parse(formData);

      // SECURITY: Verify we have the secret token
      if (!token) {
        throw new Error('Token de sécurité manquant');
      }

      // Generate unique QR code for guest
      const qrData = `${window.location.origin}/invitation/${eventId}/${guestId}?token=${token}`;
      const qrCodeImage = await QRCode.toDataURL(qrData, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });

      // SECURITY: Update with validated data and token verification
      // The RLS policy will check the secret_token matches
      const { error: updateError } = await supabase
        .from('guests')
        .update({
          rsvp_status: validatedData.rsvpStatus,
          name: validatedData.name,
          email: validatedData.email || null,
          phone: validatedData.phone || null,
          // Convert array to JSON string for DB storage
          beverage_preferences: validatedData.beveragePreferences && validatedData.beveragePreferences.length > 0
            ? JSON.stringify(validatedData.beveragePreferences)
            : null,
          food_preferences: validatedData.foodPreferences || null,
          dietary_restrictions: validatedData.dietaryRestrictions || null,
          golden_book_message: validatedData.goldenBookMessage || null,
          response_date: new Date().toISOString(),
          qr_code: qrData,
          qr_code_image: qrCodeImage,
          qr_code_generated_at: new Date().toISOString(),
        })
        .eq('id', guestId)
        .eq('event_id', eventId)
        .eq('secret_token', token); // SECURITY: Verify token matches

      if (updateError) throw updateError;

      // Create notification for the organizer (non-critical)
      try {
        await supabase
          .from('notifications')
          .insert({
            user_id: event.organizer_id,
            event_id: eventId,
            guest_id: guestId,
            type: 'guest_rsvp',
            title: 'Nouvelle confirmation de présence',
            message: `${validatedData.name} a confirmé ${validatedData.rsvpStatus === 'confirmed' ? 'sa présence' : 'son absence'} à l'événement "${event.title}"`,
            metadata: {
              guest_name: validatedData.name,
              guest_email: validatedData.email,
              guest_phone: validatedData.phone,
              rsvp_status: validatedData.rsvpStatus,
              preferences: {
                beverage: validatedData.beveragePreferences,
                food: validatedData.foodPreferences,
                dietary: validatedData.dietaryRestrictions
              }
            }
          });
      } catch (notifError) {
        // Notification creation failed - non-critical
      }

      setQrCodeData(qrData);
      setSubmitted(true);
      
      toast.success(
        validatedData.rsvpStatus === 'confirmed' 
          ? 'Merci pour votre confirmation ! Votre code QR personnel est disponible ci-dessous.' 
          : 'Votre réponse a été enregistrée. Nous espérons vous voir à une prochaine occasion.'
      );
    } catch (error: any) {
      let errorMessage = 'Erreur lors de la soumission de votre réponse';
      
      if (error.name === 'ZodError') {
        // Validation error
        const firstError = error.errors[0];
        errorMessage = firstError.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <SEO 
          title="Chargement de votre invitation - Invitopia"
          description="Confirmation de présence à votre événement avec Invitopia"
        />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement de votre invitation...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!event || !guest) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Invitation introuvable</CardTitle>
              <CardDescription>
                Cette invitation n'existe pas ou a expiré.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/')} className="w-full">
                Retour à l'accueil
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  const formatEventDate = (dateString: string) => {
    return formatDate(parseISO(dateString), 'dd/MM/yyyy', { locale: fr });
  };

  const formatEventTime = (dateString: string) => {
    return formatDate(parseISO(dateString), 'HH:mm', { locale: fr });
  };

  const getLocationString = () => {
    if (!event.location) return '';
    if (typeof event.location === 'string') return event.location;
    return event.location.address || event.location.city || event.location.country || '';
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Users className="h-16 w-16 text-primary" />
                </div>
                <CardTitle className="text-2xl">Votre QR Code Personnel</CardTitle>
                <CardDescription>
                  Présentez ce code à l'entrée de l'événement pour un accès rapide
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Card className="border-2 border-primary/20 bg-muted/5">
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <QrCode className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">QR Code</CardTitle>
                    </div>
                    <CardDescription>
                      Scannez ce code pour accéder rapidement
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-4">
                    {guest.qr_code_image && (
                      <img 
                        src={guest.qr_code_image} 
                        alt="QR Code" 
                        className="w-64 h-64 border-2 border-dashed border-muted-foreground/20 rounded-lg p-2"
                      />
                    )}
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.download = `qr-code-${guestName}.png`;
                        link.href = guest.qr_code_image;
                        link.click();
                      }}
                    >
                      Télécharger
                    </Button>
                    <div className="bg-muted p-3 rounded text-center text-sm">
                      <p className="text-muted-foreground mb-1">Données:</p>
                      <p className="font-mono text-xs break-all">{qrCodeData}</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Code d'invitation:</p>
                  <p className="font-mono text-lg font-semibold">{guestId.slice(0, 8)}...</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Gardez ce code accessible le jour de l'événement
                  </p>
                </div>

                <Button 
                  onClick={() => navigate('/')} 
                  className="w-full"
                >
                  Retour à l'accueil
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO 
        title={event ? `RSVP - ${event.title}` : 'RSVP - Invitopia'}
        description={event && organizer ? `Confirmez votre présence à ${event.title}. Organisé par ${organizer.name}.` : 'Confirmez votre présence à cet événement'}
        keywords="rsvp événement, confirmation présence, invitation digitale, répondre invitation"
      />
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Event Cover Image with Info Overlay */}
          <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <div className="relative h-64 md:h-96">
              {event.primary_cover_image ? (
                <img 
                  src={event.primary_cover_image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Calendar className="h-24 w-24 text-primary/30" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>{formatEventDate(event.start_date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{formatEventTime(event.start_date)}</span>
                  </div>
                  {getLocationString() && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span>{getLocationString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Left Column - Event Details & Organizer */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Détails de l'Événement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {event.description && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                  )}
                  
                  {event.rsvp_deadline && (
                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                        <Clock className="h-4 w-4" />
                        <p className="text-sm font-medium">
                          Cette invitation expire le {formatEventDate(event.rsvp_deadline)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Échéance de l'événement</span>
                      <span className="font-medium">{timeRemaining}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Organizer Info */}
              {organizer && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Organisateur
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        {organizer.avatar ? (
                          <img src={organizer.avatar} alt={organizer.name} className="w-12 h-12 rounded-full object-cover" />
                        ) : (
                          <span className="text-lg font-semibold text-primary">{organizer.name?.[0]}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{organizer.name}</p>
                        {organizer.organization && (
                          <p className="text-sm text-muted-foreground">{organizer.organization}</p>
                        )}
                      </div>
                    </div>

                    {/* Team Members */}
                    {teamMembers.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm font-medium mb-3">Équipe organisatrice</p>
                        <div className="space-y-2">
                          {teamMembers.map((member) => (
                            <div key={member.id} className="flex items-center gap-2 text-sm">
                              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">
                                {member.profiles?.avatar ? (
                                  <img src={member.profiles.avatar} alt={member.full_name || member.profiles?.name} className="w-8 h-8 rounded-full object-cover" />
                                ) : (
                                  <span>{(member.full_name || member.profiles?.name)?.[0] || 'T'}</span>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{member.full_name || member.profiles?.name}</p>
                                {member.position && (
                                  <p className="text-xs text-muted-foreground">{member.position}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - RSVP Response */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {!showForm ? 'Répondre à l\'invitation' : currentStep === 1 ? 'Étape 1: Vos Informations' : 'Étape 2: Vos Préférences'}
                </CardTitle>
                <CardDescription>
                  {!showForm 
                    ? `Merci de confirmer votre présence avant le ${event.rsvp_deadline ? formatEventDate(event.rsvp_deadline) : 'date limite'}`
                    : currentStep === 1 
                      ? 'Veuillez renseigner ou confirmer vos informations'
                      : 'Aidez-nous à préparer la réception selon vos goûts'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Initial RSVP Buttons */}
                {!showForm && (
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-muted/30 rounded-lg mb-6">
                      <p className="font-medium">Bonjour {guestName || 'Invité(e)'},</p>
                      <p className="text-sm text-muted-foreground">
                        Vous êtes invité(e) à cet événement. Veuillez confirmer votre présence.
                      </p>
                    </div>

                    <div className="grid gap-3">
                      <Button 
                        size="lg"
                        className="w-full h-auto py-4"
                        onClick={() => {
                          setRsvpStatus('confirmed');
                          setShowForm(true);
                        }}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg">✓ Je participe</span>
                          <span className="text-xs opacity-80">Remplir mes informations</span>
                        </div>
                      </Button>
                      
                      <Button 
                        size="lg"
                        variant="outline"
                        className="w-full h-auto py-4"
                        onClick={() => {
                          setRsvpStatus('declined');
                          setShowForm(true);
                        }}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg">✗ Je ne peux pas venir</span>
                          <span className="text-xs opacity-80">Décliner l'invitation</span>
                        </div>
                      </Button>
                    </div>
                  </div>
                )}

                {/* Multi-Step Form */}
                {showForm && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step Indicator - Only show for confirmed */}
                    {rsvpStatus === 'confirmed' && (
                      <div className="flex items-center justify-center gap-2 mb-6">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          1
                        </div>
                        <div className="w-12 h-1 bg-muted"></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          2
                        </div>
                      </div>
                    )}

                    {/* Step 1: Basic Info */}
                    {currentStep === 1 && (
                      <>
                        {/* Greeting */}
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <p className="font-medium">
                            {rsvpStatus === 'confirmed' ? '✓ Merci pour votre confirmation !' : 'Nous sommes désolés que vous ne puissiez pas venir'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {rsvpStatus === 'confirmed' 
                              ? 'Veuillez confirmer vos coordonnées'
                              : 'Merci de renseigner vos informations'
                            }
                          </p>
                        </div>

                        {/* Guest Information */}
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Votre nom complet *</Label>
                            <Input
                              id="name"
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              required
                              placeholder="Entrez votre nom complet"
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="phone">Téléphone *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={guestPhone}
                              onChange={(e) => setGuestPhone(e.target.value)}
                              required
                              placeholder="+243 XX XXX XXXX"
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="email">Email (facultatif)</Label>
                            <Input
                              id="email"
                              type="email"
                              value={guestEmail}
                              onChange={(e) => setGuestEmail(e.target.value)}
                              placeholder="votre.email@exemple.com"
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button 
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setShowForm(false);
                              setCurrentStep(1);
                            }}
                            className="flex-1"
                          >
                            ← Retour
                          </Button>
                          <Button 
                            type="submit" 
                            className="flex-1" 
                            disabled={submitting || !guestName || !guestPhone}
                            size="lg"
                          >
                            {submitting ? 'Envoi en cours...' : rsvpStatus === 'confirmed' ? 'Continuer →' : 'Confirmer'}
                          </Button>
                        </div>
                      </>
                    )}

                  {/* Step 2: Preferences (Only if confirmed) */}
                  {currentStep === 2 && rsvpStatus === 'confirmed' && (
                    <>
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                        <p className="text-sm font-medium text-center">
                          Merci ! Aidez-nous à préparer votre accueil en renseignant vos préférences
                        </p>
                      </div>

                      {/* Food Preferences */}
                      <div>
                        <Label htmlFor="foodPrefs" className="font-medium">Préférences alimentaires</Label>
                        <p className="text-xs text-muted-foreground mb-2">
                          Viande, poisson, végétarien, etc.
                        </p>
                        <Textarea
                          id="foodPrefs"
                          value={foodPreferences}
                          onChange={(e) => setFoodPreferences(e.target.value)}
                          placeholder="Ex: Viande, Poisson, Plats végétariens..."
                          rows={2}
                        />
                      </div>

                      {/* Beverage Preferences */}
                      <div className="space-y-3">
                        <Label className="font-medium">Préférences de boissons</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {['Champagne', 'Vin Rouge', 'Vin Blanc', 'Cocktail', 'Bière', 'Jus de Fruits', 'Eau', 'Café', 'Thé', 'Sans Alcool'].map((beverage) => (
                            <div key={beverage} className="flex items-center space-x-2">
                              <Checkbox
                                id={beverage}
                                checked={beveragePreferences.includes(beverage)}
                                onCheckedChange={(checked) => handleBeverageChange(beverage, checked as boolean)}
                              />
                              <Label htmlFor={beverage} className="cursor-pointer text-sm">
                                {beverage}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <div>
                          <Label htmlFor="otherBeverage" className="text-sm">Autre préférence</Label>
                          <Input
                            id="otherBeverage"
                            value={otherBeverage}
                            onChange={(e) => setOtherBeverage(e.target.value)}
                            placeholder="Précisez votre préférence..."
                          />
                        </div>
                      </div>

                      {/* Dietary Restrictions */}
                      <div>
                        <Label htmlFor="dietary" className="font-medium">Restrictions alimentaires / Régimes</Label>
                        <p className="text-xs text-muted-foreground mb-2">
                          Allergies, végétarien, végan, sans gluten, halal, kosher...
                        </p>
                        <Textarea
                          id="dietary"
                          value={dietaryRestrictions}
                          onChange={(e) => setDietaryRestrictions(e.target.value)}
                          placeholder="Merci de nous indiquer vos allergies ou régimes particuliers pour que nous puissions vous accueillir dans les meilleures conditions."
                          rows={3}
                        />
                      </div>

                      {/* Golden Book */}
                      <div>
                        <Label htmlFor="goldenBook" className="font-medium">Livre d'Or</Label>
                        <p className="text-xs text-muted-foreground mb-2">
                          Laissez un message aux organisateurs
                        </p>
                        <Textarea
                          id="goldenBook"
                          value={goldenBookMessage}
                          onChange={(e) => setGoldenBookMessage(e.target.value)}
                          placeholder="Toutes nos félicitations pour votre événement..."
                          rows={4}
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(1)}
                          className="flex-1"
                        >
                          ← Retour
                        </Button>
                        <Button 
                          type="submit" 
                          className="flex-1" 
                          disabled={submitting}
                          size="lg"
                        >
                          {submitting ? 'Envoi en cours...' : 'Confirmer ma présence'}
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GuestRSVP;
