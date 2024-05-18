import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_FIREBASE_API_KEY,
  authDomain: 'nowdoboss.firebaseapp.com',
  projectId: 'nowdoboss',
  storageBucket: 'nowdoboss.appspot.com',
  messagingSenderId: import.meta.env.VITE_REACT_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_REACT_FIREBASE_MEASUREMENT_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
