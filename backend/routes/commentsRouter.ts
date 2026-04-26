import { Router } from "express";
import commentsController from "../controllers/commentsController";
import {
	validateCreateComment,
	validateDeleteComment,
	validateGetComments,
	validateUpdateComment,
} from "../validators/commentsValidator";
import { authUser } from "../middleware/authMiddleware";

const commentsRouter: Router = Router({ mergeParams: true });

commentsRouter.get(
	"/",
	validateGetComments,
	commentsController.getPostComments,
);

commentsRouter.use(authUser);

commentsRouter.post(
	"/",
	validateCreateComment,
	commentsController.createComment,
);
commentsRouter.put(
	"/:commentId",
	validateUpdateComment,
	commentsController.updateComment,
);
commentsRouter.delete(
	"/:commentId",
	validateDeleteComment,
	commentsController.deleteComment,
);

export default commentsRouter;
