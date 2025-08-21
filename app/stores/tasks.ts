import { defineStore } from "pinia";
import type { TaskItem } from "~/types/task";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: null as TaskItem[] | null,
    selectedTask: null as TaskItem | null,
  }),
  actions: {
    SET_TASK(task: TaskItem) {
      this.selectedTask = task;
    },
    SET_TASKS(data: TaskItem[]) {
      if (this.tasks) {
        this.tasks.push(...data);
      } else {
        this.tasks = data;
      }
    },
  },
});
