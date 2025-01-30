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
}

export interface Game {
  id: string;
  players: string[];
  guesses: Map<string, string[]>;
}
