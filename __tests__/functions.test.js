const each = require('jest-each').default;
const { describe } = require('node:test');
const { Player, HumanPlayer, ComputerPlayer } = require("../app.js");

describe('Player class', () => {
    it('initializes with undefined value and 0 wins', () => {
        const player = new Player();

        expect(player.value).toBeUndefined();
        expect(player.numOfWins).toBe(0);
    });
});

describe('ComputerPlayer', () => {
    afterEach(() => {
        jest.restoreAllMocks(); // Restore Math.random after each test
    });

    it('should assign a fixed value based on mocked Math.random', () => {
        const player = new ComputerPlayer();

        jest.spyOn(Math, 'random').mockReturnValue(0.5); // should return 4
        player.randomise();

        expect(player.value).toBe(4);
    });
});

describe('HumanPlayer', () => {
    it('generates and array of valid inputs', () => {
        const player = new HumanPlayer();

        expect(player.getvalue()).toBe(
            [
            'col1', 'col 1', '1',
            'col2', 'col 2', '2',
            'col3', 'col 3', '3',
            'col4', 'col 4', '4',
            'col5', 'col 5', '5',
            'col6', 'col 6', '6',
            'col7', 'col 7', '7'
            ]
        );
    });
});