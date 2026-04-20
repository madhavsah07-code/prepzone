import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../ui/Spinner';

export const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100">
        <Spinner size="lg" overlay />
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};