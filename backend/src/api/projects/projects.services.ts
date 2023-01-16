import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Project = {
	title: string;
	details: string;
	startDate: Date;
	endDate: Date;
	ownerId: string;
	status: any;
};

export const create = async (project: Project) => {
	return prisma.project.create({
		data: project,
		include: { workItems: { include: { assignee: true } }, users: true },
	});
};

export const findById = async (id: string) => {
	return prisma.project.findUnique({
		where: { id },
		include: { workItems: { include: { assignee: true } }, users: true },
	});
};

// export const find = () => {
// 	return prisma.project.findMany({
// 		include: { workItems: { include: { assignee: true } }, users: true },
// 		orderBy: [{ createdAt: "desc" }],
// 	});
// };

export const find = async (skip: number, take: number, queries: any) => {
	return await prisma.$transaction([
		prisma.project.count({
			where: queries,
		}),
		prisma.project.findMany({
			skip,
			take,
			where: queries,
			include: { workItems: { include: { assignee: true } }, users: true },
			orderBy: [{ createdAt: "desc" }],
		}),
	]);
};

export const update = async (id: string, project: Project) => {
	return prisma.project.update({
		where: { id },
		data: project,
	});
};
