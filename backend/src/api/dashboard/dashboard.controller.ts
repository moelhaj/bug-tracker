import { Request, Response } from "express";
import * as services from "./dashboard.services";

export const getAll = async (req: Request, res: Response) => {
	const result: any = {};
	result.projectsCount = await services.getProjectsCount();
	result.bugCount = await services.bugCount();
	result.taskCount = await services.taskCount();
	return res.status(200).send(result);
};
