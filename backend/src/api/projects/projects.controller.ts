import { Request, Response } from "express";
import * as services from "./projects.services";

export const get = async (req: Request, res: Response) => {
	const project = await services.findById(req.params.id);
	return res.status(200).send(project);
};

export const getAll = async (req: Request, res: Response) => {
	const projects = await services.find();
	return res.status(200).send(projects);
};

export const create = async (req: Request, res: Response) => {
	const project = await services.create(req.body);
	return res.status(200).send(project);
};

export const update = async (req: Request, res: Response) => {
	const project = await services.update(req.params.id, req.body);
	return res.status(200).send(project);
};
