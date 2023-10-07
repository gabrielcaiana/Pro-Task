import { defineStore } from "pinia";
import { IColumn } from "~/types/board";

export const useBoardStore = defineStore({
  id: "board",
  state: () => ({
    board: null as IColumn[] | null,
  }),
  actions: {
    SET_COLUMNS(board: IColumn[]) {
      this.board = board;
    },
  },
});
