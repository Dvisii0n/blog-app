import { Router } from "express";
import authController from "../controllers/authController";

const authRouter: Router = Router()

authRouter.post('/signup', authController.signUp)
authRouter.post('/login', authController.login)

export default authRouter