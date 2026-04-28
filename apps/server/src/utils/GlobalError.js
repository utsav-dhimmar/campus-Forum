import ApiError from "./ApiError.js";

/**
 *
 * @param {} error
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default function GlobalErrorHandler(error, _, res, next) {
	console.log(error);
	const statusCode = error instanceof ApiError ? error.statusCode : 500;
	const message =
		error instanceof ApiError ? error.message : "Internal server error";
	return res.status(statusCode).json({ success: false, message });
}
