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
