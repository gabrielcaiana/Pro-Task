<script setup lang="ts">
const props = defineProps<{
  color?: string;
}>();

const colorClass = computed(() => {
  switch (props.color) {
    case "purple":
      return "text-purple";
    case "orange":
      return "text-orange";
    case "blue":
      return "text-blue";
  }
});
</script>

<template>
  <Icon
    class="drag-handle cursor-move"
    :class="colorClass"
    name="tabler:circle-filled"
    size="8"
  />
</template>
