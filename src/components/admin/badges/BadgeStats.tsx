
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Clock, Check, X } from 'lucide-react';

interface Badge {
  status: string;
}

interface BadgeStatsProps {
  badges: Badge[];
}

const BadgeStats: React.FC<BadgeStatsProps> = ({ badges }) => {
  const stats = {
    total: badges.length,
    pending: badges.filter(b => b.status === 'pending').length,
    approved: badges.filter(b => b.status === 'approved' || b.status === 'active').length,
    rejected: badges.filter(b => b.status === 'rejected').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="flex items-center p-6">
          <Award className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-gray-600">Total badges</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex items-center p-6">
          <Clock className="h-8 w-8 text-yellow-600 mr-3" />
          <div>
            <p className="text-2xl font-bold">{stats.pending}</p>
            <p className="text-sm text-gray-600">En attente</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex items-center p-6">
          <Check className="h-8 w-8 text-green-600 mr-3" />
          <div>
            <p className="text-2xl font-bold">{stats.approved}</p>
            <p className="text-sm text-gray-600">Approuvés</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex items-center p-6">
          <X className="h-8 w-8 text-red-600 mr-3" />
          <div>
            <p className="text-2xl font-bold">{stats.rejected}</p>
            <p className="text-sm text-gray-600">Rejetés</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BadgeStats;
