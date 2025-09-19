
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

interface EventData {
  title: string;
  description: string;
  maxGuests: string;
}

interface EventBasicInfoFormProps {
  eventData: EventData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const EventBasicInfoForm: React.FC<EventBasicInfoFormProps> = ({ eventData, onChange }) => {
  const { tNested } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">{tNested('events.eventName', 'Event Name')} <span className="text-red-500">*</span></Label>
        <Input
          id="title"
          name="title"
          value={eventData.title}
          onChange={onChange}
          placeholder={tNested('events.eventNamePlaceholder', 'Enter event name')}
          className="invitopia-input"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">{tNested('events.eventDescription', 'Event Description')}</Label>
        <Textarea
          id="description"
          name="description"
          value={eventData.description}
          onChange={onChange}
          placeholder={tNested('events.descriptionPlaceholder', 'Enter event description')}
          className="resize-none h-32 invitopia-input"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="maxGuests">{tNested('events.maxGuests', 'Maximum Guests')}</Label>
        <Input
          id="maxGuests"
          name="maxGuests"
          type="number"
          value={eventData.maxGuests}
          onChange={onChange}
          placeholder={tNested('events.maxGuestsPlaceholder', 'Enter maximum number of guests')}
          className="invitopia-input"
        />
      </div>
    </div>
  );
};

export default EventBasicInfoForm;
