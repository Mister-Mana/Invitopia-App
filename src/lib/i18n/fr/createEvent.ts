
import { Resource } from '../index';

export const createEventFr: Resource = {
  title: 'Créer un événement',
  subtitle: 'Créez et personnalisez votre invitation d\'événement parfaite',
  basicInfo: 'Informations de base',
  locationDate: 'Lieu et date',
  customization: 'Personnalisation',
  contacts: 'Contacts',
  confirmation: 'Confirmation',
  
  // Steps
  steps: {
    type: {
      title: 'Type d\'événement',
      description: 'Choisissez le type d\'événement que vous souhaitez créer'
    },
    basic: {
      title: 'Informations de base',
      description: 'Ajoutez les détails essentiels de votre événement'
    },
    location: {
      title: 'Lieu et date',
      description: 'Définissez quand et où aura lieu votre événement'
    },
    customization: {
      title: 'Personnalisation',
      description: 'Personnalisez l\'apparence de votre événement'
    },
    contacts: {
      title: 'Contacts et équipe',
      description: 'Sélectionnez les contacts et assignez une équipe à votre événement'
    },
    confirm: {
      title: 'Confirmation',
      description: 'Vérifiez et publiez votre événement'
    }
  },
  
  // Templates
  templates: {
    corporate: {
      name: 'Événement d\'entreprise',
      description: 'Événements professionnels, réunions et conférences'
    },
    wedding: {
      name: 'Mariage',
      description: 'Cérémonies de mariage et célébrations'
    },
    birthday: {
      name: 'Anniversaire',
      description: 'Fêtes d\'anniversaire et célébrations'
    },
    social: {
      name: 'Événement social',
      description: 'Rassemblements sociaux et événements informels'
    },
    fundraiser: {
      name: 'Collecte de fonds',
      description: 'Événements caritatifs et activités de collecte de fonds'
    },
    other: {
      name: 'Autre',
      description: 'Type d\'événement personnalisé'
    }
  },
  
  // Contact Selection
  selectContactGroup: 'Sélectionner un groupe de contacts',
  chooseContactGroup: 'Choisir un groupe de contacts',
  allContacts: 'Tous les contacts',
  
  // Team Assignment
  assignTeam: 'Assigner une équipe',
  selectTeam: 'Sélectionner une équipe',
  chooseTeam: 'Choisir une équipe',
  noTeamSelected: 'Aucune équipe sélectionnée',
  teamRequired: 'Une équipe est requise pour cet événement',
  
  // Form fields
  eventName: 'Nom de l\'événement',
  eventNamePlaceholder: 'Entrez le nom de l\'événement',
  eventDescription: 'Description de l\'événement',
  eventDescriptionPlaceholder: 'Décrivez votre événement',
  eventType: 'Type d\'événement',
  selectEventType: 'Sélectionner le type d\'événement',
  
  // Location and date
  eventLocation: 'Lieu de l\'événement',
  eventLocationPlaceholder: 'Entrez le lieu de l\'événement',
  eventDate: 'Date de l\'événement',
  eventTime: 'Heure de l\'événement',
  selectDate: 'Sélectionner la date',
  selectTime: 'Sélectionner l\'heure',
  date: 'Date',
  time: 'Heure',
  location: 'Lieu',
  locationPlaceholder: 'Entrez le lieu de l\'événement',
  address: 'Adresse',
  addressPlaceholder: 'Entrez l\'adresse complète',
  
  // Additional fields
  maxGuests: 'Nombre maximum d\'invités',
  maxGuestsPlaceholder: 'Entrez le nombre maximum d\'invités',
  
  // Appearance
  appearance: 'Apparence',
  
  // Validation messages
  eventNameRequired: 'Le nom de l\'événement est requis',
  eventTypeRequired: 'Le type d\'événement est requis',
  eventDateRequired: 'La date de l\'événement est requise',
  eventLocationRequired: 'Le lieu de l\'événement est requis',
  
  // Actions
  saveAsDraft: 'Enregistrer comme brouillon',
  continueToNext: 'Continuer',
  publishEvent: 'Publier l\'événement',
  previewEvent: 'Aperçu de l\'événement',
  createEvent: 'Créer l\'événement',
  
  // Success and error messages
  success: 'Événement créé avec succès !',
  readyToCreate: 'Prêt à créer',
  confirmationMessage: 'Votre événement est prêt à être créé. Vérifiez les détails ci-dessous et cliquez sur "Créer l\'événement" pour publier.',
  
  // Errors
  errors: {
    selectTemplate: 'Veuillez sélectionner un modèle d\'événement',
    requiredFields: 'Veuillez remplir tous les champs obligatoires'
  }
};
