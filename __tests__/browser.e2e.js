test('should register a game', async () => {
  const player1 = 'Yaniv';
  const player2 = 'Computer';

  await navigate();

  await newGame(player1, player2);

  expect(await getPlayer1Title()).toBe(player1);
  expect(await getPlayer2Title()).toBe(player2);
});

test('should show "X" after first player click', async () => {
  const player1 = 'Yaniv';
  const player2 = 'Computer';

  await navigate();

  await newGame(player1, player2);
  expect(await getACellAt(0)).toBe('');

  await clickACellAt(0);
  expect(await getACellAt(0)).toBe('X');
});

test('"X" should win the game in first row', async () => {
  const player1 = 'Yaniv';
  const player2 = 'Computer';

  await navigate();

  await newGame(player1, player2);

  await clickACellAt(0);
  await clickACellAt(4);
  expect(await hasWinner()).toBe(false);
  await clickACellAt(1);
  await clickACellAt(5);
  await clickACellAt(2);

  expect(await getWinnerMessage()).toBe(`${player1} won!!`);
});

test('"O" should win the game in first row', async () => {
  const p1 = 'A';
  const p2 = 'B';

  await navigate();

  await newGame(p1, p2);

  await clickACellAt(3);
  await clickACellAt(0);
  expect(await hasWinner()).toBe(false);
  await clickACellAt(4);
  await clickACellAt(1);
  await clickACellAt(7);
  await clickACellAt(2);

  expect(await getWinnerMessage()).toBe(`${p2} won!!`);
});

test('"O" should win the game in middle row', async () => {
  const p1 = 'A';
  const p2 = 'B';

  await navigate();

  await newGame(p1, p2);

  await clickACellAt(0);
  await clickACellAt(3);
  expect(await hasWinner()).toBe(false);
  await clickACellAt(1);
  await clickACellAt(4);
  await clickACellAt(7);
  await clickACellAt(5);

  expect(await getWinnerMessage()).toBe(`${p2} won!!`);
});

test('"X" should win the game in first column', async () => {
  const p1 = 'A';
  const p2 = 'B';

  await navigate();

  await newGame(p1, p2);

  await clickACellAt(0);
  await clickACellAt(2);
  expect(await hasWinner()).toBe(false);
  await clickACellAt(3);
  await clickACellAt(4);
  await clickACellAt(6);
  await clickACellAt(5);

  expect(await getWinnerMessage()).toBe(`${p1} won!!`);
});

test('"O" should win the game in middle column', async () => {
  const p1 = 'A';
  const p2 = 'B';

  await navigate();

  await newGame(p1, p2);

  await clickACellAt(0);
  await clickACellAt(1);
  expect(await hasWinner()).toBe(false);
  await clickACellAt(3);
  await clickACellAt(4);
  await clickACellAt(5);
  await clickACellAt(7);

  expect(await getWinnerMessage()).toBe(`${p2} won!!`);
});

test('"X" should win the game in diagonal from left to right', async () => {
  const p1 = 'A';
  const p2 = 'B';

  await navigate();

  await newGame(p1, p2);

  await clickACellAt(0);
  await clickACellAt(2);
  expect(await hasWinner()).toBe(false);
  await clickACellAt(4);
  await clickACellAt(3);
  await clickACellAt(8);

  expect(await getWinnerMessage()).toBe(`${p1} won!!`);
});

test('"O" should win the game in diagonal from right to left', async () => {
  const p1 = 'A';
  const p2 = 'B';

  await navigate();

  await newGame(p1, p2);

  await clickACellAt(0);
  await clickACellAt(2);
  expect(await hasWinner()).toBe(false);
  await clickACellAt(3);
  await clickACellAt(4);
  await clickACellAt(7);
  await clickACellAt(6);

  expect(await getWinnerMessage()).toBe(`${p2} won!!`);
});

test('should say it is a tie game', async () => {
  const p1 = 'A';
  const p2 = 'B';

  await navigate();

  await newGame(p1, p2);

  await clickACellAt(0);
  await clickACellAt(2);
  await clickACellAt(1);
  await clickACellAt(3);
  await clickACellAt(4);
  await clickACellAt(7);
  await clickACellAt(5);
  await clickACellAt(8);
  await clickACellAt(6);

  expect(await getWinnerMessage()).toBe('It is a tie game');
});

