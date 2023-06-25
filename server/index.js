import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./mongodb/connect.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/game", gameRoutes);

app.get("/", async (req, res) => {
	res.send(
		"Hello from Metaverse Mayhem. This is to check whether the server is running."
	);
});

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});
httpServer.listen(8000);

const sizeOfRoom = (io, name) => {
	const room = io.sockets.adapter.rooms.get(name);

	if (room) {
		return room.size;
	}

	return 0;
}

const getSocketsInRoom = (io, name) => {
	const room = io.sockets.adapter.rooms.get(name);

	if (room) {
		return Array.from(room);
	}

	return [];
}

const isSocketInRoom = (io, roomName, clientId) => {
	const clients = getSocketsInRoom(io, roomName);

	return clients.indexOf(clientId) !== -1;
}

const connectSockets = () => {
	io.on("connection", (socket) => {
		socket.on("joinGame", async ({ gameId }) => {
			const getPlayerCount = () => sizeOfRoom(io, gameId);
			if (getPlayerCount() === 2) {
				return;
			};

			await socket.join(gameId);

			io.in(gameId).emit("playerJoined", {
				playerCount: getPlayerCount(),
			});

			console.log(
				"[GAMEJOIN] Current players:",
				getSocketsInRoom(io, gameId)
			);

			if (getPlayerCount() === 2) {
				console.log(
					"[GAMEJOIN] [START] Time to start the game",
					gameId
				);
				const playerOneStarts = Math.random() >= 0.5;
				const [playerOne, playerTwo] = getSocketsInRoom(io, gameId);
				console.log("playerOne", playerOne);
				console.log("playerTwo", playerTwo);
				io.to(playerOne).emit("newGame", {
					gameId: gameId,
					opponentName: "GuardianBanana",
					isStarting: playerOneStarts,
				});
				io.to(playerTwo).emit("newGame", {
					gameId: gameId,
					opponentName: "hello",
					isStarting: !playerOneStarts,
				});
			}
		});

		// TODO: implement leave socket logic
		socket.on("gameLeave", ({ gameId }) => {
			socket.leave(gameId);
		});

		socket.on("disconnect", function () {
			console.log("User Disconnected");
		});

		socket.on("action", (payload) => {
			console.log(payload);
			var action = payload.action;
			const gameId = payload.gameId;
			console.log(payload);
			console.log("====================================");

			console.log(
				"[ACTION] current clients:",
				getSocketsInRoom(io, gameId)
			);
			console.log(
				"[ACTION] Current action from:",
				`Player${getSocketsInRoom(io, gameId).indexOf(socket.id) + 1}`
			);

			// Validate if player is actually part of this game.
			if (!isSocketInRoom(io, gameId, socket.id)) {
				return;
			};

			let newAction = action;
			if (action.payload.target) {
				const newPayload = Object.assign({}, action.payload, {
					target:
						action.payload.target === "PLAYER"
							? "OPPONENT"
							: "PLAYER",
				});

				newAction = Object.assign({}, action, {
					payload: newPayload,
				});
			}

			if (action.payload.source) {
				const newPayload = Object.assign({}, action.payload, {
					source:
						action.payload.source === "PLAYER"
							? "OPPONENT"
							: "PLAYER",
				});

				newAction = Object.assign({}, action, {
					payload: newPayload,
				});
			}
			console.log("[ACTION] Broadcasting an action to:", gameId);
			console.log("[ACTION] Action being sent is:", newAction);
			socket.broadcast.to(gameId).emit("action", { action: newAction });
		});
	});
};

const startServer = async () => {
	try {
		// MONGODB CONNECTION
		connectDB(process.env.ATLAS_URL);

		// SERVER LISTENING
		app.listen(5000, () => {
			console.log("Server started on Port: 5000");
		});

		// SOCKET CONNECTION
		connectSockets();
	} catch (e) {
		console.log(e);
	}
};

startServer();
