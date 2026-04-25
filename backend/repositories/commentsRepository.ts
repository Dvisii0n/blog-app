import { prisma } from "../lib/prisma";
import type { Comment } from "../generated/prisma/client";

async function getComments(postId: string): Promise<Array<Comment>> {
	const comments: Array<Comment> = await prisma.comment.findMany({
		where: { postId: postId },
	});
	return comments;
}

async function createComment(
	commentbody: string,
	postId: string,
	authorId: string,
): Promise<void> {
	await prisma.comment.create({
		data: { body: commentbody, postId: postId, authorId: authorId },
	});
}

async function updateComment(
	commentId: string,
	newData: Object,
	userId: string,
): Promise<void> {
	await prisma.comment.update({
		data: newData,
		where: { id: commentId, AND: { authorId: userId } },
	});
}

async function deleteComment(commentId: string, userId: string): Promise<void> {
	await prisma.comment.delete({
		where: { id: commentId, AND: { authorId: userId } },
	});
}

export default { getComments, createComment, updateComment, deleteComment };
