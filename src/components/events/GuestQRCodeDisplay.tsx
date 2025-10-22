import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { QrCode, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface GuestQRCodeDisplayProps {
  guestId: string;
  guestName: string;
  eventId: string;
  eventTitle: string;
  qrCodeData?: string;
  qrCodeImage?: string;
}

const GuestQRCodeDisplay: React.FC<GuestQRCodeDisplayProps> = ({ 
  guestId, 
  guestName, 
  eventId, 
  eventTitle,
  qrCodeData,
  qrCodeImage
}) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>(qrCodeImage || '');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const generateQRCode = async () => {
      if (qrCodeImage) {
        setQrCodeDataUrl(qrCodeImage);
        return;
      }

      try {
        // Generate unique QR code for this guest
        const uniqueQRData = qrCodeData || `EVENT:${eventId}|GUEST:${guestId}|${Date.now()}`;
        
        const qrDataUrl = await QRCode.toDataURL(uniqueQRData, {
          width: 400,
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
  }, [isOpen, guestId, eventId, qrCodeData, qrCodeImage]);

  const handleDownload = () => {
    if (!qrCodeDataUrl) return;

    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = `qrcode-${guestName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-${eventTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
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
        const file = new File([blob], `qrcode-${guestName}.png`, { type: 'image/png' });

        await navigator.share({
          title: `QR Code - ${guestName}`,
          text: `QR Code pour ${guestName} à l'événement: ${eventTitle}`,
          files: [file],
        });
      } catch (error) {
        // Fallback: copy to clipboard
        toast.info('Partage non disponible sur ce navigateur');
      }
    } else {
      // Fallback: download
      handleDownload();
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
          <DialogTitle>QR Code de l'invité</DialogTitle>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-lg">{guestName}</CardTitle>
            <p className="text-sm text-muted-foreground text-center">{eventTitle}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              {qrCodeDataUrl ? (
                <img
                  src={qrCodeDataUrl}
                  alt={`QR Code pour ${guestName}`}
                  className="border rounded-lg bg-white p-4"
                  style={{ width: '300px', height: '300px' }}
                />
              ) : (
                <div className="w-[300px] h-[300px] border rounded-lg flex items-center justify-center bg-gray-50">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
            </div>
            
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Code QR unique pour cet invité</p>
              <p>Présentez ce code à l'entrée de l'événement pour l'enregistrement</p>
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

export default GuestQRCodeDisplay;
