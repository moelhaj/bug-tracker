import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const validate = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const workItemSchema = Joi.object({
				title: Joi.string().required(),
				details: Joi.string().required(),
				status: Joi.string().required(),
				type: Joi.string().required(),
				assigneeId: Joi.string().required(),
				assigneeName: Joi.allow(null),
				projectId: Joi.string().required(),
			});
			const workItem = {
				title: req.body.title,
				details: req.body.details,
				status: req.body.status,
				type: req.body.type,
				assigneeId: req.body.assigneeId,
				projectId: req.body.projectId,
			};
			await workItemSchema.validate(req.body);
			req.body = workItem;
			next();
		} catch (error) {
			console.log(error);
			return res.status(422).send("validation error");
		}
	};
};

export default validate;
