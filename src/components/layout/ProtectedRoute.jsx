import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../ui/Spinner';

export const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();

  //  Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Spinner size="lg" />
      </div>
    );
  }

  //  Not Logged In
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  //  Allowed
  return <Outlet />;
};