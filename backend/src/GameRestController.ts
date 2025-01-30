import { GameController } from "./GameController";
import { Request, Response } from "express";

export class GameRestController {
  private gameController: GameController;

  constructor(gameController: GameController) {
    this.gameController = gameController;
  }

  getGamesHandler(req: Request, res: Response) {
    const { available } = req.query;
    if (available) {
      const availableGame = this.gameController.getAvailableGame();
      res.json(availableGame);
    } else {
      res.status(500).json({ error: "Invalid query" });
    }
  }

  postGamesHandler(req: Request, res: Response) {
    const game = this.gameController.createGame();
    res.json(game);
  }
}
