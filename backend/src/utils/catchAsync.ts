/* eslint-disable indent */
import { Request, Response, NextFunction } from "express";

const catchAsync =
	(fn: any): any =>
	(req: Request, res: Response, next: NextFunction) =>
		Promise.resolve(fn(req, res, next)).catch(next);

export default catchAsync;
