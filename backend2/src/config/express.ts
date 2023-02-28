import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import express from "express";
import { Request, Response } from "express";
import corsOptions from "./cors";
import routes from "../api";
import path from "path";
const app = express();

app.use(
	cors({
		credentials: true,
		origin: true,
	})
);
// app.use(cors(corsOptions));
app.use(helmet());
app.use(fileUpload());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routing
app.use("/api", routes);
app.use("*", (req: Request, res: Response) => res.status(404).send("Not Found"));
// app.get("*", async (req: Request, res: Response) => {
// 	res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.use((err: any, req: Request, res: Response) => {
	console.log(err);
	const { statusCode = 500 } = err;
	if (!err.message) err.message = "500 Internal Server Error";
	res.status(statusCode).send(err);
});

export default app;
