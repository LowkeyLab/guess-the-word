import { Game, GameService } from "./GameService";

export class GameController {
  private ongoingGames: Map<string, Game> = new Map();
  private availableGames: Map<string, Game> = new Map();
  private gameService: GameService;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  getAvailableGame(): Game | undefined {
    return this.availableGames.values().next().value;
  }

  createGame(): Game {
    const game = this.gameService.createGame();
    this.availableGames.set(game.id, game);
    return game;
  }
}
