import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Share2, Send } from 'lucide-react';
import { toast } from 'sonner';

interface WhatsAppIntegrationProps {
  eventTitle: string;
  eventDescription?: string;
  eventDate: string;
  eventLocation?: string;
  eventUrl?: string;
}

const WhatsAppIntegration: React.FC<WhatsAppIntegrationProps> = ({
  eventTitle,
  eventDescription,
  eventDate,
  eventLocation,
  eventUrl
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const defaultMessage = `🎉 Invitation à ${eventTitle}

📅 Date: ${eventDate}
${eventLocation ? `📍 Lieu: ${eventLocation}` : ''}
${eventDescription ? `📝 ${eventDescription}` : ''}

${eventUrl ? `🔗 Plus d'infos: ${eventUrl}` : ''}

J'espère vous y voir !`;

  const sendWhatsAppMessage = (phoneNumber?: string) => {
    const message = customMessage || defaultMessage;
    const encodedMessage = encodeURIComponent(message);
    
    let whatsappUrl = '';
    
    if (phoneNumber) {
      // Format du numéro pour WhatsApp (supprimer espaces et caractères spéciaux)
      const formattedNumber = phoneNumber.replace(/\D/g, '');
      whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    } else {
      // Ouvrir WhatsApp sans numéro spécifique
      whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    }
    
    window.open(whatsappUrl, '_blank');
    toast.success('Message WhatsApp ouvert !');
    setIsOpen(false);
  };

  const shareToWhatsAppStatus = () => {
    const message = customMessage || defaultMessage;
    const encodedMessage = encodeURIComponent(message);
    
    // Utiliser l'API Web Share si disponible
    if (navigator.share) {
      navigator.share({
        title: `Invitation - ${eventTitle}`,
        text: message,
        url: eventUrl
      }).then(() => {
        toast.success('Partagé avec succès !');
      }).catch(() => {
        // Fallback vers WhatsApp direct
        window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
      });
    } else {
      // Fallback direct vers WhatsApp
      window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    }
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MessageCircle className="h-4 w-4" />
          Partager via WhatsApp
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            Partager sur WhatsApp
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="message">Message d'invitation</Label>
            <Textarea
              id="message"
              placeholder={defaultMessage}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={8}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone">Numéro de téléphone (optionnel)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+33 6 12 34 56 78"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Laisser vide pour ouvrir WhatsApp sans destinataire spécifique
            </p>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={() => sendWhatsAppMessage(phoneNumber)}
              className="flex-1 gap-2"
            >
              <Send className="h-4 w-4" />
              Envoyer message
            </Button>
            
            <Button 
              variant="outline"
              onClick={shareToWhatsAppStatus}
              className="flex-1 gap-2"
            >
              <Share2 className="h-4 w-4" />
              Partager statut
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppIntegration;