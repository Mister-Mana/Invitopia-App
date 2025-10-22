
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Clock, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import EventProgressBar from '@/components/EventProgressBar';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl?: string;
  attendees: number;
  totalInvited: number;
  variant?: 'default' | 'compact';
  className?: string;
  creationDate?: string;
  viewPath?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  date,
  location,
  imageUrl,
  attendees,
  totalInvited,
  variant = 'default',
  className,
  creationDate,
  viewPath
}) => {
  // Format the date
  const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const attendeePercentage = Math.round((attendees / totalInvited) * 100);
  const linkPath = viewPath || `/events/${id}`;

  return (
    <div 
      className={cn(
        "bg-white rounded-xl overflow-hidden border border-invitopia-100 transition-all duration-300 hover:shadow-md",
        variant === 'compact' ? 'flex' : 'flex flex-col',
        className
      )}
    >
      {imageUrl && variant === 'default' && (
        <Link to={linkPath} className="relative h-48 overflow-hidden block">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </Link>
      )}

      {imageUrl && variant === 'compact' && (
        <Link to={linkPath} className="relative w-24 h-24 md:w-32 md:h-32 overflow-hidden block">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </Link>
      )}

      <div className={cn(
        "p-4 flex flex-col",
        variant === 'compact' ? 'flex-1' : ''
      )}>
        <div className="flex justify-between items-start mb-2">
          <Link to={linkPath} className="hover:text-invitopia-700">
            <h3 className="font-semibold text-invitopia-800 text-lg line-clamp-1">{title}</h3>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/events/${id}/edit`}>Modifier</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/events/${id}/invitations`}>Gérer les invitations</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/events/${id}/stats`}>Voir les statistiques</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="text-invitopia-600 text-sm mb-4 space-y-1.5">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-invitopia-400" />
            <span>{formattedDate}</span>
          </div>
          {location && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-invitopia-400" />
              <span className="line-clamp-1">{location}</span>
            </div>
          )}
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-invitopia-400" />
            <span>{attendees}/{totalInvited} invités ({attendeePercentage}%)</span>
          </div>
        </div>

        {creationDate && variant === 'default' && (
          <EventProgressBar 
            eventDate={date} 
            creationDate={creationDate}
            className="mb-4" 
          />
        )}

        {variant === 'default' && (
          <Button
            size="sm"
            className="bg-invitopia-700 hover:bg-invitopia-600 text-white mt-auto"
            asChild
          >
            <Link to={linkPath}>Voir l'événement</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
