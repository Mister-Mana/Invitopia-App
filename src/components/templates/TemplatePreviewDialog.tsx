import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Download, Edit, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Template {
  id: string;
  name: string;
  category: string;
  type: 'invitation' | 'ticket' | 'poster' | 'flyer';
  thumbnail: string;
  preview_images: string[];
  tags: string[];
  popularity: number;
  is_premium: boolean;
  canvas_data: any;
}

interface TemplatePreviewDialogProps {
  template: Template | null;
  open: boolean;
  onClose: () => void;
  onUse: (template: Template) => void;
}

export const TemplatePreviewDialog: React.FC<TemplatePreviewDialogProps> = ({
  template,
  open,
  onClose,
  onUse,
}) => {
  const navigate = useNavigate();

  if (!template) return null;

  const handleUse = () => {
    onUse(template);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl">{template.name}</DialogTitle>
              <DialogDescription className="mt-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline">{template.type}</Badge>
                  <Badge variant="secondary">{template.category}</Badge>
                  {template.is_premium && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-3 w-3 mr-1" />
                    {template.popularity}% de popularité
                  </div>
                </div>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Preview Image */}
        <div className="mt-6">
          <div className="relative rounded-lg overflow-hidden border bg-muted">
            <img
              src={template.preview_images[0] || template.thumbnail}
              alt={template.name}
              className="w-full h-auto max-h-[500px] object-contain"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {template.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Button onClick={onClose} variant="outline" className="flex-1">
            <X className="h-4 w-4 mr-2" />
            Fermer
          </Button>
          <Button onClick={handleUse} className="flex-1 bg-primary">
            <Edit className="h-4 w-4 mr-2" />
            Utiliser ce modèle
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
