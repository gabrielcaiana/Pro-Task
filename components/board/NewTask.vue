<script setup lang="ts">
import { nanoid } from "nanoid";

import { ref } from "vue";
import { ITask } from "~/types/board";

const emit = defineEmits<{
  (e: "add", payload: any): void;
  (e: "end", payload: any): void;
  (e: "hidden", payload: any): void;
}>();

const focused = ref(false);
const title = ref("");

const createTask = (e: Event) => {
  e.preventDefault();

  const taskTitle = title.value.trim();

  if (!taskTitle) return;

  emit("add", {
    id: nanoid(),
    title: taskTitle,
    createdAt: new Date(),
    description: "",
    tag: "",
  } as ITask);

  title.value = "";

  emit("end", null);
  emit("hidden", null);
};
</script>

<template>
  <textarea
    v-model="title"
    :placeholder="
      !focused ? '+ Adicionar tarefa' : 'Informe o título da tarefa'
    "
    style="outlined: none !important"
    :class="[
      'p-10 border-none focus:shadow resize-none rounded bg-neutral-100 transition-colors text-zinc-500 px-2 w-full text-left cursor-pointer mt-2',
      {
        'h-7': !focused,
        'h-20': focused,
      },
    ]"
    @keydown.tab="createTask"
    @keyup.enter="createTask"
    @blur="focused = false"
    @focus="focused = true"
  />
</template>
