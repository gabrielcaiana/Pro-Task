<script setup lang="ts">
useHead({
  titleTemplate: () => "Gerenciador de tarefas",
  htmlAttrs: {
    lang: "pt-br",
  },
});
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
