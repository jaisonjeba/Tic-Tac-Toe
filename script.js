const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

// Check if the current player has won
const checkWin = () => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],            // Diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }
  return false;
};

// Update the game board and check for winner
const handleClick = (e) => {
  if (gameOver || e.target.innerText !== '') return;

  const cellIndex = e.target.getAttribute('data-cell');
  gameBoard[cellIndex] = currentPlayer;
  e.target.innerText = currentPlayer;

  if (checkWin()) {
    gameStatus.textContent = `${currentPlayer} wins!`;
    gameOver = true;
  } else if (gameBoard.every(cell => cell !== '')) {
    gameStatus.textContent = "It's a draw!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s turn (${currentPlayer})`;
  }
};

// Reset the game
const resetGame = () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  gameStatus.textContent = `Player 1's turn (X)`;
  cells.forEach(cell => cell.innerText = '');
};

// Add event listeners to each cell
cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

// Reset button event listener
resetBtn.addEventListener('click', resetGame);
