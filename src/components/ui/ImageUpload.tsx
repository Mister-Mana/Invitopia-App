
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  currentImage?: string | null;
  onImageChange: (imageFile: File | null, previewUrl: string | null) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fallbackText?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  onImageChange,
  className = '',
  size = 'md',
  fallbackText = 'U'
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-24 w-24',
    lg: 'h-32 w-32'
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner un fichier image valide');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La taille du fichier ne doit pas dépasser 5MB');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setPreviewUrl(url);
      onImageChange(file, url);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col items-center space-y-3 ${className}`}>
      <div className="relative">
        <Avatar className={sizeClasses[size]}>
          <AvatarImage src={previewUrl || undefined} alt="Preview" />
          <AvatarFallback className="text-xl bg-invitopia-100 text-invitopia-700">
            {fallbackText}
          </AvatarFallback>
        </Avatar>
        
        {previewUrl && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            onClick={handleRemoveImage}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
          onClick={triggerFileSelect}
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={triggerFileSelect}
        >
          <Upload className="h-4 w-4 mr-2" />
          Choisir une image
        </Button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <p className="text-xs text-gray-500 text-center">
        Formats acceptés: JPG, PNG, GIF<br />
        Taille max: 5MB
      </p>
    </div>
  );
};

export default ImageUpload;
