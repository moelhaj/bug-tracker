import { Request, Response } from "express";
import * as services from "./productBacklogItem.services";
import * as notification from "../notifications/notifications.services";

export const get = async (req: Request, res: Response) => {
	const productBacklogItem = await services.findById(req.params.id);
	return res.status(200).send(productBacklogItem);
};

export const getAll = async (req: Request, res: Response) => {
	const queries: any = {};
	const rawFilters: any = req.query.filters;
	const filters = JSON.parse(rawFilters);
	const { title, skip, take, projectId } = filters;

	title !== "" ? (queries["title"] = { contains: title, mode: "insensitive" }) : null;
	projectId !== "" ? (queries["projectId"] = projectId) : null;

	const [count, items] = await services.find(skip, take, queries);
	return res.status(200).send({ count, items });
};

export const create = async (req: Request, res: Response) => {
	const productBacklogItem = await services.create(req.body);
	notification.create({
		title: "New PBI",
		type: "PBI",
		details: "New Product Backlog Item has been assigned to you",
		userId: productBacklogItem.assigneeId,
	});
	return res.status(200).send(productBacklogItem);
};

export const update = async (req: Request, res: Response) => {
	const productBacklogItem = await services.update(req.params.id, req.body);
	return res.status(200).send(productBacklogItem);
};
