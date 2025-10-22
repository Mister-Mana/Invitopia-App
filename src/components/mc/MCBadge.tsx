import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Star, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MCBadgeProps {
  category: 'verified' | 'premium' | 'featured' | null;
  className?: string;
}

export const MCBadge: React.FC<MCBadgeProps> = ({ category, className }) => {
  if (!category) return null;

  const badgeConfig = {
    verified: {
      label: 'Vérifié',
      icon: CheckCircle2,
      variant: 'default' as const,
      className: 'bg-blue-500 text-white hover:bg-blue-600'
    },
    premium: {
      label: 'Premium',
      icon: Star,
      variant: 'secondary' as const,
      className: 'bg-purple-500 text-white hover:bg-purple-600'
    },
    featured: {
      label: 'Recommandé',
      icon: Crown,
      variant: 'default' as const,
      className: 'bg-amber-500 text-white hover:bg-amber-600'
    }
  };

  const config = badgeConfig[category];
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant}
      className={cn(
        'flex items-center gap-1 font-semibold',
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};
