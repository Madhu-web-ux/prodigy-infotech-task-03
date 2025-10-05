const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = true;

function checkWinner() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
      running = false;
      return;
    }
  }

  if (!boardState.includes('')) {
    statusText.textContent = "It's a Draw! 🤝";
    running = false;
  }
}

function cellClick() {
  const index = this.getAttribute('data-index');
  if (boardState[index] !== '' || !running) return;

  boardState[index] = currentPlayer;
  this.textContent = currentPlayer;
  this.classList.add(currentPlayer.toLowerCase());

  checkWinner();

  if (running) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function restartGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  running = true;
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
}

cells.forEach(cell => cell.addEventListener('click', cellClick));
restartBtn.addEventListener('click', restartGame);
