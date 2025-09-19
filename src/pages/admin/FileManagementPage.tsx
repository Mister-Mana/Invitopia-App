import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import FileManagement from '@/components/admin/FileManagement';

const FileManagementPage: React.FC = () => {
  return (
    <DashboardLayout>
      <FileManagement />
    </DashboardLayout>
  );
};

export default FileManagementPage;