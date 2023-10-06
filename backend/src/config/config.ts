import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../../.env") });

const config = {
	env: process.env.NODE_ENV ?? "",
	port: process.env.PORT ?? "",
	accessSecret: process.env.ACCESS_SECRET ?? "",
	emailSecret: process.env.EMAIL_SECRET ?? "",
	frontEndUrl: process.env.FRONTEND_URL ?? "",
	mail: {
		host: process.env.SMTP_HOST ?? "",
		port: process.env.SMTP_PORT ?? "",
		username: process.env.SMTP_USERNAME ?? "",
		password: process.env.SMTP_PASSWORD ?? "",
		emailFrom: process.env.EMAIL_FROM ?? "",
		secure: process.env.SMTP_TLS === "yes" ? true : false,
	},
};

export default config;
