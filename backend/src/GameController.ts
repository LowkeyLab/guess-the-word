import { Player } from "@common/index";

export class GameController {
  private onGoingGames: Map<string, Game> = new Map();
  private availableGame: Game | null = null;

  getAvailableGame(): Game | null {
    return this.availableGame;
  }

  createGame(): Game {
    const game = {
      id: crypto.randomUUID(),
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
}

export interface Game {
  id: string;
  players: Map<string, Player>;
  guesses: Map<string, string[]>;
}
