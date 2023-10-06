import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const validate = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userSchema = Joi.object({
				name: Joi.string().required(),
				email: Joi.string().email().required(),
				password: Joi.string().required(),
			});
			const user = {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			};
			await userSchema.validate(req.body);
			req.body = user;
			next();
		} catch (error) {
			console.log(error);
			return res.status(422).send("validation error");
		}
	};
};

export default validate;
