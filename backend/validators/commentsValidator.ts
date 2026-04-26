import { body, param } from "express-validator";
import errorMsg from "./errorMessages";
import { validationErrorsHandler } from "./validationUtils";
import { postValidators } from "./postValidators";

const commentFields = {
	commentId: "commentId",
	body: "body",
};

const commentValidators = {
	validateCommentId: param(commentFields.commentId)
		.exists()
		.trim()
		.isUUID()
		.notEmpty()
		.withMessage(`${commentFields.commentId} ${errorMsg.exists}`),

	validateBody: body(commentFields.body)
		.exists()
		.trim()
		.isString()
		.notEmpty()
		.withMessage(`${commentFields.body} ${errorMsg.exists}`)
		.isLength({ min: 1 })
		.withMessage(`${commentFields.body} ${errorMsg.minLength} 1 character`)
		.isLength({ max: 500 })
		.withMessage(`${commentFields.body} ${errorMsg.maxLength} 500 characters`),
};

const validateCreateComment = [
	postValidators.validatePostId,
	commentValidators.validateBody,
	validationErrorsHandler,
];

const validateUpdateComment = [
	postValidators.validatePostId,
	commentValidators.validateCommentId,
	commentValidators.validateBody,
	validationErrorsHandler,
];

const validateGetComments = [
	postValidators.validatePostId,
	validationErrorsHandler,
];

const validateDeleteComment = [
	postValidators.validatePostId,
	commentValidators.validateCommentId,
	validationErrorsHandler,
];

export {
	validateCreateComment,
	validateUpdateComment,
	validateGetComments,
	validateDeleteComment,
};
