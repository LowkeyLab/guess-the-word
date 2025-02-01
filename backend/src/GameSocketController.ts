import { GameController } from "./GameController";

export class GameSocketController {
  private gameController: GameController;
  constructor(gameController: GameController) {
    this.gameController = gameController;
  }

  joinGame(gameId: string, playerId: string, playerName: string) {
    if (gameId === this.gameController.getAvailableGame()?.id) {
      if (!this.gameController.getAvailableGame()?.players.includes(playerId)) {
        this.gameController.getAvailableGame()?.players.push(playerId);
        console.log(
          `Player ${playerId} with name ${playerName} joined game ${gameId}`
        );
      } else {
        console.log(`Player ${playerId} already in game`);
      }
    } else {
      console.log(`Game ${gameId} not available`);
    }
  }
}
