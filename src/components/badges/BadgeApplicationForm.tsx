import React, { useState } from 'react';
import { useBadges } from '@/hooks/useBadges';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Shield, Star, Award, CreditCard } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type BadgeType = Database['public']['Enums']['badge_type'];

interface BadgeTier {
  type: BadgeType;
  name: string;
  price: number;
  icon: React.ElementType;
  color: string;
  benefits: string[];
}

const badgeTiers: BadgeTier[] = [
  {
    type: 'verified',
    name: 'Invitopia Verified',
    price: 9.99,
    icon: CheckCircle2,
    color: 'text-blue-500',
    benefits: [
      'Badge vérifié officiel',
      'Priorité dans les recherches',
      'Réduction de 10% sur les événements premium',
      'Support prioritaire'
    ]
  },
  {
    type: 'professional',
    name: 'Invitopia Professional',
    price: 29.99,
    icon: Shield,
    color: 'text-purple-500',
    benefits: [
      'Tous les avantages Verified',
      'Badge professionnel premium',
      'Analytics avancées',
      'Outils marketing exclusifs',
      'Réduction de 20% sur les événements'
    ]
  },
  {
    type: 'premium',
    name: 'Invitopia Premium',
    price: 49.99,
    icon: Star,
    color: 'text-yellow-500',
    benefits: [
      'Tous les avantages Professional',
      'Badge premium exclusif',
      'Événements illimités',
      'Templates premium gratuits',
      'Manager de compte dédié'
    ]
  },
  {
    type: 'excellence',
    name: 'Invitopia Excellence',
    price: 99.99,
    icon: Award,
    color: 'text-emerald-500',
    benefits: [
      'Tous les avantages Premium',
      'Badge excellence ultra-premium',
      'Personnalisation complète',
      'API access',
      'White-label disponible',
      'Formation personnalisée'
    ]
  }
];

interface BadgeApplicationFormProps {
  onProceedToCheckout?: (badgeName: string, price: number) => void;
}

const BadgeApplicationForm: React.FC<BadgeApplicationFormProps> = ({ onProceedToCheckout }) => {
  const { applyForBadge } = useBadges();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<BadgeType>('verified');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'mobile'>('stripe');
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    organization: user?.organization || '',
    website: '',
    businessType: '',
    applicationReason: '',
    idDocument: '',
    businessDocument: ''
  });

  const selectedTier = badgeTiers.find(tier => tier.type === selectedBadge);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.applicationReason) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);
    try {
      await applyForBadge(
        selectedBadge,
        JSON.stringify({
          ...formData,
          paymentMethod
        }),
        selectedTier?.price || 0
      );
      
      toast.success('Demande de certification enregistrée avec succès!');
      
      // Redirect to checkout
      if (onProceedToCheckout && selectedTier) {
        onProceedToCheckout(selectedTier.name, selectedTier.price);
      }
      
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la soumission');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Badge Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Choisissez votre certification
          </CardTitle>
          <CardDescription>
            Sélectionnez le niveau de certification qui correspond à vos besoins
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {badgeTiers.map((tier) => {
              const Icon = tier.icon;
              const isSelected = selectedBadge === tier.type;
              
              return (
                <Card
                  key={tier.type}
                  className={`cursor-pointer transition-all ${
                    isSelected 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedBadge(tier.type)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-2">
                      <Icon className={`h-8 w-8 ${tier.color}`} />
                    </div>
                    <CardTitle className="text-lg">{tier.name}</CardTitle>
                    <div className="text-2xl font-bold text-primary">
                      {tier.price}€<span className="text-sm text-muted-foreground">/mois</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {tier.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>
              Fournissez vos informations pour la vérification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Nom complet <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Jean Dupont"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jean@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Téléphone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+33 6 12 34 56 78"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organisation / Entreprise</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="Ma Société"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Site web</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://monsite.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Type d'activité</Label>
                <Input
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  placeholder="Organisateur d'événements"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents de vérification</CardTitle>
            <CardDescription>
              Pour vérifier votre identité et votre activité
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="idDocument">
                Pièce d'identité (URL du document)
              </Label>
              <Input
                id="idDocument"
                value={formData.idDocument}
                onChange={(e) => setFormData({ ...formData, idDocument: e.target.value })}
                placeholder="Lien vers votre pièce d'identité"
              />
              <p className="text-xs text-muted-foreground">
                Carte d'identité, passeport ou permis de conduire
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessDocument">
                Document professionnel (URL du document)
              </Label>
              <Input
                id="businessDocument"
                value={formData.businessDocument}
                onChange={(e) => setFormData({ ...formData, businessDocument: e.target.value })}
                placeholder="Lien vers un document professionnel"
              />
              <p className="text-xs text-muted-foreground">
                KBIS, certificat d'inscription, ou autre document officiel
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="applicationReason">
                Raison de la demande <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="applicationReason"
                value={formData.applicationReason}
                onChange={(e) => setFormData({ ...formData, applicationReason: e.target.value })}
                placeholder="Expliquez pourquoi vous souhaitez être certifié..."
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Méthode de paiement
            </CardTitle>
            <CardDescription>
              Choisissez votre mode de paiement préféré
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)}>
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="stripe" id="stripe" />
                <Label htmlFor="stripe" className="flex-1 cursor-pointer">
                  <div className="font-medium">Stripe</div>
                  <div className="text-sm text-muted-foreground">
                    Carte bancaire (Visa, Mastercard, American Express)
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                  <div className="font-medium">PayPal</div>
                  <div className="text-sm text-muted-foreground">
                    Paiement sécurisé via PayPal
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="mobile" id="mobile" />
                <Label htmlFor="mobile" className="flex-1 cursor-pointer">
                  <div className="font-medium">Mobile Money</div>
                  <div className="text-sm text-muted-foreground">
                    Orange Money, MTN Mobile Money, Airtel Money
                  </div>
                </Label>
              </div>
            </RadioGroup>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Certification sélectionnée:</span>
                <Badge variant="secondary">{selectedTier?.name}</Badge>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total à payer:</span>
                <span>{selectedTier?.price}€/mois</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" disabled={isSubmitting}>
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi en cours...' : 'Continuer vers le paiement'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BadgeApplicationForm;
