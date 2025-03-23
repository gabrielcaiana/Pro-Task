import * as AuthFunctions from "firebase/auth";
import * as FirestoreFunctions from "firebase/firestore";

export default defineNuxtPlugin(() => {
  const auth = { ...AuthFunctions };
  const firebase = { ...FirestoreFunctions };

  return {
    provide: { auth, firebase },
  };
});
