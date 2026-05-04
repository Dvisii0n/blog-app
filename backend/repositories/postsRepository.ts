import type { Post, PublicationStatus } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

async function getPosts(): Promise<Array<Post>> {
	const posts: Array<Post> = await prisma.post.findMany({
		include: { author: { select: { username: true } } },
	});
	return posts;
}

async function createPost(
	title: string,
	body: string,
	description: string,
	publicationStatus: PublicationStatus,
	userId: string,
): Promise<void> {
	await prisma.post.create({
		data: {
			title: title,
			body: body,
			description: description,
			publicationStatus: publicationStatus,
			authorId: userId,
		},
	});
}

async function getPost(postId: string): Promise<Post | null> {
	const post: Post | null = await prisma.post.findUnique({
		where: { id: postId },
	});
	return post;
}

async function updatePost(
	postId: string,
	newData: Object,
	userId: string,
): Promise<void> {
	await prisma.post.update({
		data: newData,
		where: { id: postId, AND: { authorId: userId } },
	});
}

async function deletePost(postId: string, userId: string): Promise<void> {
	await prisma.post.delete({
		where: { id: postId, AND: { authorId: userId } },
	});
}

export default { getPosts, createPost, getPost, updatePost, deletePost };
