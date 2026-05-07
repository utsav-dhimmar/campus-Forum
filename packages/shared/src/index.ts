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
	authorId: string | IUser;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IAnswer {
	_id: string;
	authorId: string | IUser;
	postId: string | IPost;
	content: string;
	isDeleted: boolean;
	deletedBy?: string | IUser;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IPostFull {
	_id: string;
	body: string;
	createdAt: string;
}

export * from "./types/answer.ts";
export * from "./types/auth.ts";
export * from "./types/post.ts";
