export interface ServerToClientEvents {
  playerJoined: (player: string) => void;
}

export interface ClientToServerEvents {
  joinGame: (gameId: string, playerId: string, playerName: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {}