test('should not let click any more cells if game is finished', async () => {
  const p1 = 'A';
  const p2 = 'B';

  await navigate();

  await newGame(p1, p2);

  await clickACellAt(0);
  await clickACellAt(2);
  expect(await hasWinner()).toBe(false);
  await clickACellAt(4);
  await clickACellAt(3);
  await clickACellAt(8);
  await clickACellAt(1);

  expect(await getACellAt(1)).toBe('');
});

test('should have restart button that restarts the game when game is finished', async () => {
  const p1 = 'A';
  const p2 = 'B';

  await navigate();

  await newGame(p1, p2);

  await clickACellAt(0);
  await clickACellAt(2);
  await clickACellAt(4);
  await clickACellAt(3);
  await clickACellAt(8);

  expect(await getACellAt(0)).toBe('X');
  expect(await hasRestartButton()).toBe(true);

  const restartButton = await getRestartButton();

  await restartButton.click();
  expect(await getACellAt(0)).toBe('');
  expect(await hasWinner()).toBe(false);
});

test('should not show game board if there are no players', async () => {
  await navigate();

  expect(await isGameBoardVisible()).toBe(false);
});

test('should show game board if there are players', async () => {
  const p1 = 'A';
  const p2 = 'B';

  await navigate();

  await newGame(p1, p2);

  expect(await isGameBoardVisible()).toBe(true);
});

test('should not show registration form if there are players', async () => {
  const p1 = 'A';
  const p2 = 'B';

  await navigate();

  await newGame(p1, p2);

  expect(await isRegistrationFormVisible()).toBe(false);
});

test('should show registration form if there are no players', async () => {
  await navigate();

  expect(await isRegistrationFormVisible()).toBe(true);
});

test('should mark fields differently for each player', async () => {
  const p1 = 'A';
  const p2 = 'B';

  await navigate();
  await newGame(p1, p2);
  await clickACellAt(0);
  await clickACellAt(1);
  await clickACellAt(2);
  await clickACellAt(3);
  await clickACellAt(4);
  await clickACellAt(5);

  expect(await getACellAt(0)).toBe('X');
  expect(await getACellAt(1)).toBe('O');
  expect(await getACellAt(2)).toBe('X');
  expect(await getACellAt(3)).toBe('O');
  expect(await getACellAt(4)).toBe('X');
  expect(await getACellAt(5)).toBe('O');
});

test('should not let click on already clicked field', async () => {
  const p1 = 'A';
  const p2 = 'B';

  await navigate();
  await newGame(p1, p2);
  expect(await getACellAt(0)).toBe('');
  await clickACellAt(0);
  expect(await getACellAt(0)).toBe('X');
  await clickACellAt(0);
  expect(await getACellAt(0)).toBe('X');
});

async function hasRestartButton() {
  return !!(await page.$('[data-testid="restart-button"]'));
}

async function isGameBoardVisible() {
  return !!(await page.$('[data-testid="game-board"]'));
}

async function isRegistrationFormVisible() {
  return !!(await page.$('[data-testid="registration-form"]'));
}

function getWinnerMessage() {
  return page.$eval('[data-testid="winner-message"]', el => el.innerText);
}

async function hasWinner() {
  return !!(await page.$('[data-testid="winner-message"]'));
}

function getRestartButton() {
  return page.$('[data-testid="restart-button"');
}

function clickACellAt(index) {
  return page.$$eval('td', (tds, _index) => tds[_index].click(), index);
}

function getACellAt(index) {
  return page.$$eval('td', (tds, _index) => tds[_index].innerText, index);
}

function getPlayer2Title() {
  return page.$eval('[data-testid="player2-title"]', el => el.innerText);
}

function getPlayer1Title() {
  return page.$eval('[data-testid="player1-title"]', el => el.innerText);
}

async function newGame(player1, player2) {
  await page.type('[data-testid="player1"]', player1);
  await page.type('[data-testid="player2"]', player2);
  await page.click('[data-testid="new-game"]');
}

function navigate() {
  return page.goto('http://localhost:3000');
}
