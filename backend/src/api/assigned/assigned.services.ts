import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const find = async (userId: string) => {
	return prisma.workItem.findMany({
		where: { assigneeId: userId },
		orderBy: [{ createdAt: "desc" }],
	});
};
