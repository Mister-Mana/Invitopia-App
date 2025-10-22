
import React from 'react';
import MobileLayout from '@/components/mobile/MobileLayout';
import CreateEventWizard from '@/components/events/CreateEventWizard';

const CreateEvent: React.FC = () => {
  return (
    <MobileLayout showBottomNav={false}>
      <CreateEventWizard />
    </MobileLayout>
  );
};

export default CreateEvent;
