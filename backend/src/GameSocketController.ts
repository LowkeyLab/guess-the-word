import { Server, Socket } from "socket.io";
import { GameController } from "./GameController";
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
  private gameController: GameController;
  private server: GameServer;
  constructor(gameController: GameController, server: GameServer) {
    this.gameController = gameController;
    this.server = server;
  }

  joinGame(
    socket: Socket,
    gameId: string,
    playerId: string,
    playerName: string
  ) {
    this.gameController.addPlayerToGame(gameId, playerId, playerName);
    socket.join(gameId);
    const onGoingGame = this.gameController.getOngoingGame(gameId);
    if (onGoingGame) {
      this.server
        .to(gameId)
        .emit("gameStarted", Array.from(onGoingGame.players.values()));
    }
  }
}
