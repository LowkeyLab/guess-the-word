export interface ServerToClientEvents {
  gameStarted: (players: Player[]) => void;
}

export interface ClientToServerEvents {
  joinGame: (gameId: string, playerId: string, playerName: string) => void;
  leaveGame: (gameId: string, playerId: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {}

export interface Player {
  id: string;
  name: string;
}
