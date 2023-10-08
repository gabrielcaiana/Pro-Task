import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { IBoard } from "~/types/board";
import { columns } from "~/constants/columns";

export default () => {
  const { $bus } = useNuxtApp() as unknown as { $bus: Bus };
  const user = useCurrentUser();
  const db = getFirestore();
  const { SET_BOARDS, SET_SELECTED_BOARD } = useBoardStore();
  const { START_LOADING, FINISH_LOADING } = useLoadingStore();

  const createBoard = async (title: string) => {
    const boardData = {
      id: Math.random().toString(36).substring(2, 11),
      title,
      columns,
    } as IBoard;

    try {
      START_LOADING();
      await addDoc(collection(db, "boards"), {
        ...boardData,
        userId: user.value?.uid,
      });

      $bus.$emit("ui:toast", {
        message: "Board criado com sucesso!",
        show: true,
      });

      // TODO: check if this is the best way to do this
      await getBoards(user.value?.uid as string);
    } catch (error: any) {
      $bus.$emit("ui:toast", {
        message: "Erro ao criar board",
        show: true,
      });

      throw new Error(error);
    } finally {
      FINISH_LOADING();
    }
  };

  const getBoards = async (userId: string) => {
    try {
      START_LOADING();
      const boardsCollectionRef = collection(db, "boards");
      const querySnapshot = await getDocs(
        query(boardsCollectionRef, where("userId", "==", userId)),
      );

      const boards: any = [];
      querySnapshot.forEach((doc) => {
        const boardData = doc.data();
        boards.push(boardData);
      });

      SET_BOARDS(boards);
      SET_SELECTED_BOARD(boards[0]);
    } catch (error: any) {
      throw new Error(error);
    } finally {
      FINISH_LOADING();
    }
  };

  const updateBoard = async (boardId: string, updatedData: Partial<IBoard>) => {
    try {
      const boardsCollectionRef = collection(db, "boards");
      const querySnapshot = await getDocs(boardsCollectionRef);

      let boardDocRef = null;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.id === boardId) {
          boardDocRef = doc.ref;
        }
      });

      if (!boardDocRef) {
        throw new Error("Board não encontrado");
      }

      const boardDoc = await getDoc(boardDocRef);
      const mergedData = {
        ...boardDoc.data,
        ...updatedData,
      };

      await updateDoc(boardDocRef, mergedData);

      SET_SELECTED_BOARD(mergedData as IBoard);
    } catch (error: any) {
      $bus.$emit("ui:toast", {
        message: "Erro ao atualizar o board",
        show: true,
      });

      throw new Error(error);
    }
  };

  return {
    createBoard,
    getBoards,
    updateBoard,
  };
};
