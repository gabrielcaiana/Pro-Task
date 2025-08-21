<template>
  <div>
    <!-- Header -->
    <header class="flex justify-between items-center pb-[60px] px-8">
      <!-- Filters -->
      <div class="flex items-center gap-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar tarefas..."
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-80"
          />
          <svg
            class="absolute left-3 top-[12px] w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <select
          v-model="statusFilter"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Todos os status</option>
          <option value="pending">Pendentes</option>
          <option value="completed">Completadas</option>
        </select>

        <select
          v-model="priorityFilter"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Todas as prioridades</option>
          <option value="Nova">Nova</option>
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
          <option value="Urgente">Urgente</option>
        </select>
      </div>

      <div class="flex items-center gap-4">
        <button
          class="focus:outline-none text-white bg-purple hover:bg-purple-dark transition-colors focus:ring-4 focus:ring-purple-300 font-medium rounded-lg flex text-sm px-5 py-2.5 mb-2"
          @click="showAddTask = true"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Nova Tarefa
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="px-8 pb-8">
      <!-- Tasks List -->
      <div v-if="filteredTasks.length > 0" class="space-y-4">
        <div
          v-for="task in filteredTasks"
          :key="task.id"
          class="bg-neutral-100 border rounded-[16px] p-6 hover:shadow-md transition-shadow"
          :class="{
            'border-purple-500 border-2 opacity-50': task.completed,
          }"
        >
          <div class="flex items-start gap-4">
            <!-- Checkbox -->
            <div class="flex items-center mt-1">
              <input
                :id="`task-${task.id}`"
                :checked="task.completed"
                type="checkbox"
                class="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                @change="toggleTaskStatus(task)"
              />
            </div>

            <!-- Task Content -->
            <div class="flex-1">
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                  <h3
                    :class="[
                      'text-lg font-medium text-neutral-800 mb-2',
                      { 'line-through text-gray-500': task.completed },
                    ]"
                  >
                    {{ task.title }}
                  </h3>
                  <p
                    v-if="task.description"
                    :class="[
                      'text-neutral-600',
                      { 'line-through text-gray-400': task.completed },
                    ]"
                  >
                    {{ task.description }}
                  </p>
                </div>

                <!-- Priority Tag -->
                <span
                  class="text-xs font-medium px-2.5 py-1 rounded ml-3"
                  :class="getPriorityColor(task.tag)"
                >
                  {{ task.tag }}
                </span>
              </div>

              <!-- Task Meta -->
              <div
                class="flex items-center justify-between text-sm text-neutral-500"
              >
                <span>Criada em {{ formatDate(task.createdAt) }}</span>

                <!-- Actions -->
                <div class="flex items-center gap-2">
                  <button
                    class="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    title="Editar tarefa"
                    @click="editTask(task)"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>

                  <button
                    title="Excluir tarefa"
                    class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    @click="removeTask(task.id)"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <client-only>
          <Vue3Lottie :animation-data="animationEmptyState" :width="300" />
        </client-only>
        <h3 class="text-2xl font-medium text-neutral-800 mt-6 mb-2">
          Nenhuma tarefa encontrada
        </h3>
        <p class="text-neutral-500 mb-6">
          {{
            searchQuery || statusFilter || priorityFilter
              ? "Tente ajustar os filtros ou"
              : "Comece criando sua primeira tarefa!"
          }}
        </p>
        <button
          v-if="!searchQuery && !statusFilter && !priorityFilter"
          class="focus:outline-none text-white bg-purple hover:bg-purple-dark transition-colors focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          @click="showAddTask = true"
        >
          Criar primeira tarefa
        </button>
      </div>
    </main>

    <!-- Add/Edit Task Modal -->
    <div
      v-if="showAddTask || editingTask"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeModal"
    >
      <div
        class="bg-white rounded-[16px] p-8 w-full max-w-2xl mx-4"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-neutral-800">
            {{ editingTask ? "Editar Tarefa" : "Nova Tarefa" }}
          </h2>
          <button
            class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            @click="closeModal"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveTask">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Título *
              </label>
              <input
                v-model="taskForm.title"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Digite o título da tarefa"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                v-model="taskForm.description"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Digite a descrição da tarefa (opcional)"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Prioridade
              </label>
              <select
                v-model="taskForm.tag"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Nova">Nova</option>
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
                <option value="Urgente">Urgente</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-8">
            <button
              type="button"
              class="focus:outline-none text-purple border border-bg-purple hover:border-purple transition-colors focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
              @click="closeModal"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="focus:outline-none text-white bg-purple hover:bg-purple-dark transition-colors focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            >
              {{ editingTask ? "Salvar" : "Criar" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from "nanoid";
import type { TaskItem } from "~/types/task";

defineOptions({
  name: "TaskPage",
});

definePageMeta({
  middleware: ["auth"],
});

// composable task
const { getTasks, createTask, updateTask, deleteTask } = useTask();

// Store
const tasksStore = useTasksStore();

// Animation
const animationEmptyState = ref<any>(null);

// State
const searchQuery = ref("");
const statusFilter = ref("");
const priorityFilter = ref("");
const showAddTask = ref(false);
const editingTask = ref<TaskItem | null>(null);

// Task form
const taskForm = ref<TaskItem>({
  id: "",
  title: "",
  description: "",
  tag: "Nova",
  completed: false,
  createdAt: new Date(),
});

// Computed tasks from store
const tasks = computed(() => tasksStore.getTasks);

// Computed
const filteredTasks = computed(() => {
  let filtered = tasks.value;

  // Search filter
  if (searchQuery.value) {
    filtered = filtered.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        task.description
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()),
    );
  }

  // Status filter
  if (statusFilter.value === "pending") {
    filtered = filtered.filter((task) => !task.completed);
  } else if (statusFilter.value === "completed") {
    filtered = filtered.filter((task) => task.completed);
  }

  // Priority filter
  if (priorityFilter.value) {
    filtered = filtered.filter((task) => task.tag === priorityFilter.value);
  }

  return filtered;
});

