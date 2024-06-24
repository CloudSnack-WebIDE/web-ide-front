import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCMeW-S4fK0-wltthFv3jKZzX5XMKWyOrw',
  authDomain: 'project-web-ide.firebaseapp.com',
  projectId: 'project-web-ide',
  storageBucket: 'project-web-ide.appspot.com',
  messagingSenderId: '204213447100',
  appId: '1:204213447100:web:e0e31045a90647c690a3b9',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
