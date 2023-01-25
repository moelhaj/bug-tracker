import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getProjectsCount = async () => {
	return prisma.project.count();
};

export const pbiCount = async () => {
	return prisma.productBacklogItem.count();
};

export const bugCount = async () => {
	return prisma.workItem.count({
		where: { type: "Bug" },
	});
};

export const taskCount = async () => {
	return prisma.workItem.count({
		where: { type: "Task" },
	});
};
