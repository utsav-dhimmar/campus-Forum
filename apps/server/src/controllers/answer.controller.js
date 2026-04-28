import { isValidObjectId } from "mongoose";
import Answer from "../models/answer.model.js";
import Post from "../models/post.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { checkEmpty, validLength } from "../utils/validation.js";

const answerToTheQuestion = asyncHandler(async (req, res) => {
	const postId = req.params.postId;
	const userId = req.user?._id;

	if (!postId) {
		throw new ApiError(400, "postid is required");
	}
	if (!isValidObjectId(postId)) {
		throw new ApiError(404, "invalid post id");
	}
	/**
	 * @type {{body:string}}
	 */
	let { body } = req.body;
	body = body?.trim();

	if (checkEmpty(body) || !body) {
		throw new ApiError(400, "post can not be empty");
	}

	if (!validLength(body, 10)) {
		throw new ApiError(401, "post must have at least 10 characters");
	}

	const post = await Post.findById(postId);

	if (!post) {
		throw new ApiError(404, "no post found");
	}
	// post -> replies create

	const answer = await Answer.create({
		content: body,
		authorId: userId,
		postId: postId,
	});

	return res.status(201).json(new ApiResponse(201, answer, "answer created"));
});

const getAnswer = asyncHandler(async (req, res) => {
	const answerId = req.params.answerId;
	if (!answerId) {
		throw new ApiError(400, "answerId is required");
	}

	if (!isValidObjectId(answerId)) {
		throw new ApiError(400, "invalid answerId");
	}
	const answer = await Answer.findById(answerId);

	if (!answer) {
		throw new ApiError(400, "no answer found");
	}
	return res.status(200).json(new ApiResponse(200, answer, "answer found"));
});

const deleteAnswer = asyncHandler(async (req, res) => {
	const answerId = req.params.answerId;
	const requestingUser = req.user;
	if (!answerId) {
		throw new ApiError(400, "answerId is required");
	}

	if (!isValidObjectId(answerId)) {
		throw new ApiError(400, "invalid answerId");
	}

	const answer = await Answer.findById(answerId);
	if (!answer) {
		throw new ApiError(400, "no answer found");
	}
	// check for author
	const isAuthor =
		requestingUser._id.toString() === answer.authorId.toString();
	// check for mod
	const isModerator = ["ADMIN", "MODERATOR"].includes(requestingUser.role);

	// no mod and no author means , someone else try to delete -> stop it
	if (!isAuthor && !isModerator) {
		throw new ApiError(
			403,
			"You do not have permission to delete this answer",
		);
	}

	// mod try to delete
	if (isModerator && !isAuthor) {
		answer.content = `[This answer were deleted by, moderator:- ${requestingUser.username}]`;
		answer.isDeleted = true;
		answer.deletedBy = requestingUser._id;
		await answer.save();
		return res
			.status(200)
			.json(new ApiResponse(200, answer, "answer deleted by moderator"));
	}

	await Answer.findByIdAndDelete(answerId);

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "answer successfully deleted"));
});

export { answerToTheQuestion, deleteAnswer, getAnswer };
