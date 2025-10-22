import React from 'react';
import { Badge as BadgeComponent } from '@/components/ui/badge';
import { CheckCircle2, Shield, Star, Award } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface UserBadgeDisplayProps {
  badgeType?: 'verified' | 'professional' | 'premium' | 'excellence' | null;
  expiresAt?: string | null;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const UserBadgeDisplay: React.FC<UserBadgeDisplayProps> = ({
  badgeType,
  expiresAt,
  size = 'md',
  showLabel = true
}) => {
  if (!badgeType) return null;

  const getBadgeConfig = () => {
    switch (badgeType) {
      case 'verified':
        return {
          icon: CheckCircle2,
          label: 'Invitopia Verified',
          color: 'bg-blue-500 text-white',
          description: 'Compte vérifié officiellement'
        };
      case 'professional':
        return {
          icon: Shield,
          label: 'Invitopia Professional',
          color: 'bg-purple-500 text-white',
          description: 'Professionnel certifié'
        };
      case 'premium':
        return {
          icon: Star,
          label: 'Invitopia Premium',
          color: 'bg-yellow-500 text-white',
          description: 'Membre premium'
        };
      case 'excellence':
        return {
          icon: Award,
          label: 'Invitopia Excellence',
          color: 'bg-emerald-500 text-white',
          description: 'Excellence certifiée'
        };
      default:
        return null;
    }
  };

  const config = getBadgeConfig();
  if (!config) return null;

  const Icon = config.icon;
  
  const iconSize = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }[size];

  const isExpired = expiresAt ? new Date(expiresAt) < new Date() : false;

  const badge = (
    <BadgeComponent 
      className={`${config.color} ${isExpired ? 'opacity-50' : ''} cursor-help`}
    >
      <Icon className={`${iconSize} mr-1`} />
      {showLabel && <span>{config.label}</span>}
    </BadgeComponent>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-semibold">{config.label}</p>
            <p className="text-xs text-muted-foreground">{config.description}</p>
            {expiresAt && (
              <p className="text-xs mt-1">
                {isExpired ? 'Expiré le' : 'Expire le'}{' '}
                {new Date(expiresAt).toLocaleDateString('fr-FR')}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserBadgeDisplay;
