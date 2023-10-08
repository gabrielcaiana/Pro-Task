<script setup lang="ts">
import { ref } from "vue";
import { onKeyStroke } from "@vueuse/core";
import { initFlowbite } from "flowbite";
import { ITag, ITask } from "~/types/board";
import { tags } from "~/constants/tags";

const props = defineProps<{
  task: ITask;
}>();

const emit = defineEmits<{
  (e: "delete", id: string): void;
  (e: "updated", task: ITask): void;
}>();

const userStore = useUserStore();

const focused = ref(false);

const model: Ref<ITask> = ref({
  ...props.task,
});

onKeyStroke("Backspace", (_e) => {
  if (focused.value) emit("delete", props.task.id);
});

const changeTag = (tag: ITag) => {
  model.value = {
    ...model.value,
    tag: tag.title,
  };

  currentTag.value = tag;

  emit("updated", model.value);
};

const deleteTask = () => {
  emit("delete", props.task.id);
};

const currentTag: Ref<ITag> = ref(
  tags.find((tag) => tag.title === props.task.tag) ?? tags[0],
);

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
        <div :data-dropdown-toggle="`dropdown-tabs-${task.id}`">
          <span
            class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded cursor-pointer"
            :class="currentTag.color"
            >{{ currentTag.title }}</span
          >

          <div
            :id="`dropdown-tabs-${task.id}`"
            class="z-10 hidden divide-y divide-gray-100 rounded-lg w-44 bg-transparent"
          >
            <ul
              class="py-2 text-sm text-gray-700 flex flex-col gap-2 justify-center items-center"
              aria-labelledby="dropdownDefaultTags"
            >
              <li
                v-for="(t, index) in tags"
                :key="index"
                class="cursor-pointer shadow-lg"
                :data-dropdown-toggle="`dropdown-tabs-${task.id}`"
              >
                <span
                  class="text-xs font-medium px-2.5 py-0.5 rounded"
                  :class="t.color"
                  @click="changeTag(t)"
                  >{{ t.title }}</span
                >
              </li>
            </ul>
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
          v-model="model.title"
          class="text-neutral-800 text-lg border-none resize-none p-0 focus:ring-0 max-w-[300px] h-[2rem] max-h-[9rem]"
          rows="3"
          @change="emit('updated', model)"
        />

        <textarea
          v-model="model.description"
          class="border-none resize-none text-xs text-neutral p-0 focus:ring-0 h-[3rem] max-h-[9rem]"
          placeholder="Adicione uma descrição+ "
          rows="3"
          @change="emit('updated', model)"
        />
      </main>

      <footer class="flex justify-between items-center">
        <div
          class="flex gap-2 -space-x-4 cursor-pointer"
          data-tooltip-target="tooltip-accountable"
          data-tooltip-placement="bottom"
        >
          <img
            class="w-6 h-6 border-2 border-white rounded-full"
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
