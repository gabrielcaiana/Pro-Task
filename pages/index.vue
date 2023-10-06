<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const user = useCurrentUser();
</script>

<template>
  <div class="mx-auto max-w-[1093px] h-screen">
    <pre>
      {{ user }}
    </pre>
  </div>
</template>
