import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDVJ3Piy9UQ9dRo70K91SsDJx3OyESHK1U',
  authDomain: 'trombinoscope-87642.firebaseapp.com',
  projectId: 'trombinoscope-87642',
  storageBucket: 'trombinoscope-87642.appspot.com',
  messagingSenderId: '18410977035',
  appId: '1:18410977035:web:1bed6de04bfa6dbec0540e',
}
//FIXME dotenv ne fonctionne pas?
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// }

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig)
// On obtient la base de données firestore
export const db = getFirestore()
// On obtient le service d'authentification
export const auth = getAuth()
// On récupère le service Storage
export const storage = getStorage(firebase)
