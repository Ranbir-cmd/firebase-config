import {initializeApp} from 'firebase/app'
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA0Byg7gECHkAsdVVEmrPlq_WTqXApNbWg",
    authDomain: "fir-intro-7622.firebaseapp.com",
    projectId: "fir-intro-7622",
    storageBucket: "fir-intro-7622.appspot.com",
    messagingSenderId: "260301924588",
    appId: "1:260301924588:web:5828d7b11db65894a59dc9"
  };

  const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);