import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// assigned to me
export const assignedToMe = async (userId: string) => {
	return prisma.workItem.findMany({
		where: { assigneeId: userId },
		include: { assignee: true },
		orderBy: [{ createdAt: "desc" }],
	});
};

// work items status
