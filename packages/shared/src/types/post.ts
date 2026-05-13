import type { IAnswerWithAuthor } from "./answer.ts";

export interface IPost {
  _id: string;
  body: string;
  authorId: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type PostCreate = {
  body: string;
};

export interface IPostWithAuthor extends IPost {
  authorInfo: {
    _id: string;
    username: string;
  };
}

export interface IPostDetails extends IPostWithAuthor {
  answers: IAnswerWithAuthor[];
  totalAnswer: number;
  isAnswerByUser: boolean;
}

export type AllPostsResponse = IPostWithAuthor[];
export type PostDetailsResponse = IPostDetails;
