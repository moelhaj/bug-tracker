import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../../config/config";

type JwtPayload = {
	id: string;
	roles: string[];
};

// const verifyJWT = (req, res, next) => {
// 	const authHeader = req.headers.authorization || req.headers.Authorization;

// 	if (!authHeader?.startsWith("Bearer ")) {
// 		return res.status(401).json({ message: "Unauthorized" });
// 	}

// 	const token = authHeader.split(" ")[1];

// 	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
// 		if (err) return res.status(403).json({ message: "Forbidden" });
// 		req.user = decoded.UserInfo.username;
// 		req.roles = decoded.UserInfo.roles;
// 		next();
// 	});
// };

export const auth = async (req: Request, res: Response, next: NextFunction) => {
	// if (!req.header("Authorization")) return res.status(401).send("Unauthorized");
	// const token = req.header("Authorization")?.replace("Bearer ", "") ?? "";
	const rawHeader: any = req.headers.authorization || req.headers.Authorization;
	const token = rawHeader?.split(" ")[1];
	if (!token) return res.status(401).send("Unauthorized");
	try {
		const decoded = jwt.verify(token, config.accessSecret) as JwtPayload;
		req.roles = decoded.roles;
		req.id = decoded.id;
		next();
	} catch (error) {
		return res.status(403).send("Forbidden");
	}
};

export const admin = async (req: Request, res: Response, next: NextFunction) => {
	req.roles.includes("Admin") ? next() : res.status(403).send("Forbidden");
};
