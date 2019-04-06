import React, { Fragment, useState } from 'react';
import { Registration } from './Registration';
import { Game } from './Game';
import { gameStatus } from './gameService';
import { GAME_STATUSES } from './gameService.const';

const INITIAL_BOARD = [['', '', ''], ['', '', ''], ['', '', '']];

function App() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [winner, setWinner] = useState('');
  const [firstPlayerActive, setFirstPlayerActive] = useState(true);
  const handleNewGame = (player1, player2) => {
    setPlayer1(player1);
    setPlayer2(player2);
  };
  const handleCellClicked = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] || winner) {
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
  const restartGame = () => {
    setWinner('');
    setBoard(INITIAL_BOARD);
    setFirstPlayerActive(true);
  };
  const gameStarted = !!(player1 && player2);

  return (
    <div className="App">
      {!gameStarted && <Registration onNewGame={handleNewGame} />}
      {gameStarted && (
        <Game
          player1={player1}
          player2={player2}
          board={board}
          firstPlayerActive={firstPlayerActive}
          onCellClicked={handleCellClicked}
        />
      )}
      {winner && (
        <Fragment>
          <div data-testid="winner-message">
            {winner === GAME_STATUSES.PLAYER1_WON && `${player1} won!!`}
            {winner === GAME_STATUSES.PLAYER2_WON && `${player2} won!!`}
            {winner === GAME_STATUSES.TIE && 'It is a tie game'}
          </div>
          <button data-testid="restart-button" onClick={restartGame}>
            Restart
          </button>
        </Fragment>
      )}
    </div>
  );
}

export default App;
