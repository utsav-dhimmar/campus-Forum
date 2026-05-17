import { create } from "zustand";
import type { UserContent } from "@/context/User.context";

export interface AuthStore extends UserContent {}

export const useAuthStore = create<AuthStore>((set) => ({
  data: null,
  login: (userData) => set({ data: userData }),
  logout: () => set({ data: null }),
}));
