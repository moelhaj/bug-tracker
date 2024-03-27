import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const find = async () => {
	return prisma.user.findMany({
		include: { projects: true },
	});
};

export const findByEmail = async (email: string) => {
	return prisma.user.findUnique({
		where: { email },
	});
};

export const findById = async (id: string) => {
	return prisma.user.findUnique({
		where: { id },
	});
};

export const create = async (user: any) => {
	return prisma.user.create({
		data: user,
	});
};
