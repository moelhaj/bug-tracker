export {};

declare global {
	namespace Express {
		interface Request {
			id: string;
			roles: string[];
			users: string[];
			filters: any;
			// userId: string;
			// user: string;
			// result: any;
			// docs: any;
			// fileNames: any;
		}
	}
}
