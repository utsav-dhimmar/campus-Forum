import { Types } from "mongoose";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { parsedEnv } from "../schemas/env.js";
const generateAccessAndRefreshToken = async (id: string | Types.ObjectId) => {
	const user = await User.findById(id);
	if (!user) {
		throw new ApiError(400, "user not found with given id");
	}
	const refreshToken = user.generateRefreshToken();
	const accessToken = user.generateAccessToken();
	user.refreshToken = refreshToken;
	await user.save();

	return { refreshToken, accessToken };
};

const generateAccessTokenForAdmin = (email: string) => {
	try {
		return jwt.sign(
			{
				email,
			},
			parsedEnv.REFRESH_TOKEN,
			{
				expiresIn: "1h",
			},
		);
	} catch (error) {
		console.error("Error while generating Access Token", error);
	}
};

export { generateAccessAndRefreshToken, generateAccessTokenForAdmin };
