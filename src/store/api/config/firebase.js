import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyDcXaS2T2bT3_VXKKDCDtW1RundsKQYRKA",
  authDomain: "my-first-project-fire.firebaseapp.com",
  databaseURL: "https://my-first-project-fire.firebaseio.com",
  projectId: "my-first-project-fire",
  storageBucket: "my-first-project-fire.appspot.com",
  messagingSenderId: "421148086449",
  appId: "1:421148086449:web:174b5830f5184c5d"
};

export default firebase.initializeApp(firebaseConfig);
