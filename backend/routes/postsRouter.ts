import { Router } from "express";
import postController from "../controllers/postController";
import passport from "passport";

const postsRouter: Router = Router();

postsRouter.use(passport.authenticate("jwt", { session: false }));

//posts/
postsRouter.get("/", postController.getPosts);
postsRouter.get("/:postId", postController.getPost);
postsRouter.post("/", postController.createPost);
postsRouter.put("/:postId", postController.updatePost);
postsRouter.delete("/:postId", postController.deletePost);

export default postsRouter;
