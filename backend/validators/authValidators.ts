import { userValidators } from "../validators/userValidators";
import { validationErrorsHandler } from "./validationUtils";

const validateSignUp = [
	userValidators.validateEmail,
	userValidators.validateUsername,
	userValidators.validatePassword,
	validationErrorsHandler,
];

const validateLogIn = [
	userValidators.validateUsername,
	userValidators.validatePassword,
	validationErrorsHandler,
];

export default { validateSignUp, validateLogIn };
