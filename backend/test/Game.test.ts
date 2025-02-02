import { Game } from "../src/Game";

describe("Game", () => {
  let sut: Game;

  beforeEach(() => {
    sut = new Game("1");
  });

  test("can create a new game", () => {
    expect(sut).toBeDefined();
    expect(sut.id).toBeDefined();
    expect(sut.getPlayers().length).toBe(0);
  });

  test("can add a player to a game", () => {
    sut.addPlayer("1", "player1");

    expect(sut.getPlayers().length).toBe(1);
  });

  test("player cannot join a full game", () => {
    sut.addPlayer("1", "player1");
    sut.addPlayer("2", "player2");

    expect(() => {
      sut.addPlayer("3", "player3");
    }).toThrow();
  });

  test("when two players join a game, the game should be marked as ongoing", () => {
    sut.addPlayer("1", "player1");
    sut.addPlayer("2", "player2");

    // The game should be marked as ongoing
    expect(sut.isOngoing()).toBe(true);
  });

  test("can add a guess to a player in a game", () => {
    sut.addPlayer("1", "player1");
    sut.addPlayer("2", "player2");

    sut.addGuess("1", "guess");

    expect(sut.getGuesses("1")).toHaveLength(1);
    expect(sut.getGuesses("1")).toContain("guess");
  });

  test("a player cannot guess twice in a round", () => {
    sut.addPlayer("1", "player1");
    sut.addPlayer("2", "player2");

    sut.addGuess("1", "guess");

    expect(() => {
      sut.addGuess("1", "guess");
    }).toThrow();
  });

  test("when two players guess the same word in a round, the game should be marked as finished", () => {
    sut.addPlayer("1", "player1");
    sut.addPlayer("2", "player2");

    sut.addGuess("1", "guess");
    sut.addGuess("2", "guess");

    // The game should be marked as finished
    expect(sut.isFinished()).toBe(true);
  });

  test("when player is removed from a game, the game should have one fewer player", () => {
    sut.addPlayer("1", "player1");
    sut.addPlayer("2", "player2");

    sut.removePlayer("1");

    // The game should have only 1 player
    expect(sut.numberOfPlayers()).toBe(1);
  });

  test("when player is removed from a game, the game should not be ongoing", () => {
    sut.addPlayer("1", "player1");
    sut.addPlayer("2", "player2");

    sut.removePlayer("1");

    expect(sut.isAvailable()).toBe(true);
  });

  test("when player is removed from a game, the game should not have any guesses for that player", () => {
    sut.addPlayer("1", "player1");
    sut.addPlayer("2", "player2");

    sut.addGuess("1", "guess");

    sut.removePlayer("1");

    expect(sut.getGuesses("1")).toHaveLength(0);
  });

  test("when player is removed from a game, the guess of the other player should also be removed", () => {
    sut.addPlayer("1", "player1");
    sut.addPlayer("2", "player2");

    sut.addGuess("1", "guess");

    sut.removePlayer("2");

    expect(sut.getGuesses("1")).toHaveLength(0);
  });
});
