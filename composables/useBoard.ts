import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import { IColumn } from "~/types/board";
import { board } from "~/constants/board";

export default () => {
  const user = useCurrentUser();
  const db = getFirestore();
  const { SET_COLUMNS } = useBoardStore();
  const { START_LOADING, FINISH_LOADING } = useLoadingStore();

  const createBoard = async () => {
    try {
      START_LOADING();
      await setDoc(doc(db, "boards", String(user.value?.uid)), {
        board,
      });

      await getBoard();
    } catch (error: any) {
      throw new Error(error);
    } finally {
      FINISH_LOADING();
    }
  };

  const getBoard = async () => {
    try {
      START_LOADING();
      const boardDocRef = doc(db, "boards", String(user.value?.uid));
      const boardDocSnapshot = await getDoc(boardDocRef);

      if (boardDocSnapshot.exists()) {
        const boardData = boardDocSnapshot.data() as { board: IColumn[] };
        SET_COLUMNS(boardData.board);
      } else {
        throw new Error("Board não encontrado");
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      FINISH_LOADING();
    }
  };

  return {
    createBoard,
    getBoard,
  };
};
