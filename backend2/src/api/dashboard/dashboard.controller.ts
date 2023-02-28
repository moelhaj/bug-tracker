import { Request, Response } from "express";
import * as services from "./dashboard.services";

export const getAll = async (req: Request, res: Response) => {
	const result: any = {};
	result.projectsCount = await services.projectsCount();
	result.storiesCount = await services.storiesCount();
	result.bugCount = await services.bugCount();
	result.taskCount = await services.taskCount();
	result.stories = await services.getStories(3);
	result.bugs = await services.getBugs(3);
	result.tasks = await services.getTasks(3);
	return res.status(200).send(result);
};
