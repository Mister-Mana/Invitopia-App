const fr = {
  common: {
    welcomeMessage: "Bienvenue sur Invitopia",
    createEvent: "Créer un événement",
    dashboard: "Tableau de bord",
    account: "Compte",
    login: "Connexion",
    signup: "S'inscrire",
    logout: "Déconnexion",
    save: "Enregistrer",
    cancel: "Annuler",
    confirm: "Confirmer",
    delete: "Supprimer",
    edit: "Modifier",
    view: "Voir",
    back: "Retour",
    next: "Suivant",
    previous: "Précédent",
    loading: "Chargement...",
    search: "Rechercher...",
    noResults: "Aucun résultat trouvé",
    error: "Une erreur est survenue",
    success: "Opération réussie",
    events: {
      title: "Événements",
      createEvent: "Créer un événement",
      editEvent: "Modifier l'événement",
      deleteEvent: "Supprimer l'événement",
      eventDetails: "Détails de l'événement",
      startDate: "Date de début",
      endDate: "Date de fin",
      location: "Lieu",
      description: "Description",
      attendees: "Participants",
      totalInvited: "Total invités"
    },
    admin: {
      title: "Administrateur",
      userManagement: "Gestion des utilisateurs",
      systemSettings: "Paramètres système",
      paymentSettings: "Paramètres de paiement"
    },
    user: {
      profile: "Profil",
      editProfile: "Modifier le profil",
      changePassword: "Changer le mot de passe",
      logout: "Déconnexion"
    },
    errorMessage: {
      notFound: "Non trouvé",
      unauthorized: "Non autorisé",
      serverError: "Erreur serveur"
    },
    teams: {
      title: "Équipes",
      createTeam: "Créer une équipe",
      editTeam: "Modifier l'équipe",
      deleteTeam: "Supprimer l'équipe"
    },
    superAdmin: {
      title: "Super Administrateur",
      manageAdmins: "Gérer les administrateurs",
      systemOverview: "Aperçu du système"
    },
    navbar: {
      language: "Langue",
      theme: "Thème",
      login: "Connexion",
      logout: "Déconnexion",
      dashboard: "Tableau de bord"
    }
  },
  auth: {
    email: "Email",
    password: "Mot de passe",
    forgotPassword: "Mot de passe oublié ?",
    createAccount: "Créer un compte",
    loginWithGoogle: "Connexion avec Google",
    loginWithFacebook: "Connexion avec Facebook",
    orContinueWith: "Ou continuer avec",
    alreadyHaveAccount: "Vous avez déjà un compte ?",
    dontHaveAccount: "Vous n'avez pas de compte ?",
    resetPassword: "Réinitialiser le mot de passe"
  },
  commonCore: {},
  dashboard: {
    welcome: "Bienvenue sur votre tableau de bord",
    upcomingEvents: "Événements à venir",
    pastEvents: "Événements passés",
    recentNotifications: "Notifications récentes",
    guestStatistics: "Statistiques des invités",
    invitationsSent: "Invitations envoyées",
    pendingGuests: "Invités en attente",
    markAllAsRead: "Tout marquer comme lu",
    viewAllNotifications: "Voir toutes les notifications",
    accepted: "Accepté",
    declined: "Refusé",
    pending: "En attente"
  },
  createEvent: {
    title: "Créer un nouvel événement",
    description: "Suivez les étapes pour configurer votre événement",
    steps: {
      eventType: "Type d'événement",
      basicInfo: "Informations de base",
      locationDate: "Lieu et date",
      customization: "Personnalisation"
    },
    templates: {
      corporate: "Événement Professionnel",
      wedding: "Mariage",
      birthday: "Anniversaire",
      social: "Événement Social",
      fundraiser: "Collecte de fonds",
      other: "Autre"
    },
    fields: {
      title: "Titre de l'événement",
      description: "Description",
      date: "Date",
      time: "Heure",
      location: "Lieu",
      address: "Adresse complète",
      maxGuests: "Nombre maximal d'invités"
    },
    customization: {
      appearance: "Apparence",
      guests: "Invités",
      settings: "Paramètres",
      coverImage: "Image de couverture",
      colorTheme: "Thème de couleur"
    },
    validation: {
      selectType: "Veuillez sélectionner un type d'événement pour continuer.",
      fillRequired: "Veuillez remplir tous les champs obligatoires."
    },
    success: "Événement créé avec succès !"
  },
  templates: {
    gallery: "Galerie de templates",
    chooseTemplate: "Choisir un template",
    invitation: "Invitations",
    ticket: "Billets",
    customize: "Personnaliser",
    preview: "Aperçu",
    download: "Télécharger",
    share: "Partager"
  },
  payment: {
    methods: "Méthodes de paiement",
    subscription: "Abonnement",
    oneTime: "Paiement unique",
    manualPayment: "Paiement manuel",
    generateCode: "Générer un code",
    validatePayment: "Valider le paiement",
    paymentStatus: "Statut du paiement",
    completed: "Complété",
    pending: "En attente",
    failed: "Échoué",
    currency: "Devise",
    amount: "Montant",
    paymentCode: "Code de paiement",
    enterPaymentCode: "Entrez le code de paiement"
  },
  contacts: {
    title: "Carnet de contacts",
    addContact: "Ajouter un contact",
    importContacts: "Importer des contacts",
    exportContacts: "Exporter des contacts",
    searchContacts: "Rechercher des contacts",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    phone: "Téléphone",
    groups: "Groupes",
    addToGroup: "Ajouter à un groupe",
    createGroup: "Créer un groupe"
  },
  rsvp: {
    title: "RSVP",
    attending: "Je participe",
    notAttending: "Je ne participe pas",
    maybe: "Peut-être",
    additionalGuests: "Invités supplémentaires",
    dietaryRestrictions: "Restrictions alimentaires",
    comments: "Commentaires"
  },
  stats: {
    title: "Statistiques",
    invitationsSent: "Invitations envoyées",
    viewed: "Vues",
    responded: "Réponses",
    attending: "Participants",
    notAttending: "Non-participants",
    pending: "En attente"
  },
  exportData: {
    title: "Exporter",
    format: "Format",
    pdf: "PDF",
    jpg: "JPG",
    png: "PNG",
    svg: "SVG",
    quality: "Qualité",
    download: "Télécharger"
  },
  home: {
    footer: {
      description: "Invitopia est une plateforme de gestion d'événements tout-en-un qui vous aide à créer, gérer et suivre vos événements facilement.",
      product: "Produit",
      features: "Fonctionnalités",
      pricing: "Tarifs",
      testimonials: "Témoignages",
      updates: "Mises à jour",
      support: "Support",
      helpCenter: "Centre d'aide",
      contact: "Contact",
      documentation: "Documentation",
      status: "Statut du service",
      legal: "Mentions légales",
      terms: "Conditions d'utilisation",
      privacy: "Politique de confidentialité",
      cookies: "Cookies",
      compliance: "Conformité",
      copyright: "Tous droits réservés"
    }
  },
  settings: {
    languageRegion: "Langue et région",
    languageDescription: "Définissez votre langue préférée et vos paramètres régionaux",
    language: "Langue",
    timeZone: "Fuseau horaire",
    timeZoneDescription: "Votre fuseau horaire est utilisé pour afficher les dates et heures correctement",
    accessibility: "Accessibilité",
    accessibilityDescription: "Personnalisez votre expérience pour améliorer l'accessibilité",
    reducedMotion: "Réduire les animations",
    reducedMotionDescription: "Limite ou désactive les animations pour réduire la fatigue visuelle",
    highContrast: "Contraste élevé",
    highContrastDescription: "Améliore le contraste des couleurs pour une meilleure lisibilité",
    connectedDevices: "Appareils connectés",
    devicesDescription: "Gérez les appareils qui ont accès à votre compte",
    removeDevice: "Supprimer",
    currentDevice: "Appareil actuel",
    appearance: "Apparence",
    appearanceDescription: "Personnalisez l'apparence de l'application",
    theme: "Thème",
    lightTheme: "Clair",
    darkTheme: "Sombre",
    systemTheme: "Système",
    accentColor: "Couleur d'accent",
    fontSize: "Taille de police"
  },
  pages: {
    help: {
      title: "Centre d'aide",
      description: "Trouvez des réponses à vos questions et apprenez à utiliser Invitopia",
      searchPlaceholder: "Rechercher dans l'aide...",
      popularTopics: "Sujets populaires",
      contactSupport: "Contacter le support"
    },
    contact: {
      title: "Contactez-nous",
      description: "Notre équipe est prête à vous aider",
      form: {
        name: "Nom complet",
        email: "Email",
        subject: "Sujet",
        message: "Message",
        submit: "Envoyer"
      },
      info: {
        title: "Informations de contact",
        email: "support@invitopia.com",
        phone: "+243 123 456 789",
        address: "Avenue du Boulevard, Kinshasa, RDC"
      }
    },
    documentation: {
      title: "Documentation",
      description: "Guides détaillés pour tirer le meilleur parti d'Invitopia",
      gettingStarted: "Commencer",
      api: "API",
      tutorials: "Tutoriels",
      faq: "FAQ"
    },
    status: {
      title: "Statut du service",
      description: "Vérifiez l'état actuel de nos services",
      allOperational: "Tous les systèmes sont opérationnels",
      partialOutage: "Panne partielle",
      majorOutage: "Panne majeure",
      maintenanceMode: "Mode maintenance",
      lastUpdated: "Dernière mise à jour"
    },
    terms: {
      title: "Conditions d'utilisation",
      lastUpdated: "Dernière mise à jour"
    },
    privacy: {
      title: "Politique de confidentialité",
      lastUpdated: "Dernière mise à jour"
    },
    cookies: {
      title: "Politique de cookies",
      description: "Comment nous utilisons les cookies",
      necessary: "Nécessaires",
      preferences: "Préférences",
      statistics: "Statistiques",
      marketing: "Marketing",
      accept: "Accepter tous",
      decline: "Refuser tous",
      customize: "Personnaliser"
    },
    compliance: {
      title: "Conformité",
      description: "Informations sur notre conformité réglementaire",
      gdpr: "GDPR",
      ccpa: "CCPA",
      hipaa: "HIPAA"
    },
    testimonials: {
      title: "Témoignages",
      description: "Ce que nos clients disent de nous",
      viewAll: "Voir tous les témoignages"
    },
    updates: {
      title: "Mises à jour",
      description: "Dernières actualités et mises à jour d'Invitopia",
      readMore: "Lire plus",
      categories: {
        all: "Toutes",
        features: "Nouvelles fonctionnalités",
        improvements: "Améliorations",
        fixes: "Corrections"
      }
    },
    about: {
      title: "À propos d'Invitopia",
      description: "Invitopia est la plateforme qui dynamise vos événements.",
      mission: "Notre mission est de simplifier et d'améliorer la gestion d'événements pour tous.",
      team: "Découvrez notre équipe passionnée.",
      contact: "Contactez-nous pour plus d'informations.",
    }
  }
};

// Exports des sections principales
export const commonFr = fr.common;
export const commonCoreFr = fr.commonCore;
export const authFr = fr.auth;
export const dashboardFr = fr.dashboard;
export const createEventFr = fr.createEvent;
export const templatesFr = fr.templates;
export const paymentFr = fr.payment;
export const contactsFr = fr.contacts;
export const rsvpFr = fr.rsvp;
export const statsFr = fr.stats;
export const exportDataFr = fr.exportData;
export const homeFr = fr.home;
export const settingsLocalFr = fr.settings;
export const pagesFr = fr.pages;
export const aboutFr = fr.pages.about;
export const adminFr = fr.common.admin;
export const errorFr = fr.common.errorMessage;
export const teamsFr = fr.common.teams;
export const superAdminFr = fr.common.superAdmin;
export const eventsFr = fr.common.events;
export const navbarFr = fr.common.navbar;
export const userFr = fr.common.user;
// Export par défaut de toutes les traductions
export default fr;