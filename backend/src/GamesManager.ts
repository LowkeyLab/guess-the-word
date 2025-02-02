import { Game } from "./Game";

export class GamesManager {
  private games: Map<string, Game> = new Map();

  getAvailableGame(): Game | null {
    return (
      Array.from(this.games.values()).find((game) => game.isAvailable()) || null
    );
  }

  createGame(): Game {
    const game: Game = new Game(crypto.randomUUID());
    this.games.set(game.id, game);
    return game;
  }

  addPlayerToGame(gameId: string, playerId: string, playerName: string) {
    const game = this.games.get(gameId);
    if (game === undefined) {
      throw new Error(`Game ${gameId} not found`);
    }
    game.addPlayer(playerId, playerName);
  }

  isGameOngoing(gameId: string): boolean {
    return this.games.get(gameId)?.isOngoing() || false;
  }

  getOngoingGame(gameId: string) {
    const game = this.games.get(gameId);
    if (game && game.isOngoing()) {
      return game;
    } else {
      return null;
    }
  }

  isGameAvailable(gameId: string): boolean {
    return this.games.get(gameId)?.isAvailable() || false;
  }

  isGameFinished(gameId: string): boolean {
    return this.games.get(gameId)?.isFinished() || false;
  }

  addGuessToPlayer(gameId: string, playerId: string, guess: string) {
    const game = this.games.get(gameId);
    if (game === undefined) {
      console.debug(`Game ${gameId} not found`);
      return;
    }
    game.addGuess(playerId, guess);
  }

  removePlayerFromGame(gameId: string, playerId: string) {
    const game = this.games.get(gameId);
    if (game === undefined) {
      console.debug(`Game ${gameId} not found`);
      return;
    }
    game.removePlayer(playerId);
  }

  getGuesses(gameId: string) {
    const game = this.games.get(gameId);
    if (game === undefined) {
      throw new Error(`Game ${gameId} not found`);
    }
    return game.getGuesses();
  }
}
