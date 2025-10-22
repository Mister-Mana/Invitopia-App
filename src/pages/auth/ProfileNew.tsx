
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProfileManager from '@/components/profile/ProfileManager';

const ProfileNew: React.FC = () => {
  return (
    <DashboardLayout>
      <ProfileManager />
    </DashboardLayout>
  );
};

export default ProfileNew;
