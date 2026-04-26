import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const validationErrorsHandler = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json(errors.array());
		return;
	}

	next();
};

export { validationErrorsHandler };
