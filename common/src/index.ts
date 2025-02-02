export interface ServerToClientEvents {
  gameStarted: (players: Player[]) => void;
  leftGame: (playerId: string) => void;
  guessAdded: (playerId: string, guess: string) => void;
  gameFinished: (guess: string) => void;
  roundEnded: (guesses: { playerId: string; guess: string }[]) => void;
}

export interface ClientToServerEvents {
  joinGame: (gameId: string, playerId: string, playerName: string) => void;
  guessAdded: (gameId: string, playerId: string, guess: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  playerId: string;
  gameId: string;
}

export interface Player {
  id: string;
  name: string;
}
