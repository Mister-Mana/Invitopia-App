import { Resource } from '../index';

export const badgesEn: Resource = {
  title: 'Invitopia Certification',
  subtitle: 'Get your official verification badge',
  application: 'Application',
  apply: 'Apply for Certification',
  myBadges: 'My Badges',
  status: 'Status',
  type: 'Type',
  expiresAt: 'Expires',
  appliedAt: 'Applied',
  reviewedAt: 'Reviewed',
  price: 'Price',
  paymentMethod: 'Payment Method',
  
  types: {
    verified: 'Invitopia Verified',
    professional: 'Invitopia Professional',
    premium: 'Invitopia Premium',
    excellence: 'Invitopia Excellence'
  },
  
  statuses: {
    pending: 'Pending Review',
    approved: 'Approved',
    active: 'Active',
    rejected: 'Rejected',
    revoked: 'Revoked',
    expired: 'Expired'
  },
  
  form: {
    personalInfo: 'Personal Information',
    verificationDocs: 'Verification Documents',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    organization: 'Organization / Company',
    website: 'Website',
    businessType: 'Business Type',
    idDocument: 'ID Document',
    businessDocument: 'Business Document',
    applicationReason: 'Application Reason',
    required: 'Required',
    submit: 'Submit Application',
    cancel: 'Cancel'
  },
  
  payment: {
    chooseMethod: 'Choose Payment Method',
    stripe: 'Credit Card (Stripe)',
    paypal: 'PayPal',
    mobile: 'Mobile Money',
    total: 'Total to Pay',
    perMonth: '/month'
  },
  
  messages: {
    applicationSuccess: 'Application submitted successfully!',
    applicationError: 'Error submitting application',
    redirectingToPayment: 'Redirecting to payment...',
    fillRequired: 'Please fill all required fields'
  }
};
