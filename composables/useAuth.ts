import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { IAuthentication } from "~/types/authentication";

export default () => {
  const router = useRouter();
  const { $bus } = useNuxtApp() as unknown as { $bus: Bus };

  const signIn = async (model: IAuthentication) => {
    try {
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
    }
  };

  const signInWithProvider = (typeProvider: string) => {
    const provider =
      typeProvider === "google"
        ? new GoogleAuthProvider()
        : new GithubAuthProvider();

    signInWithPopup(getAuth(), provider)
      .then((result) => {
        if (result) router.push("/");
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const signUp = async (model: IAuthentication) => {
    try {
      const data = await createUserWithEmailAndPassword(
        getAuth(),
        model.email,
        model.password,
      );

      if (data.user.uid) {
        // TODO: create user in firestore
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
    }
  };

  const logout = async () => {
    await signOut(getAuth());
    router.push("/auth");
  };

  return {
    signIn,
    signInWithProvider,
    signUp,
    logout,
  };
};
