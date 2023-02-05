import { Request, Response } from "express";
import * as services from "./assigned.services";

export const getAll = async (req: Request, res: Response) => {
	const workItems = await services.find(req.id);
	return res.status(200).send(workItems);
};
