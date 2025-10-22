import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Smartphone, Wallet, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface CheckoutFormProps {
  badgeName: string;
  price: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  badgeName,
  price,
  onSuccess,
  onCancel
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'mobile'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  const [mobileData, setMobileData] = useState({
    phone: '',
    provider: 'orange'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Paiement effectué avec succès!');
      onSuccess();
    } catch (error) {
      toast.error('Erreur lors du paiement');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Récapitulatif</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Certification:</span>
            <Badge variant="secondary">{badgeName}</Badge>
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total à payer:</span>
            <span>{price.toFixed(2)} €/mois</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Paiement Sécurisé
          </CardTitle>
          <CardDescription>
            Vos informations de paiement sont cryptées et sécurisées
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)}>
            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
              <RadioGroupItem value="stripe" id="stripe-checkout" />
              <Label htmlFor="stripe-checkout" className="flex items-center gap-2 flex-1 cursor-pointer">
                <CreditCard className="h-5 w-5" />
                <div>
                  <div className="font-medium">Carte Bancaire</div>
                  <div className="text-sm text-muted-foreground">
                    Visa, Mastercard, American Express
                  </div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
              <RadioGroupItem value="mobile" id="mobile-checkout" />
              <Label htmlFor="mobile-checkout" className="flex items-center gap-2 flex-1 cursor-pointer">
                <Smartphone className="h-5 w-5" />
                <div>
                  <div className="font-medium">Mobile Money</div>
                  <div className="text-sm text-muted-foreground">
                    Orange Money, MTN, Airtel Money
                  </div>
                </div>
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === 'stripe' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Numéro de carte</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                  maxLength={19}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiration</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                    maxLength={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={cardData.cvc}
                    onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Nom sur la carte</Label>
                <Input
                  id="cardName"
                  placeholder="Jean Dupont"
                  value={cardData.name}
                  onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                  required
                />
              </div>
            </div>
          )}

          {paymentMethod === 'mobile' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-2">
                <Label htmlFor="provider">Opérateur</Label>
                <RadioGroup value={mobileData.provider} onValueChange={(v) => setMobileData({ ...mobileData, provider: v })}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="orange" id="orange" />
                    <Label htmlFor="orange">Orange Money</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mtn" id="mtn" />
                    <Label htmlFor="mtn">MTN Mobile Money</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="airtel" id="airtel" />
                    <Label htmlFor="airtel">Airtel Money</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobilePhone">Numéro de téléphone</Label>
                <Input
                  id="mobilePhone"
                  placeholder="+243 XX XXX XXXX"
                  value={mobileData.phone}
                  onChange={(e) => setMobileData({ ...mobileData, phone: e.target.value })}
                  required
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isProcessing}>
          Annuler
        </Button>
        <Button type="submit" disabled={isProcessing}>
          {isProcessing ? 'Traitement...' : `Payer ${price.toFixed(2)} €`}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
