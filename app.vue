<script setup lang="ts">
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

useHead({
  titleTemplate: () => "Gerenciador de tarefas",
  htmlAttrs: {
    lang: "pt-br",
  },
});

onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.3s;
}
.layout-enter-from {
  opacity: 0;
  transform: translate(100px, 0);
}
.layout-leave-to {
  opacity: 0;
  transform: translate(-100px, 0);
}
</style>
