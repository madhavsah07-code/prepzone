import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB5bRUh5eq3QoXaVTmtyOWJHMwXBh79G5o",
  authDomain: "prepzone-fba33.firebaseapp.com",
  projectId: "prepzone-fba33",
  storageBucket: "prepzone-fba33.firebasestorage.app",
  messagingSenderId: "285125855307",
  appId: "1:285125855307:web:0ca07328fc0b3bfc88e5ce"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);