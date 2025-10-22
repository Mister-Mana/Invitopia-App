
import { Resource } from '../index';

export const settingsFr: Resource = {
  title: 'Paramètres',
  general: 'Général',
  notifications: 'Notifications',
  appearance: 'Apparence',
  admin: 'Admin',
  profile: 'Profil',
  certification: 'Certification',
  lightTheme: 'Clair',
  darkTheme: 'Sombre',
  systemTheme: 'Système',
  chooseTheme: 'Choisir le thème',
  theme: 'Thème',
  changeTheme: 'Changer de thème',
  languageRegion: 'Langue et région',
  language: 'Langue',
  changeLanguage: 'Changer de langue',
  certificationSection: {
    title: 'Certification du Compte',
    description: 'Obtenez votre badge de certification officiel Invitopia',
    noBadge: 'Vous n\'avez pas encore de certification active',
    apply: 'Demander la Certification',
    status: 'Statut',
    active: 'Certification Active',
    pending: 'Demande en Cours',
    badgeTypes: {
      title: 'Certifications Disponibles',
      verified: {
        name: 'Invitopia Vérifié',
        description: 'Badge de vérification officiel pour les organisateurs de confiance'
      },
      professional: {
        name: 'Invitopia Professionnel',
        description: 'Badge premium pour les organisateurs d\'événements professionnels'
      },
      premium: {
        name: 'Invitopia Premium',
        description: 'Badge exclusif avec fonctionnalités avancées'
      },
      excellence: {
        name: 'Invitopia Excellence',
        description: 'Badge ultra-premium pour l\'excellence en gestion d\'événements'
      }
    }
  }
};
