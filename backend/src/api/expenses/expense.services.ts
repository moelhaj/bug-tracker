import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Expense = {
	id?: string;
	title: string;
	details: string;
	amount: string;
	category: string;
	userId: string;
};

export const create = async (expense: Expense) => {
	return prisma.expense.create({
		data: expense,
	});
};

export const findById = async (id: string) => {
	return prisma.expense.findUnique({
		where: { id },
	});
};

export const update = async (id: string, expense: Expense) => {
	return prisma.expense.update({
		where: { id },
		data: expense,
	});
};

export const remove = async (id: string) => {
	return prisma.expense.delete({
		where: { id: id },
	});
};

export const filter = async (queries: any) => {
	return prisma.expense.findMany({
		where: queries,
		orderBy: [{ createdAt: "desc" }],
	});
};
