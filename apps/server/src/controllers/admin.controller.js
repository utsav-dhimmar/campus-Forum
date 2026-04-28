import asyncHandler from "../utils/AsyncHandler.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { isValidObjectId } from "mongoose";
import { isValidDate, isValidEmail, validLength } from "../utils/validation.js";
import { generateAccessTokenForAdmin } from "../utils/common.js";
import Post from "../models/post.model.js";
import Answer from "../models/answer.model.js";
import { ADMIN } from "../utils/constants.js";

const ADMIN_EMAIL = ADMIN.ADMIN_EMAIL;
const ADMIN_PASSWORD = ADMIN.ADMIN_PASSWORD;

const handleLogin = asyncHandler(async (req, res) => {
	if (!req.body) {
		throw new ApiError(
			400,
			"email and password are require for authentication",
		);
	}
	const { email, password } = req.body;
	if (!isValidEmail(email)) {
		throw new ApiError(400, "Invalid email address");
	}

	if (!validLength(password, 4)) {
		throw new ApiError(400, "Password must be eight character long");
	}

	if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
		throw new ApiError(401, "Invalid credentials please try again");
	}

	const token = generateAccessTokenForAdmin(email);
	return res
		.status(200)
		.cookie("accessToken", token, {
			httpOnly: true,
			secure: true,
			maxAge: 60 * 60 * 1000, // valid for one hour only
		})
		.json(
			new ApiResponse(
				200,
				{
					email: ADMIN_EMAIL,
				},
				"Admin logged in successfully",
			),
		);
});

const handleLogout = asyncHandler(async (req, res) => {
	const incommingToken = req.cookies?.accessToken;

	if (!incommingToken) {
		throw new ApiError(401, "Token missing failed ");
	}
	return res
		.status(200)
		.clearCookie("accessToken")
		.set("Clear-Site-Data", '"cookies", "storage", "cache"')
		.json(new ApiResponse(200, {}, "admin logout successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
	const allUsers = await User.aggregate([
		{
			$facet: {
				users: [
					{
						$project: {
							refreshToken: 0,
							password: 0,
						},
					},
				],
				totalUsers: [
					{
						$count: "count",
					},
				],
			},
		},
	]);
	return res
		.status(200)
		.json(new ApiResponse(200, allUsers[0], "users found successfully"));
});

const getUser = asyncHandler(async (req, res) => {
	const userId = req.params.userId;
	if (!userId) {
		throw new ApiError(400, "user id not found");
	}

	if (!isValidObjectId(userId)) {
		throw new ApiError(400, "invalid user id");
	}

	const user = await User.findById(userId);
	if (!user) {
		throw new ApiError(404, "User not found");
	}

	const userObj = user.toObject();
	delete userObj.password;
	delete userObj.refreshToken;

	return res
		.status(200)
		.json(new ApiResponse(200, userObj, "user data fetch successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
	const { userId } = req.params;
	if (!isValidObjectId(userId)) {
		throw new ApiError(400, "Invalid user ID");
	}

	const deletedUser = await User.findByIdAndDelete(userId);

	if (!deletedUser) {
		throw new ApiError(404, "User not found");
	}

	// Also delete posts and answers by this user
	await Post.deleteMany({ author: userId });
	await Answer.deleteMany({ author: userId });

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				{},
				"User and associated data deleted successfully",
			),
		);
});

const deletePost = asyncHandler(async (req, res) => {
	const { postId } = req.params;
	if (!isValidObjectId(postId)) {
		throw new ApiError(400, "Invalid post ID");
	}

	const deletedPost = await Post.findByIdAndDelete(postId);

	if (!deletedPost) {
		throw new ApiError(404, "Post not found");
	}

	await Answer.deleteMany({ post: postId });

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				{},
				"Post and associated answers deleted successfully",
			),
		);
});

const deleteAnswer = asyncHandler(async (req, res) => {
	const { answerId } = req.params;
	if (!isValidObjectId(answerId)) {
		throw new ApiError(400, "Invalid answer ID");
	}

	const deletedAnswer = await Answer.findByIdAndDelete(answerId);

	if (!deletedAnswer) {
		throw new ApiError(404, "Answer not found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Answer deleted successfully"));
});

