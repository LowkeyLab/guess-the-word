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
    console.info(`Player ${playerId} joined game ${gameId}`);
  }

  leaveGame(socket: Socket, gameId: string, playerId: string) {
    console.info(`Player ${playerId} left game ${gameId}`);
    this.gamesManager.removePlayerFromGame(gameId, playerId);
    socket.leave(gameId);
    this.server.to(gameId).emit("leftGame", playerId);
  }

  addGuess(gameId: string, playerId: string, guess: string) {
    try {
      this.gamesManager.addGuessToPlayer(gameId, playerId, guess);
      if (this.gamesManager.isGameFinished(gameId)) {
        this.server.to(gameId).emit("gameFinished", guess);
        this.gamesManager.endGame(gameId);
      } else {
        if (this.gamesManager.didRoundEnd(gameId)) {
          const guesses = this.gamesManager.getGuessesForCurrentRound(gameId);
          console.log(guesses.size);
          this.server.to(gameId).emit(
            "roundEnded",
            Array.from(guesses.entries()).map(([playerId, guess]) => ({
              playerId,
              guess,
            }))
          );
          this.gamesManager.startNewRound(gameId);
        }
      }
    } catch (error) {
      console.error(`${error}`);
    }
  }
}
