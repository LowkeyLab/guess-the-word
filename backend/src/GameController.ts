import { Player } from "@common/index";

export class GameController {
  private games: Map<string, Game> = new Map();

  getAvailableGame(): Game | null {
    return (
      Array.from(this.games.values()).find(
        (game) => game.state === "waiting"
      ) || null
    );
  }

  createGame(): Game {
    const game: Game = {
      id: crypto.randomUUID(),
      state: "waiting",
      players: new Map(),
      guesses: new Map(),
    };
    this.games.set(game.id, game);
    return game;
  }

  addPlayerToGame(gameId: string, playerId: string, playerName: string) {
    const game = this.games.get(gameId);
    if (game === undefined) {
      console.debug(`Game ${gameId} not found`);
      return;
    }
    if (game.players.size >= 2) {
      console.debug(`Game ${gameId} is full`);
      return;
    }
    game.players.set(playerId, { id: playerId, name: playerName });
    console.info(`Player ${playerId} joined game ${gameId}`);
    if (game.players.size === 2) {
      game.state = "ongoing";
    }
  }

  isGameOngoing(gameId: string): boolean {
    return this.games.get(gameId)?.state === "ongoing" || false;
  }

  getOngoingGame(gameId: string) {
    const game = this.games.get(gameId);
    if (game && game.state === "ongoing") {
      return game;
    } else {
      return null;
    }
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
    if (!game.players.has(playerId)) {
      console.debug(`Player ${playerId} not found in game ${gameId}`);
      return;
    }
    game.players.delete(playerId);
    console.info(`Player ${playerId} left game ${gameId}`);
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

export interface Game {
  id: string;
  state: "waiting" | "ongoing" | "finished";
  players: Map<string, Player>;
  guesses: Map<string, string[]>;
}
