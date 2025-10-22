
import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Calendar, Timer } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface EventProgressBarProps {
  eventDate: string;
  creationDate?: string;
  className?: string;
}

const EventProgressBar: React.FC<EventProgressBarProps> = ({ 
  eventDate, 
  creationDate = null, 
  className 
}) => {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  
  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();
      const eventDateTime = new Date(eventDate);
      
      // If event is in the past, show 100%
      if (now > eventDateTime) {
        setProgress(100);
        setTimeRemaining('L\'événement a déjà eu lieu');
        return;
      }
      
      // Calculate progress based on creation date or default to 30 days before event
      const startDate = creationDate 
        ? new Date(creationDate) 
        : new Date(eventDateTime.getTime() - (30 * 24 * 60 * 60 * 1000));
      
      const totalDuration = eventDateTime.getTime() - startDate.getTime();
      const elapsedDuration = now.getTime() - startDate.getTime();
      
      // Calculate percentage (capped between 0-100)
      const calculatedProgress = Math.min(
        Math.max(Math.round((elapsedDuration / totalDuration) * 100), 0),
        100
      );
      
      setProgress(calculatedProgress);
      
      // Format remaining time
      setTimeRemaining(formatDistanceToNow(eventDateTime, { 
        addSuffix: true,
        locale: fr 
      }));
    };
    
    calculateProgress();
    
    // Update progress every hour
    const intervalId = setInterval(calculateProgress, 3600000);
    
    return () => clearInterval(intervalId);
  }, [eventDate, creationDate]);
  
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center text-sm text-invitopia-600">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Progression</span>
        </div>
        <div className="flex items-center">
          <Timer className="h-4 w-4 mr-1" />
          <span>{timeRemaining}</span>
        </div>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default EventProgressBar;
