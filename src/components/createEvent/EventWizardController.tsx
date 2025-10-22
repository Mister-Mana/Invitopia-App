
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEvents } from '@/hooks/useEvents';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

// Import wizard components
import EventWizardStepper, { WizardStep } from '@/components/createEvent/EventWizardStepper';
import EventTypeSelector, { EventTemplate } from '@/components/createEvent/EventTypeSelector';
import EventBasicInfoForm from '@/components/createEvent/EventBasicInfoForm';
import EventLocationDateForm from '@/components/createEvent/EventLocationDateForm';
import EventCustomizationForm from '@/components/createEvent/EventCustomizationForm';
import ContactSelectionForm from '@/components/createEvent/ContactSelectionForm';
import EventConfirmationForm from '@/components/createEvent/EventConfirmationForm';

const EventWizardController: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { createEvent } = useEvents();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    address: '',
    maxGuests: ''
  });
  const [eventSettings, setEventSettings] = useState({
    team: '',
    contactGroup: '',
    allowPlusOnes: true,
    requireApproval: false,
    maxGuestsPerInvitation: '1',
    rsvpDeadline: '',
    customUrl: '',
    isPublic: false,
    sendReminders: true,
    enableCheckIn: true,
    primaryColor: '#3B82F6',
    themeStyle: 'modern'
  });

  // Event type templates
  const eventTemplates: EventTemplate[] = [
    { id: 'corporate', name: t('createEvent.templates.corporate.name'), description: t('createEvent.templates.corporate.description') },
    { id: 'wedding', name: t('createEvent.templates.wedding.name'), description: t('createEvent.templates.wedding.description') },
    { id: 'birthday', name: t('createEvent.templates.birthday.name'), description: t('createEvent.templates.birthday.description') },
    { id: 'social', name: t('createEvent.templates.social.name'), description: t('createEvent.templates.social.description') },
    { id: 'fundraiser', name: t('createEvent.templates.fundraiser.name'), description: t('createEvent.templates.fundraiser.description') },
    { id: 'other', name: t('createEvent.templates.other.name'), description: t('createEvent.templates.other.description') }
  ];

  // Wizard steps
  const steps: WizardStep[] = [
    { title: t('createEvent.steps.type.title'), description: t('createEvent.steps.type.description') },
    { title: t('createEvent.steps.basic.title'), description: t('createEvent.steps.basic.description') },
    { title: t('createEvent.steps.location.title'), description: t('createEvent.steps.location.description') },
    { title: t('createEvent.steps.customization.title'), description: t('createEvent.steps.customization.description') },
    { title: t('createEvent.steps.contacts.title'), description: t('createEvent.steps.contacts.description') },
    { title: t('createEvent.steps.confirm.title'), description: t('createEvent.steps.confirm.description') }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string | boolean) => {
    setEventSettings(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (activeStep === 0 && !selectedTemplate) {
      toast.error(t('createEvent.errors.selectTemplate'));
      return;
    }
    
    if (activeStep === 1) {
      if (!eventData.title) {
        toast.error(t('createEvent.errors.requiredFields'));
        return;
      }
    }
    
    if (activeStep === 2) {
      if (!eventData.date || !eventData.location) {
        toast.error(t('createEvent.errors.requiredFields'));
        return;
      }
    }
    
    if (activeStep === 4) {
      if (!eventSettings.team) {
        toast.error(t('createEvent.teamRequired'));
        return;
      }
    }
    
    setActiveStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const startDate = new Date(`${eventData.date}T${eventData.time || '00:00'}`);
      
      const newEvent = {
        title: eventData.title,
        description: eventData.description,
        type: selectedTemplate as any,
        start_date: startDate.toISOString(),
        location: {
          address: eventData.location,
          details: eventData.address
        },
        capacity: eventData.maxGuests ? parseInt(eventData.maxGuests) : undefined,
        settings: {
          allowPlusOnes: eventSettings.allowPlusOnes,
          requireApproval: eventSettings.requireApproval,
          sendReminders: eventSettings.sendReminders,
          enableCheckIn: eventSettings.enableCheckIn,
          customUrl: eventSettings.customUrl
        },
        design: {
          primaryColor: eventSettings.primaryColor,
          themeStyle: eventSettings.themeStyle
        },
        visibility: eventSettings.isPublic ? 'public' : 'private' as any,
        status: 'published' as any,
        rsvp_deadline: eventSettings.rsvpDeadline ? new Date(eventSettings.rsvpDeadline).toISOString() : undefined,
        max_guests_per_invitation: parseInt(eventSettings.maxGuestsPerInvitation)
      };

      await createEvent(newEvent);
      toast.success(t('createEvent.success'));
      
      setTimeout(() => {
        navigate('/dashboard/events');
      }, 1500);
    } catch (error: any) {
      toast.error(error.message || 'Une erreur est survenue');
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{steps[activeStep].title}</CardTitle>
        <CardDescription>{steps[activeStep].description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Step 1: Event Type */}
          {activeStep === 0 && (
            <EventTypeSelector 
              eventTemplates={eventTemplates} 
              selectedTemplate={selectedTemplate} 
              onTemplateSelect={handleTemplateSelect} 
            />
          )}
          
          {/* Step 2: Basic Information */}
          {activeStep === 1 && (
            <EventBasicInfoForm 
              eventData={eventData} 
              onChange={handleInputChange} 
            />
          )}
          
          {/* Step 3: Location and Date */}
          {activeStep === 2 && (
            <EventLocationDateForm 
              eventData={eventData} 
              onChange={handleInputChange} 
            />
          )}
          
          {/* Step 4: Customization */}
          {activeStep === 3 && (
            <EventCustomizationForm 
              onSelectChange={handleSelectChange} 
            />
          )}

          {/* Step 5: Contact Selection */}
          {activeStep === 4 && (
            <ContactSelectionForm 
              onSelectChange={handleSelectChange}
              selectedTeam={eventSettings.team}
              selectedContactGroup={eventSettings.contactGroup}
            />
          )}

          {/* Step 6: Confirmation */}
          {activeStep === 5 && (
            <EventConfirmationForm 
              eventData={eventData}
              selectedTemplate={selectedTemplate}
            />
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between pt-4 border-t">
        <Button 
          variant="outline"
          onClick={prevStep}
          disabled={activeStep === 0}
          className="border-invitopia-200 hover:border-invitopia-300 text-invitopia-700"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {t('common.previous')}
        </Button>
        
        {activeStep < steps.length - 1 ? (
          <Button 
            onClick={nextStep}
            className="bg-invitopia-700 hover:bg-invitopia-600 text-white"
          >
            {t('common.next')}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            className="bg-invitopia-700 hover:bg-invitopia-600 text-white"
          >
            {t('createEvent.createEvent')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventWizardController;
