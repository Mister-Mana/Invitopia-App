
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, MapPin, Users, Clock, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import EventProgressBar from '@/components/EventProgressBar';
import { PublicEvent } from '@/hooks/usePublicEvents';
import { EVENT_CATEGORIES } from '@/types/events';

interface EventDetailsProps {
  event: PublicEvent;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all available images
  const allImages = [
    ...(event.cover_images || []),
    ...(event.imageUrl && !event.cover_images?.includes(event.imageUrl) ? [event.imageUrl] : [])
  ].filter(Boolean);

  // Format the date
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Découvrez ${event.title}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papier !");
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const categoryInfo = EVENT_CATEGORIES[event.category] || EVENT_CATEGORIES.other;
  const currentImage = allImages[currentImageIndex];

  return (
    <>
      {/* Cover Image Gallery */}
      {allImages.length > 0 && (
        <div className="h-48 md:h-64 lg:h-80 w-full relative mt-16">
          <img 
            src={currentImage} 
            alt={`${event.title} - Image ${currentImageIndex + 1}`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-invitopia-900/70 to-transparent"></div>
          
          {/* Image Navigation */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                aria-label="Image précédente"
              >
                <ChevronLeft className="h-4 w-4 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                aria-label="Image suivante"
              >
                <ChevronRight className="h-4 w-4 text-gray-800" />
              </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </>
          )}
        </div>
      )}

      <div className={`bg-white rounded-xl shadow-sm ${allImages.length > 0 ? '-mt-16 relative z-10' : ''}`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span 
              className="px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: categoryInfo.color }}
            >
              {categoryInfo.name}
            </span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-invitopia-900 mb-6">
            {event.title}
          </h1>
          
          <div className="space-y-4 text-invitopia-600">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 mr-3 mt-0.5 text-invitopia-500" />
              <div>
                <p className="font-medium text-invitopia-800">{formattedDate}</p>
                {event.end_date && (
                  <p className="text-sm">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {new Date(event.start_date).toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                    {event.end_date && (
                      ` - ${new Date(event.end_date).toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}`
                    )}
                  </p>
                )}
              </div>
            </div>
            
            {event.location && (
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-invitopia-500" />
                <div>
                  <p className="font-medium text-invitopia-800">
                    {typeof event.location === 'string' 
                      ? event.location 
                      : event.location.address || 'Lieu à confirmer'
                    }
                  </p>
                  {typeof event.location === 'object' && event.location.city && (
                    <p className="text-sm">{event.location.city}</p>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex items-start">
              <Users className="h-5 w-5 mr-3 mt-0.5 text-invitopia-500" />
              <div>
                <p className="font-medium text-invitopia-800">Participants</p>
                <p>
                  {event.attendees} confirmés
                  {event.totalInvited > 0 && ` sur ${event.totalInvited} places`}
                </p>
              </div>
            </div>
          </div>
          
          <EventProgressBar 
            eventDate={event.date} 
            creationDate={event.creationDate}
            className="mt-6" 
          />
        </div>
        
        <div className="border-t border-invitopia-100 p-6">
          <h2 className="text-xl font-semibold text-invitopia-800 mb-4">
            À propos de cet événement
          </h2>
          {event.description ? (
            <div className="prose max-w-none">
              <p className="text-invitopia-600 leading-relaxed">
                {event.description}
              </p>
            </div>
          ) : (
            <p className="text-invitopia-500">Aucune description disponible.</p>
          )}
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Button 
              className="bg-invitopia-700 hover:bg-invitopia-600"
              onClick={() => toast.info("Fonctionnalité bientôt disponible")}
            >
              Voir les détails complets
            </Button>
            <Button 
              variant="outline" 
              className="border-invitopia-200" 
              onClick={shareEvent}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-invitopia-500 text-sm">
        <p>Événement organisé par {(event as any).organizer || 'Organisateur'}</p>
      </div>
    </>
  );
};

export default EventDetails;
