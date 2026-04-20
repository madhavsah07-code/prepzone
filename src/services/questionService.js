import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import toast from 'react-hot-toast';

export const addQuestion = async (uid, data) => {
  try {
    const enrichedData = { ...data, uid, createdAt: new Date().toISOString() };
    const docRef = await addDoc(collection(db, `users/${uid}/questions`), enrichedData);
    return { id: docRef.id, ...enrichedData };
  } catch (error) {
    toast.error('Failed to add question');
    return null;
  }
};

export const getQuestions = async (uid) => {
  try {
    const q = query(collection(db, `users/${uid}/questions`), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error('Failed to fetch questions');
    return null;
  }
};

export const updateQuestion = async (id, data) => {
  try {
    const questionRef = doc(db, `users/${data.uid}/questions`, id);
    await updateDoc(questionRef, data);
    return { id };
  } catch (error) {
    toast.error('Failed to update question');
    return null;
  }
};

export const deleteQuestion = async (id) => {
  try {
    await deleteDoc(doc(db, `users/${id.split('_')[0]}/questions`, id));
    return id;
  } catch (error) {
    toast.error('Failed to delete question');
    return null;
  }
};