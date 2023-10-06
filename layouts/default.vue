<script setup lang="ts">
const { logout } = useAuth();

const handleLogout = async () => {
  await logout();
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
