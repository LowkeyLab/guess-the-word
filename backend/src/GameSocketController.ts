import { Server, Socket } from "socket.io";
import { GamesManager } from "./GamesManager";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "@common/index";

type GameServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export class GameSocketController {
  private gamesManager: GamesManager;
  private server: GameServer;
  constructor(gameController: GamesManager, server: GameServer) {
    this.gamesManager = gameController;
    this.server = server;
  }

  joinGame(
    socket: Socket,
    gameId: string,
    playerId: string,
    playerName: string
  ) {
    this.gamesManager.addPlayerToGame(gameId, playerId, playerName);
    socket.join(gameId);
    const onGoingGame = this.gamesManager.getOngoingGame(gameId);
    if (onGoingGame) {
      this.server
        .to(gameId)
        .emit("gameStarted", Array.from(onGoingGame.players.values()));
    }
  }

  leaveGame(socket: Socket, gameId: string, playerId: string) {
    this.gamesManager.removePlayerFromGame(gameId, playerId);
    socket.leave(gameId);
  }
}
