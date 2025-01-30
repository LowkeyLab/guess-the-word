interface ServerToClientEvents {
  playerJoined: (player: string) => void;
}

interface ClientToServerEvents {
  joinGame: (gameId: string, playerId: string, playerName: string) => void;
}
