import { Request, Response } from "express";
import * as services from "./assigned.services";

export const getAll = async (req: Request, res: Response) => {
	const result = await services.assignedToMe(req.id);
	return res.status(200).send(result);
};
