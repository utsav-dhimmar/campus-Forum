import type { IUser } from "../index.ts";

export type UserCreate = Pick<IUser, "username" | "email" | "password">;
export type UserLogin = Pick<IUser, "email" | "password">;
