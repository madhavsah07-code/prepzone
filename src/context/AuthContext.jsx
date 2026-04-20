import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { auth } from '../services/firebase';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  //  Google Login
  const login = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('Welcome back 👋');
    } catch {
      toast.error('Google login failed');
    }
  }, []);

  //  Email Login
  const loginWithEmail = useCallback(async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully');
      return true;
    } catch {
      toast.error('Invalid email or password');
      return false;
    }
  }, []);

  //  Signup
  const signup = useCallback(async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created 🎉');
      return true;
    } catch {
      toast.error('Signup failed');
      return false;
    }
  }, []);

  //  Logout
  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      toast.success('Logged out');
    } catch {
      toast.error('Logout failed');
    }
  }, []);

  const value = useMemo(() => ({
    currentUser,
    loading,
    login,
    loginWithEmail,
    signup,
    logout
  }), [currentUser, loading, login, loginWithEmail, signup, logout]);

  // Prevent UI flash before auth loads
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};