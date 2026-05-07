// Request body for answering a question
export type AnswerCreate = {
	body: string;
};

// Response format for a user's own answers (from users.controller.ts)
export interface IMyAnswerResponse {
	_id: string;
	body: string;
	post: {
		_id: string;
	};
	createdAt: Date;
	updatedAt: Date;
}
