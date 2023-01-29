import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCTFec_kfej4hjxEGKb7rjm7jQDeu7HWko',
  authDomain: 'bank-of-time-v1702.firebaseapp.com',
  projectId: 'bank-of-time-v1702',
  storageBucket: 'bank-of-time-v1702.appspot.com',
  messagingSenderId: '898727404911',
  appId: '1:898727404911:web:c0a074b928ffefad0bf49a',
  measurementId: 'G-BYH6FFRDCM',
}

const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
