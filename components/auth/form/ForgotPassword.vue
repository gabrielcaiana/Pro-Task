<script setup lang="ts">
const { $bus } = useNuxtApp() as unknown as { $bus: Bus };

const { resetPassword } = useAuth();

const email: Ref<string> = ref("");

const forgotPassword = async () => {
  await resetPassword(email.value);
};

const goToLogin = () => {
  $bus.$emit("auth:form", { page: "signIn" });
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
          Informe seu email para recuperar a senha
        </h1>

        <VForm class="space-y-4 md:space-y-6" @submit="forgotPassword">
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
            <VField
              id="email"
              v-model="email"
              type="email"
              name="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="johndoe@email.com"
              rules="required|email"
            />
            <VErrorMessage name="email" class="text-red" />
          </div>
          <button
            type="submit"
            class="w-full text-white bg-purple hover:brightness-125 transition-colors focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Recuperar senha
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
