import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const validate = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const projectSchema = Joi.object({
				title: Joi.string().required(),
				details: Joi.string().required(),
				startDate: Joi.date().required(),
				endDate: Joi.date().required(),
				users: Joi.array().required(),
			});
			const project = {
				title: req.body.title,
				details: req.body.details,
				startDate: new Date(req.body.startDate),
				endDate: new Date(req.body.endDate),
				usersIDs: req.body.users,
			};
			await projectSchema.validate(req.body);
			req.body = project;
			next();
		} catch (error) {
			console.log(error);
			return res.status(422).send("validation error");
		}
	};
};

export default validate;
