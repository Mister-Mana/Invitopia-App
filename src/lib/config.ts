
// Environment variables in Vite are exposed through import.meta.env
// We'll create a config object that reads from these with fallbacks

interface Config {
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
  };
  defaultLanguage: string;
  defaultTheme: 'light' | 'dark' | 'system';
}

// These values will be replaced by actual environment variables in production
// For development, we can use placeholders
const config: Config = {
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'placeholder-api-key',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'placeholder-auth-domain',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'placeholder-project-id',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'placeholder-storage-bucket',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'placeholder-messaging-sender-id',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || 'placeholder-app-id',
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  },
  defaultLanguage: import.meta.env.VITE_DEFAULT_LANGUAGE || 'fr',
  defaultTheme: (import.meta.env.VITE_DEFAULT_THEME as 'light' | 'dark' | 'system') || 'system',
};

export default config;
