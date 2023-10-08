import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
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
    try {
      START_LOADING();
      const boardData = {
        title,
        columns,
        userId: user.value?.uid,
      } as IBoard;

      const boardRef = await addDoc(collection(db, "boards"), boardData);

      $bus.$emit("ui:toast", {
        message: "Board criado com sucesso!",
        show: true,
      });

      SET_BOARDS([{ ...boardData, id: boardRef.id }]);
      SET_SELECTED_BOARD({ ...boardData, id: boardRef.id });
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
      const q = query(boardsCollectionRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const boards: any = [];
      querySnapshot.forEach((doc) => {
        const boardData = doc.data();
        boards.push({ ...boardData, id: doc.id });
      });

      SET_BOARDS(boards);
      SET_SELECTED_BOARD(boards[0]);
    } catch (error: any) {
      throw new Error(error);
    } finally {
      FINISH_LOADING();
    }
  };

  const getBoardById = async (boardId: string) => {
    try {
      START_LOADING();
      const boardRef = doc(db, "boards", boardId);
      const boardDoc = await getDoc(boardRef);

      if (!boardDoc.exists()) {
        throw new Error("Board não encontrado");
      }

      const boardData = boardDoc.data();

      SET_SELECTED_BOARD(boardData as IBoard);
    } catch (error: any) {
      $bus.$emit("ui:toast", {
        message: "Erro ao buscar board",
        show: true,
      });

      throw new Error(error);
    } finally {
      FINISH_LOADING();
    }
  };

  const updateBoard = async (boardId: string, updatedData: Partial<IBoard>) => {
    try {
      const boardRef = doc(db, "boards", boardId);
      const boardDoc = await getDoc(boardRef);

      if (!boardDoc.exists()) {
        throw new Error("Board não encontrado");
      }

      const currentData = boardDoc.data();
      const mergedData = {
        ...currentData,
        ...updatedData,
      };

      await updateDoc(boardRef, mergedData);

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
    getBoardById,
    updateBoard,
  };
};
