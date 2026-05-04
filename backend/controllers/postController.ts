import type { NextFunction, Request, Response } from "express";
import postsRepository from "../repositories/postsRepository";
import { matchedData } from "express-validator";

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
		const role: string = req.user?.role as string;
		if (role !== "ADMIN" && role !== "AUTHOR") {
			res.status(403).json("Cannot post if you're not an author or an admin");
			return;
		}
		const userId: string = req.user?.id as string;
		const { title, body, description, publicationStatus } = matchedData(req);
		await postsRepository.createPost(
			title,
			body,
			description,
			publicationStatus,
			userId,
		);
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
		const { postId } = matchedData(req);
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
		const role: string = req.user?.role as string;
		if (role !== "ADMIN" && role !== "AUTHOR") {
			res
				.status(403)
				.json("Cannot update post if you're not an author or an admin");
			return;
		}
		const data = matchedData(req);
		const userId: string = req.user?.id as string;
		const postId: string = data.postId;
		const newData = {
			title: data["title"],
			body: data["body"],
			publicationStatus: data["publicationStatus"],
		};
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
		const role: string = req.user?.role as string;
		if (role !== "ADMIN" && role !== "AUTHOR") {
			res
				.status(403)
				.json("Cannot delete post if you're not an author or an admin");
			return;
		}
		const { postId } = matchedData(req);
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
