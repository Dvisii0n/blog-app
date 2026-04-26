import { Router } from "express";
import userController from "../controllers/userController";
import { authUser } from "../middleware/authMiddleware";
import { validateUpdateUsername } from "../validators/userValidators";

const userRouter: Router = Router();

userRouter.use(authUser);

userRouter.get("/", userController.getUsers);
userRouter.put(
	"/:userId",
	validateUpdateUsername,
	userController.updateUsername,
);

export default userRouter;
