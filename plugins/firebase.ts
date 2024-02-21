import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export interface Auth {
  GoogleAuthProvider: typeof GoogleAuthProvider;
  GithubAuthProvider: typeof GithubAuthProvider;
  getAuth: typeof getAuth;
  signInWithPopup: typeof signInWithPopup;
  signInWithEmailAndPassword: typeof signInWithEmailAndPassword;
  signOut: typeof signOut;
  createUserWithEmailAndPassword: typeof createUserWithEmailAndPassword;
  sendPasswordResetEmail: typeof sendPasswordResetEmail;

}

export default defineNuxtPlugin((nuxtApp) => {
  const auth: Auth = {
    GoogleAuthProvider,
    GithubAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
  }

  return {
    provide: { auth }
  }
})
