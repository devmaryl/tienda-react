import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB6haZGU4A1W4LVrMX8C5EU1CM5KhFILGo',
  authDomain: 'focus-store-89884.firebaseapp.com',
  projectId: 'focus-store-89884',
  storageBucket: 'focus-store-89884.firebasestorage.app',
  messagingSenderId: '320511528614',
  appId: '1:320511528614:web:88cc4f96b05793d4f26e67'
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
