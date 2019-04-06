import {
  gameStatus,
  hasWonInRow,
  hasWonInAnyRow,
  hasWonInAnyColumn,
  hasWonInAnyDiagonal,
  isAllBoardFilled
} from './gameService';

Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth = 1) {
    return this.reduce(function(flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth > 1
          ? toFlatten.flat(depth - 1)
          : toFlatten
      );
    }, []);
  }
});

describe('hasWonInRow()', () => {
  test('should return true if every cell in a row is equal to provided marker', () => {
    expect(hasWonInRow({ row: ['X', 'X', 'X'], marker: 'X' })).toBe(true);
  });

  test('should return false if not every cell in a row is equal to provided marker', () => {
    expect(hasWonInRow({ row: ['X', 'O', 'X'], marker: 'X' })).toBe(false);
  });
});

describe('hasWonInAnyRow()', () => {
  test('should return true if at least one row is filled with provided marker', () => {
    expect(
      hasWonInAnyRow({
        board: [['X', 'X', 'X'], ['X', 'O', 'O'], ['O', 'O', 'X']],
        marker: 'X'
      })
    ).toBe(true);
  });

  test('should return false if there are no rows filled with provided marker', () => {
    expect(
      hasWonInAnyRow({
        board: [['X', 'O', 'X'], ['X', 'O', 'O'], ['O', 'O', 'X']],
        marker: 'X'
      })
    ).toBe(false);
  });
});

describe('hasWonInAnyColumn()', () => {
  test('should return true if at least one column is filled with provided marker', () => {
    expect(
      hasWonInAnyColumn({
        board: [['X', 'X', 'X'], ['X', 'O', 'O'], ['X', 'O', 'X']],
        marker: 'X'
      })
    ).toBe(true);
  });

  test('should return false if there are no columns filled with provided marker', () => {
    expect(
      hasWonInAnyColumn({
        board: [['X', 'O', 'X'], ['X', 'O', 'O'], ['O', 'O', 'X']],
        marker: 'X'
      })
    ).toBe(false);
  });
});

describe('hasWonInAnyDiagonal()', () => {
  test('should return true if at least one diagonal is filled with provided marker', () => {
    expect(
      hasWonInAnyDiagonal({
        board: [['X', 'X', 'O'], ['X', 'X', 'O'], ['X', 'O', 'X']],
        marker: 'X'
      })
    ).toBe(true);
  });

  test('should return false if there are no diagonals filled with provided marker', () => {
    expect(
      hasWonInAnyDiagonal({
        board: [['X', 'O', 'X'], ['X', 'O', 'O'], ['O', 'X', 'X']],
        marker: 'X'
      })
    ).toBe(false);
  });
});

describe('isAllBoardFilled()', () => {
  test('should return false is board is not filled', () => {
    expect(
      isAllBoardFilled([['X', 'O', 'X'], ['X', 'O', 'O'], ['O', 'X']])
    ).toBe(false);
  });

  test('should return true is board is not filled', () => {
    expect(
      isAllBoardFilled([['X', 'O', 'X'], ['X', 'O', 'O'], ['O', 'X', 'X']])
    ).toBe(true);
  });
});

describe('gameStatus()', () => {
  test('X should win first row', () => {
    // prettier-ignore
    const board = [
      ['X', 'X', 'X'],
      ['', '', ''],
      ['', '', '']
    ];
    expect(gameStatus(board)).toBe('X');
  });

  test('O should win in column', () => {
    // prettier-ignore
    const board = [
      ['X', 'O', 'X'],
      ['', 'O', ''],
      ['', 'O', '']
    ];
    expect(gameStatus(board)).toBe('O');
  });

  test('O should win in diagonal', () => {
    // prettier-ignore
    const board = [
      ['O', 'X', 'X'],
      ['', 'O', ''],
      ['', 'O', 'O']
    ];
    expect(gameStatus(board)).toBe('O');
  });
});
