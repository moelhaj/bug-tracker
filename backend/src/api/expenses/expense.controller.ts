import { Request, Response } from "express";
import * as services from "./expense.services";
import * as userServices from "../users/user.services";

export const getAll = async (req: Request, res: Response) => {
	const userExpenses = await userServices.findById(req.id);
	return res.status(200).send(userExpenses?.expenses);
};

export const get = async (req: Request, res: Response) => {
	const expense = await services.findById(req.params.id);
	return res.status(200).send(expense);
};

export const create = async (req: Request, res: Response) => {
	const expense = await services.create(req.body);
	return res.status(200).send(expense);
};

export const update = async (req: Request, res: Response) => {
	const expense = await services.update(req.body.id, {
		title: req.body.title,
		details: req.body.details,
		amount: req.body.amount,
		category: req.body.category,
		userId: req.body.userId,
	});
	return res.status(200).send(expense);
};

export const remove = async (req: Request, res: Response) => {
	await services.remove(req.params.id);
	return res.status(200).send("success");
};

export const filter = async (req: Request, res: Response) => {
	const { startDate, endDate } = req.body;
	const queries: any = {};
	queries["createdAt"] = {
		gte: new Date(`${startDate.slice(0, 11)}00:00:00.000Z`),
		lte: new Date(`${endDate.slice(0, 11)}22:59:59.000Z`),
	};

	const expenses = await services.filter(queries);
	return res.status(200).send(expenses);
};
