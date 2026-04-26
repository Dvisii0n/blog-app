import type { Request, Response, NextFunction } from "express";
import userRepository from "../repositories/userRepository";
import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace";
import { matchedData } from "express-validator";

async function updateUsername(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		const data = matchedData(req);
		const reqUserId: string = req.user?.id as string;
		const newData: Object = { username: data.username };
		const updateUserTx = async () => {
			try {
				if (req.user?.role === "ADMIN") {
					await userRepository.updateUserAsAdmin(data.userId, newData);
					return {
						txDone: true,
						msg: "Succesfully updated user as admin",
						status: 200,
					};
				} else {
					await userRepository.updateOwnUser(data.userId, reqUserId, newData);
					return {
						txDone: true,
						msg: "Successfully updated own user",
						status: 200,
					};
				}
			} catch (err) {
				console.error(err);
				if (err instanceof PrismaClientKnownRequestError) {
					if (err.code === "P2025") {
						return {
							txDone: false,
							msg: "Update operation failed: Tried to update user without permission or user doesn't exists",
							status: 403,
						};
					}

					if (err.code === "P2002") {
						return {
							txDone: false,
							msg: "Update operation failed: Unique username constraint violated, put an username that doesn't already exists",
							status: 500,
						};
					}
				}

				return {
					txDone: false,
					msg: "Update operation failed, check server for detailed prisma error",
				};
			}
		};

		const { txDone, msg, status } = await updateUserTx();
		if (!txDone) {
			res.status(status || 500).json(msg);
			return;
		}

		res.json(msg);
		return;
	} catch (err) {
		next(err);
	}
}

async function getUsers(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		if (req.user?.role !== "ADMIN") {
			res.status(403).json("Forbidden");
			return;
		}

		const users: Array<Object> = await userRepository.getUsers();
		res.json(users);
	} catch (err) {
		next(err);
	}
}

export default { updateUsername, getUsers };
