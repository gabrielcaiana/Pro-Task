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

import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";

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

export interface Firebase {
  doc: typeof doc;
  setDoc: typeof setDoc;
  getFirestore: typeof getFirestore;
  getDoc: typeof getDoc;
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

  const firebase = {
    doc,
    setDoc,
    getFirestore,
    getDoc,
  }

  return {
    provide: { auth, firebase }
  }
})
