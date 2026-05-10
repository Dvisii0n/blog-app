import { body } from "express-validator";
import { userValidators } from "../validators/userValidators";
import { validationErrorsHandler } from "./validationUtils";

const validateConfirmPassword = [
	body("confirmPassword")
		.exists()
		.withMessage(`Must input a password in confirm password`)
		.trim()
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error("Password confirmation does not match password");
			}
			return true;
		}),
];

const validateSignUp = [
	userValidators.validateEmail,
	userValidators.validateUsername,
	userValidators.validatePassword,
	validateConfirmPassword,
	validationErrorsHandler,
];

const validateLogIn = [
	userValidators.validateUsername,
	userValidators.validatePassword,
	validationErrorsHandler,
];

export default { validateSignUp, validateLogIn };
