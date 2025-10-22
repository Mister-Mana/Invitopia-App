
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Crown, Star, Shield, CheckCircle, Award } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type BadgeType = Database['public']['Enums']['badge_type'];
type BadgeStatus = Database['public']['Enums']['badge_status'];

interface BadgeData {
  id: string;
  badge_type: BadgeType;
  profiles?: {
    name: string;
    email: string | null;
  } | null;
}

interface BadgeReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBadge: BadgeData | null;
  reviewStatus: BadgeStatus;
  onReviewStatusChange: (status: BadgeStatus) => void;
  expirationDate: string;
  onExpirationDateChange: (date: string) => void;
  onConfirm: () => void;
}

const BadgeReviewDialog: React.FC<BadgeReviewDialogProps> = ({
  isOpen,
  onClose,
  selectedBadge,
  reviewStatus,
  onReviewStatusChange,
  expirationDate,
  onExpirationDateChange,
  onConfirm
}) => {
  const getBadgeIcon = (type: BadgeType) => {
    switch (type) {
      case 'excellence':
        return <Crown className="h-4 w-4" />;
      case 'professional':
        return <Star className="h-4 w-4" />;
      case 'verified':
        return <CheckCircle className="h-4 w-4" />;
      case 'premium':
        return <Shield className="h-4 w-4" />;
      default:
        return <Award className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Réviser la demande de badge</DialogTitle>
          <DialogDescription>
            Examinez et approuvez ou rejetez cette demande de badge.
          </DialogDescription>
        </DialogHeader>
        
        {selectedBadge && (
          <div className="space-y-4">
            <div>
              <label className="font-medium">Utilisateur :</label>
              <p>{selectedBadge.profiles?.name} ({selectedBadge.profiles?.email})</p>
            </div>
            
            <div>
              <label className="font-medium">Type de badge :</label>
              <div className="flex items-center gap-2 mt-1">
                {getBadgeIcon(selectedBadge.badge_type)}
                <span className="capitalize">{selectedBadge.badge_type}</span>
              </div>
            </div>
            
            <div>
              <label className="font-medium">Décision :</label>
              <Select value={reviewStatus} onValueChange={(value: BadgeStatus) => onReviewStatusChange(value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">Approuver</SelectItem>
                  <SelectItem value="rejected">Rejeter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {reviewStatus === 'approved' && (
              <div>
                <label className="font-medium">Date d'expiration (optionnel) :</label>
                <Input
                  type="datetime-local"
                  value={expirationDate}
                  onChange={(e) => onExpirationDateChange(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={onConfirm}>
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BadgeReviewDialog;
