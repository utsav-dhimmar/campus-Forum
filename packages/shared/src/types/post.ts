import type { IPost, IUser, IAnswer } from "../index.ts";

// For createAPost (req.body)
export type PostCreate = {
	body: string;
};

// For getAllPost (response data array items)
export interface IPostWithAuthor extends IPost {
	authorInfo: Pick<IUser, "_id" | "username">;
}

// For getPost (nested answers in response)
export interface IAnswerWithAuthor extends Omit<IAnswer, "postId"> {
	postId: string; // The pipeline keeps this as an ObjectId string
	authorInfo: Pick<IUser, "_id" | "username">;
}

// For getPost (response data)
export interface IPostDetails extends IPostWithAuthor {
	answers: IAnswerWithAuthor[];
	totalAnswer: number;
	isAnswerByUser: boolean;
}
