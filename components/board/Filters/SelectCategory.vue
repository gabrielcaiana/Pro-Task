<script setup lang="ts">
import { initFlowbite } from "flowbite";
import { tags } from "~/constants/tags";

onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <button
    id="dropdownBgHoverButton"
    data-dropdown-toggle="dropdownBgHover"
    class="text-neutral border border-neutral focus:none focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
    type="button"
  >
    <Icon name="tabler:filter" size="16" class="text-neutral mr-2" />
    Filtro
    <svg
      class="w-2.5 h-2.5 ml-2.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </button>

  <!-- Dropdown menu -->
  <div id="dropdownBgHover" class="z-10 hidden w-34 bg-white rounded-lg shadow">
    <ul
      class="p-3 space-y-1 text-sm text-gray-700"
      aria-labelledby="dropdownBgHoverButton"
    >
      <li v-for="(tag, index) in tags" :key="index">
        <div class="flex items-center p-2 rounded hover:bg-gray-100">
          <input
            id="checkbox-item-4"
            type="checkbox"
            value=""
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span
            class="text-xs font-medium px-2.5 py-0.5 rounded ml-2"
            :class="tag.color"
            >{{ tag.title }}</span
          >
        </div>
      </li>
    </ul>
  </div>
</template>
