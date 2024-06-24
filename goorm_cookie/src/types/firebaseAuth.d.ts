declare module 'firebaseAuth' {
  import { Auth, GoogleAuthProvider } from 'firebase/auth';

  export const auth: Auth;
  export const provider: GoogleAuthProvider;
}
