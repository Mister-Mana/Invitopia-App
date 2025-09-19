<<<<<<< HEAD
import { Resource } from './';
import { navbarLn } from './ln/navbar';
import { settingsLn } from './ln/settings';

const ln = {
  common: {
    welcomeMessage: "Mbote na Invitopia",
    createEvent: "Kela likambo",
    dashboard: "Tableau de bord",
    account: "Compte",
    login: "Kota",
    signup: "Inscription",
    logout: "Kobima",
    save: "Bomba",
    cancel: "Annuler",
    confirm: "Confirmer",
    delete: "Supprimer",
    edit: "Modifier",
    view: "Tala",
    back: "Zonga",
    next: "Kende liboso",
    previous: "Zonga nsima",
    loading: "Ezali ko charger...",
    search: "Luka...",
    noResults: "Eloko moko te",
    error: "Likambo moko esalemaki malamu te",
    success: "Mosala esalemaki malamu",
    events: {},
    admin: {},
    user: {},
    errorMessage: {},
    teams: {},
    superAdmin: {},
    navbar: {}
  },
  commonCore: {},
=======

import { Resource } from './index';
import { navbarLn } from './ln/navbar';
import { settingsLn } from './ln/settings';

export default {
  common: {
    welcomeMessage: "Boyei na Invitopia",
    createEvent: "Sala feti",
    dashboard: "Mesa ya mosala",
    account: "Compte",
    login: "Kota",
    signup: "Mikanda",
    logout: "Kobima",
    save: "Kobomba",
    cancel: "Kotika",
    confirm: "Kondima",
    delete: "Kolongola",
    edit: "Kobongisa",
    view: "Komona",
    back: "Kozonga",
    next: "Na sima",
    previous: "Liboso",
    loading: "Ezali kozala...",
    search: "Koluka...",
    noResults: "Eloko moko te",
    error: "Likambo esalemaki malamu te",
    success: "Esalemaki malamu",
    copy: "Kokopia",
    share: "Kokabola",
    filename: "Kombo ya fichier",
    format: "Lolenge",
    quality: "Malamu",
    low: "Moke",
    medium: "Na kati",
    high: "Mingi",
    image: "Elilingi",
    print: "Kobimisa",
    actions: "Misala",
    undo: "Kotika",
    redo: "Kosala lisusu",
    action: "Mosala",
    currentState: "Lolenge ya sikoyo",
    profile: "Profil",
    features: "Makambu",
    pricing: "Ntalo",
    manageContacts: "Boyangeli ya ba contacts na yo pona kosalisa kokabola ba invitations",
    teams: "Bituluku",
    navigation: "Kotambola",
    accept: "Kondima",
    decline: "Koboya",
    changeLanguage: "Changer monoko",
    selectLanguage: "Pona monoko",
    theme: "Ndenge",
    changeTheme: "Changer ndenge",
    lightMode: "Ya pole",
    darkMode: "Ya molili",
    systemMode: "Ya système",
    chooseTheme: "Pona ndenge",
    online: "Na ligne",
    offline: "Na hors ligne",
    available: "Ezali",
    busy: "Mosala mingi",
    away: "Mosika",
    close: "Kokanga",
    open: "Kofungola",
    expand: "Kobakisa",
    collapse: "Kokitisa",
    show: "Kolakisa",
    hide: "Kobomba",
    enable: "Kopesa nzela",
    disable: "Kokanga nzela",
    activate: "Kosala",
    deactivate: "Kotika",
    today: "Lelo",
    yesterday: "Lobi",
    tomorrow: "Lobi na sima",
    thisWeek: "Poso oyo",
    nextWeek: "Poso na sima",
    thisMonth: "Sanza oyo",
    nextMonth: "Sanza na sima",
    notification: "Ba notification",
    notifications: "Ba notification",
    message: "Nsango",
    messages: "Nsango",
    alert: "Kokebisa",
    warning: "Kokeba",
    info: "Nsango",
    required: "Esengeli",
    optional: "Ezali na tina te",
    invalid: "Ezali mabe",
    valid: "Ezali malamu",
    submit: "Kotinda",
    reset: "Kobongola",
    clear: "Kopetola",
  },
>>>>>>> c00c8f8f156f339d31b6df644930a3edc51e0274
  auth: {
    login: "Kota",
    signup: "Mikanda",
    forgotPassword: "Obosani mot de passe?",
    resetPassword: "Kobongola mot de passe",
    logout: "Kobima",
    email: "Email",
    password: "Mot de passe",
    confirmPassword: "Kondima mot de passe",
    name: "Kombo",
    phone: "Nimero ya telefone",
    code: "Code",
    sendCode: "Tinda code",
    verifyCode: "Kondima code",
    resendCode: "Tinda code lisusu",
    changePassword: "Changer mot de passe",
    updateProfile: "Kobongola profil",
    loginWithPhone: "Kota na telefone",
    signupWithPhone: "Mikanda na telefone",
    logoutSuccess: "Obimi malamu",
    loginSuccess: "Okoti malamu",
    signupSuccess: "Omikandi malamu",
    error: "Likambo esalemaki malamu te",
  },
  dashboard: {
    title: "Mesa ya mosala",
    welcome: "Boyei na mesa ya mosala",
    stats: "Ba chiffres",
    events: "Makambu",
    notifications: "Ba notification",
    profile: "Profil",
    settings: "Ba paramètres",
    logout: "Kobima",
  },
  events: {
    title: "Makambu",
    createEvent: "Sala makambu",
    editEvent: "Kobongisa makambu",
    deleteEvent: "Kolongola makambu",
    eventDetails: "Makambu ya libanda",
    startDate: "Mokolo ya kobanda",
    endDate: "Mokolo ya kosila",
    location: "Esika",
    description: "Ndimbola",
    attendees: "Bato oyo bakoya",
    totalInvited: "Motango ya bato oyo babengami",
  },
  contacts: {
    title: "Ba contacts",
    addContact: "Bakisa contact",
    editContact: "Kobongisa contact",
    deleteContact: "Kolongola contact",
    searchContacts: "Luka ba contacts...",
  },
  templates: {
    title: "Ba modèles",
    createTemplate: "Sala modèle",
    editTemplate: "Kobongisa modèle",
    deleteTemplate: "Kolongola modèle",
  },
  admin: {
    title: "Administrateur",
    userManagement: "Boyangeli ya ba usagers",
    systemSettings: "Ba paramètres ya système",
    paymentSettings: "Ba paramètres ya kofuta",
  },
  user: {
    profile: "Profil",
    editProfile: "Kobongisa profil",
    changePassword: "Changer mot de passe",
    logout: "Kobima",
  },
  payment: {
    title: "Kofuta",
    paymentMethods: "Biloko ya kofuta",
    localPayments: "Kofuta ya esika",
  },
  error: {
    notFound: "Emonani te",
    unauthorized: "Ozali na ndingisa te",
    serverError: "Likambo esalemaki malamu te na serveur",
  },
  teams: {
    title: "Bituluku",
    createTeam: "Sala etuluku",
    editTeam: "Kobongisa etuluku",
    deleteTeam: "Kolongola etuluku",
  },
  superAdmin: {
    title: "Super Admin",
    manageAdmins: "Boyangeli ya ba admins",
    systemOverview: "Botali ya système",
  },
  navbar: navbarLn,
  settings: settingsLn
};
<<<<<<< HEAD

// Exports des sections principales
export const commonLn = ln.common;
export const commonCoreLn = ln.commonCore;
export const authLn = ln.auth;
export const dashboardLn = ln.dashboard;
export const eventsLn = ln.events;
export const contactsLn = ln.contacts;
export const templatesLn = ln.templates;
export const adminLn = ln.admin;
export const userLn = ln.user;
export const paymentLn = ln.payment;
export const errorLn = ln.error;
export const teamsLn = ln.teams;
export const superAdminLn = ln.superAdmin;

export default ln;
=======
>>>>>>> c00c8f8f156f339d31b6df644930a3edc51e0274
