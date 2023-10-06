<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const { $bus } = useNuxtApp() as unknown as { $bus: Bus };

const currentForm = ref("signIn");
const SignIn = resolveComponent("AuthFormSignIn");
const SignUp = resolveComponent("AuthFormSignUp");

$bus.$on("auth:form", (data: { page: string }) => {
  currentForm.value = data.page;
});
</script>

<template>
  <section>
    <Transition name="layout" mode="out-in">
      <component :is="currentForm === 'signIn' ? SignIn : SignUp" />
    </Transition>
  </section>
</template>
