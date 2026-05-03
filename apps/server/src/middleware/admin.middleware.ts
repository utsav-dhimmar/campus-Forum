import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { ADMIN } from "../utils/constants.js";
import { parsedEnv } from "../schemas/env.js";

const ADMIN_EMAIL = ADMIN.ADMIN_EMAIL;

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const incommingAccessToken =
			req.cookies?.accessToken ||
			req.headers.authorization?.replace("Bearer ", "");

		if (!incommingAccessToken) {
			throw new ApiError(401, "unautorized access token not found");
		}
		const user = jwt.verify(
			incommingAccessToken,
			parsedEnv.REFRESH_TOKEN
		) as { email: string };

		if (user.email !== ADMIN_EMAIL) {
			throw new ApiError(401, "unautorized access , invalid email");
		}
		next();
	} catch (error: any) {
		throw new ApiError(401, error.message || "invalid access token");
	}
};

export default adminMiddleware;
