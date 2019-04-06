function hasWonInRow({ row, marker }) {
  return row.every(cell => cell === marker);
}

function hasWonInAnyRow({ board, marker }) {
  for (let i = 0; i < 3; i += 1) {
    if (hasWonInRow({ row: board[i], marker })) {
      return true;
    }
  }

  return false;
}

export function gameStatus(board) {
  if (hasWonInAnyRow({ board, marker: 'X' })) {
    return 'X';
  } else if (hasWonInAnyRow({ board, marker: 'O' })) {
    return 'O';
  }
}
