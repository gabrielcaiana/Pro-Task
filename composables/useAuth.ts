import { useUserStore } from "~/stores/user";

export default () => {
  const { $auth, $firebase } = useNuxtApp();
  const { $bus } = useNuxtApp() as unknown as { $bus: Bus };

  const user = useCurrentUser();
  const db = $firebase.getFirestore();
  const router = useRouter();
  const { START_LOADING, FINISH_LOADING } = useLoadingStore();
  const { SET_USER } = useUserStore();

  const honeybadger = useNuxtApp().$honeybadger;

  const signIn = async (model: IAuthentication) => {
    try {
      START_LOADING();
      const data = await $auth.signInWithEmailAndPassword(
        $auth.getAuth(),
        model.email,
        model.password,
      );

      if (data.user) {
        await getDbUser();
        router.push("/");
      }
    } catch (error: any) {
      $bus.$emit("ui:toast", {
        message: "Houve um erro ao fazer login.",
        show: true,
        type: "danger",
      });

      honeybadger.notify(error, {
        name: error.name || "Error",
        message: error.message,
        stack: error.stack,
        context: {
          email: model.email,
        },
        severity: "error",
        tags: ["auth", "user"],
        breadcrumbs: [
          {
            category: "auth",
            message: "User authentication error",
            metadata: {
              email: model.email,
            },
          },
        ],
        user: {
          email: model.email,
        },
        // request: {
        //   url: window.location.href,
        //   component: "useAuth",
        //   action: "login",
        // },
        // environment: {
        //   browser: navigator.userAgent,
        //   platform: navigator.platform,
        // },
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
          ? new $auth.GoogleAuthProvider()
          : new $auth.GithubAuthProvider();

      const data = await $auth.signInWithPopup($auth.getAuth(), provider);
      if (data) {
        await $firebase.setDoc($firebase.doc(db, "users", data.user.uid), {
          id: data.user.uid,
          name: data.user.displayName,
          email: data.user.email,
          photoUrl: data.user.photoURL,
          createdAt: new Date(),
          providerId: data.user.providerData[0].providerId,
        });

        await getDbUser();

        router.push("/");
      }
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
        type: "danger",
      });

      honeybadger.notify(error, {
        name: error.name || "Error",
        message: error.message,
        stack: error.stack,
        context: {},
        severity: "error",
        tags: ["auth", "user"],
        breadcrumbs: [
          {
            category: "auth",
            message: "User authentication error",
            metadata: {},
          },
        ],
        user: {}
      });
    } finally {
      FINISH_LOADING();
    }
  };

  const signUp = async (model: IAuthentication) => {
    try {
      START_LOADING();
      const data = await $auth.createUserWithEmailAndPassword(
        $auth.getAuth(),
        model.email,
        model.password,
      );

      if (data.user.uid) {
        await $firebase.setDoc($firebase.doc(db, "users", data.user.uid), {
          id: data.user.uid,
          name: model.name,
          email: model.email,
          photoUrl: data.user.photoURL,
          createdAt: new Date(),
          providerId: data.user.providerId,
        });

        setTimeout(() => {
          $bus.$emit("ui:toast", {
            message: "Conta criada com sucesso!",
            show: true,
            type: "success",
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
        type: "danger",
      });

      honeybadger.notify(error, {
        name: error.name || "Error",
        message: error.message,
        stack: error.stack,
        context: {},
        severity: "error",
        tags: ["auth", "user"],
        breadcrumbs: [
          {
            category: "auth",
            message: "error creating user",
            metadata: {},
          },
        ],
        user: {}
      });
    } finally {
      FINISH_LOADING();
    }
  };

  const logout = async () => {
    try {
      START_LOADING();
      await $auth.signOut($auth.getAuth());
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
      await $auth.sendPasswordResetEmail($auth.getAuth(), email);
      $bus.$emit("auth:form", { page: "signIn" });

      setTimeout(() => {
        $bus.$emit("ui:toast", {
          message: "Email enviado com sucesso!",
          show: true,
          type: "success",
        });
      }, 500);
    } catch (error) {
      $bus.$emit("ui:toast", {
        message: "Houve um erro ao resetar a senha.",
        show: true,
        type: "danger",
      });
    } finally {
      FINISH_LOADING();
    }
  };

  const getDbUser = async () => {
    if (!user.value?.uid) return;

    try {
      START_LOADING();
      const userDocRef = $firebase.doc(db, "users", String(user.value?.uid));
      const userDocSnapshot = await $firebase.getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        SET_USER(userData as IUser);
      } else {
        throw new Error("Usuário não encontrado");
      }
    } catch (error: any) {
      throw new Error(error);
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
    getDbUser,
  };
};
