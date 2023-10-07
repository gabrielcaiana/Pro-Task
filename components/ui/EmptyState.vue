<template>
  <client-only>
    <Vue3Lottie :animation-data="animationEmptyState" :width="350" />

    <div class="text-center">
      <h5 class="text-3xl text-neutral-800">
        <slot name="title" />
      </h5>
      <div class="text-medium text-neutral-400 mt-1 mb-4">
        <slot name="subtitle" />
      </div>
      <slot />

      <slot name="action" />
    </div>
  </client-only>
</template>

<script setup lang="ts">
import animationEmptyState from "~/assets/animations/empty-state.json";
</script>
