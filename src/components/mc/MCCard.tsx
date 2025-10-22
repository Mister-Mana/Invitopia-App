import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Star, Clock, MessageCircle } from 'lucide-react';
import { MasterOfCeremony } from '@/hooks/useMasterOfCeremonies';
import { MCBadge } from './MCBadge';

interface MCCardProps {
  mc: MasterOfCeremony;
  onViewProfile: (id: string) => void;
  onStartChat: (id: string) => void;
}

const MCCard: React.FC<MCCardProps> = ({ mc, onViewProfile, onStartChat }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-primary/20 to-secondary/20">
        {mc.cover_image ? (
          <img
            src={mc.cover_image}
            alt={`${mc.business_name} cover`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-4xl font-bold text-muted-foreground">
              {mc.business_name.charAt(0)}
            </div>
          </div>
        )}
        
        {/* Verified Badge */}
        {mc.is_verified && (
          <Badge className="absolute top-3 right-3 bg-green-500 text-white">
            ✓ Vérifié
          </Badge>
        )}
        
        {/* Profile Image */}
        <div className="absolute -bottom-8 left-4">
          <Avatar className="w-16 h-16 border-4 border-background">
            <AvatarImage src={mc.profile_image} alt={mc.business_name} />
            <AvatarFallback className="text-lg font-bold">
              {mc.business_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <CardContent className="pt-12 pb-4">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg text-foreground truncate">
              {mc.business_name}
            </h3>
            <MCBadge category={mc.badge_category} />
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            {mc.location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {mc.location}
              </div>
            )}
          </div>
        </div>

        {/* Rating & Experience */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{mc.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">
              ({mc.total_reviews})
            </span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            {mc.experience_years} ans
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {mc.specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {mc.specialties.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{mc.specialties.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Bio Preview */}
        {mc.bio && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {mc.bio}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onViewProfile(mc.id)}
          >
            Voir le profil
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={() => onStartChat(mc.id)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Contacter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MCCard;