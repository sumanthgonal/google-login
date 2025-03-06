import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const saveToDrive = async (
  title: string,
  content: string,
  token: string,
  documentId?: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/documents`,
      { title, content, documentId },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error saving to Drive:', error);
    throw error;
  }
};

export const fetchDocuments = async (token: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/documents`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const getDocument = async (documentId: string, token: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/documents/${documentId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
};