import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../ui/Spinner';

export const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Spinner size="lg" /></div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};