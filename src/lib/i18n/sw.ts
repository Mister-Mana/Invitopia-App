<<<<<<< HEAD
=======

>>>>>>> c00c8f8f156f339d31b6df644930a3edc51e0274
import { Resource } from './index';
import { navbarSw } from './sw/navbar';
import { settingsSw } from './sw/settings';

<<<<<<< HEAD
const sw = {
  common: {
    welcomeMessage: "Karibu Invitopia",
    createEvent: "Unda Tukio",
=======
export default {
  common: {
    welcomeMessage: "Karibu Invitopia",
    createEvent: "Unda Hafla",
>>>>>>> c00c8f8f156f339d31b6df644930a3edc51e0274
    dashboard: "Dashibodi",
    account: "Akaunti",
    login: "Ingia",
    signup: "Jisajili",
    logout: "Toka",
    save: "Hifadhi",
    cancel: "Ghairi",
    confirm: "Thibitisha",
    delete: "Futa",
    edit: "Hariri",
<<<<<<< HEAD
    view: "Angalia",
    back: "Rudi nyuma",
    next: "Ifuate",
    previous: "Iliyopita",
    loading: "Inapakia...",
    search: "Tafuta...",
    noResults: "Hakuna matokeo",
    error: "Kuna kosa limetokea",
    success: "Operesheni imefanikiwa",
    events: {
      title: "Matukio",
      createEvent: "Unda Tukio",
      editEvent: "Hariri Tukio",
      deleteEvent: "Futa Tukio",
      eventDetails: "Maelezo ya Tukio",
      startDate: "Tarehe ya Kuanza",
      endDate: "Tarehe ya Mwisho",
      location: "Mahali",
      description: "Maelezo",
      attendees: "Washiriki",
      totalInvited: "Jumla ya Walioalikwa"
    },
    admin: {
      title: "Msimamizi",
      userManagement: "Usimamizi wa Watumiaji",
      systemSettings: "Mipangilio ya Mfumo",
      paymentSettings: "Mipangilio ya Malipo"
    },
    user: {
      profile: "Wasifu",
      editProfile: "Hariri Wasifu",
      changePassword: "Badilisha Nywila",
      logout: "Toka"
    },
    errorMessage: {
      notFound: "Haipatikani",
      unauthorized: "Huna Ruhusa",
      serverError: "Hitilafu ya Seva"
    },
    teams: {
      title: "Timu",
      createTeam: "Unda Timu",
      editTeam: "Hariri Timu",
      deleteTeam: "Futa Timu"
    },
    superAdmin: {
      title: "Msimamizi Mkuu",
      manageAdmins: "Simamia Wasimamizi",
      systemOverview: "Muhtasari wa Mfumo"
    },
    navbar: navbarSw
  },
  commonCore: {},
=======
    view: "Ona",
    back: "Rudi",
    next: "Ifuatayo",
    previous: "Iliyotangulia",
    loading: "Inapakia...",
    search: "Tafuta...",
    noResults: "Hakuna matokeo",
    error: "Hitilafu imetokea",
    success: "Imefanikiwa",
    copy: "Nakili",
    share: "Shiriki",
    filename: "Jina la faili",
    format: "Muundo",
    quality: "Ubora",
    low: "Chini",
    medium: "Wastani",
    high: "Juu",
    image: "Picha",
    print: "Chapisha",
    actions: "Vitendo",
    undo: "Tengua",
    redo: "Rudia",
    action: "Kitendo",
    currentState: "Hali ya sasa",
    profile: "Wasifu",
    features: "Vipengele",
    pricing: "Bei",
    manageContacts: "Dhibiti anwani zako ili kusaidia ugawaji wa mialiko",
    teams: "Timu",
    navigation: "Urambazaji",
    accept: "Kubali",
    decline: "Kataa",
    changeLanguage: "Badilisha lugha",
    selectLanguage: "Chagua lugha",
    theme: "Muonekano",
    changeTheme: "Badilisha muonekano",
    lightMode: "Muonekano mwanga",
    darkMode: "Muonekano wa giza",
    systemMode: "Muonekano wa mfumo",
    chooseTheme: "Chagua muonekano",
    online: "Mtandaoni",
    offline: "Nje ya mtandao",
    available: "Inapatikana",
    busy: "Mshughuli",
    away: "Mbali",
    close: "Funga",
    open: "Fungua",
    expand: "Panua",
    collapse: "Kunja",
    show: "Onyesha",
    hide: "Ficha",
    enable: "Wezesha",
    disable: "Lemaza",
    activate: "Amilisha",
    deactivate: "Lemaza",
    today: "Leo",
    yesterday: "Jana",
    tomorrow: "Kesho",
    thisWeek: "Wiki hii",
    nextWeek: "Wiki ijayo",
    thisMonth: "Mwezi huu",
    nextMonth: "Mwezi ujao",
    notification: "Arifa",
    notifications: "Arifa",
    message: "Ujumbe",
    messages: "Ujumbe",
    alert: "Onyo",
    warning: "Onyo",
    info: "Maelezo",
    required: "Inahitajika",
    optional: "Si lazima",
    invalid: "Si sahihi",
    valid: "Sahihi",
    submit: "Tuma",
    reset: "Weka upya",
    clear: "Safisha",
  },
>>>>>>> c00c8f8f156f339d31b6df644930a3edc51e0274
  auth: {
    login: "Ingia",
    signup: "Jisajili",
    forgotPassword: "Umesahau nywila?",
    resetPassword: "Weka upya nywila",
    logout: "Toka",
    email: "Barua pepe",
    password: "Nywila",
    confirmPassword: "Thibitisha nywila",
    name: "Jina",
    phone: "Nambari ya simu",
    code: "Msimbo",
    sendCode: "Tuma msimbo",
    verifyCode: "Thibitisha msimbo",
    resendCode: "Tuma tena msimbo",
    changePassword: "Badilisha nywila",
    updateProfile: "Sasisha wasifu",
    loginWithPhone: "Ingia kwa simu",
    signupWithPhone: "Jisajili kwa simu",
    logoutSuccess: "Umetoka kwa ufanisi",
    loginSuccess: "Umeingia kwa ufanisi",
    signupSuccess: "Umejisajili kwa ufanisi",
    error: "Hitilafu imetokea",
  },
  dashboard: {
    title: "Dashibodi",
    welcome: "Karibu kwenye dashibodi",
    stats: "Takwimu",
    events: "Hafla",
    notifications: "Arifa",
    profile: "Wasifu",
    settings: "Mipangilio",
    logout: "Toka",
  },
  events: {
    title: "Hafla",
    createEvent: "Unda hafla",
    editEvent: "Hariri hafla",
    deleteEvent: "Futa hafla",
    eventDetails: "Maelezo ya hafla",
    startDate: "Tarehe ya kuanza",
    endDate: "Tarehe ya mwisho",
    location: "Mahali",
    description: "Maelezo",
    attendees: "Washiriki",
    totalInvited: "Jumla ya walioalikwa",
  },
  contacts: {
    title: "Anwani",
    addContact: "Ongeza anwani",
    editContact: "Hariri anwani",
    deleteContact: "Futa anwani",
    searchContacts: "Tafuta anwani...",
  },
  templates: {
    title: "Violezo",
    createTemplate: "Unda kiolezo",
    editTemplate: "Hariri kiolezo",
    deleteTemplate: "Futa kiolezo",
  },
  admin: {
    title: "Msimamizi",
    userManagement: "Usimamizi wa watumiaji",
    systemSettings: "Mipangilio ya mfumo",
    paymentSettings: "Mipangilio ya malipo",
  },
  user: {
    profile: "Wasifu",
    editProfile: "Hariri wasifu",
    changePassword: "Badilisha nywila",
    logout: "Toka",
  },
  payment: {
    title: "Malipo",
    paymentMethods: "Njia za malipo",
    localPayments: "Malipo ya ndani",
  },
  error: {
    notFound: "Haijapatikana",
    unauthorized: "Hauruhusiwi",
    serverError: "Hitilafu ya seva",
  },
  teams: {
    title: "Timu",
    createTeam: "Unda timu",
    editTeam: "Hariri timu",
    deleteTeam: "Futa timu",
  },
  superAdmin: {
    title: "Mkuu wa Usimamizi",
    manageAdmins: "Simamia wasimamizi",
    systemOverview: "Muhtasari wa mfumo",
  },
  navbar: navbarSw,
<<<<<<< HEAD
  settings: settingsSw,
  paymentMethod: {
    title: "Malipo",
    methods: "Njia za Malipo",
    subscription: "Usajili",
    oneTime: "Malipo ya Mara Moja",
    manualPayment: "Malipo ya Mkono",
    generateCode: "Tengeneza Msimbo",
    validatePayment: "Thibitisha Malipo",
    paymentStatus: "Hali ya Malipo",
    completed: "Imekamilika",
    pending: "Inasubiri",
    failed: "Imeshindwa",
    currency: "Sarafu",
    amount: "Kiasi",
    paymentCode: "Msimbo wa Malipo",
    enterPaymentCode: "Ingiza Msimbo wa Malipo"
  },
  rsvp: {
    title: "RSVP",
    attending: "Nitahudhuria",
    notAttending: "Sitahudhuria",
    maybe: "Labda",
    additionalGuests: "Wageni wa Ziada",
    dietaryRestrictions: "Vizuizi vya Chakula",
    comments: "Maoni"
  },
  stats: {
    title: "Takwimu",
    invitationsSent: "Mialiko Iliyotumwa",
    viewed: "Iliyoonwa",
    responded: "Waliorithi",
    attending: "Wanaohudhuria",
    notAttending: "Wasiohudhuria",
    pending: "Inasubiri"
  }
};

// Exports za sehemu kuu
export const commonSw = sw.common;
export const commonCoreSw = sw.commonCore;
export const authSw = sw.auth;
export const dashboardSw = sw.dashboard;
export const eventsSw = sw.events;
export const contactsSw = sw.contacts;
export const templatesSw = sw.templates;
export const adminSw = sw.admin;
export const userSw = sw.user;
export const paymentSw = sw.payment;
export const errorSw = sw.error;
export const teamsSw = sw.teams;
export const superAdminSw = sw.superAdmin;
export const rsvpSw = sw.rsvp;
export const statsSw = sw.stats;

export default sw;
=======
  settings: settingsSw
};
>>>>>>> c00c8f8f156f339d31b6df644930a3edc51e0274
