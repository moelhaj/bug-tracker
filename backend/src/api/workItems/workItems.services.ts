import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type WorkItem = {
	title: string;
	details: string;
	state: any;
	type: string;
	assigneeId: string;
	productBacklogItemId: string;
};

export const create = async (workItem: WorkItem) => {
	return prisma.workItem.create({
		data: workItem,
	});
};

export const findById = async (id: string) => {
	return prisma.workItem.findUnique({
		where: { id },
	});
};

export const find = async () => {
	return prisma.workItem.findMany({
		orderBy: [{ createdAt: "desc" }],
	});
};

export const update = async (id: string, workItem: WorkItem) => {
	return prisma.workItem.update({
		where: { id },
		data: workItem,
	});
};
