const each = require('jest-each').default;
const { describe } = require('node:test');
const { Game } = require("../app.js");

const mockGetInput = jest.fn();
const MockHumanPlayer = jest.fn(() => ({ numOfWins: 0 }));
const MockComputerPlayer = jest.fn(() => ({}));

describe('Game - integrated test', () => {
  it('should exit when user says no', async () => {
    mockGetInput.mockResolvedValueOnce('no');

    const game = new Game({
      getInput: mockGetInput,
      HumanPlayer: MockHumanPlayer,
      ComputerPlayer: MockComputerPlayer,
    });

    await game.mainLoop();

    expect(mockGetInput).toHaveBeenCalled();
    expect(game.gameRun).toBe(false);
  });

  it('sets player2 to ComputerPlayer when user chooses computer', async () => {
    mockGetInput.mockResolvedValueOnce('yes').mockResolvedValueOnce('computer');

    const game = new Game({
      getInput: mockGetInput,
      HumanPlayer: MockHumanPlayer,
      ComputerPlayer: MockComputerPlayer,
    });

    await game.mainLoop();

    expect(game.player2).toBeInstanceOf(MockComputerPlayer);
  });
});