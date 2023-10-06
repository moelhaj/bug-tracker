import config from "./config";

const allowedOrigins = [config.frontEndUrl];

const corsOptions = {
	origin: (origin: any, callback: any) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
	optionsSuccessStatus: 200,
};

export default corsOptions;
