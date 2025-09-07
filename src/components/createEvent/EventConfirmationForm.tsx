
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check } from 'lucide-react';

interface EventData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  maxGuests: string;
}

interface EventConfirmationFormProps {
  eventData: EventData;
  selectedTemplate: string | null;
}

const EventConfirmationForm: React.FC<EventConfirmationFormProps> = ({ eventData, selectedTemplate }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-green-100 bg-green-50 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Check className="h-5 w-5 text-green-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              {t('createEvent.readyToCreate')}
            </h3>
            <div className="mt-2 text-sm text-green-700">
              <p>{t('createEvent.confirmationMessage')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-invitopia-800">{t('createEvent.eventType')}</p>
            <p className="text-sm text-invitopia-600">{selectedTemplate}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-invitopia-800">{t('createEvent.title')}</p>
            <p className="text-sm text-invitopia-600">{eventData.title}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-invitopia-800">{t('createEvent.date')}</p>
            <p className="text-sm text-invitopia-600">{eventData.date} {eventData.time}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-invitopia-800">{t('createEvent.location')}</p>
            <p className="text-sm text-invitopia-600">{eventData.location}</p>
          </div>
        </div>
        {eventData.description && (
          <div>
            <p className="text-sm font-medium text-invitopia-800">{t('createEvent.description')}</p>
            <p className="text-sm text-invitopia-600">{eventData.description}</p>
          </div>
        )}
        {eventData.address && (
          <div>
            <p className="text-sm font-medium text-invitopia-800">{t('createEvent.address')}</p>
            <p className="text-sm text-invitopia-600">{eventData.address}</p>
          </div>
        )}
        {eventData.maxGuests && (
          <div>
            <p className="text-sm font-medium text-invitopia-800">{t('createEvent.maxGuests')}</p>
            <p className="text-sm text-invitopia-600">{eventData.maxGuests}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventConfirmationForm;
