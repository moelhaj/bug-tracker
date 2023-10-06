import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const validate = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const expenseSchema = Joi.object({
				title: Joi.string().required(),
				details: Joi.string().required(),
				amount: Joi.string().required(),
				category: Joi.string().required(),
				userId: Joi.string().required(),
			});
			const expense = {
				title: req.body.title,
				details: req.body.details,
				amount: req.body.amount,
				category: req.body.category,
				userId: req.body.userId,
			};
			await expenseSchema.validate(req.body);
			req.body = expense;
			next();
		} catch (error) {
			console.log(error);
			return res.status(422).send("validation error");
		}
	};
};

export default validate;
