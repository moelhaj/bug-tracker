import { Request, Response } from "express";
import * as services from "./notifications.services";

export const getAll = async (req: Request, res: Response) => {
	const notifications = await services.findById(req.id);
	return res.status(200).send(notifications);
};

export const readAll = async (req: Request, res: Response) => {
	const notification = await services.readAll(req.id);
	return res.status(200).send(notification);
};
