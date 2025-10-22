import { 
  commonEn, commonCoreEn, homeEn, pagesEn, 
  authEn, dashboardEn, eventsEn, contactsEn, 
  templatesEn, adminEn, userEn, paymentEn, errorEn, teamsEn, superAdminEn, navbarEn, createEventEn, aboutEn
} from './en';

import { 
  commonFr, commonCoreFr, homeFr, pagesFr, 
  authFr, dashboardFr, eventsFr, contactsFr, 
  templatesFr, adminFr, userFr, paymentFr, errorFr, teamsFr, superAdminFr, navbarFr, createEventFr, aboutFr
} from './fr';

import { settingsEn } from './en/settings';
import { settingsFr } from './fr/settings';
import { settingsSw } from './sw/settings';
import { settingsLn } from './ln/settings';
import { settingsKg } from './kg/settings';
import { settingsLu } from './lu/settings';

import sw from './sw';
import ln from './ln';
import kg from './kg';
import lu from './lu';

export type SupportedLanguage = 'fr' | 'en' | 'sw' | 'ln' | 'kg' | 'lu';
export type UserRole = 'super_admin' | 'admin' | 'organizer' | 'mc' | 'guest';

// Define Resource type for our translations
export interface Resource {
  [key: string]: string | Record<string, unknown>;
}

// Define the structure of our language resources
export interface LanguageResource {
  common: Resource;
  commonCore?: Resource;
  home?: Resource;
  pages?: Resource;
  auth: Resource;
  dashboard: Resource;
  events: Resource;
  contacts: Resource;
  templates: Resource;
  admin: Resource;
  user: Resource;
  payment: Resource;
  error: Resource;
  teams: Resource;
  superAdmin: Resource;
  navbar: Resource;
  settings: Resource;
  createEvent: Resource;
  about: Resource;
}

// Build complete language objects for English and French
const en: LanguageResource = {
  common: commonEn,
  commonCore: commonCoreEn,
  home: homeEn,
  pages: pagesEn,
  auth: authEn,
  dashboard: dashboardEn,
  events: eventsEn,
  contacts: contactsEn,
  templates: templatesEn,
  admin: adminEn,
  user: userEn,
  payment: paymentEn,
  error: errorEn,
  teams: teamsEn,
  superAdmin: superAdminEn,
  navbar: navbarEn,
  settings: settingsEn,
  createEvent: createEventEn,
  about: aboutEn
};

const fr: LanguageResource = {
  common: commonFr,
  commonCore: commonCoreFr,
  home: homeFr,
  pages: pagesFr,
  auth: authFr,
  dashboard: dashboardFr,
  events: eventsFr,
  contacts: contactsFr,
  templates: templatesFr,
  admin: adminFr,
  user: userFr,
  payment: paymentFr,
  error: errorFr,
  teams: teamsFr,
  superAdmin: superAdminFr,
  navbar: navbarFr,
  settings: settingsFr,
  createEvent: createEventFr,
  about: aboutFr
};

export const translations = {
  fr,
  en,
  sw,
  ln,
  kg,
  lu
};

export const languageNames = {
  fr: 'Français',
  en: 'English',
  sw: 'Kiswahili',
  ln: 'Lingala',
  kg: 'Kikongo',
  lu: 'Tshiluba'
};
