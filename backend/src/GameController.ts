export class GameController {
  private availableGame: Game | null = null;

  getAvailableGame(): Game | null {
    return this.availableGame;
  }

  createGame(): Game {
    const game = {
      id: crypto.randomUUID(),
      players: [],
      guesses: new Map(),
    };
    this.availableGame = game;
    return game;
  }

  addPlayerToGame(gameId: string, playerId: string, playerName: string) {
    if (this.availableGame === null) {
      console.log(`No game available`);
      return;
    }
    if (this.availableGame.id !== gameId) {
      console.log(`Game ${gameId} not available`);
      return;
    }
    if (this.availableGame.players.includes(playerId)) {
      console.log(`Player ${playerId} already in game`);
      return;
    }
    this.availableGame.players.push(playerId);
    console.log(
      `Player ${playerId} with name ${playerName} joined game ${this.availableGame.id}`
    );
  }
}

export interface Game {
  id: string;
  players: string[];
  guesses: Map<string, string[]>;
}
