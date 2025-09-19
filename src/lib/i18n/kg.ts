import { Resource } from './index';
import { navbarKg } from './kg/navbar';
import { settingsKg } from './kg/settings';

const kg = {
  common: {
    welcomeMessage: "Karibuni na Invitopia",
    createEvent: "Vanga Likambu",
    dashboard: "Mesa ya nsonga",
    account: "Kompte",
    login: "Kota",
    signup: "Banguka",
    logout: "Kobima",
    save: "Kobika",
    cancel: "Koboya",
    confirm: "Kobanda",
    delete: "Koboma",
    edit: "Kosala malamu",
    view: "Kotala",
    back: "Kokende na nsima",
    next: "Na sima",
    previous: "Liboso",
    loading: "Koyoka...",
    search: "Kotalisa...",
    noResults: "Tala te",
    error: "Likambo moko esalemaki malamu te",
    success: "Mosala esalemaki malamu",
    events: {
      title: "Makambu",
      createEvent: "Vanga likambu",
      editEvent: "Soba likambu",
      deleteEvent: "Katula likambu",
      eventDetails: "Nsangu ya likambu",
      startDate: "Kilumbu ya kubanda",
      endDate: "Kilumbu ya nsuka",
      location: "Kisika",
      description: "Nsangu",
      attendees: "Bantu ya kukwisa",
      totalInvited: "Bantu yonso ya kubinga"
    },
    admin: {
      title: "Mfumu",
      userManagement: "Kutala bantu",
      systemSettings: "Bansoba ya système",
      paymentSettings: "Bansoba ya mbongo"
    },
    user: {
      profile: "Nkanda",
      editProfile: "Soba nkanda",
      changePassword: "Soba code",
      logout: "Basika"
    },
    teams: {
      title: "Bimvuka",
      createTeam: "Sala kimvuka",
      editTeam: "Soba kimvuka",
      deleteTeam: "Katula kimvuka"
    },
    superAdmin: {
      title: "Mfumu ya Nene",
      manageAdmins: "Kutala bamfumu",
      systemOverview: "Kutala système"
    },
    navbar: navbarKg
  },
  commonCore: {},
  createEvent: {
    title: "Vanga likambu ya sika",
    description: "Landá bitángo mpo na kobongisa likambu na yo",
    steps: {
      eventType: "Lolenge ya likambu",
      basicInfo: "Makambo ya ntina",
      locationDate: "Esika mpe mokolo",
      customization: "Kobongisa na ndenge na yo"
    },
    templates: {
      corporate: "Likambu ya mosala",
      wedding: "Feti ya libala",
      birthday: "Feti ya mbotama",
      social: "Likambu ya bato",
      fundraiser: "Likambu ya kosangisa mbongo",
      other: "Mosusu"
    },
    fields: {
      title: "Kombo ya likambu",
      description: "Maloba",
      date: "Mokolo",
      time: "Ngonga",
      location: "Esika",
      address: "Adrese mobimba",
      maxGuests: "Bato mingi koleka te"
    },
    customization: {
      appearance: "Kimonisi",
      guests: "Bato",
      settings: "Zimbanzala",
      coverImage: "Sary ya likolo",
      colorTheme: "Manzonana ya langi"
    },
    validation: {
      selectType: "Pona lolenge ya likambu mpo okende liboso.",
      fillRequired: "Kokisa biteni nyonso esengeli."
    },
    success: "Likambu esalemaki malamu!"
  },
  rsvp: {
    title: "RSVP",
    attending: "Nakoya",
    notAttending: "Nakoya te",
    maybe: "Mbala mosusu",
    additionalGuests: "Bato mosusu",
    dietaryRestrictions: "Makambo ya kolia",
    comments: "Maloba"
  },
  stats: {
    title: "Statistiques",
    invitationsSent: "Ba invitations batindami",
    viewed: "Batali",
    responded: "Bayanolaki",
    attending: "Bazali koya",
    notAttending: "Bazali koya te",
    pending: "Na kozela"
  },
  export: {
    title: "Kobimisa",
    format: "Forme",
    pdf: "PDF",
    jpg: "JPG",
    png: "PNG",
    svg: "SVG",
    quality: "Bon",
    download: "Kobanda"
  },
  roles: {
    superAdmin: "Super Nkuluntu",
    admin: "Nkuluntu",
    organizer: "Mobongisi",
    guest: "Mokambi"
  },
  home: {
    footer: {
      description: "Invitopia ezali plateforme ya kobongisa makambu nyonso ya feti, mpo na kosalisa yo okela, obongisa, mpe olanda makambu na yo na pete.",
      product: "Biloko",
      features: "Makambu",
      pricing: "Mbongo",
      testimonials: "Batoli",
      updates: "Sango ya sika",
      support: "Soutien",
      helpCenter: "Esika ya lisalisi",
      contact: "Kopesa sango",
      documentation: "Buku ya maloba",
      status: "Etat ya service",
      legal: "Mibeko",
      terms: "Mibeko ya kosalela",
      privacy: "Politique ya kobomba ba données",
      cookies: "Bisika ya cookies",
      compliance: "Kokokisa mibeko",
      copyright: "Makoki nyonso ebombami"
    }
  },
  // settings property removed to avoid duplicate key error
  pages: {
    help: {
      title: "Esika ya lisalisi",
      description: "Zwa biyano na mituna na yo mpe yekola kosalela Invitopia",
      searchPlaceholder: "Kotalisa lisalisi...",
      popularTopics: "Makambo ya mingi",
      contactSupport: "Kopesa soutien"
    },
    contact: {
      title: "Kopesa sango",
      description: "Ekipo na biso ezali na posa ya kosalisa yo",
      form: {
        name: "Kombo mobimba",
        email: "Email",
        subject: "Motif",
        message: "Sango",
        submit: "Tinda"
      },
      info: {
        title: "Sango ya contact",
        email: "support@invitopia.com",
        phone: "+243 123 456 789",
        address: "Boulevard Avenue, Kinshasa, RDC"
      }
    },
    documentation: {
      title: "Buku ya maloba",
      description: "Buku ya koyekola kosalela Invitopia",
      gettingStarted: "Kobanda",
      api: "API",
      tutorials: "Biyekoli",
      faq: "Mituna"
    },
    status: {
      title: "Etat ya service",
      description: "Talá etat ya service na biso",
      allOperational: "Makambo nyonso ezali malamu",
      partialOutage: "Makambo mosusu ezali te",
      majorOutage: "Makambo mingi ezali te",
      maintenanceMode: "Mode ya kobongisa",
      lastUpdated: "Mikolo ya sika"
    },
    terms: {
      title: "Mibeko ya kosalela",
      lastUpdated: "Mikolo ya sika"
    },
    privacy: {
      title: "Politique ya kobomba ba données",
      lastUpdated: "Mikolo ya sika"
    },
    cookies: {
      title: "Politique ya cookies",
      description: "Ndenge tokosalela cookies",
      necessary: "Esengeli",
      preferences: "Makambo ya bolingi",
      statistics: "Statistiques",
      marketing: "Marketing",
      accept: "Kondima nyonso",
      decline: "Koboya nyonso",
      customize: "Kobongisa"
    },
    compliance: {
      title: "Kokokisa mibeko",
      description: "Sango ya kokokisa mibeko na biso",
      gdpr: "GDPR",
      ccpa: "CCPA",
      hipaa: "HIPAA"
    },
    testimonials: {
      title: "Batoli",
      description: "Makambo bato balobi na biso",
      viewAll: "Talá batoli nyonso"
    },
    updates: {
      title: "Sango ya sika",
      description: "Sango ya sika na Invitopia",
      readMore: "Tala lisusu",
      categories: {
        all: "Nyonso",
        features: "Makambu ya sika",
        improvements: "Kobongisa",
        fixes: "Kobongisa mabe"
      }
    },
    about: {
      title: "Na ntina ya Invitopia",
      description: "Invitopia ezali plateforme ya kobongisa makambu.",
      mission: "Misyon na biso ezali kosalisa kobongisa makambu na pete.",
      team: "Talá ekipo na biso ya motema.",
      contact: "Kopesa sango mpo na koyeba mingi."
    }
  },
  auth: {
    login: "Kota",
    signup: "Banguka",
    forgotPassword: "Olingi motuya ya motuya?",
    resetPassword: "Kobongisa motuya",
    logout: "Kobima",
    email: "Email",
    password: "Motuya",
    confirmPassword: "Kobongisa motuya",
    name: "Kombo",
    phone: "Nimero ya telefone",
    code: "Kode",
    sendCode: "Tinda kode",
    verifyCode: "Kobongisa kode",
    resendCode: "Tinda kode lisusu",
    changePassword: "Yindula motuya",
    updateProfile: "Bongisa profil",
    loginWithPhone: "Kota na telefone",
    signupWithPhone: "Banguka na telefone",
    logoutSuccess: "O bimi malamu",
    loginSuccess: "O bimi malamu",
    signupSuccess: "O bangaki malamu",
    error: "Likambo moko esalemaki malamu te",
  },
  dashboard: {
    title: "Mesa ya nsonga",
    welcome: "Mbote na mesa ya nsonga",
    stats: "Ba statistiques",
    events: "Makambu",
    notifications: "Zinzengameno",
    profile: "Nkanda",
    settings: "Zimbanzala",
    logout: "Kobima",
  },
  events: {
    title: "Makambu",
    createEvent: "Vanga likambo",
    editEvent: "Bongisa likambo",
    deleteEvent: "Boma likambo",
    eventDetails: "Bokomi ya likambo",
    startDate: "Mokolo ya kobanda",
    endDate: "Mokolo ya kosilisa",
    location: "Esika",
    description: "Maloba",
    attendees: "Bato oyo bazali koya",
    totalInvited: "Bato oyo bazali kokamwa",
  },
  contacts: {
    title: "Bakonti",
    addContact: "Kokisa konta",
    editContact: "Bongisa konta",
    deleteContact: "Boma konta",
    searchContacts: "Kotalisa bakonti...",
  },
  templates: {
    title: "Malemba",
    createTemplate: "Vanga malemba",
    editTemplate: "Bongisa malemba",
    deleteTemplate: "Boma malemba",
  },
  admin: {
    title: "Nkuluntu",
    userManagement: "Boyangeli ya bakonzi",
    systemSettings: "Zimbanzala ya système",
    paymentSettings: "Zimbanzala ya mbongo",
  },
  user: {
    profile: "Nkanda",
    editProfile: "Bongisa nkanda",
    changePassword: "Yindula motuya",
    logout: "Kobima",
  },
  payment: {
    title: "Zimbongo",
    paymentMethods: "Mokano ya mbongo",
    localPayments: "Mbongo ya esika",
  },
  error: {
    notFound: "Kamona ko",
    unauthorized: "Oza na likama te",
    serverError: "Likambo moko esalemaki malamu te na serveur",
  },
  teams: {
    title: "Makundi",
    createTeam: "Vanga kundi",
    editTeam: "Bongisa kundi",
    deleteTeam: "Boma kundi",
  },
  superAdmin: {
    title: "Super Admin",
    manageAdmins: "Boyangeli ya bakonzi",
    systemOverview: "Monoko ya système",
  },
  navbar: navbarKg,
  settings: settingsKg
};

export const commonKg = kg.common;

// Define exportKg before using it
// Exports ya mambu yonso

export const commonCoreKg = kg.commonCore;
export const authKg = kg.auth;
export const dashboardKg = kg.dashboard;
export const createEventKg = kg.createEvent;
export const contactsKg = kg.contacts;
export const templatesKg = kg.templates;
export const adminKg = kg.admin;
export const userKg = kg.user;
export const paymentKg = kg.payment;
export const rsvpKg = kg.rsvp;
export const statsKg = kg.stats;
export const exportKg = kg.export;
export const homeKg = kg.home;
export const settingsLocalKg = kg.settings;
export const pagesKg = kg.pages;
export const rolesKg = kg.roles;

export default kg;
