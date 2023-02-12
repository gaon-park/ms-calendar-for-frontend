import { atom } from "recoil";

export const isAuthenticated = atom<boolean>({
  key: "isAuthenticated",
  default: false,
});
