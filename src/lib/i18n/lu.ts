<<<<<<< HEAD
=======

>>>>>>> c00c8f8f156f339d31b6df644930a3edc51e0274
import { Resource } from './index';
import { navbarLu } from './lu/navbar';
import { settingsLu } from './lu/settings';

<<<<<<< HEAD
const lu = {
  common: {
    welcomeMessage: "Bikwetu ku Invitopia",
    createEvent: "Tungila Tshikondo",
    dashboard: "Tablo ya buloba",
    login: "Buela",
    signup: "Funda",
    logout: "Patsika",
    save: "Lama",
    cancel: "Hita",
    confirm: "Shindika",
    delete: "Jima",
    edit: "Lungulula",
    view: "Tangila",
    back: "Alukila",
    next: "Tshia ku mpala",
    previous: "Tshia pakunyi",
    loading: "Kukola...",
    search: "Kenza...",
    noResults: "Kakuena bintu",
    error: "Kudi cilema",
    success: "Mudimu wenza bimpe",
    account: "Konti",
    events: {
      title: "Bikondo",
      createEvent: "Tungila tshikondo",
      editEvent: "Lungulula tshikondo",
      deleteEvent: "Jima tshikondo",
      eventDetails: "Meyi a tshikondo",
      startDate: "Dituku dia kubanga",
      endDate: "Dituku dia kujika",
      location: "Muaba",
      description: "Diumvuija",
      attendees: "Bantu badi",
      totalInvited: "Bantu bonso babikila"
    },
    admin: {
      title: "Mulombodi",
      userManagement: "Dilombola dia bantu",
      systemSettings: "Malongolodi a cisumbu",
      paymentSettings: "Malongolodi a mafuta"
    },
    user: {
      profile: "Meyi ebe",
      editProfile: "Lungulula meyi ebe",
      changePassword: "Shintulula mukenji",
      logout: "Patsika"
    },
    errorMessage: {
      notFound: "Kaciena",
      unauthorized: "Kuena bukenji",
      serverError: "Cilema mu mashinyi"
    },
    teams: {
      title: "Bisumbu",
      createTeam: "Tunga cisumbu",
      editTeam: "Lungulula cisumbu",
      deleteTeam: "Jima cisumbu"
    },
    superAdmin: {
      title: "Mulombodi Munene",
      manageAdmins: "Lombola balombodi",
      systemOverview: "Ntangilu wa cisumbu"
    },
    navbar: navbarLu
  },
  commonCore: {},
=======
export default {
  common: {
    welcomeMessage: "Tukayakidi ku Invitopia",
    createEvent: "Vanga lukamba",
    dashboard: "Mesa ya nsonga",
    account: "Kompte",
    login: "Kena mukati",
    signup: "Andikisha",
    logout: "Fuma",
    save: "Bika",
    cancel: "Mana",
    confirm: "Kondama",
    delete: "Cisha",
    edit: "Shinja",
    view: "Mona",
    back: "Vukapo",
    next: "Wafuatapo",
    previous: "Watangidipo",
    loading: "Tshipakamene...",
    search: "Saka...",
    noResults: "Nkabu maresultat",
    error: "Mukinu waumbu",
    success: "Wafumine bwino",
    copy: "Kopia",
    share: "Kabila ne bantu",
    filename: "Dina dia file",
    format: "Ndenge",
    quality: "Mbote",
    low: "Panshi",
    medium: "Pa kati",
    high: "Kungulu",
    image: "Cifwani",
    print: "Tobola",
    actions: "Malu",
    undo: "Vukapo",
    redo: "Vanga kavuayi",
    action: "Malu",
    currentState: "Mukanda wa bino",
    profile: "Mulongoloshe",
    features: "Bilu binene",
    pricing: "Ntengo",
    manageContacts: "Longolosa ba contacts bebe pamo ne kuabikila ba invitations",
    teams: "Makundi",
    navigation: "Kuya ne kuya",
    accept: "Kondama",
    decline: "Mana",
    changeLanguage: "Shinya lulemi",
    selectLanguage: "Baka lulemi",
    theme: "Kamoneka",
    changeTheme: "Shinya kamoneka",
    lightMode: "Lumingu",
    darkMode: "Butubu",
    systemMode: "Bua système",
    chooseTheme: "Baka kamoneka",
    online: "Pa ligne",
    offline: "Nkabu pa ligne",
    available: "Mu uko",
    busy: "Wamushipine",
    away: "Watala",
    close: "Pindika",
    open: "Fungula",
    expand: "Balula",
    collapse: "Komina",
    show: "Tondeka",
    hide: "Sebeja",
    enable: "Leka",
    disable: "Kanga",
    activate: "Vangisha",
    deactivate: "Mana",
    today: "Lelu",
    yesterday: "Makelela",
    tomorrow: "Malavu",
    thisWeek: "Lubingu ulu",
    nextWeek: "Lubingu lufuatapo",
    thisMonth: "Mueji uu",
    nextMonth: "Mueji wafuatapo",
    notification: "Miambuluiyi",
    notifications: "Miambuluiyi",
    message: "Lukanu",
    messages: "Lukanu",
    alert: "Kanselela",
    warning: "Kanselela",
    info: "Makambu",
    required: "Wa mukolesha",
    optional: "Wa panene te",
    invalid: "Wa mubi",
    valid: "Wa dibiji",
    submit: "Tumina",
    reset: "Vangapo kavuayi",
    clear: "Pukula",
  },
>>>>>>> c00c8f8f156f339d31b6df644930a3edc51e0274
  auth: {
    login: "Kena mukati",
    signup: "Andikisha",
    forgotPassword: "Walebeleshi password?",
    resetPassword: "Vangapo password",
    logout: "Fuma",
    email: "Email",
    password: "Password",
    confirmPassword: "Kondama password",
    name: "Dina",
    phone: "Nimero ya telefone",
    code: "Code",
    sendCode: "Tumina code",
    verifyCode: "Kondama code",
    resendCode: "Tumina code kavuayi",
    changePassword: "Shinya password",
    updateProfile: "Shinya profil",
    loginWithPhone: "Kena ne telefone",
    signupWithPhone: "Andikisha ne telefone",
    logoutSuccess: "Wafumie bwino",
    loginSuccess: "Wakenie bwino",
    signupSuccess: "Waandikishie bwino",
    error: "Mukinu waumbu",
  },
  dashboard: {
    title: "Mesa ya nsonga",
    welcome: "Tukayakidi ku mesa ya nsonga",
    stats: "Miakalu",
    events: "Makamba",
    notifications: "Miambuluiyi",
    profile: "Mulongoloshe",
    settings: "Bulongeshi",
    logout: "Fuma",
  },
  events: {
    title: "Makamba",
    createEvent: "Vanga lukamba",
    editEvent: "Shinya lukamba",
    deleteEvent: "Cisha lukamba",
    eventDetails: "Makambu a lukamba",
    startDate: "Tshipanga cwa kutangisha",
    endDate: "Tshipanga cwa kumana",
    location: "Nshipo",
    description: "Dimbolulushe",
    attendees: "Badi bayaka",
    totalInvited: "Mukalu wa basumuinu",
  },
  contacts: {
    title: "Ba contacts",
    addContact: "Bakisha contact",
    editContact: "Shinya contact",
    deleteContact: "Cisha contact",
    searchContacts: "Saka ba contacts...",
  },
  templates: {
    title: "Ba modèles",
    createTemplate: "Vanga modèle",
    editTemplate: "Shinya modèle",
    deleteTemplate: "Cisha modèle",
  },
  admin: {
    title: "Mukalamba",
    userManagement: "Bulongeshi bua bakozyi",
    systemSettings: "Bulongeshi bua système",
    paymentSettings: "Bulongeshi bua kufuta",
  },
  user: {
    profile: "Mulongoloshe",
    editProfile: "Shinya mulongoloshe",
    changePassword: "Shinya password",
    logout: "Fuma",
  },
  payment: {
    title: "Kufuta",
    paymentMethods: "Njila ya kufuta",
    localPayments: "Kufuta kwa pashi",
  },
  error: {
    notFound: "Kakumonekanga",
    unauthorized: "Nkabu ne lutoshi",
    serverError: "Mukinu wa serveur",
  },
  teams: {
    title: "Makundi",
    createTeam: "Vanga mukunda",
    editTeam: "Shinya mukunda",
    deleteTeam: "Cisha mukunda",
  },
  superAdmin: {
    title: "Mukalamba mukulu",
    manageAdmins: "Longolosa bakalamba",
    systemOverview: "Mamoneka a système",
  },
  navbar: navbarLu,
<<<<<<< HEAD
  settings: settingsLu,
  rsvp: {
    title: "Mukanda wa dijinga",
    attending: "Nengalua",
    notAttending: "Tshiena mulua",
    maybe: "Pamue",
    additionalGuests: "Bantu bakuabu",
    dietaryRestrictions: "Bidia bia kupanga",
    comments: "Meyi makuabu"
  },
  stats: {
    title: "Ntangilu",
    invitationsSent: "Mikanda mituma",
    viewed: "Batangila",
    responded: "Bandamuna",
    attending: "Balua",
    notAttending: "Kabayi balua",
    pending: "Badi bangindila"
  }
};

// Exports ya bintu bionso
export const commonLu = lu.common;
export const commonCoreLu = lu.commonCore;
export const authLu = lu.auth;
export const dashboardLu = lu.dashboard;
export const eventsLu = lu.events;
export const contactsLu = lu.contacts;
export const templatesLu = lu.templates;
export const adminLu = lu.admin;
export const userLu = lu.user;
export const paymentLu = lu.payment;
export const errorLu = lu.error;
export const teamsLu = lu.teams;
export const superAdminLu = lu.superAdmin;
export const rsvpLu = lu.rsvp;
export const statsLu = lu.stats;
export const settingsLocalLu = lu.settings;

export default lu;
=======
  settings: settingsLu
};
>>>>>>> c00c8f8f156f339d31b6df644930a3edc51e0274
