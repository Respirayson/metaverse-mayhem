import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./mongodb/connect.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("/", async (req, res) => {
  res.send(
    "Hello from Metaverse Mayhem. This is to check whether the server is running."
  );
});

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", function () {
    console.log("User Disconnected");
  });

  socket.on("play_card", (payload) => {
    console.log("play_card", payload.payload.card);

    socket.emit("play_card", payload.payload);
  });
});
httpServer.listen(8000);

const startServer = async () => {
  try {
    // MONGODB CONNECTION
    connectDB(process.env.ATLAS_URL);

    // SERVER LISTENING
    app.listen(5000, () => {
      console.log("Server started on Port: 5000");
    });

    // SOCKET CONNECTION
    io.on("connection", (socket) => {
      console.log("Socket connected: " + socket.id);

      socket.on("send_message", (data) => {
        io.emit("message", data);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected: " + socket.id);
      });
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();
