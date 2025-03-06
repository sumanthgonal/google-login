import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Check if environment variables are loaded
console.log('Environment variables loaded:', {
  firebaseApiKeyExists: !!import.meta.env.VITE_FIREBASE_API_KEY,
  firebaseAuthDomainExists: !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  firebaseProjectIdExists: !!import.meta.env.VITE_FIREBASE_PROJECT_ID
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);