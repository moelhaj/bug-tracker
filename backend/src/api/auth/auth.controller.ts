import { Request, Response } from "express";
import * as services from "../users/users.services";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import config from "../../config/config";

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
		roles: user.roles,
		title: user.title,
	};
	return res.status(200).send({ user: returnedUser, token });
};

export const register = async (req: Request, res: Response) => {
	const password = await argon2.hash(req.body.password);
	const user = {
		email: req.body.email,
		password,
		name: req.body.name,
		roles: req.body.roles,
		title: req.body.title,
	};
	await services.create(user);
	return res.status(200).send("Registered");
};
