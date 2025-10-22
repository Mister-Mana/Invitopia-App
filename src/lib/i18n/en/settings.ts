
import { Resource } from '../index';

export const settingsEn: Resource = {
  title: 'Settings',
  general: 'General',
  notifications: 'Notifications',
  appearance: 'Appearance',
  admin: 'Admin',
  profile: 'Profile',
  certification: 'Certification',
  lightTheme: 'Light',
  darkTheme: 'Dark',
  systemTheme: 'System',
  chooseTheme: 'Choose theme',
  theme: 'Theme',
  changeTheme: 'Change theme',
  languageRegion: 'Language & Region',
  language: 'Language',
  changeLanguage: 'Change language',
  certificationSection: {
    title: 'Account Certification',
    description: 'Get your official Invitopia certification badge',
    noBadge: 'You don\'t have an active certification yet',
    apply: 'Apply for Certification',
    status: 'Status',
    active: 'Active Certification',
    pending: 'Application Pending',
    badgeTypes: {
      title: 'Available Certifications',
      verified: {
        name: 'Invitopia Verified',
        description: 'Official verification badge for trusted organizers'
      },
      professional: {
        name: 'Invitopia Professional',
        description: 'Premium badge for professional event organizers'
      },
      premium: {
        name: 'Invitopia Premium',
        description: 'Exclusive badge with advanced features'
      },
      excellence: {
        name: 'Invitopia Excellence',
        description: 'Ultra-premium badge for excellence in event management'
      }
    }
  }
};
