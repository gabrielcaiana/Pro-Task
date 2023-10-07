<script setup lang="ts">
import { initFlowbite } from "flowbite";

const boardStore = useBoardStore();
const loadingStore = useLoadingStore();
const { createBoard, getBoard } = useBoard();

definePageMeta({
  middleware: ["auth"],
});

onMounted(async () => {
  setTimeout(() => {
    initFlowbite();
  }, 1000);

  await getBoard();
});
</script>

<template>
  <div>
    <UiLoading v-if="loadingStore.$state.isLoading" />
    <Board v-else-if="boardStore.$state.board" />
    <UiEmptyState v-else>
      <template #title> Você ainda não possui nenhum board </template>
      <template #subtitle>
        Clique no botão abaixo para criar um novo!
      </template>
      <template #action>
        <button
          type="button"
          class="focus:outline-none text-white bg-purple hover:bg-purple-dark transition-colors focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-[200px]"
          @click="createBoard"
        >
          <Icon
            v-if="loadingStore.$state.isLoading"
            name="eos-icons:bubble-loading"
            size="16"
          />
          <span v-else>Criar novo board</span>
        </button>
      </template>
    </UiEmptyState>
  </div>
</template>
