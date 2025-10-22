import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { 
  Copy, 
  Share2, 
  Facebook, 
  Twitter, 
  Instagram, 
  MessageCircle,
  Mail,
  QrCode,
  Download
} from 'lucide-react';

interface EventShareDialogProps {
  event: any;
  isOpen: boolean;
  onClose: () => void;
}

const EventShareDialog: React.FC<EventShareDialogProps> = ({ event, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const eventUrl = `${window.location.origin}/events/${event.id}`;
  const shareText = `Découvrez cet événement: ${event.title}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      toast.success('Lien copié dans le presse-papiers');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Erreur lors de la copie du lien');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: shareText,
          url: eventUrl
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      handleCopyLink();
    }
  };

  const shareOnSocial = (platform: string) => {
    const encodedUrl = encodeURIComponent(eventUrl);
    const encodedText = encodeURIComponent(shareText);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(event.title)}&body=${encodedText}%20${encodedUrl}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const generateQRCode = () => {
    // Simuler la génération de QR code
    toast.success('QR Code généré (fonctionnalité à implémenter)');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Share2 className="h-5 w-5 mr-2" />
            Partager l'événement
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Event Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900">{event.title}</h4>
            <p className="text-sm text-gray-600 mt-1">
              {new Date(event.start_date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          {/* Link Sharing */}
          <div className="space-y-3">
            <Label htmlFor="event-link">Lien de l'événement</Label>
            <div className="flex space-x-2">
              <Input
                id="event-link"
                value={eventUrl}
                readOnly
                className="flex-1"
              />
              <Button
                onClick={handleCopyLink}
                variant={copied ? "default" : "outline"}
                size="sm"
              >
                <Copy className="h-4 w-4" />
                {copied ? "Copié!" : "Copier"}
              </Button>
            </div>
          </div>

          {/* Native Share */}
          {navigator.share && (
            <Button onClick={handleNativeShare} className="w-full">
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
          )}

          {/* Social Media Sharing */}
          <div className="space-y-3">
            <Label>Partager sur les réseaux sociaux</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => shareOnSocial('facebook')}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              
              <Button
                variant="outline"
                onClick={() => shareOnSocial('twitter')}
                className="bg-blue-400 text-white hover:bg-blue-500"
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              
              <Button
                variant="outline"
                onClick={() => shareOnSocial('whatsapp')}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              
              <Button
                variant="outline"
                onClick={() => shareOnSocial('email')}
                className="bg-gray-600 text-white hover:bg-gray-700"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </div>

          {/* Additional Actions */}
          <div className="space-y-3">
            <Label>Actions supplémentaires</Label>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={generateQRCode} className="flex-1">
                <QrCode className="h-4 w-4 mr-2" />
                QR Code
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventShareDialog;