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
    try {
      this.gamesManager.addPlayerToGame(gameId, playerId, playerName);
    } catch (error) {
      console.debug(`Error adding player to game: ${error}`);
    }
    socket.join(gameId);
    const onGoingGame = this.gamesManager.getOngoingGame(gameId);
    if (onGoingGame) {
      this.server
        .to(gameId)
        .emit("gameStarted", Array.from(onGoingGame.getPlayers()));
    }
  }

  leaveGame(socket: Socket, gameId: string, playerId: string) {
    this.gamesManager.removePlayerFromGame(gameId, playerId);
    socket.leave(gameId);
  }

  addGuess(gameId: string, playerId: string, guess: string) {
    try {
      this.gamesManager.addGuessToPlayer(gameId, playerId, guess);
      if (this.gamesManager.isGameFinished(gameId)) {
        this.server.to(gameId).emit("gameFinished", guess);
      } else {
        this.server.to(gameId).emit("guessAdded", playerId, guess);
      }
    } catch (error) {
      console.error(`${error}`);
    }
  }
}
