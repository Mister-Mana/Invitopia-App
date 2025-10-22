import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useMasterOfCeremonies, useMCChat, MasterOfCeremony } from '@/hooks/useMasterOfCeremonies';
import { useAuth } from '@/contexts/auth';
import { 
  MapPin, 
  Star, 
  Clock, 
  MessageCircle, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

const MCProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getMCById } = useMasterOfCeremonies();
  const { startConversation } = useMCChat();
  const [mc, setMc] = useState<MasterOfCeremony | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMC = async () => {
      if (!id) return;
      
      try {
        const mcData = await getMCById(id);
        setMc(mcData as MasterOfCeremony);
      } catch (error) {
        toast.error('MC non trouvé');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchMC();
  }, [id, getMCById, navigate]);

  const handleStartChat = async () => {
    if (!user) {
      toast.error('Veuillez vous connecter pour contacter ce MC');
      navigate('/auth/signin');
      return;
    }

    if (!mc) return;

    try {
      await startConversation(mc.id);
      navigate('/chat');
    } catch (error) {
      console.error('Erreur lors du démarrage de la conversation:', error);
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'twitter':
      case 'x':
        return <Twitter className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Chargement du profil...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!mc) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">MC non trouvé</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Button>

        {/* Cover & Profile Section */}
        <Card className="overflow-hidden mb-6">
          {/* Cover Image */}
          <div className="relative h-64 bg-gradient-to-r from-primary/20 to-secondary/20">
            {mc.cover_image ? (
              <img
                src={mc.cover_image}
                alt={`${mc.business_name} cover`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-6xl font-bold text-muted-foreground">
                  {mc.business_name.charAt(0)}
                </div>
              </div>
            )}
            
            {/* Verified Badge */}
            {mc.is_verified && (
              <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                ✓ Vérifié
              </Badge>
            )}
          </div>

          <CardContent className="pt-0">
            <div className="flex flex-col md:flex-row items-start gap-6 -mt-16 relative">
              {/* Profile Image */}
              <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
                <AvatarImage src={mc.profile_image} alt={mc.business_name} />
                <AvatarFallback className="text-3xl font-bold">
                  {mc.business_name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              {/* Profile Info */}
              <div className="flex-1 mt-16 md:mt-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {mc.business_name}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      {mc.location && (
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {mc.location}
                        </div>
                      )}
                      
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{mc.rating}</span>
                        <span className="text-muted-foreground ml-1">
                          ({mc.total_reviews} avis)
                        </span>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {mc.experience_years} ans d'expérience
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleStartChat} size="lg">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contacter
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio */}
            {mc.bio && (
              <Card>
                <CardHeader>
                  <CardTitle>À propos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{mc.bio}</p>
                </CardContent>
              </Card>
            )}

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle>Spécialités</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mc.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            {mc.services.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Services proposés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mc.services.map((service: any, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{service.name}</span>
                        {service.price && (
                          <Badge variant="outline">{service.price}</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Gallery */}
            {mc.gallery_images.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Galerie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {mc.gallery_images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mc.contact_info.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="text-sm">{mc.contact_info.phone}</span>
                  </div>
                )}
                
                {mc.contact_info.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="text-sm">{mc.contact_info.email}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Réseaux sociaux</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(mc.social_media).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      {getSocialIcon(platform)}
                      <span className="ml-3 text-sm capitalize">{platform}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pricing Info */}
            {Object.keys(mc.pricing_info).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Tarification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(mc.pricing_info).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm capitalize">{key}:</span>
                        <span className="text-sm font-medium">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCProfile;