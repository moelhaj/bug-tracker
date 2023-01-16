import { Request, Response } from "express";
import * as services from "./projects.services";
import { findById } from "../users/users.services";

export const get = async (req: Request, res: Response) => {
	const project = await services.findById(req.params.id);
	return res.status(200).send(project);
};

// export const getAll = async (req: Request, res: Response) => {
// 	const projects = await services.find();
// 	return res.status(200).send(projects);
// };

export const getAll = async (req: Request, res: Response) => {
	const queries: any = {};
	const rawFilters: any = req.query.filters;
	const filters = JSON.parse(rawFilters);
	const { title, skip, take } = filters;

	title !== "" ? (queries["title"] = { contains: title, mode: "insensitive" }) : null;

	const [count, projects] = await services.find(skip, take, queries);
	return res.status(200).send({ count, projects });
};

export const create = async (req: Request, res: Response) => {
	const project = await services.create(req.body);
	return res.status(200).send(project);
};

export const update = async (req: Request, res: Response) => {
	const project = await services.update(req.params.id, req.body);
	return res.status(200).send(project);
};
