import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

/**
 * @param {import("mongoose").ObjectId} id
 * @returns {Promise<{accessToken:string,refreshToken:string}>}
 *
 */
const generateAccessAndRefreshToken = async (id) => {
	const user = await User.findById(id);

	if (!user) {
		throw new ApiError(400, "user not found with given id");
	}

	const refreshToken = user.generateRefreshToken();
	const accessToken = user.generateAccessToken();
	user.refreshToken = refreshToken;
	user.save();

	return { refreshToken, accessToken };
};

const generateAccessTokenForAdmin = (email) => {
	try {
		return jwt.sign(
			{
				email,
			},
			process.env.REFRESH_TOKEN,
			{
				expiresIn: 60 * 60 * 1000, // valid for one hour only
			},
		);
	} catch (error) {
		console.error("Error while generating Access Token", error);
	}
};

export { generateAccessAndRefreshToken, generateAccessTokenForAdmin };
