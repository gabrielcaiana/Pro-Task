<script setup lang="ts">
const userStore = useUserStore();
const { logout } = useAuth();

const boardStore = useBoardStore();
const { getBoardById } = useBoard();

const handleLogout = async () => {
  useResetStore();
  await logout();
};

const filteredTask: Ref<string> = ref("");
const filterActive = ref(false);

const searchTasks = () => {
  if (!boardStore.$state.selectedBoard) return [];

  const columns = boardStore.$state.selectedBoard.columns.filter((column) => {
    const tasks = column.tasks.filter((task) => {
      return task.title
        .toLowerCase()
        .includes(filteredTask.value.toLowerCase());
    });

    filterActive.value = true;
    return tasks.length > 0;
  });

  boardStore.SET_SELECTED_BOARD({
    ...boardStore.$state.selectedBoard,
    columns,
  });
};

const clearFilters = () => {
  getBoardById(String(boardStore.$state.selectedBoard?.id));
  filteredTask.value = "";
  filterActive.value = false;
};
</script>

<template>
  <div>
    <header class="flex justify-between items-center py-[52px] pb-[60px]">
      <nuxt-link to="/">
        <img src="/logo.svg" alt="Pro Task Logo" />
      </nuxt-link>

      <div class="flex flex-1 justify-end">
        <span
          v-if="filterActive"
          id="badge-dismiss-default"
          class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded"
          @click="clearFilters"
        >
          Limpar filtros
          <button
            type="button"
            class="inline-flex items-center p-1 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900"
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

        <form class="flex-1 max-w-[535px] mr-14" @submit.prevent="searchTasks">
          <div class="flex gap-4">
            <div class="relative flex-1">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <svg
                  class="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                id="default-search"
                v-model="filteredTask"
                type="search"
                class="block w-full p-4 pl-10 h-[38px] text-sm text-gray-900 border-none rounded-[6px] bg-neutral-200 focus:ring-blue-500 focus:border-blue-500 placeholder:text-neutral"
                placeholder="Buscar por uma tarefa."
                required
              />
            </div>

            <button
              type="submit"
              class="text-white bg-neutral-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 h-[38px]"
            >
              Atualizar
            </button>
          </div>
        </form>

        <div
          v-if="userStore.$state.user"
          id="dropdownDefaultButton"
          class="flex gap-4 items-center cursor-pointer"
          data-dropdown-toggle="dropdown"
        >
          <span class="text-sm text-neutral-700">{{
            userStore.$state.user.name
          }}</span>
          <img
            class="w-8 h-8 rounded-full"
            :src="
              userStore.$state.user.photoUrl ??
              'https://www.pngmart.com/files/23/User-PNG-Image.png'
            "
            alt="Rounded avatar"
          />
        </div>

        <!-- Dropdown menu -->
        <div
          id="dropdown"
          class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <ul
            class="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                href="#"
                class="flex items-center px-4 py-2 hover:bg-gray-100 gap-1"
                @click="handleLogout"
              >
                <Icon name="tabler:logout" size="16" />
                Sair
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  </div>
</template>
