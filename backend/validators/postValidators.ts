import { body, param } from "express-validator";
import errorMsg from "./errorMessages";
import { validationErrorsHandler } from "./validationUtils";

const postFields = {
	postId: "postId",
	userId: "userId",
	title: "title",
	body: "body",
	publicationStatus: "publicationStatus",
};

const postValidators = {
	validateUserId: param(postFields.userId)
		.exists()
		.trim()
		.isUUID()
		.notEmpty()
		.withMessage(`${postFields.userId} ${errorMsg.exists}`),

	validatePostId: param(postFields.postId)
		.exists()
		.trim()
		.isUUID()
		.notEmpty()
		.withMessage(`${postFields.postId} ${errorMsg.exists}`),

	validateTitle: body(postFields.title)
		.exists()
		.trim()
		.isString()
		.notEmpty()
		.withMessage(`${postFields.title} ${errorMsg.exists}`)
		.isLength({ min: 2 })
		.withMessage(`${postFields.title} ${errorMsg.minLength} 2 characters`)
		.isLength({ max: 100 })
		.withMessage(`${postFields.title} ${errorMsg.maxLength} 100 characters`),

	validateBody: body(postFields.body)
		.exists()
		.trim()
		.isString()
		.notEmpty()
		.withMessage(`${postFields.body} ${errorMsg.exists}`)
		.isLength({ min: 1 })
		.withMessage(`${postFields.body} ${errorMsg.minLength} 1 character`)
		.isLength({ max: 1000 })
		.withMessage(`${postFields.body} ${errorMsg.maxLength} 1000 characters`),

	validatePublicationStatus: body(postFields.publicationStatus)
		.exists()
		.trim()
		.isString()
		.notEmpty()
		.withMessage(`${postFields.publicationStatus} ${errorMsg.exists}`)
		.custom(async (value) => {
			const validPubStatuses = ["PUBLISHED", "UNPUBLISHED"];
			if (!validPubStatuses.includes(value)) {
				throw new Error("Invalid publication status");
			}
		}),
};

const validateGetPost = [
	postValidators.validatePostId,
	validationErrorsHandler,
];

const validateDeletePost = [
	postValidators.validatePostId,
	validationErrorsHandler,
];

const validateCreatePost = [
	postValidators.validateTitle,
	postValidators.validateBody,
	postValidators.validatePublicationStatus,
	validationErrorsHandler,
];

const validateUpdatePost = [
	postValidators.validatePostId,
	postValidators.validateTitle,
	postValidators.validateBody,
	postValidators.validatePublicationStatus,
	validationErrorsHandler,
];

export {
	postValidators,
	validateCreatePost,
	validateUpdatePost,
	validateGetPost,
	validateDeletePost,
};
