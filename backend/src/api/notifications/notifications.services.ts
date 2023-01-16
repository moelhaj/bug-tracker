import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Notification = {
	target: string;
	title: string;
	details: string;
	userId: string;
	type: string;
};

export const findById = async (userId: string) => {
	return prisma.notifications.findMany({
		where: { userId },
		orderBy: [{ createdAt: "desc" }],
	});
};

export const create = async (notification: Notification) => {
	return prisma.notifications.create({
		data: notification,
	});
};

export const readAll = async (userId: string) => {
	return prisma.notifications.updateMany({
		where: { userId },
		data: { seen: true },
	});
};
