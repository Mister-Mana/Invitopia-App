
import { useState } from 'react';
import { useFileUploads } from '@/hooks/useFileUploads';
import { toast } from 'sonner';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { uploadFile, getFileUrl } = useFileUploads();

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setIsUploading(true);
      
      // Upload to Supabase storage
      const uploadResult = await uploadFile(file, true); // true for public access
      
      if (uploadResult && uploadResult.storage_path) {
        // Get the public URL
        const publicUrl = getFileUrl(uploadResult.storage_path);
        return publicUrl;
      }
      
      return null;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error('Erreur lors du téléchargement de l\'image');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading
  };
};
