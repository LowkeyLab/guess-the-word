import "dotenv/config";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import express, { Request, Response } from "express";
import { createServer } from "node:http";
import { env } from "node:process";
import { Server } from "socket.io";
import { GameController } from "./GameController";
import { GameRestController } from "./GameRestController";
import { GameSocketController } from "./GameSocketController";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "@common/index";
import helmet from "helmet";

const app = express();
app.use(
  helmet(),
  cors({
    origin: `${env.FRONTEND_URL!}`,
  })
);

const supabase = createClient(
  env.SUPABASE_URL!,
  env.SUPABASE_SERVICE_ROLE_KEY!
);
const server = createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: `${env.FRONTEND_URL!}`,
  },
});

const gameController = new GameController();
const gameRestController = new GameRestController(gameController);
const gameSocketController = new GameSocketController(gameController);

app.get("/healthcheck", (req, res) => {
  res.end("ok");
});

app.get("/games", (req, res) => {
  gameRestController.getGamesHandler(req, res);
});

app.post("/games", (req, res) => {
  gameRestController.postGamesHandler(req, res);
});

io.on("connection", (socket) => {
  socket.on("joinGame", (gameId, playerId, playerName) => {
    gameSocketController.joinGame(gameId, playerId, playerName);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
