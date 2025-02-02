import { GamesManager } from "../src/GamesManager";

describe("GameController", () => {
  let sut: GamesManager;

  beforeEach(() => {
    sut = new GamesManager();
  });

  test("should create a new game", () => {
    const game = sut.createGame();
    expect(game).toBeDefined();
    expect(game.id).toBeDefined();
    expect(game.getPlayers().length).toBe(0);
  });

  test("should add a player to a game", () => {
    const game = sut.createGame();
    sut.addPlayerToGame(game.id, "1", "player1");

    expect(game.getPlayers().length).toBe(1);
  });

  test("should not add a player to a game that is not available", () => {
    expect(() => {
      sut.addPlayerToGame("non-existent-game", "1", "player1");
    }).toThrow();
  });

  test("when two players join a game, the game should be marked as ongoing", () => {
    const game = sut.createGame();
    sut.addPlayerToGame(game.id, "1", "player1");
    sut.addPlayerToGame(game.id, "2", "player2");

    // The game should be marked as ongoing
    expect(sut.isGameOngoing(game.id)).toBe(true);
  });

  test("when player is removed from a game, the game should have one less player", () => {
    const game = sut.createGame();
    sut.addPlayerToGame(game.id, "1", "player1");
    sut.addPlayerToGame(game.id, "2", "player2");

    sut.removePlayerFromGame(game.id, "1");

    // The game should have only 1 player
    expect(game.getPlayers().length).toBe(1);
  });

  test("when player is removed from a game, the game should not be ongoing", () => {
    const game = sut.createGame();
    sut.addPlayerToGame(game.id, "1", "player1");
    sut.addPlayerToGame(game.id, "2", "player2");

    sut.removePlayerFromGame(game.id, "1");

    expect(sut.isGameAvailable(game.id)).toBe(true);
  });

  test("can get guesses for a round", () => {
    const game = sut.createGame();
    sut.addPlayerToGame(game.id, "1", "player1");
    sut.addPlayerToGame(game.id, "2", "player2");

    sut.addGuessToPlayer(game.id, "1", "guess");

    expect(sut.getGuessesForCurrentRound(game.id).get("1")).toBe("guess");
  });

  test("can get guesses for a round after it ends", () => {
    const game = sut.createGame();
    sut.addPlayerToGame(game.id, "1", "player1");
    sut.addPlayerToGame(game.id, "2", "player2");

    sut.addGuessToPlayer(game.id, "1", "guess");
    sut.addGuessToPlayer(game.id, "2", "something");

    expect(sut.getGuessesForCurrentRound(game.id).get("1")).toBe("guess");
    expect(sut.getGuessesForCurrentRound(game.id).get("2")).toBe("something");
  });

  test("after both players guess, the round ends", () => {
    const game = sut.createGame();
    sut.addPlayerToGame(game.id, "1", "player1");
    sut.addPlayerToGame(game.id, "2", "player2");

    sut.addGuessToPlayer(game.id, "1", "guess");
    sut.addGuessToPlayer(game.id, "2", "something");

    expect(sut.didRoundEnd(game.id)).toBe(true);
  });
});
