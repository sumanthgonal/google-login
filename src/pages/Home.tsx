import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FileText, Plus } from 'lucide-react';

const Home: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Welcome to LetterDrive
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Create, edit, and save your letters directly to Google Drive
        </p>
        
        {currentUser ? (
          <div className="mt-8">
            <Link
              to="/editor"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create New Letter
            </Link>
            <Link
              to="/documents"
              className="ml-4 inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <FileText className="mr-2 h-5 w-5" />
              My Documents
            </Link>
          </div>
        ) : (
          <div className="mt-8">
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign in to Get Started
            </Link>
          </div>
        )}
      </div>
      
      <div className="mt-20">
        <h2 className="text-2xl font-extrabold text-gray-900 text-center">
          Features
        </h2>
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-center">
              <div className="bg-blue-100 rounded-full p-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Simple Editor</h3>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Write and format your letters with our easy-to-use editor
            </p>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-center">
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 11v2h10v-2H7zm5-9c-5.33 0-9.67 4.33-9.67 9.67s4.34 9.67 9.67 9.67 9.67-4.34 9.67-9.67S17.33 2 12 2zm0 17.33c-4.33 0-7.83-3.5-7.83-7.83S7.67 3.67 12 3.67s7.83 3.5 7.83 7.83-3.5 7.83-7.83 7.83z" />
                </svg>
              </div>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Google Integration</h3>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Save your letters directly to your Google Drive
            </p>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-center">
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                </svg>
              </div>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Secure Access</h3>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Your documents are secure and accessible only to you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;