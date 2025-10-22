
import React, { useState } from 'react';
import { useBadges } from '@/hooks/useBadges';
import { useAuth } from '@/contexts/auth';
import { Database } from '@/integrations/supabase/types';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BadgeStats from './badges/BadgeStats';
import BadgeFilters from './badges/BadgeFilters';
import BadgeTable from './badges/BadgeTable';
import BadgeReviewDialog from './badges/BadgeReviewDialog';
import BadgeAssignment from './badges/BadgeAssignment';

type BadgeStatus = Database['public']['Enums']['badge_status'];

const BadgeManagement: React.FC = () => {
  const { badges, loading, reviewBadge, refetch } = useBadges();
  const { user } = useAuth();
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<BadgeStatus>('approved');
  const [expirationDate, setExpirationDate] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBadges = badges.filter(badge => {
    const matchesStatus = filterStatus === 'all' || badge.status === filterStatus;
    const matchesType = filterType === 'all' || badge.badge_type === filterType;
    const matchesSearch = searchTerm === '' || 
      badge.profiles?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  const handleReviewBadge = async () => {
    if (!selectedBadge) return;

    try {
      await reviewBadge(
        selectedBadge.id, 
        reviewStatus,
        expirationDate || undefined
      );
      
      toast.success(`Badge ${reviewStatus === 'approved' ? 'approuvé' : 'rejeté'} avec succès`);
      setIsReviewDialogOpen(false);
      setSelectedBadge(null);
      refetch();
    } catch (error) {
      toast.error('Erreur lors de la révision du badge');
      console.error('Error reviewing badge:', error);
    }
  };

  const openReviewDialog = (badge: any) => {
    setSelectedBadge(badge);
    setReviewStatus('approved');
    setExpirationDate('');
    setIsReviewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <BadgeStats badges={badges} />
      
      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="requests">Demandes de badges</TabsTrigger>
          <TabsTrigger value="assignment">Attribution de badges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests" className="space-y-6">
          <BadgeFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterStatus={filterStatus}
            onStatusChange={setFilterStatus}
            filterType={filterType}
            onTypeChange={setFilterType}
          />

          <BadgeTable
            badges={filteredBadges}
            loading={loading}
            onReview={openReviewDialog}
          />
        </TabsContent>
        
        <TabsContent value="assignment">
          <BadgeAssignment />
        </TabsContent>
      </Tabs>

      <BadgeReviewDialog
        isOpen={isReviewDialogOpen}
        onClose={() => setIsReviewDialogOpen(false)}
        selectedBadge={selectedBadge}
        reviewStatus={reviewStatus}
        onReviewStatusChange={setReviewStatus}
        expirationDate={expirationDate}
        onExpirationDateChange={setExpirationDate}
        onConfirm={handleReviewBadge}
      />
    </div>
  );
};

export default BadgeManagement;
