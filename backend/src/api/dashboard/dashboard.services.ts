import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const projectsCount = async () => {
	return prisma.project.count();
};

export const storiesCount = async () => {
	return prisma.story.count();
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

export const getStories = async (take: number) => {
	return prisma.story.findMany({
		take,
		include: { assignee: true },
		orderBy: [{ createdAt: "desc" }],
	});
};

export const getBugs = async (take: number) => {
	return prisma.workItem.findMany({
		take,
		where: { type: "Bug" },
		include: { assignee: true },
		orderBy: [{ createdAt: "desc" }],
	});
};

export const getTasks = async (take: number) => {
	return prisma.workItem.findMany({
		take,
		where: { type: "Task" },
		include: { assignee: true },
		orderBy: [{ createdAt: "desc" }],
	});
};
