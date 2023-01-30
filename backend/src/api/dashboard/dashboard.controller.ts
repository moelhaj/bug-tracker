import { Request, Response } from "express";
import * as services from "./dashboard.services";

export const getAll = async (req: Request, res: Response) => {
	const result: any = {};
	result.projectsCount = await services.getProjectsCount();
	result.bugCount = await services.bugCount();
	result.taskCount = await services.taskCount();
	result.bugs = await services.getBugs(3);
	result.tasks = await services.getTasks(3);
	return res.status(200).send(result);
};
