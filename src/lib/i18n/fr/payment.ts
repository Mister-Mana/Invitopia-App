
import { Resource } from '../index';

export const paymentFr: Resource = {
  details: 'Détails du paiement',
  method: 'Méthode de paiement',
  amount: 'Montant',
  status: 'Statut',
  date: 'Date de paiement',
  invoice: 'Facture',
  history: 'Historique des paiements',
  makePayment: 'Effectuer un paiement',
  confirmPayment: 'Confirmer le paiement',
  successfulPayment: 'Paiement réussi',
  failedPayment: 'Échec du paiement',
  pendingPayment: 'Paiement en attente',
  paymentMethods: {
    creditCard: 'Carte de crédit',
    paypal: 'PayPal',
    bankTransfer: 'Virement bancaire',
    mobilePayment: 'Paiement mobile'
  }
};
