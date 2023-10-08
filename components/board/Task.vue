<script setup lang="ts">
import { ref } from "vue";
import { onKeyStroke } from "@vueuse/core";
import { initFlowbite } from "flowbite";
import { ITask } from "~/types/board";

const props = defineProps<{
  task: ITask;
}>();

const emit = defineEmits<{
  (e: "delete", payload: any): void;
  (e: "updated"): void;
}>();

const userStore = useUserStore();

const focused = ref(false);

onKeyStroke("Backspace", (_e) => {
  if (focused.value) emit("delete", props.task.id);
});

const deleteTask = () => {
  emit("delete", props.task.id);
};

onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <div :title="new Date(task.createdAt).toLocaleDateString()">
    <div
      tabindex="0"
      class="flex-col mt-4 p-5 mb-2 min-h-[177px] font-medium text-lg bg-neutral-100 rounded-[16px] flex gap-2 focus:border focus:border-zinc-200 drag-handle cursor-move"
      @focus="focused = true"
      @blur="focused = false"
    >
      <header class="flex items-center justify-between mb-2">
        <div data-tooltip-target="tooltip-tag" data-tooltip-placement="bottom">
          <span
            class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
            >Baixa</span
          >

          <div
            id="tooltip-tag"
            role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-[9px] shadow-sm opacity-0 tooltip border border-neutral-350"
          >
            Alterar tag
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>

        <div
          data-tooltip-target="tooltip-delete"
          data-tooltip-placement="bottom"
        >
          <Icon
            name="tabler:dots"
            class="cursor-pointer text-neutral-800"
            @click="deleteTask"
          />

          <div
            id="tooltip-delete"
            role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-[9px] shadow-sm opacity-0 tooltip border border-neutral-350"
          >
            Excluir tarefa
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </header>

      <main class="flex flex-col w-full">
        <textarea
          class="text-neutral-800 text-lg border-none resize-none p-0 focus:ring-0 max-w-[300px] h-[2rem] max-h-[9rem]"
          :value="task.title"
          rows="3"
          @change="emit('updated')"
        />

        <textarea
          class="border-none resize-none text-xs text-neutral p-0 focus:ring-0 h-[3rem] max-h-[9rem]"
          placeholder="Adicione uma descrição+ "
          :value="task.description"
          rows="3"
          @change="emit('updated')"
        />
      </main>

      <footer class="flex justify-between items-center">
        <div
          class="flex gap-2 -space-x-4 cursor-pointer"
          data-tooltip-target="tooltip-accountable"
          data-tooltip-placement="bottom"
        >
          <img
            class="w-6 h-6 border-2 border-white rounded-full dark:border-gray-800"
            :src="
              userStore.$state.user.photoUrl ??
              'https://www.pngmart.com/files/23/User-PNG-Image.png'
            "
            :alt="userStore.$state.user.name"
          />

          <div
            id="tooltip-accountable"
            role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-[9px] shadow-sm opacity-0 tooltip border border-neutral-350"
          >
            {{ userStore.$state.user.name }}
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>

        <!-- TODO: change file icon-->
        <!-- TODO: check if this exists -->
        <!-- <div class="flex items-center gap-1">
          <Icon name="tabler:file-horizontal" class="text-neutral" />
          <span class="text-xs text-neutral">10 arquivos</span>
        </div> -->
      </footer>
    </div>
  </div>
</template>

<style lang="pcss">
.sortable-drag .task {
  @apply rotate-6;
}

.sortable-ghost .task {
  @apply relative;
}

.sortable-ghost .task::after {
  @apply content-[''] absolute top-0 bottom-0 left-0 right-0 bg-purple-light border-2 rounded-[10px] border-dotted border-purple;
}
</style>
