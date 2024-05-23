// Constants
const ROWS = 6;
const COLS = 7;
const EMPTY = 0;
const PLAYER_1 = 1;
const PLAYER_2 = 2;

// Variables
let currentPlayer = PLAYER_1;
let board = [];
let gameOver = false;
let droppingAnimationInProgress = false; // Track dropping animation

// Create the game board
function createBoard() {
  for (let i = 0; i < ROWS; i++) {
    board[i] = [];
    for (let j = 0; j < COLS; j++) {
      board[i][j] = EMPTY;
    }
  }
}

// Render the game board
function renderBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('click', () => dropDisk(j));
      boardElement.appendChild(cell);
    }
  }
}

// Drop disk into column
function dropDisk(col) {
  if (gameOver || droppingAnimationInProgress) return;
  droppingAnimationInProgress = true;

  let row = ROWS - 1;
  while (row >= 0 && board[row][col] !== EMPTY) {
    row--;
  }

  if (row >= 0) {
    board[row][col] = currentPlayer;
    renderDisk(row, col);
    setTimeout(() => {
      droppingAnimationInProgress = false;
      if (checkWinner(row, col)) {
        gameOver = true;
        alert(`Player ${currentPlayer} wins!`);
      } else {
        currentPlayer = currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
      }
    }, 500); // Adjust timing to match animation
  }
}

// Render disk animation
function renderDisk(row, col) {
  const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  const diskOuter = document.createElement('div');
  const diskInner = document.createElement('div');
  diskOuter.classList.add('disk-outer', `player-${currentPlayer}`);
  diskInner.classList.add('disk-inner');
  diskOuter.appendChild(diskInner);
  cell.appendChild(diskOuter);

  // Animate the disk dropping from the top
  setTimeout(() => {
    diskOuter.style.top = '5px';
  }, 100);
}

// Check for a winner
function checkWinner(row, col) {
  // Check horizontally
  let count = 1;
  for (let i = col - 1; i >= 0 && board[row][i] === currentPlayer; i--) count++;
  for (let i = col + 1; i < COLS && board[row][i] === currentPlayer; i++) count++;
  if (count >= 4) return true;

  // Check vertically
  count = 1;
  for (let i = row - 1; i >= 0 && board[i][col] === currentPlayer; i--) count++;
  for (let i = row + 1; i < ROWS && board[i][col] === currentPlayer; i++) count++;
  if (count >= 4) return true;

  // Check diagonally
  count = 1;
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0 && board[i][j] === currentPlayer; i--, j--) count++;
  for (let i = row + 1, j = col + 1; i < ROWS && j < COLS && board[i][j] === currentPlayer; i++, j++) count++;
  if (count >= 4) return true;

  count = 1;
  for (let i = row - 1, j = col + 1; i >= 0 && j < COLS && board[i][j] === currentPlayer; i--, j++) count++;
  for (let i = row + 1, j = col - 1; i < ROWS && j >= 0 && board[i][j] === currentPlayer; i++, j--) count++;
  if (count >= 4) return true;

  return false;
}

// Reset the game
function resetGame() {
  currentPlayer = PLAYER_1;
  gameOver = false;
  createBoard();
  renderBoard();
}

// Initialize the game
function init() {
  createBoard();
  renderBoard();
  const resetBtn = document.getElementById('resetBtn');
  resetBtn.addEventListener('click', resetGame);
}

// Run the game
init();
