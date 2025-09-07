
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CachedData {
  key: string;
  data: any;
  timestamp: number;
  synced: boolean;
}

interface PendingOperation {
  id: string;
  type: 'create' | 'update' | 'delete';
  table: string;
  data: any;
  timestamp: number;
}

// Define valid table names based on Supabase schema
const validTables = ['badges', 'profiles', 'events', 'file_uploads', 'guests', 'organizations', 'site_content', 'tables', 'templates'] as const;

// Helper function to validate table names
const isValidTableName = (table: string): table is typeof validTables[number] => {
  return validTables.includes(table as typeof validTables[number]);
};

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [cachedData, setCachedData] = useState<CachedData[]>([]);
  const [pendingOperations, setPendingOperations] = useState<PendingOperation[]>([]);

  // Detect network status changes
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncPendingOperations();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load cached data from localStorage on mount
    loadCachedData();
    loadPendingOperations();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadCachedData = useCallback(() => {
    try {
      const cached = localStorage.getItem('invitopia_cached_data');
      if (cached) {
        setCachedData(JSON.parse(cached));
      }
    } catch (error) {
      console.error('Error loading cached data:', error);
    }
  }, []);

  const loadPendingOperations = useCallback(() => {
    try {
      const pending = localStorage.getItem('invitopia_pending_operations');
      if (pending) {
        setPendingOperations(JSON.parse(pending));
      }
    } catch (error) {
      console.error('Error loading pending operations:', error);
    }
  }, []);

  const saveCachedData = useCallback((data: CachedData[]) => {
    try {
      localStorage.setItem('invitopia_cached_data', JSON.stringify(data));
      setCachedData(data);
    } catch (error) {
      console.error('Error saving cached data:', error);
    }
  }, []);

  const savePendingOperations = useCallback((operations: PendingOperation[]) => {
    try {
      localStorage.setItem('invitopia_pending_operations', JSON.stringify(operations));
      setPendingOperations(operations);
    } catch (error) {
      console.error('Error saving pending operations:', error);
    }
  }, []);

  const cacheData = useCallback((key: string, data: any) => {
    const newCachedItem: CachedData = {
      key,
      data,
      timestamp: Date.now(),
      synced: isOnline
    };

    const updatedCache = cachedData.filter(item => item.key !== key);
    updatedCache.push(newCachedItem);
    saveCachedData(updatedCache);
  }, [cachedData, isOnline, saveCachedData]);

  const getCachedData = useCallback((key: string): any | null => {
    const cached = cachedData.find(item => item.key === key);
    if (cached) {
      // Check if data is not too old (max 24 hours)
      const maxAge = 24 * 60 * 60 * 1000;
      if (Date.now() - cached.timestamp < maxAge) {
        return cached.data;
      }
    }
    return null;
  }, [cachedData]);

  const addPendingOperation = useCallback((
    type: 'create' | 'update' | 'delete',
    table: string,
    data: any
  ) => {
    const operation: PendingOperation = {
      id: `${Date.now()}_${Math.random()}`,
      type,
      table,
      data,
      timestamp: Date.now()
    };

    const updatedOperations = [...pendingOperations, operation];
    savePendingOperations(updatedOperations);
  }, [pendingOperations, savePendingOperations]);

  const syncPendingOperations = useCallback(async () => {
    if (!isOnline || pendingOperations.length === 0) return;

    setIsSyncing(true);
    const successfulOperations: string[] = [];

    try {
      for (const operation of pendingOperations) {
        if (!isValidTableName(operation.table)) {
          console.error(`Invalid table name: ${operation.table}`);
          continue;
        }

        try {
          switch (operation.type) {
            case 'create':
              await (supabase as any).from(operation.table).insert(operation.data);
              break;
            case 'update':
              await (supabase as any)
                .from(operation.table)
                .update(operation.data)
                .eq('id', operation.data.id);
              break;
            case 'delete':
              await (supabase as any)
                .from(operation.table)
                .delete()
                .eq('id', operation.data.id);
              break;
          }
          successfulOperations.push(operation.id);
        } catch (error) {
          console.error(`Failed to sync operation ${operation.id}:`, error);
        }
      }

      // Remove successful operations
      const remainingOperations = pendingOperations.filter(
        op => !successfulOperations.includes(op.id)
      );
      savePendingOperations(remainingOperations);

      // Mark cached data as synced
      const updatedCache = cachedData.map(item => ({
        ...item,
        synced: true
      }));
      saveCachedData(updatedCache);

    } catch (error) {
      console.error('Error syncing pending operations:', error);
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, pendingOperations, cachedData, savePendingOperations, saveCachedData]);

  const offlineQuery = useCallback(async (
    table: string,
    query?: any
  ): Promise<any> => {
    const cacheKey = `${table}_${JSON.stringify(query || {})}`;
    
    if (!isOnline) {
      const cached = getCachedData(cacheKey);
      if (cached) {
        return { data: cached, error: null };
      }
      return { data: null, error: new Error('No cached data available offline') };
    }

    if (!isValidTableName(table)) {
      return { data: null, error: new Error(`Invalid table name: ${table}`) };
    }

    try {
      let supabaseQuery = (supabase as any).from(table).select('*');
      
      if (query) {
        Object.entries(query).forEach(([key, value]) => {
          supabaseQuery = supabaseQuery.eq(key, value);
        });
      }

      const { data, error } = await supabaseQuery;
      
      if (!error && data) {
        cacheData(cacheKey, data);
      }
      
      return { data, error };
    } catch (error) {
      const cached = getCachedData(cacheKey);
      if (cached) {
        return { data: cached, error: null };
      }
      return { data: null, error };
    }
  }, [isOnline, getCachedData, cacheData]);

  const offlineMutation = useCallback(async (
    type: 'create' | 'update' | 'delete',
    table: string,
    data: any
  ): Promise<any> => {
    if (!isValidTableName(table)) {
      return { data: null, error: new Error(`Invalid table name: ${table}`) };
    }

    if (!isOnline) {
      addPendingOperation(type, table, data);
      return { data: data, error: null };
    }

    try {
      let result;
      switch (type) {
        case 'create':
          result = await (supabase as any).from(table).insert(data).select();
          break;
        case 'update':
          result = await (supabase as any)
            .from(table)
            .update(data)
            .eq('id', data.id)
            .select();
          break;
        case 'delete':
          result = await (supabase as any)
            .from(table)
            .delete()
            .eq('id', data.id);
          break;
      }
      return result;
    } catch (error) {
      addPendingOperation(type, table, data);
      return { data: data, error };
    }
  }, [isOnline, addPendingOperation]);

  return {
    isOnline,
    isSyncing,
    pendingOperationsCount: pendingOperations.length,
    offlineQuery,
    offlineMutation,
    syncPendingOperations,
    getCachedData,
    cacheData
  };
};
