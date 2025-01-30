import { Game, GameService } from "./GameService";

export class GameController {
  private ongoingGames: Map<string, Game> = new Map();
  private availableGame: Game | null = null;
  private gameService: GameService;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  getAvailableGame(): Game | null {
    return this.availableGame;
  }

  createGame(): Game {
    const game = this.gameService.createGame();
    this.availableGame = game;
    return game;
  }
}
