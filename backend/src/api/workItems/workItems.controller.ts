import { Request, Response } from "express";
import * as services from "./workItems.services";
import * as notification from "../notifications/notifications.services";

export const create = async (req: Request, res: Response) => {
	const workItem = await services.create(req.body);
	notification.create({
		title: `New ${workItem.type}`,
		type: req.body.type,
		details: `New ${workItem.type} has been assigned to you`,
		userId: workItem.assigneeId,
	});
	return res.status(200).send(workItem);
};

export const update = async (req: Request, res: Response) => {
	const workItem = await services.update(req.params.id, req.body);
	return res.status(200).send(workItem);
};
