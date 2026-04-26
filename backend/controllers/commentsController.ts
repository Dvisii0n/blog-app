import type { Request, Response, NextFunction } from "express";
import commentsRepository from "../repositories/commentsRepository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { matchedData } from "express-validator";

async function getPostComments(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		const { postId } = matchedData(req);
		const postComments = await commentsRepository.getComments(postId);
		res.json(postComments);
		return;
	} catch (err) {
		next(err);
	}
}

async function createComment(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		const authorId: string = req.user?.id as string;
		const { postId, body } = matchedData(req);
		await commentsRepository.createComment(body, postId, authorId);
		res.json(`Successfully created comment on post`);
		return;
	} catch (err) {
		next(err);
	}
}

async function updateComment(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		const userId: string = req.user?.id as string;
		const { commentId, body } = matchedData(req);
		await commentsRepository.updateComment(commentId, { body: body }, userId);

		res.json(`Successfully updated comment on post`);
		return;
	} catch (err) {
		if (err instanceof PrismaClientKnownRequestError) {
			if (err.code === "P2025") {
				res.status(403).json("Can only update own comments");
				return;
			}
		}
		next(err);
	}
}

async function deleteComment(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		const userId: string = req.user?.id as string;
		const { commentId } = matchedData(req);
		await commentsRepository.deleteComment(commentId, userId);
		res.json(`Successfully deleted comment on post`);
		return;
	} catch (err) {
		if (err instanceof PrismaClientKnownRequestError) {
			if (err.code === "P2025") {
				res.status(403).json("Can only delete comments owned by the user");
				return;
			}
		}
		next(err);
	}
}
export default { getPostComments, createComment, updateComment, deleteComment };
