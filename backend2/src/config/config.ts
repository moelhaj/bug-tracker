import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../../.env") });

const config = {
	env: process.env.NODE_ENV ?? "",
	port: process.env.PORT ?? "",
	database: process.env.DATABASE_URL ?? "",
	backendUrl: process.env.BACKEND_URL ?? "",
	frontendUrl: process.env.FRONTEND_URL ?? "",
	accessSecret: process.env.ACCESS_SECRET ?? "",
	refreshSecret: process.env.REFRESH_SECRET ?? "",
};

export default config;
