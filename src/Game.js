import React from 'react';
export const Game = ({
  player1,
  player2,
  board,
  firstPlayerActive,
  onCellClicked
}) => {
  return (
    <div>
      <p
        data-testid="player1-title"
        style={firstPlayerActive ? { fontWeight: 'bold' } : null}
      >
        {player1}
      </p>
      <p
        data-testid="player2-title"
        style={firstPlayerActive ? null : { fontWeight: 'bold' }}
      >
        {player2}
      </p>
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() => onCellClicked(rowIndex, colIndex)}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
