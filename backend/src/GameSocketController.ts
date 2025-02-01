import { GameController } from "./GameController";

export class GameSocketController {
  private gameController: GameController;
  constructor(gameController: GameController) {
    this.gameController = gameController;
  }

  joinGame(gameId: string, playerId: string, playerName: string) {
    this.gameController.addPlayerToGame(gameId, playerId, playerName);
  }
}
