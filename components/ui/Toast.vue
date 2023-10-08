<script setup lang="ts">
const { $bus } = useNuxtApp() as unknown as { $bus: Bus };

const message: Ref<string> = ref("");
const showToast: Ref<boolean> = ref(false);

$bus.$on("ui:toast", (data) => {
  message.value = data.message;
  showToast.value = data.show;
});

const closeToast = () => {
  showToast.value = false;
};

watch(
  () => showToast.value,
  (value) => {
    if (value) {
      setTimeout(() => {
        closeToast();
      }, 3000);
    }
  },
);
</script>

<template>
  <Transition name="slide-in" mode="out-in">
    <div
      v-if="showToast"
      id="toast-danger"
      class="flex absolute right-4 top-4 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow"
      role="alert"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg"
      >
        <Icon name="tabler:circle-x-filled" size="18" />
        <span class="sr-only">Error icon</span>
      </div>
      <div class="ml-3 text-sm font-normal">{{ message }}</div>
      <button
        type="button"
        class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
        data-dismiss-target="#toast-danger"
        aria-label="Close"
        @click="closeToast"
      >
        <span class="sr-only">Close</span>
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.slide-in-enter-active {
  right: -300px;
  transition: right 0.5s;
}

.slide-in-enter-to {
  right: 1rem;
  top: 1rem;
}

.slide-in-leave-active {
  transition:
    right 0.2s,
    top 2s;
}

.slide-in-leave-to {
  right: 1rem;
  top: -100%;
}
</style>
