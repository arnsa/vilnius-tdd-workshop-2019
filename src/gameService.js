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

function hasWonInAnyColumn({ board, marker }) {
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

export function gameStatus(board) {
  const p1Args = { board, marker: 'X' };
  const p2Args = { board, marker: 'O' };

  if (hasWonInAnyRow(p1Args) || hasWonInAnyColumn(p1Args)) {
    return 'X';
  } else if (hasWonInAnyRow(p2Args) || hasWonInAnyColumn(p2Args)) {
    return 'O';
  }
}
