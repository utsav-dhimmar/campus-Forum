class ApiError extends Error {
	/**
	 *
	 * @param {number} statusCode
	 * @param {string} message
	 */
	constructor(statusCode, message = "something went wrong") {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.success = false;
	}
}

export default ApiError;
