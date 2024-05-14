import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_FIREBASE_API_KEY,
  authDomain: 'nowdoboss-6c368.firebaseapp.com',
  projectId: 'nowdoboss-6c368',
  storageBucket: 'nowdoboss-6c368.appspot.com',
  messagingSenderId: import.meta.env.VITE_REACT_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_REACT_FIREBASE_MEASUREMENT_ID,
}

firebase.initializeApp(firebaseConfig)
