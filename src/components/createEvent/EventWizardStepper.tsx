
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export interface WizardStep {
  title: string;
  description: string;
}

interface EventWizardStepperProps {
  steps: WizardStep[];
  activeStep: number;
}

const EventWizardStepper: React.FC<EventWizardStepperProps> = ({ steps, activeStep }) => {
  const { t } = useLanguage();
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`flex flex-col items-center ${index === steps.length - 1 ? '' : 'w-full'}`}
          >
            <div 
              className={`relative flex items-center justify-center w-10 h-10 rounded-full ${
                activeStep === index 
                  ? 'bg-invitopia-700 text-white' 
                  : activeStep > index 
                    ? 'bg-green-500 text-white' 
                    : 'bg-invitopia-200 text-invitopia-600'
              }`}
            >
              {activeStep > index ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className="text-xs text-invitopia-600 text-center mt-2 max-w-[120px]">
              {step.title}
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`absolute top-5 w-full h-[2px] left-0 -z-10 ${
                  activeStep > index ? 'bg-green-500' : 'bg-invitopia-200'
                }`} 
                style={{ transform: 'translateX(50%)' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventWizardStepper;
