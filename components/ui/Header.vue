<script setup lang="ts">
const userStore = useUserStore();
const { logout } = useAuth();

const handleLogout = async () => {
  await logout();
};
</script>

<template>
  <div>
    <header class="flex justify-between items-center py-[52px] pb-[60px]">
      <nuxt-link to="/">
        <img src="/logo.svg" alt="Logo Tarefas" />
      </nuxt-link>

      <div class="flex gap-14 flex-1 justify-end">
        <form class="flex-1 max-w-[535px]">
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
