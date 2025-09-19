
import React from 'react';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WifiOff, Wifi, RefreshCw, Clock } from 'lucide-react';
import { toast } from 'sonner';

const OfflineIndicator: React.FC = () => {
  const { 
    isOnline, 
    isSyncing, 
    pendingOperationsCount, 
    syncPendingOperations 
  } = useOfflineSync();

  const handleSync = async () => {
    try {
      await syncPendingOperations();
      toast.success('Synchronisation réussie');
    } catch (error) {
      toast.error('Erreur lors de la synchronisation');
    }
  };

  if (isOnline && pendingOperationsCount === 0) {
    return null; // Don't show anything when online and no pending operations
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-2">
        {!isOnline && (
          <Badge variant="destructive" className="flex items-center gap-1">
            <WifiOff className="h-3 w-3" />
            Hors ligne
          </Badge>
        )}
        
        {pendingOperationsCount > 0 && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {pendingOperationsCount} en attente
          </Badge>
        )}
        
        {isOnline && pendingOperationsCount > 0 && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-1"
          >
            {isSyncing ? (
              <RefreshCw className="h-3 w-3 animate-spin" />
            ) : (
              <Wifi className="h-3 w-3" />
            )}
            {isSyncing ? 'Sync...' : 'Synchroniser'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;
