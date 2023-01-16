// import { Request, Response, NextFunction } from "express";

// const filter = async (req: Request, res: Response, next: NextFunction) => {
// 	const queries: any = {};
// 	const rawFilters: any = req.query.filters;
// 	const filters = JSON.parse(rawFilters);

// 	const { startDate, endDate, inProcess, archived, canceled, search, page, take } = filters;

// 	if (search !== "") {
// 		if (search) {
// 			queries["vehicle"] = { plateNumber: { contains: search } };
// 		} else {
// 			queries["employee"] = { name: { contains: search } };
// 		}
// 	}

// 	queries["OR"] = [];
// 	inProcess ? queries.OR.push({ active: true }) : null;
// 	archived ? queries.OR.push({ archived: true }) : null;
// 	canceled ? queries.OR.push({ canceled: true }) : null;

// 	if (startDate && startDate !== 0 && startDate !== "") {
// 		queries["assignmentStartDate"] = {
// 			gte: `${startDate.slice(0, 11)}T00:00:00.000Z`,
// 		};
// 	}

// 	if (endDate && endDate !== 0 && endDate !== "") {
// 		queries["assignmentStartDate"] = {
// 			lte: `${endDate.slice(0, 11)}T22:59:59.000Z`,
// 		};
// 	}

// 	if (
// 		startDate &&
// 		startDate !== 0 &&
// 		startDate !== "" &&
// 		endDate &&
// 		endDate !== 0 &&
// 		endDate !== ""
// 	) {
// 		queries["assignmentStartDate"] = {
// 			gte: `${startDate.slice(0, 11)}T00:00:00.000Z`,
// 			lte: `${endDate.slice(0, 11)}T22:59:59.000Z`,
// 		};
// 	}

// 	req.filters = {
// 		skip: parseInt(page) === 0 ? parseInt(page) : parseInt(page) * parseInt(take),
// 		take: parseInt(take),
// 		queries,
// 	};

// 	next();
// };

// export default filter;
