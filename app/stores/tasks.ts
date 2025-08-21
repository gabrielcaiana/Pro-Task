import { defineStore } from "pinia";
import type { TaskItem } from "~/types/task";

export const useTasksStore = defineStore("tasks-store", {
  state: () => ({
    tasks: null as TaskItem[] | null,
    selectedTask: null as TaskItem | null,
  }),
  getters: {
    getTasks: (state) => state.tasks || [],
    getSelectedTask: (state) => state.selectedTask,
  },
  actions: {
    SET_TASK(task: TaskItem) {
      this.selectedTask = task;
    },
    SET_TASKS(data: TaskItem[]) {
      this.tasks = data;
    },
    ADD_TASK(task: TaskItem) {
      if (this.tasks) {
        this.tasks.push(task);
      } else {
        this.tasks = [task];
      }
    },
    UPDATE_TASK(updatedTask: TaskItem) {
      if (this.tasks) {
        const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      }
    },
    CLEAR_TASKS() {
      this.tasks = null;
    },
  },
});
