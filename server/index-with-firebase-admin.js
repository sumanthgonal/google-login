import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import verifyFirebaseToken from './verifyToken.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create OAuth2 client
const createOAuth2Client = (token) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: token });
  return oauth2Client;
};

// Create a folder in Google Drive if it doesn't exist
const getOrCreateFolder = async (drive, folderName) => {
  try {
    // Check if folder already exists
    const response = await drive.files.list({
      q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      spaces: 'drive',
      fields: 'files(id, name)'
    });

    if (response.data.files.length > 0) {
      return response.data.files[0].id;
    }

    // Create folder if it doesn't exist
    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder'
    };

    const folder = await drive.files.create({
      resource: fileMetadata,
      fields: 'id'
    });

    return folder.data.id;
  } catch (error) {
    console.error('Error creating folder:', error);
    throw error;
  }
};

// API Routes
app.post('/api/documents', verifyFirebaseToken, async (req, res) => {
  try {
    const { title, content, documentId } = req.body;
    
    const oauth2Client = createOAuth2Client(req.token);
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    
    // Get or create the Letters folder
    const folderId = await getOrCreateFolder(drive, 'LetterDrive');
    
    // Convert HTML content to plain text for simplicity
    // In a production app, you might want to use a library to convert HTML to Google Docs format
    const plainTextContent = content.replace(/<[^>]*>?/gm, '');
    
    if (documentId) {
      // Update existing document
      await drive.files.update({
        fileId: documentId,
        requestBody: {
          name: title
        },
        media: {
          mimeType: 'text/plain',
          body: plainTextContent
        }
      });
      
      const file = await drive.files.get({
        fileId: documentId,
        fields: 'id, name, modifiedTime'
      });
      
      return res.json(file.data);
    } else {
      // Create new document
      const response = await drive.files.create({
        requestBody: {
          name: title,
          mimeType: 'application/vnd.google-apps.document',
          parents: [folderId]
        },
        media: {
          mimeType: 'text/plain',
          body: plainTextContent
        },
        fields: 'id, name, modifiedTime'
      });
      
      return res.json(response.data);
    }
  } catch (error) {
    console.error('Error saving document:', error);
    res.status(500).json({ error: 'Failed to save document' });
  }
});

app.get('/api/documents', verifyFirebaseToken, async (req, res) => {
  try {
    const oauth2Client = createOAuth2Client(req.token);
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    
    // Get the Letters folder
    const folderResponse = await drive.files.list({
      q: `name='LetterDrive' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      spaces: 'drive',
      fields: 'files(id)'
    });
    
    if (folderResponse.data.files.length === 0) {
      return res.json([]);
    }
    
    const folderId = folderResponse.data.files[0].id;
    
    // Get documents in the folder
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      spaces: 'drive',
      fields: 'files(id, name, modifiedTime)',
      orderBy: 'modifiedTime desc'
    });
    
    return res.json(response.data.files);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

app.get('/api/documents/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const oauth2Client = createOAuth2Client(req.token);
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    
    // Get document metadata
    const file = await drive.files.get({
      fileId: id,
      fields: 'id, name, modifiedTime'
    });
    
    // Get document content
    const content = await drive.files.export({
      fileId: id,
      mimeType: 'text/plain'
    });
    
    return res.json({
      ...file.data,
      content: `<p>${content.data}</p>`
    });
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ error: 'Failed to fetch document' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});