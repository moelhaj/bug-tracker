import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getProjectsCount = async () => {
	return prisma.project.count();
};

export const getWorkItemsCount = async () => {
	return prisma.workItem.count();
};

export const pbiCount = async () => {
	return prisma.workItem.count({
		where: { type: "PBI" },
	});
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

// assigned to me
export const assignedToMe = async (userId: string) => {
	return prisma.workItem.findMany({
		where: { assigneeId: userId },
		include: { assignee: true },
		orderBy: [{ createdAt: "desc" }],
	});
};

// work items status
