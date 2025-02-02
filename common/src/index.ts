export interface ServerToClientEvents {
  gameStarted: (players: Player[]) => void;
  guessAdded: (playerId: string, guess: string) => void;
}

export interface ClientToServerEvents {
  joinGame: (gameId: string, playerId: string, playerName: string) => void;
  leaveGame: (gameId: string, playerId: string) => void;
  guessAdded: (gameId: string, playerId: string, guess: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {}

export interface Player {
  id: string;
  name: string;
}
