<script setup lang="ts">
const boardStore = useBoardStore();

const { getBoardById } = useBoard();

const reloadBoard = async (boardId: string) => {
  await getBoardById(boardId);
};
</script>

<template>
  <div>
    <span class="text-neutral uppercase text-xs font-bold mr-4">Projetos</span>
    <button
      id="dropdownUsersButton"
      data-dropdown-toggle="dropdownUsers"
      data-dropdown-placement="bottom"
      class="text-white bg-purple hover:bg-purple-dark focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      type="button"
    >
      {{ boardStore.$state.selectedBoard?.title }}
      <svg
        class="w-2.5 h-2.5 ml-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div id="dropdownUsers" class="z-10 hidden bg-white rounded-lg shadow w-60">
      <ul
        class="p-3 space-y-3 text-sm text-gray-700"
        aria-labelledby="dropdownRadioButton"
      >
        <li v-for="board in boardStore.$state.boards" :key="board.id">
          <div class="flex items-center">
            <input
              id="default-radio-1"
              type="radio"
              :value="board.id"
              :checked="board.id === boardStore.$state.selectedBoard?.id"
              name="default-radio"
              class="w-4 h-4 text-purple bg-gray-100 border-gray-300 focus:purple-dark"
              @click="reloadBoard(board.id!)"
            />
            <label
              for="default-radio-1"
              class="ml-2 text-sm font-medium text-gray-900"
              >{{ board.title }}</label
            >
          </div>
        </li>
      </ul>
      <span
        data-modal-target="create-board-modal"
        data-modal-toggle="create-board-modal"
        class="cursor-pointer flex items-center p-3 text-sm font-medium text-purple border-t border-gray-200 rounded-b-lg bg-gray-50"
      >
        <Icon name="tabler:layout-board-split" class="mr-2" size="20" />
        Adicionar novo board
      </span>
    </div>
  </div>
</template>
