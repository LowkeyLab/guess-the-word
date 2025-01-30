import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import express, { Request, Response } from "express";
import { createServer } from "node:http";
import { env } from "node:process";
import { Server } from "socket.io";
import { Game, GameService } from "./GameService";
import { GameController } from "./GameController";

const app = express();

const supabase = createClient(
  env.SUPABASE_URL!,
  env.SUPABASE_SERVICE_ROLE_KEY!
);
const server = createServer(app);
const io = new Server(server);
const gameController = new GameController(new GameService());

interface GameRequestQuery {
  available: boolean | undefined;
}

app.get("/healthcheck", (req, res) => {
  res.end("ok");
});

async function getGamesHandler(
  req: Request<{}, {}, {}, GameRequestQuery>,
  res: Response
) {
  const { available } = req.query;
  if (available) {
    const availableGame = gameController.getAvailableGame();
    if (availableGame) {
      res.json(availableGame);
    } else {
      res.json(null);
    }
  } else {
    res.status(500).json({ error: "Invalid query" });
  }
}

app.get("/games", getGamesHandler);

app.post("/games", (req, res) => {
  const game = gameController.createGame();
  res.json(game);
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
