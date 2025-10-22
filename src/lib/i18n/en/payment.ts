
import { Resource } from '../index';

export const paymentEn: Resource = {
  details: 'Payment Details',
  method: 'Payment Method',
  amount: 'Amount',
  status: 'Status',
  date: 'Payment Date',
  invoice: 'Invoice',
  history: 'Payment History',
  makePayment: 'Make Payment',
  confirmPayment: 'Confirm Payment',
  successfulPayment: 'Payment Successful',
  failedPayment: 'Payment Failed',
  pendingPayment: 'Payment Pending',
  paymentMethods: {
    creditCard: 'Credit Card',
    paypal: 'PayPal',
    bankTransfer: 'Bank Transfer',
    mobilePayment: 'Mobile Payment'
  }
};
