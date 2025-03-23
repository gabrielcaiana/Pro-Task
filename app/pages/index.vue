<script setup lang="ts">
import { initFlowbite } from "flowbite";

const userStore = useUserStore();
const boardStore = useBoardStore();
const loadingStore = useLoadingStore();
const { getBoards } = useBoard();

definePageMeta({
  middleware: ["auth"],
});

watchEffect(async () => {
  if (userStore.$state.user?.id) {
    await getBoards(userStore.$state.user?.id);
  }
});

onMounted(() => {
  setTimeout(() => {
    initFlowbite();
  }, 1000);
});
</script>

<template>
  <div>
    <UiLoading v-if="loadingStore.$state.isLoading" />
    <Board v-else-if="boardStore.$state.boards?.length" />
    <div v-else>
      <UiEmptyState>
        <template #title> Você ainda não possui nenhum board </template>
        <template #subtitle>
          Clique no botão abaixo para criar um novo!
        </template>
        <template #action>
          <button
            data-modal-target="create-board-modal"
            data-modal-toggle="create-board-modal"
            type="button"
            class="focus:outline-none text-white bg-purple hover:bg-purple-dark transition-colors focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-[200px]"
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

    <BoardCreate />
  </div>
</template>
