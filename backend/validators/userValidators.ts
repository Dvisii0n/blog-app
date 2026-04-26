import { body, param } from "express-validator";
import errorMsg from "./errorMessages";
import { validationErrorsHandler } from "./validationUtils";

const userFields = {
	userId: "userId",
	username: "username",
	email: "email",
	password: "password",
};

const userValidators = {
	validateUsername: body(userFields.username)
		.exists()
		.trim()
		.isString()
		.notEmpty()
		.withMessage(`${userFields.username} ${errorMsg.exists}`)
		.isAlphanumeric()
		.withMessage(`${userFields.username} ${errorMsg.alphaNum}`)
		.isLength({ min: 2 })
		.withMessage(`${userFields.username} ${errorMsg.minLength} 8 characters`)
		.isLength({ max: 25 })
		.withMessage(`${userFields.username} ${errorMsg} 25 characters`),

	validateEmail: body(userFields.email)
		.exists()
		.trim()
		.isString()
		.notEmpty()
		.withMessage(`${userFields.email} ${errorMsg.exists}`)
		.isEmail()
		.withMessage(`${userFields.email} ${errorMsg.isEmail}`),

	validatePassword: body(userFields.password)
		.exists()
		.trim()
		.isString()
		.notEmpty()
		.withMessage(`${userFields.password} ${errorMsg.exists}`)
		.isLength({ min: 8 })
		.withMessage(`${userFields.password} ${errorMsg.minLength} 8 characters`)
		.isLength({ max: 50 })
		.withMessage(`${userFields.password} ${errorMsg.maxLength} 50 characters`),

	validateUserId: param(userFields.userId)
		.exists()
		.trim()
		.isUUID()
		.notEmpty()
		.withMessage(`${userFields.userId} ${errorMsg.exists}`),
};

const validateUpdateUsername = [
	userValidators.validateUserId,
	userValidators.validateUsername,
	validationErrorsHandler,
];

export { userValidators, validateUpdateUsername };
