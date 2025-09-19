
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Send, Mail, MessageCircle, Smartphone, Check, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface SendInvitationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string;
  eventTitle: string;
  selectedContacts: string[];
  contacts: any[];
}

export const SendInvitationsDialog: React.FC<SendInvitationsDialogProps> = ({ 
  open, 
  onOpenChange,
  eventId,
  eventTitle,
  selectedContacts,
  contacts
}) => {
  const { tNested } = useLanguage();
  const [sendMethods, setSendMethods] = useState({
    email: true,
    sms: false,
    whatsapp: false
  });
  const [customMessage, setCustomMessage] = useState('');
  const [subject, setSubject] = useState(`Invitation - ${eventTitle}`);
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sent, setSent] = useState<string[]>([]);
  const [failed, setFailed] = useState<string[]>([]);

  const selectedContactsData = contacts.filter(c => selectedContacts.includes(c.id));

  const handleSendInvitations = async () => {
    if (!sendMethods.email && !sendMethods.sms && !sendMethods.whatsapp) {
      toast.error('Veuillez sélectionner au moins une méthode d\'envoi');
      return;
    }

    setSending(true);
    setProgress(0);
    setSent([]);
    setFailed([]);

    const totalContacts = selectedContactsData.length;
    let processedCount = 0;

    try {
      for (const contact of selectedContactsData) {
        try {
          // Créer l'invitation dans la base de données
          const { data: invitation, error: inviteError } = await supabase
            .from('invitations')
            .insert({
              event_id: eventId,
              guest_id: contact.id,
              invitation_type: sendMethods.email ? 'email' : sendMethods.sms ? 'sms' : 'whatsapp',
              status: 'pending',
              delivery_method: sendMethods,
              template_data: {
                subject: subject,
                message: customMessage,
                event_title: eventTitle
              }
            })
            .select()
            .single();

          if (inviteError) throw inviteError;

          // Simuler l'envoi (ici vous intégreriez vraiment les services d'envoi)
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Marquer comme envoyé
          await supabase
            .from('invitations')
            .update({
              sent_at: new Date().toISOString(),
              status: 'sent'
            })
            .eq('id', invitation.id);

          setSent(prev => [...prev, contact.id]);
        } catch (error) {
          console.error(`Erreur pour ${contact.name}:`, error);
          setFailed(prev => [...prev, contact.id]);
        }

        processedCount++;
        setProgress((processedCount / totalContacts) * 100);
      }

      const successCount = sent.length;
      const failedCount = failed.length;

      if (successCount > 0) {
        toast.success(`${successCount} invitation(s) envoyée(s) avec succès`);
      }
      if (failedCount > 0) {
        toast.error(`${failedCount} invitation(s) ont échoué`);
      }

      if (successCount === totalContacts) {
        setTimeout(() => onOpenChange(false), 2000);
      }
    } catch (error) {
      toast.error('Erreur lors de l\'envoi des invitations');
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Envoyer les invitations
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Événement: {eventTitle}</h4>
            <p className="text-sm text-gray-600">
              {selectedContactsData.length} contact(s) sélectionné(s)
            </p>
          </div>

          {sending && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Envoi en cours...</span>
                <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{sent.length} envoyées</span>
                <span>{failed.length} échouées</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="subject">Sujet de l'invitation</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Invitation - Mon événement"
              disabled={sending}
            />
          </div>

          <div>
            <Label className="text-base font-medium mb-3 block">Méthodes d'envoi</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email"
                  checked={sendMethods.email}
                  onCheckedChange={(checked) => 
                    setSendMethods({ ...sendMethods, email: !!checked })
                  }
                />
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sms"
                  checked={sendMethods.sms}
                  onCheckedChange={(checked) => 
                    setSendMethods({ ...sendMethods, sms: !!checked })
                  }
                />
                <Label htmlFor="sms" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  SMS
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="whatsapp"
                  checked={sendMethods.whatsapp}
                  onCheckedChange={(checked) => 
                    setSendMethods({ ...sendMethods, whatsapp: !!checked })
                  }
                />
                <Label htmlFor="whatsapp" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="custom-message">Message personnalisé (optionnel)</Label>
              <Textarea 
              id="custom-message"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="mt-1"
              placeholder="Ajoutez un message personnalisé à votre invitation..."
              rows={4}
              disabled={sending}
            />
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={sending}
          >
            {sending ? 'Fermer' : 'Annuler'}
          </Button>
          <Button 
            onClick={handleSendInvitations}
            disabled={sending || selectedContactsData.length === 0}
          >
            {sending ? (
              <>
                <AlertCircle className="h-4 w-4 mr-2 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Envoyer les invitations
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
