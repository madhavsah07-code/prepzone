import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-black relative overflow-hidden">

      {/*  Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[120px] top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[300px] h-[300px] bg-orange-600/20 rounded-full blur-[120px] bottom-[-100px] right-[-100px]"></div>

      {/*  Content */}
      <div className="relative z-10 flex flex-col items-center">

        {/*  404 */}
        <h1 className="text-7xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-4">
          404
        </h1>

        {/*  Message */}
        <p className="text-lg text-gray-400 mb-6 max-w-md">
          Oops! The page you're looking for doesn't exist.
        </p>

        {/*  Button */}
        <Button
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </Button>

      </div>
    </div>
  );
};

export default NotFoundPage;