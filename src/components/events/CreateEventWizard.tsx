import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEvents } from '@/hooks/useEvents';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import step components
import EventTypeStep from './wizard/EventTypeStep';
import EventBasicsStep from './wizard/EventBasicsStep';
import EventLocationStep from './wizard/EventLocationStep';
import EventCustomizationStep from './wizard/EventCustomizationStep';
import EventGuestsStep from './wizard/EventGuestsStep';
import EventTablesStep from './wizard/EventTablesStep';
import EventProgramStep from './wizard/EventProgramStep';
import EventConfirmationStep from './wizard/EventConfirmationStep';

interface CreateEventWizardProps {
  className?: string;
}

interface WizardStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  validation?: (data: any) => boolean;
  optional?: boolean;
}

interface EventFormData {
  // Type step
  type: string;
  template?: string;
  
  // Basics step
  title: string;
  description: string;
  category: string;
  
  // Location step
  location: {
    address: string;
    city: string;
    country: string;
    venue?: string;
    coordinates?: { lat: number; lng: number };
  };
  date: string;
  time: string;
  endDate?: string;
  endTime?: string;
  timezone: string;
  
  // Customization step
  design: {
    theme: string;
    primaryColor: string;
    coverImage?: string;
    customCss?: string;
  };
  settings: {
    visibility: 'public' | 'private' | 'unlisted';
    requireApproval: boolean;
    allowPlusOnes: boolean;
    maxGuestsPerInvitation: number;
    rsvpDeadline?: string;
    enableWaitlist: boolean;
  };
  
  // Guests step
  capacity?: number;
  guestList: {
    contacts: string[];
    groups: string[];
    customInvites: Array<{
      name: string;
      email: string;
      phone?: string;
    }>;
  };
  
  // Tables step
  tables?: Array<{
    id: string;
    name: string;
    capacity: number;
    shape: string;
    category?: string;
    location?: string;
    notes?: string;
    assignments: string[];
  }>;
  
  // Program step
  program?: Array<{
    id: string;
    time: string;
    title: string;
    description: string;
    duration: number;
  }>;
  
  // Additional settings
  tickets?: {
    enabled: boolean;
    types: Array<{
      name: string;
      price: number;
      quantity: number;
      description?: string;
    }>;
  };
}

