import http from "http";
import app from "./config/express";
import config from "./config/config";
import { Server } from "socket.io";

// Scheduler
// import { vehicleScheduler } from "./utils/vehicleScheduler";
// vehicleScheduler();

const server = http.createServer(app);
server.listen(config.port, () => {
	console.log(`server in ${config.env} at port: ${config.port}`);
});

// Notification Server
const io = new Server(server, {
	cors: {
		origin: config.frontendUrl,
	},
});

let connections: Array<{ socketId: string; id: string }> = [];

io.sockets.on("connection", socket => {
	socket.on("init", id => {
		const result = connections.filter((con: any) => con.id === id);
		if (result.length > 0) {
			connections = connections.filter(connection => connection.id !== id);
		}

		if (socket.id) {
			connections.push({ id, socketId: socket.id });
		}
	});
	socket.on("notify", id => {
		const recipient = connections.find(user => user.id === id);
		if (recipient?.socketId) {
			io.to(recipient.socketId).emit("check");
		}
	});
	socket.on("logout", () => {
		connections = connections.filter(connection => connection.socketId !== socket.id);
	});
});

// Handling Exceptions
const exitHandler = (error: any) => {
	console.error(error);
	process.exit(1);
};

process.on("uncaughtException", exitHandler);
process.on("unhandledRejection", exitHandler);
