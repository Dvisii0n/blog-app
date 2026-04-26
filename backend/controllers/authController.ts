import type { Request, Response, NextFunction } from "express";
import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository";
import { User } from "../generated/prisma/client";
import { matchedData } from "express-validator";

const JWT_EXPIRES_IN = "24h";

async function signUp(req: Request, res: Response, next: NextFunction) {
	try {
		const signUpData = matchedData(req);
		const [usernameTaken, emailTaken] = await Promise.all([
			userRepository.getUser(signUpData.username),
			userRepository.getUserByEmail(signUpData.email),
		]);

		if (usernameTaken) {
			res.status(404).json("Username already taken");
			return;
		}

		if (emailTaken) {
			res.status(404).json("Email already taken");
			return;
		}
		const passwordHash: string = await bcrypt.hash(signUpData.password, 10);
		await userRepository.createUser(
			signUpData.username,
			signUpData.email,
			passwordHash,
		);
		res.status(200).json("created user");
		return;
	} catch (err) {
		next(err);
	}
}

async function login(req: Request, res: Response, next: NextFunction) {
	try {
		const loginData = req.body;

		const SECRET = process.env.JWT_SECRET as string;
		const user: User | null = await userRepository.getUser(loginData.username);

		if (!user) {
			res.status(401).json({ msg: "Invalid username" });
			return;
		}

		const match: boolean = await bcrypt.compare(
			loginData.password,
			user.password,
		);

		if (!match) {
			res.status(401).json({ msg: "Invalid password" });
			return;
		}

		const token = jwt.sign({ user: user }, SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});
		res.json({ msg: "login successful", token });
		return;
	} catch (err) {
		next(err);
	}
}

export default { signUp, login };