// Methods
const getPriorityColor = (tag: string) => {
  switch (tag) {
    case "Nova":
      return "bg-green-100 text-green-800";
    case "Baixa":
      return "bg-purple-100 text-purple-800";
    case "Média":
      return "bg-yellow-100 text-yellow-800";
    case "Alta":
      return "bg-red-100 text-red-800";
    case "Urgente":
      return "bg-red-800 text-white";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const toggleTaskStatus = async (task: TaskItem) => {
  task.completed = !task.completed;
  await updateTask(task);
};

const editTask = (task: TaskItem) => {
  editingTask.value = { ...task };
  taskForm.value = {
    id: task.id,
    title: task.title,
    description: task.description,
    tag: task.tag,
    completed: false,
    createdAt: task.createdAt,
    updatedAt: new Date(),
  };
  showAddTask.value = true;
};

const saveTask = async () => {
  if (editingTask.value) {
    const updatedTask = {
      ...editingTask.value,
      title: taskForm.value.title,
      description: taskForm.value.description,
      tag: taskForm.value.tag,
      updatedAt: taskForm.value.updatedAt,
    } as TaskItem;

    await updateTask(updatedTask);
  } else {
    const newTask: TaskItem = {
      id: nanoid(),
      title: taskForm.value.title,
      description: taskForm.value.description,
      tag: taskForm.value.tag,
      createdAt: new Date(),
      completed: false,
    };

    await createTask(newTask);
  }

  closeModal();
};

const removeTask = async (taskId: string) => {
  if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
    const currentTasks = tasksStore.getTasks;
    const filteredTasks = currentTasks.filter((t) => t.id !== taskId);
    tasksStore.SET_TASKS(filteredTasks);

    await deleteTask(taskId);
  }
};

const closeModal = () => {
  showAddTask.value = false;
  editingTask.value = null;
  taskForm.value = {
    id: "",
    title: "",
    description: "",
    tag: "Nova",
    completed: false,
    createdAt: new Date(),
  };
};

// Load animation on client side
onMounted(async () => {
  import("~/assets/animations/empty-state.json").then((module) => {
    animationEmptyState.value = module.default;
  });

  await getTasks();
});
</script>
