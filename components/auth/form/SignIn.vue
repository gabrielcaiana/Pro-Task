<script setup lang="ts">
const { $bus } = useNuxtApp() as unknown as { $bus: Bus };

interface Model {
  email: string;
  password: string;
}

const router = useRouter();

const model: Ref<Model> = ref({
  email: "",
  password: "",
});

const handleSignInProvider = (provider: string) => {
  alert(provider);
};

const handleSignInForm = () => {
  router.push("/");
};

const goToRegister = () => {
  $bus.$emit("auth:form", { page: "signUp" });
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
  >
    <div class="flex items-center text-2xl font-semibold text-gray-900 mb-8">
      <img class="w-[150px] mr-2" src="/logo.svg" alt="logo" />
    </div>
    <div
      class="w-full bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
        >
          Faça login em sua conta
        </h1>
        <div class="flex flex-col gap-2">
          <button
            class="w-full text-neutral border border-neutral-300 hover:bg-neutral-200 transition-colors focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center align-center gap-2"
            @click="handleSignInProvider('google')"
          >
            <Icon name="logos:google-icon" size="24" />
            Login com o Google
          </button>
          <button
            class="w-full text-neutral border border-neutral-300 hover:bg-neutral-200 transition-colors focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center align-center gap-2"
            @click="handleSignInProvider('github')"
          >
            <Icon name="logos:github-icon" size="24" />
            Login com o Github
          </button>
        </div>

        <form class="space-y-4 md:space-y-6" @submit.prevent="handleSignInForm">
          <div class="flex items-center gap-4">
            <div class="border-b border-1 border-neutral-300 w-full" />
            <span class="text-sm text-neutral-500">ou</span>
            <div class="border-b border-1 border-neutral-300 w-full" />
          </div>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Email</label
            >
            <input
              id="email"
              v-model="model.email"
              type="email"
              name="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Senha</label
            >
            <input
              id="password"
              v-model="model.password"
              type="password"
              name="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>
          <div class="flex items-center justify-end">
            <nuxt-link
              to="/auth"
              class="text-sm font-medium text-primary-600 hover:underline"
              >Esqueceu sua senha?</nuxt-link
            >
          </div>
          <button
            type="submit"
            class="w-full text-white bg-purple hover:brightness-125 transition-colors focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Entrar
          </button>
          <p class="text-sm font-light text-gray-500">
            Ainda não tem uma conta?
            <nuxt-link
              to="/auth"
              class="font-medium text-primary-600 hover:underline"
              @click="goToRegister"
              >Inscrever-se</nuxt-link
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
