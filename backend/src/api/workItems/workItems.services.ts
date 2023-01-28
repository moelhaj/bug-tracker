import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type WorkItem = {
	title: string;
	details: string;
	state: any;
	type: string;
	assigneeId: string;
	projectId: string;
};

export const create = async (workItem: WorkItem) => {
	return prisma.workItem.create({
		data: workItem,
	});
};

export const findById = async (id: string) => {
	return prisma.workItem.findUnique({
		where: { id },
		include: { assignee: true },
	});
};

export const find = async (skip: number, take: number, queries: any) => {
	return await prisma.$transaction([
		prisma.workItem.count({
			where: queries,
		}),
		prisma.workItem.findMany({
			skip,
			take,
			where: queries,
			include: { assignee: true },
			orderBy: [{ createdAt: "desc" }],
		}),
	]);
};

export const update = async (id: string, workItem: WorkItem) => {
	return prisma.workItem.update({
		where: { id },
		data: workItem,
	});
};
