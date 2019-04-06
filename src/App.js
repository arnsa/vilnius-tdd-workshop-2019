import React, { useState } from 'react';
import { Registration } from './Registration';
import { Game } from './Game';
import { gameStatus } from './gameService';
import { GAME_STATUSES } from './gameService.const';

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
        firstPlayerActive={firstPlayerActive}
        onCellClicked={handleCellClicked}
      />
      {winner && (
        <div data-testid="winner-message">
          {winner === GAME_STATUSES.PLAYER1_WON && `${player1} won!!`}
          {winner === GAME_STATUSES.PLAYER2_WON && `${player2} won!!`}
          {winner === GAME_STATUSES.TIE && 'It is a tie game'}
        </div>
      )}
    </div>
  );
}

export default App;
