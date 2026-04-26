import { Router } from "express";
import postController from "../controllers/postController";
import commentsRouter from "./commentsRouter";
import { authUser } from "../middleware/authMiddleware";
import {
	validateCreatePost,
	validateDeletePost,
	validateGetPost,
	validateUpdatePost,
} from "../validators/postValidators";

const postsRouter: Router = Router();

postsRouter.get("/", postController.getPosts);

postsRouter.use("/:postId/comments", commentsRouter);

postsRouter.use(authUser);

postsRouter.get("/:postId", validateGetPost, postController.getPost);

postsRouter.post("/", validateCreatePost, postController.createPost);

postsRouter.put("/:postId", validateUpdatePost, postController.updatePost);

postsRouter.delete("/:postId", validateDeletePost, postController.deletePost);

export default postsRouter;
