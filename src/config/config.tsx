// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyAgDN5-gIwy2mCefCx_ANuXqirP2Vo7wXg',
    authDomain: 'yelogift-433a5.firebaseapp.com',
    projectId: 'yelogift-433a5',
    storageBucket: 'yelogift-433a5.appspot.com',
    messagingSenderId: '675761402604',
    appId: '1:675761402604:web:75abe71f9bfd7851aa2bc9',
    measurementId: 'G-JQHS5WBB7R',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
