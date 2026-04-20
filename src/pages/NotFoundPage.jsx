

import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100">
      
      {/* Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* 404 Text */}
        <h1 className="text-7xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          404
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>

        {/* Button */}
        <Button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3"
        >
          Go to Dashboard
        </Button>

      </div>
    </div>
  );
};

export default NotFoundPage;