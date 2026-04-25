import type { Request, Response, NextFunction } from "express";
import commentsRepository from "../repositories/commentsRepository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

async function getPostComments(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		const postId: string = req.params?.postId as string;
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
		const postId: string = req.params?.postId as string;
		const { body } = req.body;
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
		const commentId: string = req.params?.commentId as string;
		const { body } = req.body;
		await commentsRepository.updateComment(commentId, { body: body }, userId);

		res.json(`Successfully updated comment on post`);
		return;
	} catch (err) {
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
		const commentId: string = req.params?.commentId as string;
		await commentsRepository.deleteComment(commentId, userId);
		res.json(`Successfully deleted comment on post`);
		return;
	} catch (err) {
		if (err instanceof PrismaClientKnownRequestError) {
			if (err.code === "P2025") {
				res.status(403).json("Can only delete comments posted by the user");
				return;
			}
		}
		next(err);
	}
}
export default { getPostComments, createComment, updateComment, deleteComment };
