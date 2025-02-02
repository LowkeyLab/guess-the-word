import { Player } from "@common/index";

export class Game {
  id: string;
  private state: "waiting" | "ongoing" | "finished" = "waiting";
  private players: Map<string, Player> = new Map();
  private rounds: Round[] = [new Round()];

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
    this.deleteGuesses();
    this.state = "waiting";
  }

  addGuess(playerId: string, guess: string) {
    if (!this.players.has(playerId)) {
      throw new Error(`Player ${playerId} not found in game ${this.id}`);
    }
    const lastRound = this.rounds.at(-1)!;
    lastRound.addGuess(playerId, guess);
    if (lastRound.isWinning()) {
      this.state = "finished";
    }
  }

  getGuesses(): Record<string, string[]>;
  getGuesses(playerId: string): string[];

  getGuesses(playerId?: string): string[] | Record<string, string[]> {
    if (playerId) {
      return this.rounds.reduce<string[]>(
        (acc, round) =>
          round.guesses.has(playerId)
            ? [...acc, round.guesses.get(playerId)!]
            : acc,
        []
      );
    }
    return this.rounds.reduce<Record<string, string[]>>((acc, round) => {
      [...round.guesses.entries()].forEach(([pid, guess]) => {
        acc[pid] = [...(acc[pid] || []), guess];
      });
      return acc;
    }, {});
  }

  getGuessesForCurrentRound(): Map<string, string> {
    return this.rounds.at(-1)!.guesses;
  }

  getPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  numberOfPlayers(): number {
    return this.players.size;
  }

  startNewRound() {
    if (!this.didRoundEnd()) {
      throw new Error("Cannot start a new round before the current one ends");
    }
    this.rounds.push(new Round());
  }

  didRoundEnd(): boolean {
    return this.rounds.at(-1)!.isFinished();
  }

  getRoundNumber(): number {
    return this.rounds.length;
  }

  isAvailable(): boolean {
    return this.state === "waiting";
  }

  isOngoing(): boolean {
    return this.state === "ongoing";
  }

  isFinished(): boolean {
    return this.state === "finished";
  }

  private deleteGuesses() {
    this.rounds = [new Round()];
  }
}

class Round {
  guesses: Map<string, string> = new Map();

  addGuess(playerId: string, guess: string) {
    if (this.guesses.has(playerId)) {
      throw new Error(`Player ${playerId} has already guessed this round`);
    }
    this.guesses.set(playerId, guess);
  }

  isWinning(): boolean {
    const guesses = Array.from(this.guesses.values());
    return (
      this.isFinished() && guesses[0].toLowerCase() === guesses[1].toLowerCase()
    );
  }

  isStarted(): boolean {
    return this.guesses.size === 0;
  }

  isFinished(): boolean {
    return this.guesses.size === 2;
  }
}
