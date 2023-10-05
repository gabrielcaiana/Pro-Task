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
