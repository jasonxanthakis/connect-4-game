const each = require('jest-each').default;
const { getInput } = require("../app.js");

describe('getInput', () => {
  it('returns valid input immediately', async () => {
    const mockRl = {
      question: jest.fn().mockResolvedValueOnce('yes'),
    };

    const result = await getInput('Continue? ', ['yes', 'no'], mockRl);
    expect(result).toBe('yes');
  });

  it('repeats on invalid input until valid input is given', async () => {
    const mockRl = {
      question: jest
        .fn()
        .mockResolvedValueOnce('maybe')
        .mockResolvedValueOnce('YES'),
    };

    // Silence console.log output
    jest.spyOn(console, 'log').mockImplementation(() => {});

    const result = await getInput('Continue? ', ['yes', 'no'], mockRl);

    expect(mockRl.question).toHaveBeenCalledTimes(2);
    expect(result.toLowerCase()).toBe('yes');

    console.log.mockRestore();
  });
});