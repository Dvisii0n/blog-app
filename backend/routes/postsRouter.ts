import { Router } from "express";
import postController from "../controllers/postController";
import commentsRouter from "./commentsRouter";
import { authUser } from "../middleware/authMiddleware";

const postsRouter: Router = Router();

postsRouter.use(authUser);
postsRouter.use("/:postId/comments", commentsRouter);

//posts/
postsRouter.get("/", postController.getPosts);
postsRouter.get("/:postId", postController.getPost);
postsRouter.post("/", postController.createPost);
postsRouter.put("/:postId", postController.updatePost);
postsRouter.delete("/:postId", postController.deletePost);

export default postsRouter;
