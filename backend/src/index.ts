import "dotenv/config";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import express from "express";
import { createServer } from "node:http";
import { env } from "node:process";
import { Server } from "socket.io";
import { GamesManager } from "./GamesManager";
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

const gamesManager = new GamesManager();
const gameRestController = new GameRestController(gamesManager);
const gameSocketController = new GameSocketController(gamesManager, io);

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
    gameSocketController.joinGame(socket, gameId, playerId, playerName);
  });
  socket.on("leaveGame", (gameId, playerId) => {
    gameSocketController.leaveGame(socket, gameId, playerId);
  });
  socket.on("guessAdded", (gameId, playerId, guess) => {
    gameSocketController.addGuess(socket, gameId, playerId, guess);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
