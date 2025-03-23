<template>
  <div>Ooops example Honeybadger notify</div>
</template>

<script setup>
const honeybadger = useNuxtApp().$honeybadger;

const dispatchError = () => {
  const error = new Error("Page not found");
  honeybadger.notify(error, {
    name: error.name || "Error",
    message: error.message,
    stack: error.stack,
    context: {},
    severity: "error",
    tags: ["404", "example"],
    breadcrumbs: [
      {
        category: "example",
        message: "Ooops example Honeybadger notify",
        metadata: {},
      },
    ],
    user: {},
  });
};

onMounted(() => {
  dispatchError();
});
</script>
