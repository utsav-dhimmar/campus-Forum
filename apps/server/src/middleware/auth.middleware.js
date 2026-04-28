import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

const authMiddleware = asyncHandler(async (req, _, next) => {
	try {
		/**
		 * @type {string}
		 */
		const incommingAccessToken =
			req.cookies?.accessToken ||
			req.headers.authorization?.replace("Bearer ", "");

		if (!incommingAccessToken) {
			throw new ApiError(401, "unautorized access token not found");
		}

		const user = jwt.verify(incommingAccessToken, process.env.ACCESS_TOKEN);
		const isUser = await User.findById(user._id)
			.select("-password -refreshToken")
			.lean();
		if (!isUser) {
			throw new ApiError(404, "user not found");
		}
		req.user = isUser;
		next();
	} catch (error) {
		// return next(
		throw new ApiError(401, error.message || "invalid refresh token");
		// );
	}
});

export default authMiddleware;
