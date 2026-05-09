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

export interface IAnswerWithAuthor {
  _id: string;
  authorId: string;
  postId: string;
  content: string;
  isDeleted: boolean;
  deletedBy?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  authorInfo: {
    _id: string;
    username: string;
  };
}
