import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import type { TaskItem } from "~/types/task";

export default () => {
  const { $bus } = useNuxtApp() as unknown as { $bus: Bus };
  const user = useCurrentUser();
  const db = getFirestore();
  const { SET_TASKS, SET_TASK } = useTasksStore();
  const { START_LOADING, FINISH_LOADING } = useLoadingStore();

  const createTask = async (task: TaskItem) => {
    try {
      START_LOADING();
      const taskData = {
        ...task,
        userId: user.value?.uid,
      };
      const tasksRef = await addDoc(collection(db, "tasks"), taskData);
      task.id = tasksRef.id;
      await updateDoc(doc(db, "tasks", tasksRef.id), { id: tasksRef.id });

      $bus.$emit("ui:toast", {
        message: "Task criada com sucesso!",
        show: true,
        type: "success",
      });

      SET_TASKS(task);
    } catch (error: any) {
      $bus.$emit("ui:toast", {
        message: "Erro ao criar a task",
        show: true,
        type: "danger",
      });

      throw new Error(error);
    } finally {
      FINISH_LOADING();
    }
  };

  const getTasks = async (userId: string) => {
    try {
      START_LOADING();

      const tasksCollectionRef = collection(db, "tasks");
      const q = query(tasksCollectionRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const tasks: TaskItem[] = [];

      querySnapshot.forEach((doc) => {
        const task = doc.data() as TaskItem;
        tasks.push(task);
      });

      SET_TASKS(tasks);
    } catch (error: any) {
      throw new Error(error);
    } finally {
      FINISH_LOADING();
    }
  };

  const getTaskById = async (taskId: string) => {
    try {
      START_LOADING();
      const taskCollectionRef = doc(db, "tasks", taskId);
      const taskDoc = await getDoc(taskCollectionRef);

      if (!taskDoc.exists()) {
        throw createError({
          statusMessage: "Task não encontrada",
          statusCode: 404,
        });
      }

      const taskData = taskDoc.data();

      SET_TASK(taskData);
    } catch (error: any) {
      $bus.$emit("ui:toast", {
        message: "Erro ao buscar a task",
        show: true,
        type: "danger",
      });

      throw new Error(error);
    } finally {
      FINISH_LOADING();
    }
  };

  const updateTask = async (task: TaskItem) => {
    try {
      START_LOADING();
      const taskRef = doc(db, "tasks", task.id);
      const taskDoc = await getDoc(taskRef);

      if (!taskDoc.exists()) {
        throw createError({
          statusMessage: "Falha ao atualizar a task",
          statusCode: 400,
        });
      }

      const dbTask = taskDoc.data();

      const mergeTask = {
        ...dbTask,
        ...task,
      };

      await updateDoc(taskRef, mergeTask);
      SET_TASKS(mergeTask);
    } catch (error) {
    } finally {
      FINISH_LOADING();
    }
  };
  const deleteTask = async (taskId: string) => {
    try {
      START_LOADING();
      const taskRef = doc(db, "tasks", taskId);
      const taskDoc = await getDoc(taskRef);

      if (!taskDoc.exists()) {
        throw createError({
          statusMessage: "Falha ao encontrar a task",
          statusCode: 404,
        });
      }

      await deleteDoc(taskRef);

      $bus.$emit("ui:toast", {
        message: "Task excluida com sucesso!",
        show: true,
        type: "success",
      });
    } catch (error: any) {
      $bus.$emit("ui:toast", {
        message: "Falha ao deletar a task",
        show: true,
        type: "danger",
      });

      throw new Error(error);
    } finally {
      FINISH_LOADING();
    }
  };

  return {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
  };
};
