const checkEmpty = (value: string): boolean => value?.trim() === "";

const validLength = (value: string, length: number): boolean => value?.length >= length;

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isValidEmail = (email: string): boolean => !!(email && emailPattern.test(email));

const isValidDate = (dateString: string): boolean => {
	const date = new Date(dateString);
	return !isNaN(date.getTime());
};

export { checkEmpty, validLength, isValidEmail, isValidDate };