const CreateEventWizard: React.FC<CreateEventWizardProps> = ({ className }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { createEvent } = useEvents();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    type: '',
    title: '',
    description: '',
    category: '',
    location: {
      address: '',
      city: '',
      country: 'FR'
    },
    date: '',
    time: '',
    timezone: 'Europe/Paris',
    design: {
      theme: 'modern',
      primaryColor: '#3B82F6'
    },
    settings: {
      visibility: 'private',
      requireApproval: false,
      allowPlusOnes: true,
      maxGuestsPerInvitation: 1,
      enableWaitlist: false
    },
    guestList: {
      contacts: [],
      groups: [],
      customInvites: []
    },
    tables: []
  });

  // Types d'événements qui nécessitent la gestion des tables
  const eventTypesWithTables = ['wedding', 'conference', 'party', 'birthday', 'concert'];
  const shouldShowTablesStep = eventTypesWithTables.includes(formData.type);

  const steps: WizardStep[] = [
    {
      id: 'type',
      title: 'Type d\'événement',
      description: 'Choisissez le type d\'événement que vous souhaitez créer',
      component: EventTypeStep,
      validation: (data) => !!data.type
    },
    {
      id: 'basics',
      title: 'Informations de base',
      description: 'Ajoutez les détails essentiels de votre événement',
      component: EventBasicsStep,
      validation: (data) => !!data.title && !!data.type
    },
    {
      id: 'location',
      title: 'Lieu et date',
      description: 'Définissez quand et où aura lieu votre événement',
      component: EventLocationStep,
      validation: (data) => !!data.location.address && !!data.date && !!data.time
    },
    {
      id: 'customization',
      title: 'Personnalisation',
      description: 'Personnalisez l\'apparence et les paramètres',
      component: EventCustomizationStep,
      optional: true
    },
    {
      id: 'guests',
      title: 'Invités',
      description: 'Gérez vos invités et les invitations',
      component: EventGuestsStep,
      optional: true
    },
    ...(shouldShowTablesStep ? [{
      id: 'tables',
      title: 'Organisation des tables',
      description: 'Organisez les tables et attribuez les places',
      component: EventTablesStep,
      optional: true
    }] : []),
    {
      id: 'program',
      title: 'Programme',
      description: 'Définissez le déroulement de l\'événement',
      component: EventProgramStep,
      optional: true
    },
    {
      id: 'confirmation',
      title: 'Confirmation',
      description: 'Vérifiez et publiez votre événement',
      component: EventConfirmationStep
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];
  const StepComponent = currentStepData.component;

  const handleStepDataChange = (stepData: Partial<EventFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }));
  };

  const validateCurrentStep = () => {
    const step = steps[currentStep];
    if (step.validation) {
      return step.validation(formData);
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      toast.error('Veuillez vérifier tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const startDateTime = new Date(`${formData.date}T${formData.time}`);
      let endDateTime;
      
      if (formData.endDate && formData.endTime) {
        endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
      }

      const eventData = {
        title: formData.title || 'Nouvel événement',
        description: formData.description || '',
        type: (formData.type || 'other') as any,
        start_date: startDateTime.toISOString(),
        end_date: endDateTime?.toISOString(),
        location: formData.location || {},
        capacity: formData.capacity || null,
        visibility: (formData.settings?.visibility || 'private') as any,
        status: 'published' as any,
        settings: formData.settings || {},
        design: formData.design || {},
        cover_images: formData.design?.coverImage ? [formData.design.coverImage] : [],
        primary_cover_image: formData.design?.coverImage,
        program: formData.program || [],
        custom_fields: []
      };

      const newEvent = await createEvent(eventData);
      
      toast.success('Événement créé avec succès !');
      navigate(`/events/${newEvent.id}`);
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la création de l\'événement');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAsDraft = async () => {
    setIsSubmitting(true);
    
    try {
      const startDateTime = formData.date && formData.time 
        ? new Date(`${formData.date}T${formData.time}`) 
        : new Date();

      const eventData = {
        title: formData.title || 'Événement sans titre',
        description: formData.description || '',
        type: (formData.type || 'other') as any,
        start_date: startDateTime.toISOString(),
        location: formData.location || {},
        capacity: formData.capacity || null,
        visibility: (formData.settings?.visibility || 'private') as any,
        status: 'draft' as any,
        settings: formData.settings || {},
        design: formData.design || {},
        cover_images: formData.design?.coverImage ? [formData.design.coverImage] : [],
        primary_cover_image: formData.design?.coverImage
      };

      const newEvent = await createEvent(eventData);
      
      toast.success('Brouillon sauvegardé !');
      navigate(`/events/${newEvent.id}`);
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la sauvegarde');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("max-w-4xl mx-auto", className)}>
      {/* Progress Header */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/events')}
              className="text-muted-foreground"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Retour aux événements
            </Button>
            <div className="text-sm text-muted-foreground">
              Étape {currentStep + 1} sur {steps.length}
            </div>
          </div>
          
          <Progress value={progress} className="mb-4" />
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-1">
              {currentStepData.title}
            </h1>
            <p className="text-muted-foreground">
              {currentStepData.description}
            </p>
          </div>
        </CardHeader>
      </Card>

      {/* Step Navigation Breadcrumb */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "flex items-center",
                index < steps.length - 1 && "mr-2"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  index < currentStep 
                    ? "bg-primary text-primary-foreground" 
                    : index === currentStep 
                    ? "bg-primary/20 text-primary border-2 border-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {index < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-12 h-px mx-2",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <StepComponent
            data={formData}
            onChange={handleStepDataChange}
          />
        </CardContent>
      </Card>

      {/* Navigation Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Précédent
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleSaveAsDraft}
                disabled={isSubmitting}
              >
                Sauvegarder le brouillon
              </Button>
            </div>

            <div className="flex gap-2">
              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="min-w-32"
                >
                  {isSubmitting ? 'Création...' : 'Créer l\'événement'}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!validateCurrentStep()}
                >
                  Suivant
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEventWizard;