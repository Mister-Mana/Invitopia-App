
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Zap } from 'lucide-react';

interface EmptyStateProps {
  onCreateClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateClick }) => {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <Zap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune intégration</h3>
        <p className="text-gray-500 mb-4">
          Commencez par créer votre première intégration API
        </p>
        <Button onClick={onCreateClick}>
          <Plus className="h-4 w-4 mr-2" />
          Créer une intégration
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
