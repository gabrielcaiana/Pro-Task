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
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { IAuthentication } from "~/types/authentication";

export default () => {
  const db = getFirestore();
  const router = useRouter();
  const { $bus } = useNuxtApp() as unknown as { $bus: Bus };
  const { START_LOADING, FINISH_LOADING } = useLoadingStore();

  const signIn = async (model: IAuthentication) => {
    try {
      START_LOADING();
      const data = await signInWithEmailAndPassword(
        getAuth(),
        model.email,
        model.password,
      );

      if (data.user) {
        router.push("/");
      }
    } catch (error: any) {
      $bus.$emit("ui:toast", {
        message: "Houve um erro ao fazer login.",
        show: true,
      });
    } finally {
      FINISH_LOADING();
    }
  };

  const signInWithProvider = async (typeProvider: string) => {
    try {
      START_LOADING();

      const provider =
        typeProvider === "google"
          ? new GoogleAuthProvider()
          : new GithubAuthProvider();

      const result = await signInWithPopup(getAuth(), provider);
      if (result) router.push("/");
    } catch (error: any) {
      const parsedError = error.message.replace("Firebase: ", "");
      const userExists = parsedError.includes(
        "auth/account-exists-with-different-credential",
      );
      const message = userExists
        ? "Este email já está em uso."
        : "Houve um erro ao criar a conta.";

      $bus.$emit("ui:toast", {
        message,
        show: true,
      });
    } finally {
      FINISH_LOADING();
    }
  };

  const signUp = async (model: IAuthentication) => {
    try {
      START_LOADING();
      const data = await createUserWithEmailAndPassword(
        getAuth(),
        model.email,
        model.password,
      );

      if (data.user.uid) {
        await setDoc(doc(db, "users", data.user.uid), {
          name: model.name,
          email: model.email,
        });

        // TODO: create variant to toast
        setTimeout(() => {
          $bus.$emit("ui:toast", {
            message: "Conta criada com sucesso!",
            show: true,
          });
        }, 500);

        router.push("/");
      }
    } catch (error: any) {
      const parsedError = error.message.replace("Firebase: ", "");
      const userExists = parsedError.includes("auth/email-already-in-use");
      const message = userExists
        ? "Este email já está em uso."
        : "Houve um erro ao criar a conta.";

      $bus.$emit("ui:toast", {
        message,
        show: true,
      });
    } finally {
      FINISH_LOADING();
    }
  };

  const logout = async () => {
    try {
      START_LOADING();
      await signOut(getAuth());
      router.push("/auth");
    } catch (error: any) {
      throw new Error(error);
    } finally {
      FINISH_LOADING();
    }
  };

  const resetPassword = async (email: string) => {
    try {
      START_LOADING();
      await sendPasswordResetEmail(getAuth(), email);
      $bus.$emit("auth:form", { page: "signIn" });

      setTimeout(() => {
        $bus.$emit("ui:toast", {
          message: "Email enviado com sucesso!",
          show: true,
        });
      }, 500);
    } catch (error) {
      $bus.$emit("ui:toast", {
        message: "Houve um erro ao resetar a senha.",
        show: true,
      });
    } finally {
      FINISH_LOADING();
    }
  };

  return {
    signIn,
    signInWithProvider,
    signUp,
    logout,
    resetPassword,
  };
};
