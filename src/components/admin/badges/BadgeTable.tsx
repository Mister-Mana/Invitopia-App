
import React from 'react';
import { Badge as BadgeComponent } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Badge {
  id: string;
  user_id: string;
  badge_type: string;
  status: string;
  applied_at: string;
  reviewed_at?: string;
  expires_at?: string;
  application_reason?: string;
  price: number;
  payment_status: string;
  profiles?: {
    name: string;
    email: string | null;
  } | null;
  reviewer?: {
    name: string;
  } | null;
}

interface BadgeTableProps {
  badges: Badge[];
  loading: boolean;
  onReview: (badge: Badge) => void;
}

const BadgeTable: React.FC<BadgeTableProps> = ({ badges, loading, onReview }) => {
  const getBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      verified: 'bg-blue-500 text-white',
      professional: 'bg-purple-500 text-white',
      premium: 'bg-yellow-500 text-white',
      excellence: 'bg-emerald-500 text-white'
    };
    return colors[type] || 'bg-gray-500 text-white';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      active: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800',
      revoked: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'approved':
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
      case 'revoked':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (badges.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucune demande de badge trouvée</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Utilisateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Badge
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Demandé
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {badges.map((badge) => (
              <tr key={badge.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {badge.profiles?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {badge.profiles?.name || 'Utilisateur inconnu'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {badge.profiles?.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <BadgeComponent className={getBadgeColor(badge.badge_type)}>
                    {badge.badge_type}
                  </BadgeComponent>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <BadgeComponent className={getStatusColor(badge.status)}>
                      <div className="flex items-center">
                        {getStatusIcon(badge.status)}
                        <span className="ml-1 capitalize">{badge.status}</span>
                      </div>
                    </BadgeComponent>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {badge.price > 0 ? `${badge.price}€` : 'Gratuit'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDistanceToNow(new Date(badge.applied_at), { 
                    addSuffix: true,
                    locale: fr 
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onReview(badge)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Examiner
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BadgeTable;
