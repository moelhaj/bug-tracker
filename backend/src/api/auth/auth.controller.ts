import { Request, Response } from "express";
import * as services from "../users/user.services";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import sendEmail from "../../utils/sendEmail";

type JwtPayload = {
	id: string;
	roles: string[];
	email: string;
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await services.findByEmail(email);
	if (!user || !(await argon2.verify(user?.password, password)))
		return res.status(400).send("Wrong Credentials");

	const token = jwt.sign({ id: user?.id }, config.accessSecret, {
		expiresIn: "1h",
	});
	const returnedUser = {
		id: user.id,
		email: user.email,
		name: user.name,
	};
	return res.status(200).send({ user: returnedUser, token });
};

export const register = async (req: Request, res: Response) => {
	let user: any = await services.findByEmail(req.body.email);
	if (user) return res.status(409).send("Account already exist");
	const password = await argon2.hash(req.body.password);
	user = {
		name: req.body.name,
		email: req.body.email,
		password,
	};
	const registeredUser = await services.create(user);
	const returnedUser = {
		id: registeredUser.id,
		email: registeredUser.email,
		name: registeredUser.name,
	};
	return res.status(200).send({ user: returnedUser });
};

export const sendForgetPasswordEmail = async (req: Request, res: Response) => {
	const { email } = req.body;
	const token = jwt.sign({ email }, config.emailSecret, { expiresIn: "5m" });
	const targetLink = `${config.frontEndUrl}/reset-password/${token}`;
	const subject = "Reset Password";
	const html = `Please follow the below link to reset your password <br /> ${targetLink}`;
	sendEmail(email, subject, html);
	return res.status(200).send("Success");
};

export const resetPassword = async (req: Request, res: Response) => {
	const { email } = req.body;
	const user = await services.findByEmail(email);
	if (!user) return res.status(400).send("Wrong Credentials");
	const password = await argon2.hash(req.body.password);
	const updatedUser = {
		name: user.name,
		email: user.email,
		password,
	};
	await services.update(updatedUser);
	return res.status(200).send("Success");
};

export const verifyToken = async (req: Request, res: Response) => {
	const { token } = req.body;
	try {
		const decoded = jwt.verify(token, config.emailSecret) as JwtPayload;
		return res.status(200).send(decoded.email);
	} catch (error) {
		return res.status(403).send("Forbidden");
	}
};
