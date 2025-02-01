import { GamesManager } from "./GamesManager";
import { Request, Response } from "express";

export class GameRestController {
  private gamesManager: GamesManager;

  constructor(gamesManager: GamesManager) {
    this.gamesManager = gamesManager;
  }

  getGamesHandler(req: Request, res: Response) {
    const { available } = req.query;
    if (available) {
      const availableGame = this.gamesManager.getAvailableGame();
      res.json(availableGame);
    } else {
      res.status(500).json({ error: "Invalid query" });
    }
  }

  postGamesHandler(req: Request, res: Response) {
    const game = this.gamesManager.createGame();
    res.json(game);
  }
}
