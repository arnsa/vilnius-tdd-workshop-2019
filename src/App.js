import React, { useState } from 'react';
import { Registration } from './Registration';
import { Game } from './Game';
import { gameStatus } from './gameService';

function App() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);
  const [winner, setWinner] = useState('');

  const handleNewGame = (player1, player2) => {
    setPlayer1(player1);
    setPlayer2(player2);
  };
  const handleCellClicked = (rowIndex, colIndex) => {
    const _board = board.map(row => [...row]);
    _board[rowIndex][colIndex] = 'X';
    if (gameStatus(_board) === 'X') {
      setWinner('X');
    }
    setBoard(_board);
  };

  return (
    <div className="App">
      <Registration onNewGame={handleNewGame} />
      <Game
        player1={player1}
        player2={player2}
        board={board}
        onCellClicked={handleCellClicked}
      />
      {winner && <div data-testid="winner-message">Yaniv won!!</div>}
    </div>
  );
}

export default App;
