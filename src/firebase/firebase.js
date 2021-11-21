import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig)
// On obtient la base de données firestore
export const db = getFirestore()
// On obtient le service d'authentification
export const auth = getAuth()
// On récupère le service Storage
export const storage = getStorage(firebase)
