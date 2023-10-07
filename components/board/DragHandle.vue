<script setup lang="ts">
defineProps<{
  color?: string;
}>();
</script>

<template>
  <Icon
    class="drag-handle cursor-move"
    :class="`text-${color}`"
    name="tabler:circle-filled"
    size="8"
  />
</template>
