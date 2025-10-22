
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { Database } from '@/integrations/supabase/types';

type FileUploadRow = Database['public']['Tables']['file_uploads']['Row'];
type FileUploadInsert = Database['public']['Tables']['file_uploads']['Insert'];

export interface FileUpload extends FileUploadRow {}

export const useFileUploads = () => {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('file_uploads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File, isPublic: boolean = false) => {
    if (!user) {
      throw new Error('Vous devez être connecté pour télécharger des fichiers');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    // Upload to Supabase Storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from('site-uploads')
      .upload(fileName, file);

    if (storageError) throw storageError;

    // Record in file_uploads table
    const { data, error } = await supabase
      .from('file_uploads')
      .insert({
        user_id: user.id,
        original_filename: file.name,
        stored_filename: fileName,
        file_size: file.size,
        mime_type: file.type,
        storage_path: storageData.path,
        is_public: isPublic,
        upload_source: 'local'
      })
      .select()
      .single();

    if (error) throw error;

    setFiles(prev => [data, ...prev]);
    return data;
  };

  const deleteFile = async (fileId: string) => {
    const fileToDelete = files.find(f => f.id === fileId);
    if (!fileToDelete) return;

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('site-uploads')
      .remove([fileToDelete.storage_path]);

    if (storageError) throw storageError;

    // Delete from database
    const { error } = await supabase
      .from('file_uploads')
      .delete()
      .eq('id', fileId);

    if (error) throw error;

    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getFileUrl = (storagePath: string) => {
    const { data } = supabase.storage
      .from('site-uploads')
      .getPublicUrl(storagePath);
    
    return data.publicUrl;
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return {
    files,
    loading,
    error,
    uploadFile,
    deleteFile,
    getFileUrl,
    refetch: fetchFiles
  };
};
