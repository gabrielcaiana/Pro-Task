<script setup lang="ts">
const { $bus } = useNuxtApp() as unknown as { $bus: Bus };

interface Model {
  name: string;
  email: string;
  password: string;
}

const model: Ref<Model> = ref({
  name: "",
  email: "",
  password: "",
});

const handleSignUp = () => {
  alert(JSON.stringify(model.value));
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

        <form class="space-y-4 md:space-y-6" @submit.prevent="handleSignUp">
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Nome</label
            >
            <input
              id="name"
              v-model="model.name"
              type="text"
              name="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="John Doe"
              required
            />
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
        </form>
      </div>
    </div>
  </div>
</template>
