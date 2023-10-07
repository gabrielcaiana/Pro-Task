import { defineStore } from "pinia";
import { IUser } from "~/types/authentication";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {
      id: "",
      name: "",
      email: "",
      photoUrl: "",
    } as IUser,
  }),
  actions: {
    SET_USER(user: IUser) {
      this.user = user;
    },
  },
});
