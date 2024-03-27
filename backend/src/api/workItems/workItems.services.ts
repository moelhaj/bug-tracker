import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type WorkItem = {
	title: string;
	details: string;
	state: any;
	type: string;
	assigneeId: string;
	storyId: string;
};

export const create = async (workItem: WorkItem) => {
	return prisma.workItem.create({
		data: workItem,
	});
};

export const update = async (id: string, workItem: WorkItem) => {
	return prisma.workItem.update({
		where: { id },
		data: workItem,
	});
};
