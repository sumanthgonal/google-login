import { auth } from './firebase-admin.js';

// Middleware to verify Firebase ID tokens
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  
  const token = authHeader.split('Bearer ')[1];
  
  try {
    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(token);
    
    // Add the decoded token to the request
    req.user = decodedToken;
    req.token = token; // Keep the original token for Google API calls
    
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export default verifyFirebaseToken;