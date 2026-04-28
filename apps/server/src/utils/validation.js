/**
 *
 * @param {string} value
 * @returns {boolean}
 */
const checkEmpty = (value) => value?.trim() === "";

/**
 *
 * @param {string} value
 * @param {number} length
 */
const validLength = (value, length) => value?.length >= length;

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 *
 * @param {string} email
 * @returns
 */
const isValidEmail = (email) => email && emailPattern.test(email);

const isValidDate = (dateString) => {
	const date = new Date(dateString);
	return !isNaN(date.getTime());
};

export { checkEmpty, validLength, isValidEmail, isValidDate };
