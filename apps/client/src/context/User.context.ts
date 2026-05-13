import type { UserRole } from "@repo/shared";

export type UserContextData = {
  _id: string | null;
  username: string | null;
  role: UserRole | null;
};

export type UserContent = {
  data: UserContextData | null;
  login: (data: UserContextData) => void;
  logout: () => void;
};
