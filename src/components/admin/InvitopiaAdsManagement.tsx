
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePromotionRequests } from '@/hooks/usePromotionRequests';
import { Eye, TrendingUp, Users, Target, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const InvitopiaAdsManagement: React.FC = () => {
  const { promotions, loading, error, updatePromotionStatus } = usePromotionRequests();

  const handleApproval = async (id: string, approved: boolean) => {
    try {
      const status = approved ? 'approved' : 'rejected';
      await updatePromotionStatus(id, status);
      toast.success(`Campagne ${approved ? 'approuvée' : 'rejetée'} avec succès`);
    } catch (error: any) {
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      active: 'bg-blue-100 text-blue-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const calculateROI = (spent: number, conversions: number) => {
    if (spent === 0) return 0;
    return ((conversions * 10 - spent) / spent * 100); // Assuming 10€ per conversion
  };

  const totalBudget = promotions.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = promotions.reduce((sum, p) => sum + (p.total_spent || 0), 0);
  const totalImpressions = promotions.reduce((sum, p) => sum + (p.impressions || 0), 0);
  const pendingRequests = promotions.filter(p => p.status === 'pending').length;

  if (loading) return <div>Chargement des campagnes publicitaires...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Demandes en attente</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingRequests}</p>
              </div>
              <Target className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Budget total</p>
                <p className="text-2xl font-bold text-blue-600">{formatBudget(totalBudget)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Dépensé</p>
                <p className="text-2xl font-bold text-green-600">{formatBudget(totalSpent)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Impressions</p>
                <p className="text-2xl font-bold text-purple-600">{totalImpressions.toLocaleString('fr-FR')}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Promotions List */}
      <Card>
        <CardHeader>
          <CardTitle>Campagnes publicitaires Invitopia Ads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {promotions.map((promotion) => (
              <div key={promotion.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-lg">{promotion.campaign_name}</h3>
                      <Badge className={getStatusBadge(promotion.status)}>
                        {promotion.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Budget</p>
                        <p className="font-medium">{formatBudget(promotion.budget)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Dépensé</p>
                        <p className="font-medium">{formatBudget(promotion.total_spent || 0)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Impressions</p>
                        <p className="font-medium">{(promotion.impressions || 0).toLocaleString('fr-FR')}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Clics</p>
                        <p className="font-medium">{promotion.clicks || 0}</p>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Période: {new Date(promotion.start_date).toLocaleDateString('fr-FR')} - {new Date(promotion.end_date).toLocaleDateString('fr-FR')}</p>
                      {promotion.cost_per_click && (
                        <p>CPC: {formatBudget(promotion.cost_per_click)}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{promotion.campaign_name}</DialogTitle>
                          <DialogDescription>
                            Détails de la campagne publicitaire
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Budget</label>
                              <p>{formatBudget(promotion.budget)}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Statut</label>
                              <p className="capitalize">{promotion.status}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Impressions</label>
                              <p>{(promotion.impressions || 0).toLocaleString('fr-FR')}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Conversions</label>
                              <p>{promotion.conversions || 0}</p>
                            </div>
                          </div>
                          
                          {promotion.target_audience && Object.keys(promotion.target_audience).length > 0 && (
                            <div>
                              <label className="text-sm font-medium">Audience cible</label>
                              <pre className="text-xs bg-gray-100 p-2 rounded mt-1">
                                {JSON.stringify(promotion.target_audience, null, 2)}
                              </pre>
                            </div>
                          )}
                          
                          <div>
                            <label className="text-sm font-medium">Contenu publicitaire</label>
                            <pre className="text-xs bg-gray-100 p-2 rounded mt-1">
                              {JSON.stringify(promotion.ad_content, null, 2)}
                            </pre>
                          </div>
                          
                          {promotion.total_spent && promotion.conversions && (
                            <div>
                              <label className="text-sm font-medium">ROI estimé</label>
                              <p className={`font-bold ${calculateROI(promotion.total_spent, promotion.conversions) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {calculateROI(promotion.total_spent, promotion.conversions).toFixed(2)}%
                              </p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {promotion.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleApproval(promotion.id, true)}
                        >
                          Approuver
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleApproval(promotion.id, false)}
                        >
                          Rejeter
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {promotions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune campagne</h3>
                <p>Aucune campagne publicitaire n'a été créée pour le moment.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvitopiaAdsManagement;
