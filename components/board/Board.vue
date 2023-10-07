<script setup lang="ts">
import draggable from "vuedraggable";
import { initFlowbite } from "flowbite";

const columns = ref([
  {
    id: "1",
    title: "A fazer",
    type: "todo",
    theme: "purple",
    tasks: [],
  },
  {
    id: "2",
    title: "Em andamento",
    type: "doing",
    theme: "orange",
    tasks: [],
  },
  {
    id: "3",
    title: "Feito",
    type: "done",
    theme: "blue",
    tasks: [],
  },
]);

const alt = useKeyModifier("Alt");

const showNewTask: Ref<boolean> = ref(false);

const deleteTask = (id: string): void => {
  columns.value.forEach((column: any) => {
    const taskIndex = column.tasks.findIndex((task: any) => task.id === id);
    if (taskIndex !== -1) {
      column.tasks.splice(taskIndex, 1);
    }
  });
};

onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <div class="flex items-start gap-4 overflow-x-auto">
    <draggable
      v-model="columns"
      group="columns"
      item-key="id"
      class="flex gap-4 items-start"
      :animation="150"
      handle=".drag-handle"
    >
      <template #item="{ element: column }: { element: any }">
        <div
          class="column bg-neutral-200 p-5 rounded-2xl min-w-[355px] min-h-[600px]"
        >
          <header class="flex items-center justify-between">
            <div class="flex items-center">
              <BoardDragHandle :color="column.theme" />
              <span class="text-neutral-800 text-medium text-base ml-2">{{
                column.title
              }}</span>
              <span
                class="inline-flex ml-2 items-center justify-center w-5 h-5 text-xs text-neutral-400 bg-neutral-300 rounded-full"
              >
                {{ column.tasks.length }}
              </span>
            </div>
            <div
              v-if="column.type === 'todo'"
              data-tooltip-target="tooltip-add"
              data-tooltip-placement="bottom"
              class="w-[20px] h-[20px] rounded-md flex items-center justify-center cursor-pointer bg-purple/20"
              @click="showNewTask = !showNewTask"
            >
              <Icon name="tabler:plus" class="text-purple" />

              <div
                id="tooltip-add"
                role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-[9px] shadow-sm opacity-0 tooltip border border-neutral-350"
              >
                Adicionar nova
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </header>
          <div
            class="w-full h-[3px] mt-[24px] mb-[28px]"
            :class="`bg-${column.theme}`"
          />
          <draggable
            v-model="column.tasks"
            :group="{ name: ' tasks', pull: alt ? 'clone' : true }"
            item-key="id"
            :animation="150"
            handle=".drag-handle"
          >
            <template #item="{ element: task }: { element: any }">
              <div>
                <BoardTask
                  class="task"
                  :task="task"
                  @delete="deleteTask($event)"
                />
              </div>
            </template>
          </draggable>
          <footer v-if="column.type === 'todo' && showNewTask">
            <BoardNewTask
              @add="column.tasks.push($event)"
              @end="showNewTask = false"
            />
          </footer>
        </div>
      </template>
    </draggable>
  </div>
</template>
