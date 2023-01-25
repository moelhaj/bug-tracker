import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type ProductBacklogItem = {
	title: string;
	details: string;
	state: any;
	assigneeId: string;
	projectId: string;
	tag?: string;
};

export const create = async (productBacklogItem: ProductBacklogItem) => {
	return prisma.productBacklogItem.create({
		data: productBacklogItem,
	});
};

export const find = async (skip: number, take: number, queries: any) => {
	return await prisma.$transaction([
		prisma.productBacklogItem.count({
			where: queries,
		}),
		prisma.productBacklogItem.findMany({
			skip,
			take,
			where: queries,
			include: { workItems: true, assignee: true },
			orderBy: [{ createdAt: "desc" }],
		}),
	]);
};

export const findById = async (id: string) => {
	return prisma.productBacklogItem.findUnique({
		where: { id },
		include: { workItems: true, assignee: true },
	});
};

export const update = async (id: string, productBacklogItem: ProductBacklogItem) => {
	return prisma.productBacklogItem.update({
		where: { id },
		data: productBacklogItem,
	});
};
