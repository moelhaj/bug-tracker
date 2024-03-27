import { Request, Response } from "express";
import * as services from "./users.services";

export const getAll = async (req: Request, res: Response) => {
	const employees = await services.find();
	return res.status(200).send(employees);
};

export const get = async (req: Request, res: Response) => {
	const employee = await services.findById(req.params.id);
	return res.status(200).send(employee);
};
