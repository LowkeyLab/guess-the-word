import { Player } from "@common/index";

export class GameController {
  private onGoingGames: Map<string, Game> = new Map();
  private availableGame: Game | null = null;

  getAvailableGame(): Game | null {
    return this.availableGame;
  }

  createGame(): Game {
    const game: Game = {
      id: crypto.randomUUID(),
      state: "waiting",
      players: new Map(),
      guesses: new Map(),
    };
    this.availableGame = game;
    return game;
  }

  addPlayerToGame(gameId: string, playerId: string, playerName: string) {
    const availableGame = this.availableGame;
    if (availableGame === null) {
      console.debug(`No game available`);
      return;
    }
    if (availableGame.id !== gameId) {
      console.debug(`Game ${gameId} not available`);
      return;
    }
    if (availableGame.players.has(playerId)) {
      console.debug(`Player ${playerId} already in game`);
      return;
    }
    if (availableGame.players.size >= 2) {
      console.debug(`Game ${gameId} is full`);
      return;
    }
    availableGame.players.set(playerId, {
      id: playerId,
      name: playerName,
    });
    console.info(
      `Player ${playerId} with name ${playerName} joined game ${availableGame.id}`
    );
    if (availableGame.players.size === 2) {
      console.info(`Game ${availableGame.id} is starting`);
      this.onGoingGames.set(availableGame.id, availableGame);
      this.availableGame = null;
    }
  }

  isGameOngoing(gameId: string): boolean {
    return this.onGoingGames.has(gameId);
  }

  getOngoingGame(gameId: string) {
    return this.onGoingGames.get(gameId);
  }

  addGuessToPlayer(gameId: string, playerId: string, guess: string) {
    const game = this.onGoingGames.get(gameId);
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
    const game = this.onGoingGames.get(gameId);
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
    const game = this.onGoingGames.get(gameId);
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
