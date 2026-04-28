/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default function logger(req, res, next) {
	console.log({
		method: req.method,
		url: req.url,
		responseStatus: res.statusCode,
	});
	next();
}
