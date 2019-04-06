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
  const [firstPlayerActive, setFirstPlayerActive] = useState(true);

  const handleNewGame = (player1, player2) => {
    setPlayer1(player1);
    setPlayer2(player2);
  };
  const handleCellClicked = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex]) {
      return;
    }

    const _board = board.map(row => [...row]);

    _board[rowIndex][colIndex] = firstPlayerActive ? 'X' : 'O';

    const gameWinner = gameStatus(_board);

    if (gameWinner) {
      setWinner(gameWinner);
    }

    setBoard(_board);
    setFirstPlayerActive(!firstPlayerActive);
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
      {winner && (
        <div data-testid="winner-message">
          {winner === 'X' ? player1 : player2} won!!
        </div>
      )}
    </div>
  );
}

export default App;
