import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { QrCode, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface EventQRCodeProps {
  eventId: string;
  eventTitle: string;
  eventUrl?: string;
}

const EventQRCode: React.FC<EventQRCodeProps> = ({ eventId, eventTitle, eventUrl }) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const eventLink = eventUrl || `${window.location.origin}/public/events/${eventId}`;

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrDataUrl = await QRCode.toDataURL(eventLink, {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });
        setQrCodeDataUrl(qrDataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
        toast.error('Erreur lors de la génération du QR code');
      }
    };

    if (isOpen) {
      generateQRCode();
    }
  }, [eventLink, isOpen]);

  const handleDownload = () => {
    if (!qrCodeDataUrl) return;

    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = `qrcode-${eventTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('QR code téléchargé !');
  };

  const handleShare = async () => {
    if (navigator.share && qrCodeDataUrl) {
      try {
        // Convert data URL to blob
        const response = await fetch(qrCodeDataUrl);
        const blob = await response.blob();
        const file = new File([blob], `qrcode-${eventTitle}.png`, { type: 'image/png' });

        await navigator.share({
          title: `QR Code - ${eventTitle}`,
          text: `QR Code pour l'événement: ${eventTitle}`,
          files: [file],
        });
      } catch (error) {
        // Fallback to URL sharing
        await navigator.share({
          title: `QR Code - ${eventTitle}`,
          text: `Scannez ce QR code pour accéder à l'événement: ${eventTitle}`,
          url: eventLink,
        });
      }
    } else {
      // Fallback: copy link to clipboard
      await navigator.clipboard.writeText(eventLink);
      toast.success('Lien copié dans le presse-papiers !');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <QrCode className="h-4 w-4" />
          QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code de l'événement</DialogTitle>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-lg">{eventTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              {qrCodeDataUrl ? (
                <img
                  src={qrCodeDataUrl}
                  alt={`QR Code pour ${eventTitle}`}
                  className="border rounded-lg"
                />
              ) : (
                <div className="w-[300px] h-[300px] border rounded-lg flex items-center justify-center bg-gray-50">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>Scannez ce QR code pour accéder directement à l'événement</p>
              <p className="break-all text-xs mt-2 font-mono bg-gray-50 p-2 rounded">
                {eventLink}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleDownload}
                disabled={!qrCodeDataUrl}
                className="flex-1 gap-2"
              >
                <Download className="h-4 w-4" />
                Télécharger
              </Button>
              <Button
                onClick={handleShare}
                disabled={!qrCodeDataUrl}
                variant="outline"
                className="flex-1 gap-2"
              >
                <Share2 className="h-4 w-4" />
                Partager
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default EventQRCode;