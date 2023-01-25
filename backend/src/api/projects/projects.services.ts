import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Project = {
	title: string;
	details: string;
	startDate: Date;
	endDate: Date;
	state: any;
};

export const create = async (project: Project) => {
	return prisma.project.create({
		data: project,
	});
};

export const findById = async (id: string) => {
	return prisma.project.findUnique({
		where: { id },
		include: { users: true },
	});
};

export const find = async () => {
	return prisma.project.findMany({
		include: { users: true, productBacklogItems: true },
		orderBy: [{ createdAt: "desc" }],
	});
};

export const update = async (id: string, project: Project) => {
	return prisma.project.update({
		where: { id },
		data: project,
	});
};
