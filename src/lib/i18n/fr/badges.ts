import { Resource } from '../index';

export const badgesFr: Resource = {
  title: 'Certification Invitopia',
  subtitle: 'Obtenez votre badge de vérification officiel',
  application: 'Demande',
  apply: 'Demander la Certification',
  myBadges: 'Mes Badges',
  status: 'Statut',
  type: 'Type',
  expiresAt: 'Expire',
  appliedAt: 'Demandé',
  reviewedAt: 'Examiné',
  price: 'Prix',
  paymentMethod: 'Méthode de Paiement',
  
  types: {
    verified: 'Invitopia Vérifié',
    professional: 'Invitopia Professionnel',
    premium: 'Invitopia Premium',
    excellence: 'Invitopia Excellence'
  },
  
  statuses: {
    pending: 'En attente',
    approved: 'Approuvé',
    active: 'Actif',
    rejected: 'Rejeté',
    revoked: 'Révoqué',
    expired: 'Expiré'
  },
  
  form: {
    personalInfo: 'Informations Personnelles',
    verificationDocs: 'Documents de Vérification',
    fullName: 'Nom Complet',
    email: 'Email',
    phone: 'Téléphone',
    organization: 'Organisation / Entreprise',
    website: 'Site Web',
    businessType: 'Type d\'Activité',
    idDocument: 'Pièce d\'Identité',
    businessDocument: 'Document Professionnel',
    applicationReason: 'Raison de la Demande',
    required: 'Obligatoire',
    submit: 'Soumettre la Demande',
    cancel: 'Annuler'
  },
  
  payment: {
    chooseMethod: 'Choisir la Méthode de Paiement',
    stripe: 'Carte Bancaire (Stripe)',
    paypal: 'PayPal',
    mobile: 'Mobile Money',
    total: 'Total à Payer',
    perMonth: '/mois'
  },
  
  messages: {
    applicationSuccess: 'Demande soumise avec succès!',
    applicationError: 'Erreur lors de la soumission',
    redirectingToPayment: 'Redirection vers le paiement...',
    fillRequired: 'Veuillez remplir tous les champs obligatoires'
  }
};
