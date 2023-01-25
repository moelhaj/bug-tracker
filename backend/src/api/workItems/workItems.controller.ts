import { Request, Response } from "express";
import * as services from "./workItems.services";
import * as notification from "../notifications/notifications.services";

export const get = async (req: Request, res: Response) => {
	const workItem = await services.findById(req.params.id);
	return res.status(200).send(workItem);
};

export const getAll = async (req: Request, res: Response) => {
	const workItems = await services.find();
	return res.status(200).send(workItems);
};

export const create = async (req: Request, res: Response) => {
	const workItem = await services.create(req.body);
	notification.create({
		title: "New Assignment",
		type: req.body.type,
		details: `New ${workItem.type} has been assigned to you`,
		userId: workItem.assigneeId,
	});
	return res.status(200).send(workItem);
};

export const update = async (req: Request, res: Response) => {
	const workItem = await services.update(req.params.id, req.body);
	console.log(workItem);
	return res.status(200).send(workItem);
};
