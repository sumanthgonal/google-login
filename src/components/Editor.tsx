import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, Heading, List, Save } from 'lucide-react';
import { useState } from 'react';
import { saveToDrive } from '../services/driveService';
import { useAuth } from '../context/AuthContext';

interface EditorProps {
  initialContent?: string;
  documentId?: string;
}

const Editor: React.FC<EditorProps> = ({ initialContent = '<p>Start writing your letter here...</p>', documentId }) => {
  const [title, setTitle] = useState('Untitled Letter');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const { currentUser, getToken } = useAuth();

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none p-4 min-h-[500px]',
      },
    },
  });

  const handleSave = async () => {
    if (!editor || !currentUser) return;
    
    setSaving(true);
    setSaveMessage('');
    
    try {
      const token = await getToken();
      if (!token) throw new Error('Authentication token not available');
      
      const content = editor.getHTML();
      const response = await saveToDrive(title, content, token, documentId);
      
      setSaveMessage(`Document saved to Google Drive: ${response.name}`);
    } catch (error) {
      console.error('Error saving document:', error);
      setSaveMessage('Error saving document. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="border rounded-lg shadow-sm bg-white">
      <div className="border-b p-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-xl font-bold border-none focus:outline-none"
          placeholder="Document Title"
        />
      </div>
      
      <div className="border-b p-2 flex gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
          title="Heading"
        >
          <Heading size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <div className="ml-auto">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            <Save size={18} />
            {saving ? 'Saving...' : 'Save to Drive'}
          </button>
        </div>
      </div>
      
      <EditorContent editor={editor} />
      
      {saveMessage && (
        <div className="p-2 text-sm text-center">
          {saveMessage}
        </div>
      )}
    </div>
  );
};

export default Editor;