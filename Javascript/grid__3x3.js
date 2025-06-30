const status = document.getElementById('status');
const restartGame = document.getElementById('restart__Game');
const cells = document.querySelectorAll('.cell');
const clickSound = document.getElementById('clickSound');
const clickSound2 = document.getElementById('clickSound2');

let game_Board = ["", "", "", "", "", "", "", "", ""];
let game_Active = true;
let current_Player = 'X';

const winning_Patterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}
function playSound2() {
  clickSound2.currentTime = 0;
  clickSound2.play();
}

function checkWinner() {
  for (const combo of winning_Patterns) {
    const [a, b, c] = combo;
    if (game_Board[a] && game_Board[a] === game_Board[b] && game_Board[b] === game_Board[c]) {
      status.textContent = `Player ${game_Board[a]} Wins 😎!`;
      game_Active = false;
      return true;
    }
  }
  if (!game_Board.includes('')) {
    status.textContent = "It's Draw 😟!";
    game_Active = false;
    return true;
  }
  return false;
}

function bestMove() {
  for (let combo of winning_Patterns) {
    const [a, b, c] = combo;
    if (game_Board[a] === 'O' && game_Board[b] === 'O' && game_Board[c] === '') return c;
    if (game_Board[a] === 'O' && game_Board[c] === 'O' && game_Board[b] === '') return b;
    if (game_Board[b] === 'O' && game_Board[c] === 'O' && game_Board[a] === '') return a;
  }

  for (let combo of winning_Patterns) {
    const [a, b, c] = combo;
    if (game_Board[a] === 'X' && game_Board[b] === 'X' && game_Board[c] === '') return c;
    if (game_Board[a] === 'X' && game_Board[c] === 'X' && game_Board[b] === '') return b;
    if (game_Board[b] === 'X' && game_Board[c] === 'X' && game_Board[a] === '') return a;
  }

  const emptyIndices = game_Board
    .map((val, i) => val === "" ? i : null)
    .filter(i => i !== null);

  if (emptyIndices.length === 0) return null;

  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
}

function computerMove() {
  if (!game_Active) return;

  const move = bestMove();
  if (move !== null) {
    game_Board[move] = 'O';
    cells[move].textContent = 'O';
    cells[move].classList.add('O');
    playSound();
    if (!checkWinner()) {
      current_Player = 'X';
      status.textContent = "Your Turn (X)";
    }
  }
}

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.dataset.index;
    if (game_Board[index] !== "" || !game_Active || current_Player !== 'X') return;

    game_Board[index] = 'X';
    cell.textContent = 'X';
    cell.classList.add('X');
    playSound();
    if (!checkWinner()) {
      current_Player = 'O';
      status.textContent = "Computer Thinking...";
      setTimeout(computerMove, 600);
    }
  });
});

restartGame.addEventListener('click', () => {
  game_Board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('X', 'O');
  });
  game_Active = true;
  current_Player = "X";
  status.textContent = "Your Turn (X)";
});

// Background music logic to play infinite times:)

const bgMusic = document.getElementById('bgMusic');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');

bgMusic.volume = 0.5;
volumeSlider.value = 0.5;
window.addEventListener("load", () => {
  const lastTime = localStorage.getItem('bgMusicTime');
  if (lastTime) {
    bgMusic.currentTime = parseFloat(lastTime);
  }
  bgMusic.play().catch(() => { });
});
setInterval(() => {
  localStorage.setItem('bgMusicTime', bgMusic.currentTime);
}, 1000);
muteBtn.addEventListener('click', () => {
  bgMusic.muted = !bgMusic.muted;
  muteBtn.textContent = bgMusic.muted ? 'Muted🔇' : 'Mute🔊';
  playSound2();
});
volumeSlider.addEventListener('input', () => {
  bgMusic.volume = volumeSlider.value;
});