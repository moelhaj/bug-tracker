import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Story = {
	title: string;
	details: string;
	state: any;
	assigneeId: string;
	projectId: string;
};

export const create = async (story: Story) => {
	return prisma.story.create({
		data: story,
	});
};

export const findById = async (id: string) => {
	return prisma.story.findUnique({
		where: { id },
		include: {
			assignee: true,
			workItems: {
				include: {
					assignee: true,
				},
			},
		},
	});
};

export const find = async (skip: number, take: number, queries: any) => {
	return await prisma.$transaction([
		prisma.story.count({
			where: queries,
		}),
		prisma.story.findMany({
			skip,
			take,
			where: queries,
			include: {
				assignee: true,
				_count: {
					select: { workItems: true },
				},
			},
			orderBy: [{ createdAt: "desc" }],
		}),
	]);
};

export const update = async (id: string, story: Story) => {
	return prisma.story.update({
		where: { id },
		data: story,
	});
};
