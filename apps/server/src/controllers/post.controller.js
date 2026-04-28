import mongoose, { isValidObjectId } from "mongoose";
import Answer from "../models/answer.model.js";
import Post from "../models/post.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { checkEmpty, validLength } from "../utils/validation.js";

/**
 * @typedef {import("express").Request} Req
 * @typedef {import("express").Response} Res
 * @typedef {import("express").NextFunction} Next
 */

/** @param {Req} req @param {Res} res @param {Next} next */
const createAPost = asyncHandler(async (req, res) => {
	/**
	 * @type {{body:string}}
	 */
	let { body } = req.body;

	if (!body || checkEmpty(body)) {
		throw new ApiError(400, "post content is required");
	}
	body = body?.trim();

	if (!validLength(body, 10)) {
		throw new ApiError(400, "post content must have atleast 10 characters");
	}
	const userId = req.user?._id;

	const newPost = await Post.create({
		body,
		authorId: new mongoose.Types.ObjectId(userId),
	});

	return res.status(201).json(new ApiResponse(201, newPost, "post created"));
});

/** @param {Req} req @param {Res} res @param {Next} next */
const getAllPost = asyncHandler(async (_, res) => {
	const allPost = await Post.aggregate([
		{
			$match: {},
		},
		{
			$lookup: {
				from: "users",
				localField: "authorId",
				foreignField: "_id",
				as: "authorInfo",
				pipeline: [
					{
						$project: {
							username: 1,
						},
					},
				],
			},
		},
		{
			$unwind: "$authorInfo",
		},
	]);
	// const allPost = await Post.find({});

	if (!allPost || allPost.length === 0) {
		throw new ApiError(404, "no post are found");
	}

	return res.status(200).json(new ApiResponse(200, allPost, "post found"));
});

/** @param {Req} req @param {Res} res @param {Next} next */
const getPost = asyncHandler(async (req, res) => {
	const postId = req.params.postId;
	const userId = req.user?._id;
	if (!postId) {
		throw new ApiError(400, "postid is required");
	}
	if (!isValidObjectId(postId)) {
		throw new ApiError(404, "invalid post id");
	}

	const post = await Post.aggregate([
		{
			$match: {
				_id: new mongoose.Types.ObjectId(postId), // match postid
			},
		},
		{
			// get answer
			$lookup: {
				from: "answers",
				localField: "_id",
				foreignField: "postId",
				as: "answers",
				pipeline: [
					{
						$project: {
							authorId: 1,
							postId: 1,
							content: 1,
							isDeleted: 1,
							deletedBy: 1,
						},
					},
					{
						$lookup: {
							from: "users",
							as: "autherInfo",
							localField: "authorId",
							foreignField: "_id",
							pipeline: [
								{
									$project: {
										username: 1,
									},
								},
							],
						},
					},
					{
						$unwind: "$autherInfo",
					},
				],
			},
		},
		{
			$addFields: {
				totalAnswer: {
					$size: "$answers",
				},
				isAnswerByUser: {
					$in: [
						new mongoose.Types.ObjectId(userId), // what i have to find
						// where
						{
							$map: {
								input: "$answers",
								as: "answer",
								in: "$$answer.autherInfo._id",
							},
						},
					],
				},
			},
		},
		{
			$lookup: {
				from: "users",
				localField: "authorId",
				foreignField: "_id",
				as: "authorInfo",
				pipeline: [
					{
						$project: {
							username: 1,
						},
					},
				],
			},
		},
		{
			$unwind: "$authorInfo",
		},
	]);
	if (!post || post.length === 0) {
		throw new ApiError(404, "no post found");
	}
	return res.status(200).json(new ApiResponse(200, post[0], "post found"));
});
/** @param {Req} req @param {Res} res @param {Next} next */
const deletePost = asyncHandler(async (req, res) => {
	const postId = req.params.postId;
	// const userId = req.user?._id;
	const requestingUser = req.user;

	if (!postId) {
		throw new ApiError(400, "postid is required");
	}
	if (!isValidObjectId(postId)) {
		throw new ApiError(404, "invalid post id");
	}

	const post = await Post.findById(postId);
	if (!post) {
		throw new ApiError(404, "Post not found");
	}

	// if (post.authorId.toString() !== userId.toString()) {
	// 	throw new ApiError(401, "unauthorized this post not belongs to you");
	// }

	// check for author
	const isAuthor = requestingUser._id.toString() === post.authorId.toString();
	// check for mod
	const isModerator = ["ADMIN", "MODERATOR"].includes(requestingUser.role);

	// no mod and no author means , someone else try to delete -> stop it
	if (!isAuthor && !isModerator) {
		throw new ApiError(
			403,
			"You do not have permission to delete this post",
		);
	}

	await Post.findByIdAndDelete(postId);
	await Answer.deleteMany({ postId });

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Post deleted successfully"));
});

export { createAPost, deletePost, getAllPost, getPost };
