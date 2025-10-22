
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TeamManagement from '@/components/teams/TeamManagement';
import TeamInvitations from '@/components/teams/TeamInvitations';

const TeamPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Tabs defaultValue="teams" className="w-full">
          <TabsList>
            <TabsTrigger value="teams">Mes équipes</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
          </TabsList>

          <TabsContent value="teams">
            <TeamManagement />
          </TabsContent>

          <TabsContent value="invitations">
            <TeamInvitations />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TeamPage;
