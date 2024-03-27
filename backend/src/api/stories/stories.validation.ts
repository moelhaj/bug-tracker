import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const validate = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const stroySchema = Joi.object({
				title: Joi.string().required(),
				details: Joi.string().required(),
				state: Joi.string().required(),
				type: Joi.string().required(),
				assigneeId: Joi.string().required(),
				projectId: Joi.string().required(),
			});
			const stroy = {
				title: req.body.title,
				details: req.body.details,
				state: req.body.state,
				type: req.body.type,
				assigneeId: req.body.assigneeId,
				projectId: req.body.projectId,
			};
			await stroySchema.validate(req.body);
			req.body = stroy;
			next();
		} catch (error) {
			console.log(error);
			return res.status(422).send("validation error");
		}
	};
};

export default validate;
