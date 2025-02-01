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

  addGuessToPlayer(gameId: string, playerId: string, guess: string) {
    const game = this.games.get(gameId);
    if (game === undefined) {
      console.debug(`Game ${gameId} not found`);
      return;
    }
    if (game.guesses.get(playerId) === undefined) {
      game.guesses.set(playerId, []);
    }
    game.guesses.get(playerId)!.push(guess);
    console.info(`Player ${playerId} made a guess in game ${gameId}`);
  }

  removePlayerFromGame(gameId: string, playerId: string) {
    const game = this.games.get(gameId);
    if (game === undefined) {
      console.debug(`Game ${gameId} not found`);
      return;
    }
    game.removePlayer(playerId);
  }

  getGuessesForPlayer(gameId: string, playerId: string) {
    const game = this.games.get(gameId);
    if (game === undefined) {
      console.debug(`Game ${gameId} not found`);
      return;
    }
    return game.guesses.get(playerId);
  }
}
