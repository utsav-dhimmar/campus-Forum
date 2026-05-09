/**
 *
 * @param {string} value
 * @returns {boolean}
 */
const checkEmpty = (value: string) => value?.trim() === "";

/**
 *
 * @param {string} value
 * @param {number} length
 */
const validLength = (value: string, length: number) => value?.length >= length;

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 *
 * @param {string} email
 * @returns
 */
const isValidEmail = (email: string) => emailPattern?.test(email);

export { checkEmpty, validLength, isValidEmail };
