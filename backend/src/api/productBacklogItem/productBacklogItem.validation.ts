import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const validate = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const productBacklogItemSchema = Joi.object({
				title: Joi.string().required(),
				details: Joi.string().required(),
				state: Joi.string().required(),
				assigneeId: Joi.string().required(),
				assigneeName: Joi.allow(null),
				projectId: Joi.string().required(),
				tag: Joi.allow(null),
			});
			const productBacklogItem = {
				title: req.body.title,
				details: req.body.details,
				state: req.body.state,
				assigneeId: req.body.assigneeId,
				projectId: req.body.projectId,
				tag: req.body.tag,
			};
			await productBacklogItemSchema.validate(req.body);
			req.body = productBacklogItem;
			next();
		} catch (error) {
			console.log(error);
			return res.status(422).send("validation error");
		}
	};
};

export default validate;
