import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('Logged in successfully');
    } catch (error) {
      toast.error('Google login failed');
    }
  }, []);

  const loginWithEmail = useCallback(async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful');
    } catch (error) {
      toast.error('Invalid email or password');
      return null;
    }
  }, []);

  const signup = useCallback(async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created successfully');
    } catch (error) {
      toast.error('Signup failed');
      return null;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      toast.success('Logged out');
    } catch (error) {
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};