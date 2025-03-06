# LetterDrive - Google Drive Letter Editor

A full-stack web application that allows users to create, edit, and save letters to Google Drive.

## Features

- Google Authentication
- Rich text editor for letter creation
- Save letters directly to Google Drive
- View and manage saved letters

## Setup Instructions

### 1. Firebase Setup

1. **Create a Firebase Project**:
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup wizard
   - Enter a project name and accept the terms

2. **Enable Google Authentication**:
   - In your Firebase project, go to "Authentication" in the left sidebar
   - Click on the "Sign-in method" tab
   - Enable "Google" as a sign-in provider
   - Add your authorized domain (localhost for development)

3. **Get Firebase Configuration**:
   - Go to Project Settings (gear icon near the top of the left sidebar)
   - Scroll down to "Your apps" section
   - If you haven't added an app yet, click the web icon (</>) to add a web app
   - Register the app with a nickname (e.g., "LetterDrive Web")
   - Copy the Firebase configuration object (apiKey, authDomain, etc.)
   - Paste these values in your `.env` file

### 2. Google Cloud Project Setup

1. **Create or Select a Google Cloud Project**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select your Firebase project
   - Note: Firebase projects are also Google Cloud projects

2. **Enable Google Drive API**:
   - In the Google Cloud Console, go to "APIs & Services" > "Library"
   - Search for "Google Drive API" and select it
   - Click "Enable"

3. **Configure OAuth Consent Screen**:
   - Go to "APIs & Services" > "OAuth consent screen"
   - Select "External" user type (unless you have a Google Workspace organization)
   - Fill in the required information (App name, user support email, developer contact information)
   - Add the following scopes:
     - `https://www.googleapis.com/auth/drive.file`
   - Add test users (your Google email)
   - Complete the setup

4. **Create OAuth Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application" as the application type
   - Add authorized JavaScript origins:
     - `http://localhost:5173` (for Vite development server)
   - Add authorized redirect URIs:
     - `http://localhost:5173`
   - Click "Create"
   - Copy the Client ID and Client Secret
   - Add the Client ID to your `.env` file as `VITE_GOOGLE_CLIENT_ID`

### 3. Environment Variables

Create a `.env` file in the root of your project with the following variables:

```
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# Google API
VITE_GOOGLE_CLIENT_ID=your-client-id
VITE_GOOGLE_API_KEY=your-api-key

# Server
VITE_API_URL=http://localhost:3001
```

### 4. Running the Application

1. **Install dependencies**:
   ```
   npm install
   ```

2. **Start the development server**:
   ```
   npm run dev
   ```

3. **Start the backend server** (in a separate terminal):
   ```
   npm run server
   ```

## Production Deployment

### Frontend Deployment

1. Build the frontend:
   ```
   npm run build
   ```

2. Deploy the `dist` folder to a static hosting service like Netlify, Vercel, or Firebase Hosting.

### Backend Deployment

Deploy the `server` folder to a Node.js hosting service like Heroku, Google Cloud Run, or AWS Elastic Beanstalk.

Remember to update the environment variables in your production environment.