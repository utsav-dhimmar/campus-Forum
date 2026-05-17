import { create } from "zustand";
import type { UserContent } from "@/context/User.context";

export interface AuthStore extends UserContent {}

const getInitialData = () => {
  try {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Failed to parse userData from localStorage", error);
    return null;
  }
};

export const useAuthStore = create<AuthStore>((set) => ({
  data: getInitialData(),
  login: (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    set({ data: userData });
  },
  logout: () => {
    localStorage.removeItem("userData");
    set({ data: null });
  },
}));
