
# Environment Variables Setup for Invitopia

This document explains how to set up environment variables for the Invitopia application without modifying the `.gitignore` file.

## Setting Up Environment Variables

1. Create a `.env.local` file in the root of your project (this file is already in `.gitignore`)
2. Copy the contents from `src/example.env.local` into your new `.env.local` file
3. Replace the placeholder values with your actual Firebase configuration and other settings

Example:
```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
...
```

## Environment Variables Used

The application uses the following environment variables:

- `VITE_FIREBASE_API_KEY`: Your Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID`: Your Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID`: Your Firebase app ID
- `VITE_FIREBASE_MEASUREMENT_ID`: Your Firebase measurement ID (optional)
- `VITE_DEFAULT_LANGUAGE`: Default language for the application (e.g., 'fr')
- `VITE_DEFAULT_THEME`: Default theme ('light', 'dark', or 'system')

## Using Environment Variables in Development

Vite automatically loads variables from `.env.local` files during development.
You can access these variables in your code using `import.meta.env.VITE_VARIABLE_NAME`.

## Using Environment Variables in Production

For production deployment, set these environment variables in your hosting platform (Vercel, Netlify, etc.)
rather than committing them to your repository.
