<template>
  <client-only>
    <Vue3Lottie :animation-data="animationEmptyState" :width="350" />
  </client-only>
</template>

<script setup lang="ts">
import animationEmptyState from "~/assets/animations/loading.json";
</script>
