<script setup lang="ts">
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const { $bus } = useNuxtApp() as unknown as { $bus: Bus };
const router = useRouter();

interface Model {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const model: Ref<Model> = ref({
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
});

const handleSignUp = async () => {
  try {
    const data = await createUserWithEmailAndPassword(
      getAuth(),
      model.value.email,
      model.value.password,
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

const goToLogin = () => {
  $bus.$emit("auth:form", { page: "signIn" });
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
  >
    <nuxt-link
      to="/auth"
      class="flex items-center text-2xl font-semibold text-gray-900 mb-8"
      @click="goToLogin"
    >
      <img class="w-[150px] mr-2" src="/logo.svg" alt="logo" />
    </nuxt-link>
    <div
      class="w-full bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
        >
          Inscreva-se
        </h1>

        <VForm class="space-y-4 md:space-y-6" @submit="handleSignUp">
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Nome</label
            >
            <VField
              id="name"
              v-model="model.name"
              type="text"
              name="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="John Doe"
              rules="required"
            />
            <VErrorMessage name="name" class="text-red" />
          </div>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Email</label
            >
            <VField
              id="email"
              v-model="model.email"
              type="email"
              name="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@company.com"
              rules="required|email"
            />
            <VErrorMessage name="email" class="text-red" />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Senha</label
            >
            <VField
              id="password"
              v-model="model.password"
              type="password"
              name="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              rules="required|minMax:5,16"
            />
            <VErrorMessage name="password" class="text-red" />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Confirmar senha</label
            >
            <VField
              id="password"
              v-model="model.repeatPassword"
              type="password"
              name="repeatPassword"
              placeholder="Confirmar senha"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              rules="required|minMax:5,16|confirmed:password"
            />
            <VErrorMessage name="repeatPassword" class="text-red" />
          </div>
          <button
            type="submit"
            class="w-full text-white bg-purple hover:brightness-125 transition-colors focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Criar conta
          </button>
          <p class="text-sm font-light text-gray-500">
            Ir para pagina de
            <nuxt-link
              to="/auth"
              class="font-medium text-primary-600 hover:underline"
              @click="goToLogin"
              >Login</nuxt-link
            >
          </p>
        </VForm>
      </div>
    </div>
  </div>
</template>