import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";

async function getPosts(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		const posts: Array<Object> = await prisma.post.findMany();
		res.json(posts);
		return;
	} catch (err) {
		next(err);
	}
}

async function createPost(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		if (!req.user) {
			res.status(401).json("Unauthorized");
			return;
		}

		const userId: string = req.user.id;
		const { title, body } = req.body;
		await prisma.post.create({
			data: { title: title, body: body, authorId: userId },
		});
		res.status(201).json("POST CREATED");
		return;
	} catch (err) {
		next(err);
	}
}

async function getPost(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		const postId: string = req.params.postId as string;
		const post = await prisma.post.findUnique({
			where: { id: postId },
		});
		res.json(post);
	} catch (err) {
		next(err);
	}
}

async function updatePost(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		const postId: string = req.params.postId as string;
		const newData: Object = req.body;
		await prisma.post.update({
			data: newData,
			where: { id: postId },
		});
		res.status(201).json("POST UPDATED");
	} catch (err) {
		next(err);
	}
}

async function deletePost(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		const postId: string = req.params.postId as string;
		await prisma.post.delete({
			where: { id: postId },
		});
		res.json("POST DELETED");
	} catch (err) {
		next(err);
	}
}

export default {
	getPosts,
	createPost,
	getPost,
	updatePost,
	deletePost,
};
