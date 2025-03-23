import { defineStore } from "pinia";

export const useLoadingStore = defineStore({
  id: "loading",
  state: () => ({
    isLoading: false,
  }),
  actions: {
    START_LOADING() {
      this.isLoading = true;
    },

    FINISH_LOADING() {
      this.isLoading = false;
    },
  },
});
