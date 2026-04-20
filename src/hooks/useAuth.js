import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);

  // 🔥 Strict check
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }

  // 🔥 Optional debug (dev only)
  if (process.env.NODE_ENV === 'development') {
    if (!context.currentUser) {
      console.warn('⚠️ No user found in AuthContext');
    }
  }

  return context;
};

export default useAuth;