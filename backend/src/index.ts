import http from "http";
import app from "./config/express";
import config from "./config/config";
// import { Server } from "socket.io";

const server = http.createServer(app);
server.listen(config.port, () => {
	console.log(`server in ${config.env} at port: ${config.port}`);
});

// Handling Exceptions
const exitHandler = (error: any) => {
	console.error(error);
	process.exit(1);
};

process.on("uncaughtException", exitHandler);
process.on("unhandledRejection", exitHandler);
