<script setup lang="ts">
import { doc, getFirestore } from "firebase/firestore";

const { logout } = useAuth();

const db = getFirestore();

const user = useCurrentUser();
const dbUser = await useDocument(doc(db, "users", `${user.value?.uid}`));

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

      <div
        v-if="dbUser"
        id="dropdownDefaultButton"
        class="flex gap-4 items-center cursor-pointer"
        data-dropdown-toggle="dropdown"
      >
        <span class="text-sm text-neutral-700">{{ dbUser.name }}</span>
        <img
          class="w-8 h-8 rounded-full"
          :src="
            dbUser.photoUrl ??
            'https://www.pngmart.com/files/23/User-PNG-Image.png'
          "
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
              class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white gap-1"
              @click="handleLogout"
            >
              <Icon name="tabler:logout" size="16" />
              Sair
            </a>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>
