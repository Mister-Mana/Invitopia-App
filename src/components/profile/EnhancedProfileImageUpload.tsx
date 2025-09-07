import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Camera, Upload, X, Crop, Palette, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface EnhancedProfileImageUploadProps {
  currentImage?: string | null;
  onImageChange: (imageUrl: string | null) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fallbackText?: string;
  userId?: string;
}

interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

const EnhancedProfileImageUpload: React.FC<EnhancedProfileImageUploadProps> = ({
  currentImage,
  onImageChange,
  className = '',
  size = 'md',
  fallbackText = 'U',
  userId
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Image enhancement controls
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [saturation, setSaturation] = useState([100]);
  const [cropData, setCropData] = useState<CropData>({ x: 0, y: 0, width: 100, height: 100 });

  const { uploadImage, isUploading } = useImageUpload();

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

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('La taille du fichier ne doit pas dépasser 10MB');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setOriginalImage(url);
      setPreviewUrl(url);
      setCropDialogOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const applyImageEnhancements = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const brightnessValue = brightness[0] / 100;
    const contrastValue = contrast[0] / 100;
    const saturationValue = saturation[0] / 100;

    for (let i = 0; i < data.length; i += 4) {
      // Apply brightness
      data[i] = data[i] * brightnessValue;
      data[i + 1] = data[i + 1] * brightnessValue;
      data[i + 2] = data[i + 2] * brightnessValue;

      // Apply contrast
      data[i] = ((data[i] - 128) * contrastValue) + 128;
      data[i + 1] = ((data[i + 1] - 128) * contrastValue) + 128;
      data[i + 2] = ((data[i + 2] - 128) * contrastValue) + 128;

      // Apply saturation (simplified)
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = gray + (data[i] - gray) * saturationValue;
      data[i + 1] = gray + (data[i + 1] - gray) * saturationValue;
      data[i + 2] = gray + (data[i + 2] - gray) * saturationValue;

      // Clamp values
      data[i] = Math.max(0, Math.min(255, data[i]));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1]));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2]));
    }

    ctx.putImageData(imageData, 0, 0);
  }, [brightness, contrast, saturation]);

  const handleCropAndUpload = async () => {
    if (!originalImage || !canvasRef.current || !imageRef.current) return;

    setProcessing(true);
    setUploadProgress(0);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = imageRef.current;
      
      // Set canvas size to crop area
      const cropSize = 300; // Standard profile image size
      canvas.width = cropSize;
      canvas.height = cropSize;

      // Calculate crop coordinates
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;
      
      const sourceX = (cropData.x / 100) * img.naturalWidth;
      const sourceY = (cropData.y / 100) * img.naturalHeight;
      const sourceWidth = (cropData.width / 100) * img.naturalWidth;
      const sourceHeight = (cropData.height / 100) * img.naturalHeight;

      // Draw cropped image
      ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, cropSize, cropSize
      );

      // Apply enhancements
      applyImageEnhancements(canvas, ctx);

      // Update progress
      setUploadProgress(50);

      // Convert to blob
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File([blob], `profile_${userId || 'user'}_${Date.now()}.jpg`, {
          type: 'image/jpeg',
        });

        setUploadProgress(75);

        try {
          const uploadedUrl = await uploadImage(file);
          setUploadProgress(100);
          
          if (uploadedUrl) {
            setPreviewUrl(uploadedUrl);
            onImageChange(uploadedUrl);
            toast.success('Photo de profil mise à jour avec succès');
            setCropDialogOpen(false);
          }
        } catch (error) {
          console.error('Upload error:', error);
          toast.error('Erreur lors du téléchargement');
        }
      }, 'image/jpeg', 0.9);

    } catch (error) {
      console.error('Processing error:', error);
      toast.error('Erreur lors du traitement de l\'image');
    } finally {
      setProcessing(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Photo de profil supprimée');
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const resetEnhancements = () => {
    setBrightness([100]);
    setContrast([100]);
    setSaturation([100]);
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="relative">
        <Avatar className={sizeClasses[size]}>
          <AvatarImage src={previewUrl || undefined} alt="Profile picture" />
          <AvatarFallback className="text-xl bg-primary/10 text-primary">
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
            disabled={isUploading || processing}
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
          disabled={isUploading || processing}
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
          disabled={isUploading || processing}
        >
          <Upload className="h-4 w-4 mr-2" />
          {isUploading || processing ? 'Traitement...' : 'Changer la photo'}
        </Button>
      </div>

      {(isUploading || processing || uploadProgress > 0) && (
        <div className="w-full space-y-2">
          <Progress value={uploadProgress} className="w-full" />
          <p className="text-xs text-center text-muted-foreground">
            {processing ? 'Traitement de l\'image...' : 
             isUploading ? 'Téléchargement...' : 
             `Progression: ${uploadProgress}%`}
          </p>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <p className="text-xs text-muted-foreground text-center">
        Formats: JPG, PNG, GIF • Max: 10MB<br />
        Recommandé: 300x300px minimum
      </p>

      {/* Crop and Enhancement Dialog */}
      <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crop className="h-5 w-5" />
              Recadrer et améliorer votre photo
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="relative border rounded-lg overflow-hidden bg-gray-50">
              {originalImage && (
                <img
                  ref={imageRef}
                  src={originalImage}
                  alt="Original"
                  className="w-full h-64 object-contain"
                  style={{
                    filter: `brightness(${brightness[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%)`
                  }}
                />
              )}
            </div>

            {/* Enhancement Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Améliorations
                </h4>
                <Button variant="outline" size="sm" onClick={resetEnhancements}>
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Luminosité: {brightness[0]}%</Label>
                  <Slider
                    value={brightness}
                    onValueChange={setBrightness}
                    min={50}
                    max={150}
                    step={1}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Contraste: {contrast[0]}%</Label>
                  <Slider
                    value={contrast}
                    onValueChange={setContrast}
                    min={50}
                    max={150}
                    step={1}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Saturation: {saturation[0]}%</Label>
                  <Slider
                    value={saturation}
                    onValueChange={setSaturation}
                    min={0}
                    max={200}
                    step={1}
                  />
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {(processing || uploadProgress > 0) && (
              <div className="space-y-2">
                <Progress value={uploadProgress} />
                <p className="text-sm text-center text-muted-foreground">
                  {processing ? 'Traitement en cours...' : `${uploadProgress}%`}
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCropDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleCropAndUpload}
              disabled={processing || isUploading}
            >
              {processing ? 'Traitement...' : 'Appliquer et sauvegarder'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default EnhancedProfileImageUpload;