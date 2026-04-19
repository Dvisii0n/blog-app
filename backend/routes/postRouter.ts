import { Router } from "express";
import postController from "../controllers/postController";
import passport from "passport";

const postRouter: Router = Router() 

postRouter.use(passport.authenticate('jwt', {session: false}))

postRouter.get('/', postController.getPosts)
postRouter.post('/', postController.createPost)

export default postRouter