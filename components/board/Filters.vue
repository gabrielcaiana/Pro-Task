<script setup lang="ts">
import { initFlowbite } from "flowbite";
import { IColumn } from "~/types/board";

const { selectedBoard, SET_SELECTED_BOARD } = useBoardStore();

const { getBoardById } = useBoard();

const filterActive = ref(false);

const clearFilters = () => {
  getBoardById(String(selectedBoard?.id));
  filterActive.value = false;
};

const selectedCategories = (categories: string[]) => {
  if (!selectedBoard) return;

  const filteredBoard = selectedBoard.columns.map((column: IColumn) => {
    const filteredTasks = column.tasks.filter((task) => {
      return categories.includes(task.tag);
    });

    return {
      ...column,
      tasks: filteredTasks,
    };
  });

  SET_SELECTED_BOARD({
    ...selectedBoard,
    columns: filteredBoard,
  });
};

const countTasks = () => {
  return selectedBoard?.columns.reduce(
    (acc, column) => acc + column.tasks.length,
    0,
  );
};

onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <div class="flex justify-between items-center w-full">
    <div class="flex items-center gap-4">
      <BoardFiltersSelectCategory
        @categories="selectedCategories($event)"
        @is-active="filterActive = true"
      />
      <span class="text-neutral">{{ `${countTasks()} tarefas no total` }}</span>

      <span
        v-if="filterActive"
        id="badge-dismiss-default"
        class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
        @click="clearFilters"
      >
        Limpar filtros
        <button
          type="button"
          class="inline-flex items-center p-1 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
          data-dismiss-target="#badge-dismiss-default"
          aria-label="Remove"
        >
          <svg
            class="w-2 h-2"
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
          <span class="sr-only">Remover filtros</span>
        </button>
      </span>
    </div>
    <BoardFiltersSelectBoard />
  </div>
</template>
