class ApiResponse {
	/**
	 *
	 * @param {number} statusCode
	 * @param {any} data
	 * @param {string} message
	 */
	constructor(statusCode, data, message) {
		this.data = data;
		this.message = message;
		this.success = statusCode < 400;
	}
}
export default ApiResponse;
