<script setup lang="ts">
const { logout } = useAuth();

const handleLogout = async () => {
  await logout();
};

const user = useCurrentUser();
</script>

<template>
  <div>
    <header class="flex justify-between items-center py-[52px] pb-[60px]">
      <nuxt-link to="/">
        <img src="/logo.svg" alt="Logo Tarefas" />
      </nuxt-link>

      <div
        v-if="user"
        id="dropdownDefaultButton"
        class="flex gap-4 items-center cursor-pointer"
        data-dropdown-toggle="dropdown"
      >
        <span class="text-sm text-neutral-700">{{ user.displayName }}</span>
        <img
          class="w-8 h-8 rounded-full"
          :src="user.photoURL!"
          alt="Rounded avatar"
        />
      </div>

      <!-- Dropdown menu -->
      <div
        id="dropdown"
        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          class="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <a
              href="#"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >Perfil</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              @click="handleLogout"
              >Sair</a
            >
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>