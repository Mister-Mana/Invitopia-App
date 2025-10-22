import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, MessageCircle, Image, QrCode, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import QRCode from 'qrcode';

interface ShareInvitationDialogProps {
  event: any;
  guest: any;
  isOpen: boolean;
  onClose: () => void;
}

const ShareInvitationDialog: React.FC<ShareInvitationDialogProps> = ({
  event,
  guest,
  isOpen,
  onClose
}) => {
  const [message, setMessage] = useState(
    `Vous êtes invité(e) à ${event.title}. Confirmez votre présence via ce lien :`
  );
  const [sending, setSending] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const rsvpLink = `${window.location.origin}/rsvp/${event.id}/${guest.id}`;

  const generateQRCode = async () => {
    try {
      // Generate unique QR code for this guest
      const uniqueQRData = `EVENT:${event.id}|GUEST:${guest.id}|${Date.now()}`;
      
      const qrDataUrl = await QRCode.toDataURL(uniqueQRData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrCodeUrl(qrDataUrl);

      // Save QR code to database
      await supabase
        .from('guests')
        .update({
          qr_code: uniqueQRData,
          qr_code_image: qrDataUrl,
          qr_code_generated_at: new Date().toISOString()
        })
        .eq('id', guest.id);
      
      toast.success('Code QR généré');
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error('Erreur lors de la génération du code QR');
    }
  };

  const sendByEmail = async () => {
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          to: guest.email,
          subject: `Invitation - ${event.title}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              ${event.primary_cover_image ? `<img src="${event.primary_cover_image}" alt="${event.title}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px;" />` : ''}
              <h1 style="color: #333; margin-top: 20px;">${event.title}</h1>
              <p style="color: #666; font-size: 16px;">Bonjour ${guest.name},</p>
              <p style="color: #666; font-size: 16px;">${message}</p>
              <div style="margin: 30px 0;">
                <a href="${rsvpLink}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Confirmer ma présence
                </a>
              </div>
              ${event.invitation_image_url ? `<img src="${event.invitation_image_url}" alt="Invitation" style="width: 100%; margin: 20px 0; border-radius: 8px;" />` : ''}
              <p style="color: #999; font-size: 14px; margin-top: 30px;">
                Lien direct : <a href="${rsvpLink}">${rsvpLink}</a>
              </p>
            </div>
          `
        }
      });

      if (error) throw error;

      toast.success('Invitation envoyée par email');
      
      // Update invitation status
      await supabase
        .from('guests')
        .update({ 
          invitation_sent: true,
          invitation_sent_date: new Date().toISOString()
        })
        .eq('id', guest.id);
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Erreur lors de l\'envoi de l\'email');
    } finally {
      setSending(false);
    }
  };

  const sendBySMS = async () => {
    setSending(true);
    try {
      const smsMessage = `${message}\n\n${rsvpLink}`;
      
      const { error } = await supabase.functions.invoke('send-sms', {
        body: {
          to: guest.phone,
          message: smsMessage
        }
      });

      if (error) throw error;

      toast.success('Invitation envoyée par SMS');
      
      // Update invitation status
      await supabase
        .from('guests')
        .update({ 
          invitation_sent: true,
          invitation_sent_date: new Date().toISOString()
        })
        .eq('id', guest.id);
    } catch (error) {
      console.error('Error sending SMS:', error);
      toast.error('Erreur lors de l\'envoi du SMS');
    } finally {
      setSending(false);
    }
  };

  const shareByWhatsApp = () => {
    const whatsappMessage = encodeURIComponent(`${message}\n\n${rsvpLink}`);
    window.open(`https://wa.me/${guest.phone}?text=${whatsappMessage}`, '_blank');
  };

  React.useEffect(() => {
    if (isOpen) {
      generateQRCode();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Partager l'invitation - {guest.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview */}
          {event.primary_cover_image && (
            <div>
              <Label>Aperçu de l'événement</Label>
              <img
                src={event.primary_cover_image}
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg mt-2"
              />
            </div>
          )}

          {/* Invitation Image */}
          {event.invitation_image_url && (
            <div>
              <Label>Image d'invitation</Label>
              <img
                src={event.invitation_image_url}
                alt="Invitation"
                className="w-full max-h-96 object-contain rounded-lg mt-2 border"
              />
            </div>
          )}

          {/* Message */}
          <div>
            <Label htmlFor="message">Message personnalisé</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="mt-2"
            />
          </div>

          {/* RSVP Link */}
          <div>
            <Label htmlFor="rsvp-link">Lien RSVP</Label>
            <Input
              id="rsvp-link"
              value={rsvpLink}
              readOnly
              className="mt-2"
            />
          </div>

          {/* QR Code */}
          {qrCodeUrl && (
            <div className="text-center">
              <Label>Code QR</Label>
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="mx-auto mt-2 border rounded-lg p-4 bg-white"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Scannez ce code pour accéder directement au RSVP
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {guest.email && (
              <Button
                onClick={sendByEmail}
                disabled={sending}
                className="w-full"
              >
                <Mail className="h-4 w-4 mr-2" />
                Envoyer par Email
              </Button>
            )}

            {guest.phone && (
              <>
                <Button
                  onClick={sendBySMS}
                  disabled={sending}
                  variant="outline"
                  className="w-full"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Envoyer par SMS
                </Button>

                <Button
                  onClick={shareByWhatsApp}
                  variant="outline"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareInvitationDialog;