const getAnalytics = asyncHandler(async (req, res) => {
	const { startDate, endDate } = req.query;

	if (!startDate || !endDate) {
		throw new ApiError(400, "Both start and end date is required");
	}
	const start = new Date(startDate);
	const end = new Date(endDate);

	if (isNaN(start.getTime()) || isNaN(end.getTime())) {
		throw new ApiError(400, "Invalid date format provided");
	}

	end.setHours(23, 59, 59, 999); // till mid night

	const [newUsers, newPost, newAnswer, topPost] = await Promise.all([
		// count new user , post and answer between these two date
		// User.countDocuments({
		// 	createdAt: {
		// 		$gte: start,
		// 		$lte: end,
		// 	},
		// }),

		User.aggregate([
			{
				$match: {
					createdAt: {
						$gte: start,
						$lte: end,
					},
				},
			},
			{
				$facet: {
					users: [{ $project: { username: 1, email: 1 } }],
					totalCount: [{ $count: "totalUsers" }],
				},
			},
			{
				$addFields: {
					totalUsers: {
						$arrayElemAt: ["$totalCount.totalUsers", 0],
					},
				},
			},
			{
				$project: {
					users: 1,
					totalUsers: 1,
				},
			},
		]),

		Post.countDocuments({
			createdAt: {
				$gte: start,
				$lte: end,
			},
		}),

		Answer.countDocuments({
			createdAt: {
				$gte: start,
				$lte: end,
			},
		}),
		// top 5 post
		Answer.aggregate([
			{
				$match: {
					createdAt: {
						$gte: start,
						$lte: end,
					},
				},
			},
			{
				$group: {
					_id: "$postId", // NOOB
					answerCount: { $sum: 1 },
				},
			},
			{
				$sort: { answerCount: -1 },
			},
			{
				$limit: 5,
			},
			{
				$lookup: {
					from: "posts",
					localField: "_id",
					foreignField: "_id",
					as: "postDetails",
				},
			},
			{
				$unwind: "$postDetails",
			},
			{
				$project: {
					_id: 1,
					answerCount: 1,
					body: "$postDetails.body",
				},
			},
		]),
	]);

	const analyticsData = {
		dateRange: {
			start: start.toISOString().split("T")[0],
			end: end.toISOString().split("T")[0],
		},
		users: {
			newUsers,
		},
		posts: {
			newPost,
		},
		answer: {
			newAnswer,
		},
		topPostData: {
			topPost,
		},
	};

	return res
		.status(200)
		.json(new ApiResponse(200, analyticsData, "Data Fetch successfully"));
});

const updateUserRole = asyncHandler(async (req, res) => {
	const { userId } = req.params;
	// console.log(req.body);
	if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
		throw new ApiError(400, "Role is missing");
	}

	let { role } = req.body;
	role = role.toUpperCase();
	// can be user or moderator
	if (!role || !["USER", "MODERATOR"].includes(role)) {
		throw new ApiError(400, "Invalid role");
	}

	if (!isValidObjectId(userId)) {
		throw new ApiError(400, "Invalid user id");
	}

	const updatedUser = await User.findByIdAndUpdate(
		userId,
		{
			role: role,
		},
		{
			new: true,
			runValidators: true,
		},
	).select("-password -refreshToken");

	return res
		.status(200)
		.json(new ApiResponse(200, updatedUser, "User role updated"));
});

// const getAllPost = asyncHandler((req, res) => {
// 	return res.status(200).json({
// 		message: "Hi",
// 	});
// });

// const getPost = asyncHandler((req, res) => {
// 	return res.status(200).json({
// 		message: "Hi",
// 	});
// });

export {
	getAllUsers,
	getUser,
	// getAllPost,
	// getPost,
	handleLogin,
	handleLogout,
	deleteUser,
	deletePost,
	deleteAnswer,
	getAnalytics,
	updateUserRole,
};
