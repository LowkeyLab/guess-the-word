import { Player } from "@common/index";

export class Game {
  id: string;
  private state: "waiting" | "ongoing" | "finished" = "waiting";
  players: Map<string, Player> = new Map();
  guesses: Map<string, string[]> = new Map();

  constructor(id: string) {
    this.id = id;
  }

  addPlayer(playerId: string, playerName: string) {
    if (this.players.size >= 2) {
      throw new Error(`Game ${this.id} is full`);
    }
    this.players.set(playerId, { id: playerId, name: playerName });
    if (this.players.size === 2) {
      this.state = "ongoing";
    }
  }

  removePlayer(playerId: string) {
    if (!this.players.has(playerId)) {
      throw new Error(`Player ${playerId} not found in game ${this.id}`);
    }
    this.players.delete(playerId);
    this.guesses.delete(playerId);
    this.guesses.clear();
    this.state = "waiting";
  }

  addGuess(playerId: string, guess: string) {
    if (!this.players.has(playerId)) {
      throw new Error(`Player ${playerId} not found in game ${this.id}`);
    }
    if (!this.guesses.has(playerId)) {
      this.guesses.set(playerId, []);
    }
    this.guesses.get(playerId)!.push(guess);
  }

  getGuesses(playerId: string): string[] {
    return this.guesses.get(playerId) || [];
  }

  numberOfPlayers(): number {
    return this.players.size;
  }

  isAvailable(): boolean {
    return this.state === "waiting";
  }

  isOngoing(): boolean {
    return this.state === "ongoing";
  }
}
