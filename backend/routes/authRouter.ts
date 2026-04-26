import { Router } from "express";
import authController from "../controllers/authController";
import authValidators from "../validators/authValidators";

const authRouter: Router = Router();

authRouter.post(
	"/signup",
	authValidators.validateSignUp,
	authController.signUp,
);
authRouter.post("/login", authValidators.validateLogIn, authController.login);

export default authRouter;
