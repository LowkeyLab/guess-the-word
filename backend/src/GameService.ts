export class GameService {
  constructor() {}
  createGame(): Game {
    return {
      id: crypto.randomUUID(),
      players: [],
      guesses: new Map(),
    };
  }
}

export interface Game {
  id: string;
  players: string[];
  guesses: Map<string, string[]>;
}
