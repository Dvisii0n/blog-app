import { prisma } from "../lib/prisma";
import type { User } from "../generated/prisma/client";

async function createUser(
	username: string,
	email: string,
	passwordHash: string,
): Promise<void> {
	await prisma.user.create({
		data: { username: username, email: email, password: passwordHash },
	});
}

async function getUser(username: string): Promise<User | null> {
	const user: User | null = await prisma.user.findUnique({
		where: { username: username },
	});

	return user;
}

async function getUserByEmail(email: string): Promise<User | null> {
	const user: User | null = await prisma.user.findUnique({
		where: { email: email },
	});

	return user;
}

async function getUsers(): Promise<Array<Object>> {
	const users: Array<Object> = await prisma.user.findMany();
	return users;
}

async function updateOwnUser(
	userId: string,
	reqUserId: string,
	newData: Object,
): Promise<void> {
	await prisma.user.update({
		data: newData,
		where: {
			id: userId,
			AND: { id: reqUserId },
		},
	});
}

async function updateUserAsAdmin(
	userId: string,
	newData: Object,
): Promise<void> {
	await prisma.user.update({
		data: newData,
		where: {
			id: userId,
		},
	});
}

export default {
	createUser,
	getUser,
	getUserByEmail,
	updateOwnUser,
	updateUserAsAdmin,
	getUsers,
};
