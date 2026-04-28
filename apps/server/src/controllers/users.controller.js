import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { generateAccessAndRefreshToken } from "../utils/common.js";
import { checkEmpty, isValidEmail, validLength } from "../utils/validation.js";
import { isValidObjectId } from "mongoose";
import Answer from "../models/answer.model.js";
import Post from "../models/post.model.js";

const signUp = asyncHandler(async (req, res) => {
	/**
	 * @type {{username:string,email:string,password:string}}
	 */
	if (!req.body) {
		throw new ApiError(400, "All fields are reqired");
	}
	const { username, email, password } = req.body;

	if (
		!username ||
		!email ||
		!password ||
		checkEmpty(username) ||
		checkEmpty(email) ||
		checkEmpty(password)
	) {
		throw new ApiError(400, "All fields are reqired");
	}

	if (!isValidEmail(email)) {
		throw new ApiError(400, "Invalid email address");
	}

	if (!validLength(password, 8)) {
		throw new ApiError(400, "Password must be eight character long");
	}

	const existingUser = await User.findOne({
		$or: [
			{
				username,
			},
			{
				email,
			},
		],
	});

	let findBy = "";
	if (existingUser) {
		if (existingUser.username === username) findBy = "username";
		if (existingUser.email === email) findBy = "email";
		throw new ApiError(400, `user already exists with ${findBy}`);
	}

	const newUser = await User.create({ username, email, password });

	if (!newUser) {
		throw new ApiError(400, "Unable to create user");
	}
	const userObj = newUser.toObject();
	delete userObj.password;

	return res
		.status(201)
		.json(new ApiResponse(201, userObj, "User create successfully"));
});

const login = asyncHandler(async (req, res) => {
	/**
	 * @type {{email:string,password:string}}
	 */
	const { email, password } = req.body;

	if (checkEmpty(email) || checkEmpty(password) || !email || !password) {
		throw new ApiError(400, "All fields are reqired");
	}

	if (!isValidEmail(email)) {
		throw new ApiError(400, "Invalid email address");
	}

	if (!validLength(password, 8)) {
		throw new ApiError(400, "Password must be eight character long");
	}

	const user = await User.findOne({ email });

	if (!user) {
		throw new ApiError(404, "User does not exists");
	}

	const isValidPassword = await user.comparePassword(password);

	if (!isValidPassword) {
		throw new ApiError(401, "unautorized access , invalid password");
	}

	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		user._id,
	);

	const userObj = user.toObject();

	delete userObj.password;
	delete userObj?.refreshToken;

	return res
		.status(200)
		.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: true,
			maxAge: 5 * 24 * 60 * 60 * 1000, // valid for 5 days
		})
		.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: true,
			maxAge: 30 * 24 * 60 * 60 * 1000, // valid for 30 days
		})
		.json(new ApiResponse(200, userObj, "user Logged in successfully"));
});

const logout = asyncHandler(async (req, res) => {
	// only authentic users -> middlewares
	const userId = req.user?._id;

	if (!userId) {
		throw new ApiError(400, "userid is required");
	}

	const user = await User.findByIdAndUpdate(
		userId,
		{
			$set: {
				refreshToken: 1,
			},
		},
		{
			new: true,
		},
	);

	if (!user) {
		throw new ApiError(400, "User not found");
	}

	return res
		.status(200)
		.set("Clear-Site-Data", '"cookies", "storage", "cache"')
		.clearCookie("accessToken")
		.clearCookie("refreshToken")
		.json(new ApiResponse(200, {}, "user logout successfully"));
});

const getUserInfo = asyncHandler(async (req, res) => {
	const userId = req.user?._id;

	if (!userId) {
		throw new ApiError(400, "userid is required");
	}
	if (!isValidObjectId(userId)) {
		throw new ApiError(400, "Invalid userid");
	}

	const user = await User.findById(userId)
		.select("-password -refreshToken")
		.lean();

	if (!user) {
		throw new ApiError(400, "user not found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, user, "user data fetch successfully"));
});

const newRefreshToken = asyncHandler(async (req, res) => {
	// get old refresh token based on that token generate new refresh token

	try {
		const incommingRefreshToken =
			req.cookies?.refreshToken ||
			req.headers.authorization?.replace("Bearer", "");

		if (!incommingRefreshToken) {
			throw new ApiError(
				401,
				"Unauthorized access , refresh token is missing",
			);
		}

		// invalid -> throw error
		const userInfo = jwt.verify(
			incommingRefreshToken,
			process.env.REFRESH_TOKEN,
		);

		if (!userInfo) {
			throw new ApiError(
				401,
				"Unauthorized access , invalid refresh token",
			);
		}
		const user = await User.findById(userInfo._id);

		if (!user) {
			throw new ApiError(404, "user not found");
		}

		if (user.refreshToken !== incommingRefreshToken) {
			throw new ApiError(
				404,
				"Invalid Refresh token or Refresh token is already used",
			);
		}

		const { accessToken, refreshToken } =
			await generateAccessAndRefreshToken(user._id);

		return res
			.status(200)
			.cookie("accessToken", accessToken, {
				httpOnly: true,
				secure: true,
				maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
			})
			.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				secure: true,
				maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
			})
			.json(new ApiResponse(200, {}, "New Refresh token created"));
	} catch (error) {
		console.error(`Error while generating new refresh token`);
		console.log(error);
	}
});

const getMyPost = asyncHandler(async (req, res) => {
	const userId = req.user?._id;

	if (!userId) {
		throw new ApiError(400, "User ID is required");
	}

	if (!isValidObjectId(userId)) {
		throw new ApiError(400, "Invalid User ID");
	}

	const posts = await Post.find({ authorId: userId }).sort({ createdAt: -1 });

	if (!posts || posts.length === 0) {
		return res.status(200).json(new ApiResponse(200, [], "No posts found"));
	}

	return res
		.status(200)
		.json(new ApiResponse(200, posts, "User posts fetched successfully"));
});

const deletePost = asyncHandler(async (req, res) => {
	const userId = req.user?._id;
	const { postId } = req.params;

	if (!userId) {
		throw new ApiError(400, "User ID is required");
	}

	if (!isValidObjectId(userId)) {
		throw new ApiError(400, "Invalid User ID");
	}

	if (!postId || !isValidObjectId(postId)) {
		throw new ApiError(400, "Invalid Post ID");
	}

	const post = await Post.findOne({ _id: postId, authorId: userId });

	if (!post) {
		throw new ApiError(404, "Post not found or you are not the author");
	}

	await Post.findByIdAndDelete(postId);

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Post deleted successfully"));
});

const getMyAnswers = asyncHandler(async (req, res) => {
	const userId = req.user?._id;

	if (!userId) {
		throw new ApiError(400, "User ID is required");
	}

	if (!isValidObjectId(userId)) {
		throw new ApiError(400, "Invalid User ID");
	}

	const answers = await Answer.find({ authorId: userId })
		.populate("postId")
		.sort({ createdAt: -1 });

	if (!answers || answers.length === 0) {
		return res
			.status(200)
			.json(new ApiResponse(200, [], "No answers found for this user"));
	}

	const formattedAnswers = answers.map((answer) => ({
		_id: answer._id,
		body: answer.content,

		post: {
			_id: answer.postId._id,
		},
		createdAt: answer.createdAt,
		updatedAt: answer.updatedAt,
	}));

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				formattedAnswers,
				"User answers fetched successfully",
			),
		);
});

export {
	getUserInfo,
	login,
	logout,
	newRefreshToken,
	signUp,
	getMyPost,
	deletePost,
	getMyAnswers,
};
