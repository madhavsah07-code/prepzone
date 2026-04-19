import { createContext, useState, useEffect } from 'react';
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

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, loginWithEmail, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};