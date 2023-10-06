<script setup lang="ts">
import { getAuth, signOut } from "firebase/auth";
const router = useRouter();

const handleLogout = async () => {
  await signOut(getAuth());
  router.push("/auth");
};
</script>

<template>
  <div class="w-full min-h-screen bg-neutral-100">
    <header class="flex justify-between bg-neutral-100">
      <span>Logo</span>
      <button @click="handleLogout">Sair</button>
    </header>
    <slot />
  </div>
</template>
