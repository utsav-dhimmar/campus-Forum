export interface IAnswer {
  _id: string;
  authorId: string;
  postId: string;
  content: string;
  isDeleted: boolean;
  deletedBy?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type AnswerCreate = {
  body: string;
};

export interface IMyAnswerResponse {
  _id: string;
  body: string;
  post: {
    _id: string;
  };
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IAnswerWithAuthor extends IAnswer {
  authorInfo: {
    _id: string;
    username: string;
  };
}

export type AnswerResponse = IAnswer;
export type MyAnswersResponse = IMyAnswerResponse[];
