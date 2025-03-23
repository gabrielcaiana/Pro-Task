<script setup lang="ts">
import draggable from "vuedraggable";
import { initFlowbite } from "flowbite";
import type { IBoard, IColumn, ITask } from "~/types/board";

const boardStore = useBoardStore();
const { updateBoard } = useBoard();

const alt = useKeyModifier("Alt");

const showNewTask: Ref<boolean> = ref(false);

const debouncedFn = useDebounceFn((func) => func(), 1000);

const changedBoard = (task: ITask | null = null) => {
  if (boardStore.$state.selectedBoard) {
    let payload: IBoard = boardStore.$state.selectedBoard;

    if (task) {
      const newTasks = boardStore.$state.selectedBoard?.columns.map(
        (column: IColumn) => {
          return {
            ...column,
            tasks: column.tasks.map((t: ITask) => {
              if (t.id === task.id) {
                return task;
              }
              return t;
            }),
          };
        },
      );

      payload = {
        ...boardStore.$state.selectedBoard,
        columns: newTasks,
      };
    }

    updateBoard(String(boardStore.$state.selectedBoard.id), payload);
  }
};

const deleteTask = (id: string): void => {
  boardStore.$state.selectedBoard?.columns.forEach((column: any) => {
    const taskIndex = column.tasks.findIndex((task: any) => task.id === id);
    if (taskIndex !== -1) {
      column.tasks.splice(taskIndex, 1);
      debouncedFn(changedBoard);
    }
  });
};

onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <div
    v-if="boardStore.$state.selectedBoard"
    class="flex flex-col items-start gap-4 overflow-x-auto md:overflow-x-hidden mb-10"
  >
    <BoardFilters />
    <draggable
      v-model="boardStore.$state.selectedBoard.columns"
      group="columns"
      item-key="id"
      class="flex gap-4 items-stretch"
      :animation="150"
      handle=".drag-handle"
      @update="debouncedFn(changedBoard)"
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

          <BoardLine :color="column.theme" />

          <div v-if="column.type === 'todo' && showNewTask">
            <BoardNewTask
              @add="column.tasks.push($event)"
              @end="debouncedFn(changedBoard)"
              @hidden="showNewTask = !showNewTask"
            />
          </div>

          <draggable
            v-model="column.tasks"
            :group="{ name: ' tasks', pull: alt ? 'clone' : true }"
            item-key="id"
            :animation="150"
            handle=".drag-handle"
            @update="debouncedFn(changedBoard)"
            @add="debouncedFn(changedBoard)"
          >
            <template #item="{ element: task }: { element: any }">
              <div>
                <BoardTask
                  class="task"
                  :task="task"
                  @delete="deleteTask($event)"
                  @updated="changedBoard($event)"
                />
              </div>
            </template>
          </draggable>
        </div>
      </template>
    </draggable>
  </div>
</template>
