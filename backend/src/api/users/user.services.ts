import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type User = {
	name: string;
	email: string;
	password: string;
};

export const findByEmail = async (email: string) => {
	return prisma.user.findUnique({
		where: { email },
	});
};

export const findById = async (id: string) => {
	return prisma.user.findUnique({
		where: { id },
		include: { expenses: true },
	});
};

export const create = async (user: User) => {
	return prisma.user.create({
		data: user,
	});
};

export const update = async (user: User) => {
	return prisma.user.update({
		where: { email: user.email },
		data: user,
	});
};
