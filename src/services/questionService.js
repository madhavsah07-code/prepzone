import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from './firebase';
import toast from 'react-hot-toast';

export const addQuestion = async (uid, data) => {
  try {
    const enrichedData = { ...data, uid, createdAt: new Date().toISOString() };
    const docRef = await addDoc(collection(db, 'questions'), enrichedData);
    return { id: docRef.id, ...enrichedData };
  } catch (error) {
    toast.error('Failed to add question');
    throw error;
  }
};

export const getQuestions = async (uid) => {
  try {
    const q = query(collection(db, 'questions'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    toast.error('Failed to fetch questions');
    throw error;
  }
};

export const updateQuestion = async (id, data) => {
  try {
    const questionRef = doc(db, 'questions', id);
    await updateDoc(questionRef, data);
    return { id, ...data };
  } catch (error) {
    toast.error('Failed to update question');
    throw error;
  }
};

export const deleteQuestion = async (id) => {
  try {
    await deleteDoc(doc(db, 'questions', id));
    return id;
  } catch (error) {
    toast.error('Failed to delete question');
    throw error;
  }
};