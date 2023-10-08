import { defineStore } from "pinia";
import { IBoard } from "~/types/board";

export const useBoardStore = defineStore({
  id: "board",
  state: () => ({
    boards: null as IBoard[] | null,
    selectedBoard: null as IBoard | null,
  }),
  actions: {
    SET_BOARDS(boards: IBoard[]) {
      this.boards = boards;
    },
    SET_SELECTED_BOARD(board: IBoard) {
      this.selectedBoard = board;
    },
  },
});
