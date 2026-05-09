import type { IAnswerWithAuthor } from "./answer.ts";

export type PostCreate = {
  body: string;
};

export interface IPostWithAuthor {
  _id: string;
  body: string;
  authorId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
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
