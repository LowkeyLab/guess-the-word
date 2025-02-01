import { GameController } from "../src/GameController";

describe("GameController", () => {
  let sut: GameController;

  beforeEach(() => {
    sut = new GameController();
  });

  test("should create a new game", () => {
    const game = sut.createGame();
    expect(game).toBeDefined();
    expect(game.id).toBeDefined();
    expect(game.players.size).toBe(0);
  });

  test("should add a player to a game", () => {
    const game = sut.createGame();
    sut.addPlayerToGame(game.id, "1", "player1");

    expect(game.players.size).toBe(1);
    expect(game.players.get("1")).toBeDefined();
    // Assuming the player's object has a name property
    expect(game.players.get("1")?.name).toBe("player1");
  });

  test("should not add a player to a game that is not available", () => {
    const game = sut.createGame();
    // Attempt to add a player to an invalid game id
    sut.addPlayerToGame("non-existent-game", "1", "player1");

    // The original game should remain unchanged.
    expect(game.players.size).toBe(0);
  });

  test("player cannot join a full game", () => {
    const game = sut.createGame();
    sut.addPlayerToGame(game.id, "1", "player1");
    sut.addPlayerToGame(game.id, "2", "player2");

    // Attempt to add a third player to the game
    sut.addPlayerToGame(game.id, "3", "player3");

    // The game should still have only 2 players
    expect(game.players.size).toBe(2);
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
    expect(game.players.size).toBe(1);
  });

  test("can add a guess to a player in a game", () => {
    const game = sut.createGame();
    sut.addPlayerToGame(game.id, "1", "player1");
    sut.addPlayerToGame(game.id, "2", "player2");

    sut.addGuessToPlayer(game.id, "1", "guess");

    // The player should have a guess
    expect(sut.getGuessesForPlayer(game.id, "1")).toHaveLength(1);
  });
});
