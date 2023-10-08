import { Request, Response } from "express";
import * as services from "./stories.services";
import * as notification from "../notifications/notifications.services";

export const get = async (req: Request, res: Response) => {
	const story = await services.findById(req.params.id);
	return res.status(200).send(story);
};

export const getAll = async (req: Request, res: Response) => {
	const queries: any = {};
	const rawFilters: any = req.query.filters;
	const filters = JSON.parse(rawFilters);
	const { title, skip, take, projectId } = filters;

	title !== "" ? (queries["title"] = { contains: title, mode: "insensitive" }) : null;
	projectId !== "" ? (queries["projectId"] = projectId) : null;

	const [count, stories] = await services.find(skip, take, queries);
	return res.status(200).send({ count, stories });
};

export const create = async (req: Request, res: Response) => {
	const story = await services.create(req.body);
	notification.create({
		title: "User Story",
		type: "Story",
		details: "New User Story has been assigned to you",
		userId: story.assigneeId,
	});
	return res.status(200).send(story);
};

export const update = async (req: Request, res: Response) => {
	const story = await services.update(req.params.id, req.body);
	return res.status(200).send(story);
};
