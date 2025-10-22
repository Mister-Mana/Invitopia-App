
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import CountrySelector from './CountrySelector';

interface EventLocationDateData {
  date: string;
  time: string;
  location: string;
  address: string;
  country?: string;
}

interface EventLocationDateFormProps {
  eventData: EventLocationDateData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCountryChange?: (country: string) => void;
}

const EventLocationDateForm: React.FC<EventLocationDateFormProps> = ({ eventData, onChange, onCountryChange }) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <CountrySelector 
        value={eventData.country || ''} 
        onChange={(country) => onCountryChange?.(country)}
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">{t('createEvent.date')} <span className="text-red-500">*</span></Label>
          <div className="relative">
            <Input
              id="date"
              name="date"
              type="date"
              value={eventData.date}
              onChange={onChange}
              className="invitopia-input pl-10"
              required
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-invitopia-500" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time">{t('createEvent.time')}</Label>
          <div className="relative">
            <Input
              id="time"
              name="time"
              type="time"
              value={eventData.time}
              onChange={onChange}
              className="invitopia-input pl-10"
            />
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-invitopia-500" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">{t('createEvent.location')} <span className="text-red-500">*</span></Label>
        <div className="relative">
          <Input
            id="location"
            name="location"
            value={eventData.location}
            onChange={onChange}
            placeholder={t('createEvent.locationPlaceholder')}
            className="invitopia-input pl-10"
            required
          />
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-invitopia-500" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">{t('createEvent.address')}</Label>
        <Textarea
          id="address"
          name="address"
          value={eventData.address}
          onChange={onChange}
          placeholder={t('createEvent.addressPlaceholder')}
          className="resize-none h-20 invitopia-input"
        />
      </div>
    </div>
  );
};

export default EventLocationDateForm;
