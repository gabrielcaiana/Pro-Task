import { defineNuxtPlugin } from "nuxt/app";
import vue3Lottie from "vue3-lottie";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vue3Lottie, { name: "Vue3Lottie" });
});
