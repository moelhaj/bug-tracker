import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../../config/config";

type JwtPayload = {
	id: string;
	roles: string[];
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
	const rawHeader: any = req.headers.authorization || req.headers.Authorization;
	const token = rawHeader?.split(" ")[1];
	if (!token) return res.status(401).send("Unauthorized");
	try {
		const decoded = jwt.verify(token, config.accessSecret) as JwtPayload;
		req.id = decoded.id;
		next();
	} catch (error) {
		return res.status(403).send("Forbidden");
	}
};
