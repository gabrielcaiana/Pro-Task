<script setup lang="ts">
const { createBoard } = useBoard();

const userStore = useUserStore();
const loadingStore = useLoadingStore();
const { getBoards } = useBoard();

const boardName: Ref<string> = ref("");

const handleCreateNewBoard = async () => {
  try {
    await createBoard(boardName.value);

    closeModal();

    await getBoards(userStore.$state.user?.id);

    boardName.value = "";
  } catch (error: any) {
    throw new Error(error);
  }
};

const closeModal = () => {
  const modal = document.getElementById("close-modal");
  modal?.click();
};
</script>

<template>
  <div
    id="create-board-modal"
    data-modal-target="create-board-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow">
        <button
          id="close-modal"
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
          data-modal-hide="create-board-modal"
        >
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
          <span class="sr-only">Fechar modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3 class="text-xl font-medium text-neutral-800">Criar novo board</h3>
          <span class="text-neutral-400 text-sm"
            >Preencha as informações abaixo para criar um novo board</span
          >
          <form class="space-y-6 mt-4" @submit.prevent="handleCreateNewBoard">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-neutral-400"
                >Informe o nome do board</label
              >
              <input
                id="name"
                v-model="boardName"
                type="text"
                name="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="nome do board"
                required
              />
            </div>

            <button
              type="submit"
              class="focus:outline-none text-white bg-purple hover:bg-purple-dark transition-colors focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-full"
            >
              <Icon
                v-if="loadingStore.$state.isLoading"
                name="eos-icons:bubble-loading"
                size="16"
              />
              <span v-else>Criar board</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
