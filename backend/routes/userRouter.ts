import { Router } from "express";
import userController from "../controllers/userController";
import { authUser } from "../middleware/authMiddleware";

const userRouter: Router = Router();

userRouter.use(authUser);

userRouter.get("/", userController.getUsers);
userRouter.put("/:userId", userController.updateUsername);

export default userRouter;
