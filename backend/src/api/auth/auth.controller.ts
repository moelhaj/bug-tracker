import { Request, Response } from "express";
import * as services from "../users/users.services";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import config from "../../config/config";

type JwtPayload = {
	id: string;
	roles: string[];
};

// export const login = async (req: Request, res: Response) => {
// 	console.log(req.body);
// 	const { email, password } = req.body;
// 	const user = await services.findByEmail(email);
// 	if (!user || !(await argon2.verify(user?.password, password)))
// 		return res.status(400).send("Wrong Credentials");

// 	const token = jwt.sign({ id: user?.id, roles: user?.roles }, config.accessSecret);

// 	return res.status(200).send({ user, token });
// };

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await services.findByEmail(email);
	if (!user || !(await argon2.verify(user?.password, password)))
		return res.status(400).send("Wrong Credentials");

	const token = jwt.sign({ id: user?.id, roles: user?.roles }, config.accessSecret);
	const returnedUser = {
		email: user.email,
		id: user.id,
		name: user.name,
		projectIDs: user.projectIDs,
		roles: user.roles,
		title: user.title,
	};

	// const accessToken = jwt.sign({ id: user?.id, roles: user?.roles }, config.accessSecret, {
	// 	expiresIn: "1m",
	// });
	// const refreshToken = jwt.sign({ id: user?.id, roles: user?.roles }, config.refreshSecret, {
	// 	expiresIn: "30d",
	// });
	// // Create secure cookie with refresh token
	// res.cookie("jwt", refreshToken, {
	// 	httpOnly: true, //accessible only by web server
	// 	secure: true,
	// 	sameSite: "none", //cross-site cookie
	// 	maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
	// });
	return res.status(200).send({ user: returnedUser, token });
};

export const refresh = async (req: Request, res: Response) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.status(401).send("Unauthorized");
	const refreshToken = cookies.jwt;
	const decoded = jwt.verify(refreshToken, config.accessSecret) as JwtPayload;
	const user = await services.findById(decoded.id);
	if (!user) return res.status(401).send("Unauthorized");
	const accessToken = jwt.sign({ id: user?.id, roles: user?.roles }, config.accessSecret, {
		expiresIn: "1m",
	});
	return res.status(200).send(accessToken);
};

export const verify = async (req: Request, res: Response) => {
	if (!req.header("Authorization")) return res.status(401).send("Unauthorized");
	const token = req.header("Authorization")?.replace("Bearer ", "") ?? "";
	try {
		jwt.verify(token, config.accessSecret) as JwtPayload;
		return res.status(200).send("Authenticated");
	} catch (error) {
		return res.status(401).send("Access denied");
	}
};

export const logout = (req: Request, res: Response) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204);
	// add secure: true to object below
	res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
	res.send("Cookie cleared");
};
