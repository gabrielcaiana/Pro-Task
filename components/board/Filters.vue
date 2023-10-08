<script setup lang="ts">
import { initFlowbite } from "flowbite";

const boardStore = useBoardStore();

onMounted(() => {
  initFlowbite();
});

const countTasks = () => {
  return boardStore.$state.selectedBoard?.columns.reduce(
    (acc, column) => acc + column.tasks.length,
    0,
  );
};
</script>

<template>
  <div class="flex justify-between items-center w-full">
    <div class="flex items-center gap-4">
      <BoardFiltersSelectCategory />
      <span class="text-neutral">{{ `${countTasks()} tarefas no total` }}</span>
    </div>
    <BoardFiltersSelectBoard />
  </div>
</template>
