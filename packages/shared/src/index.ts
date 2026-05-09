export type UserRole = "USER" | "ADMIN" | "MODERATOR";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  department?: string;
  role: UserRole;
  password?: string;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPost {
  _id: string;
  body: string;
  authorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAnswer {
  _id: string;
  authorId: string;
  postId: string;
  content: string;
  isDeleted: boolean;
  deletedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export * from "./types/answer.ts";
export * from "./types/auth.ts";
export * from "./types/post.ts";
