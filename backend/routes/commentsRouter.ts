import { Router } from "express";
import commentsController from "../controllers/commentsController";

const commentsRouter: Router = Router({ mergeParams: true });

commentsRouter.get("/", commentsController.getPostComments);
commentsRouter.post("/", commentsController.createComment);
commentsRouter.put("/:commentId", commentsController.updateComment);
commentsRouter.delete("/:commentId", commentsController.deleteComment);

export default commentsRouter;
