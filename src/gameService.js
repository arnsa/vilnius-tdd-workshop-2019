import { GAME_STATUSES } from './gameService.const';

export function hasWonInRow({ row, marker }) {
  return row.every(cell => cell === marker);
}

export function hasWonInAnyRow({ board, marker }) {
  for (let i = 0; i < 3; i += 1) {
    if (hasWonInRow({ row: board[i], marker })) {
      return true;
    }
  }

  return false;
}

export function hasWonInAnyColumn({ board, marker }) {
  for (let i = 0; i < 3; i += 1) {
    let sameMarkerInARowCount = 0;

    for (let j = 0; j < 3; j += 1) {
      if (board[j][i] === marker) {
        sameMarkerInARowCount += 1;
      }
    }

    if (sameMarkerInARowCount === 3) {
      return true;
    }

    sameMarkerInARowCount = 0;
  }

  return false;
}

export function hasWonInAnyDiagonal({ board, marker }) {
  let leftToRightInARow = 0;
  let rightToLeftInARow = 0;

  for (let i = 0, j = 2; i < 3; i += 1, j -= 1) {
    if (board[i][i] === marker) {
      leftToRightInARow += 1;
    }

    if (board[i][j] === marker) {
      rightToLeftInARow += 1;
    }
  }

  return leftToRightInARow === 3 || rightToLeftInARow === 3;
}

export function isAllBoardFilled(board) {
  return board.flat().filter(item => item).length === 9;
}

export function gameStatus(board) {
  const player1Args = { board, marker: 'X' };
  const player2Args = { board, marker: 'O' };
  const hasPlayer1Won =
    hasWonInAnyRow(player1Args) ||
    hasWonInAnyColumn(player1Args) ||
    hasWonInAnyDiagonal(player1Args);
  const hasPlayer2Won =
    hasWonInAnyRow(player2Args) ||
    hasWonInAnyColumn(player2Args) ||
    hasWonInAnyDiagonal(player2Args);

  if (hasPlayer1Won) {
    return GAME_STATUSES.PLAYER1_WON;
  } else if (hasPlayer2Won) {
    return GAME_STATUSES.PLAYER2_WON;
  } else if (isAllBoardFilled(board)) {
    return GAME_STATUSES.TIE;
  }
}
