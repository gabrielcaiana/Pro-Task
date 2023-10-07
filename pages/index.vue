<script setup lang="ts">
import { initFlowbite } from "flowbite";

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  setTimeout(() => {
    initFlowbite();
  }, 1000);
});
</script>

<template>
  <div>
    <Board />
  </div>
</template>
