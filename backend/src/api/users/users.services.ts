import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const find = async () => {
	return prisma.user.findMany();
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
