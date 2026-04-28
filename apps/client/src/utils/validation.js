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
const isValidEmail = (email) => emailPattern?.test(email);

export { checkEmpty, validLength, isValidEmail };
