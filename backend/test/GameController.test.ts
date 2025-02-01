import { GamesManager } from "../src/GameController";

describe("GameController", () => {
  let sut: GamesManager;

  beforeEach(() => {
    sut = new GamesManager();
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

  test("can add a guess to a player in a game", () => {
    const game = sut.createGame();
    sut.addPlayerToGame(game.id, "1", "player1");
    sut.addPlayerToGame(game.id, "2", "player2");

    sut.addGuessToPlayer(game.id, "1", "guess");

    expect(sut.getGuessesForPlayer(game.id, "1")).toHaveLength(1);
    expect(sut.getGuessesForPlayer(game.id, "1")).toContain("guess");
  });

  test("when player is removed from a game, the game should have one less player", () => {
    const game = sut.createGame();
    sut.addPlayerToGame(game.id, "1", "player1");
    sut.addPlayerToGame(game.id, "2", "player2");

    sut.removePlayerFromGame(game.id, "1");

    // The game should have only 1 player
    expect(game.players.size).toBe(1);
  });

  test("when player is removed from a game, the game should not be ongoing", () => {
    const game = sut.createGame();
    sut.addPlayerToGame(game.id, "1", "player1");
    sut.addPlayerToGame(game.id, "2", "player2");

    sut.removePlayerFromGame(game.id, "1");

    expect(sut.isGameAvailable(game.id)).toBe(true);
  });
});
