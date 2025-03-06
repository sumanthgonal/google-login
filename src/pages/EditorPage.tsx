import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '../components/Editor';
import { useAuth } from '../context/AuthContext';
import { getDocument } from '../services/driveService';

const EditorPage: React.FC = () => {
  const { documentId } = useParams<{ documentId?: string }>();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(documentId ? true : false);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchDocument = async () => {
      if (!documentId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const token = await getToken();
        if (!token) throw new Error('Authentication token not available');
        
        const doc = await getDocument(documentId, token);
        setContent(doc.content);
      } catch (err) {
        console.error('Error fetching document:', err);
        setError('Failed to load document. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [documentId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Editor 
        initialContent={content || undefined} 
        documentId={documentId}
      />
    </div>
  );
};

export default EditorPage;