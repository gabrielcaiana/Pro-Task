<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const { $bus } = useNuxtApp() as unknown as { $bus: Bus };

const currentForm = ref("signIn");
const SignIn = resolveComponent("AuthFormSignIn");
const SignUp = resolveComponent("AuthFormSignUp");
const ForgotPassword = resolveComponent("AuthFormForgotPassword");

const checkForm = () => {
  switch (currentForm.value) {
    case "signIn":
      return SignIn;
    case "signUp":
      return SignUp;
    case "forgotPassword":
      return ForgotPassword;
    default:
      return SignIn;
  }
};

$bus.$on("auth:form", (data: { page: string }) => {
  currentForm.value = data.page;
});
</script>

<template>
  <section>
    <Transition name="layout" mode="out-in">
      <component :is="checkForm()" />
    </Transition>
  </section>
</template>
