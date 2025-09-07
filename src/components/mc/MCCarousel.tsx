import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useMasterOfCeremonies } from '@/hooks/useMasterOfCeremonies';
import { useAuth } from '@/contexts/auth';
import { useNavigate } from 'react-router-dom';
import MCCard from './MCCard';
import { useMCChat } from '@/hooks/useMasterOfCeremonies';
import { toast } from 'sonner';

const MCCarousel: React.FC = () => {
  const { mcs, loading } = useMasterOfCeremonies();
  const { user } = useAuth();
  const { startConversation } = useMCChat();
  const navigate = useNavigate();

  const handleViewProfile = (mcId: string) => {
    if (!user) {
      toast.error('Veuillez vous connecter pour voir les profils des MC');
      navigate('/auth/signin');
      return;
    }
    navigate(`/mc/${mcId}`);
  };

  const handleStartChat = async (mcId: string) => {
    if (!user) {
      toast.error('Veuillez vous connecter pour contacter un MC');
      navigate('/auth/signin');
      return;
    }

    try {
      await startConversation(mcId);
      navigate('/chat');
    } catch (error) {
      console.error('Erreur lors du démarrage de la conversation:', error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground mt-2">Chargement des maîtres de cérémonie...</p>
      </div>
    );
  }

  if (mcs.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Aucun maître de cérémonie disponible pour le moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full">
      <Carousel className="w-full" opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {mcs.map((mc) => (
            <CarouselItem key={mc.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <MCCard
                mc={mc}
                onViewProfile={handleViewProfile}
                onStartChat={handleStartChat}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default MCCarousel;