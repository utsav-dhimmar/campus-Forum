import type { IUser } from "../index.ts";

export type UserCreate = Pick<IUser, "username" | "email" | "password">;

export type UserCreateResponse = Omit<IUser, "password" | "refreshToken">;

export type UserLogin = Pick<IUser, "email" | "password">;

export type UserLoginResponse = UserCreateResponse;

export type UserProfileResponse = Omit<IUser, "password" | "refreshToken">;
