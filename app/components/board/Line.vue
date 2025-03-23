<script setup lang="ts">
const props = defineProps<{
  color?: string;
}>();

const colorClass = computed(() => {
  switch (props.color) {
    case "purple":
      return "bg-purple";
    case "orange":
      return "bg-orange";
    case "blue":
      return "bg-blue";
  }
});
</script>

<template>
  <div class="w-full h-[3px] mt-[24px] mb-[28px]" :class="colorClass" />
</template>
