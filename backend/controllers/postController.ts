import type { NextFunction, Request, Response } from "express";
import postsRepository from "../repositories/postsRepository";

async function getPosts(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		const posts = await postsRepository.getPosts();
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
		await postsRepository.createPost(title, body, userId);
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
		const post = await postsRepository.getPost(postId);
		if (!post) {
			res.status(404).json("The specified post doesn't exist");
			return;
		}
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
		const userId: string = req.user?.id as string;
		const newData: Object = req.body;
		await postsRepository.updatePost(postId, newData, userId);
		res.status(201).json("POST UPDATED");
		return;
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
		const userId: string = req.user?.id as string;
		await postsRepository.deletePost(postId, userId);
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
