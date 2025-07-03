const status = document.getElementById('status');
const restartGame = document.getElementById('restart__Game');
const cells = document.querySelectorAll('.cell');
const clickSoundGB = document.getElementById('clickSoundGB');

const winSound = document.getElementById('winSound');
const winnerPopup = document.getElementById('winnerPopup');
const winnerText = document.getElementById('winnerText');
const winnerGif = document.getElementById('winnerGif');
const failSound = document.getElementById('failSound');
const actionSound = document.getElementById('actionSound');

// Detect game mode from URL
const urlParams = new URLSearchParams(window.location.search);
const gameMode = urlParams.get('mode') || 'computer'; // Default to computer

let game_Board = ["", "", "", "", "", "", "", "", ""];
let game_Active = true;
let current_Player = 'X';

const winning_Patterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function playSound() {
  clickSoundGB.currentTime = 0;
  clickSoundGB.play();
}

function checkWinner() {
  for (const combo of winning_Patterns) {
    const [a, b, c] = combo;
    if (game_Board[a] && game_Board[a] === game_Board[b] && game_Board[b] === game_Board[c]) {
      const winner = game_Board[a];
      status.textContent = `Player ${winner} Wins 😎!`;
      game_Active = false;
      showWinnerPopup(winner);
      return true;
    }
  }

  if (!game_Board.includes('')) {
    status.textContent = "It's Draw 😟!";
    game_Active = false;
    showWinnerPopup("draw");
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
    if (game_Board[index] !== "" || !game_Active) return;

    // P2P logic
    if (gameMode === 'p2p') {
      game_Board[index] = current_Player;
      cell.textContent = current_Player;
      cell.classList.add(current_Player);
      playSound();
      if (!checkWinner()) {
        current_Player = current_Player === 'X' ? 'O' : 'X';
        status.textContent = `Player ${current_Player}'s Turn`;
      }
    }

    // Computer mode
    else if (gameMode === 'computer' && current_Player === 'X') {
      game_Board[index] = 'X';
      cell.textContent = 'X';
      cell.classList.add('X');
      playSound();
      if (!checkWinner()) {
        current_Player = 'O';
        status.textContent = "Computer Thinking...";
        setTimeout(computerMove, 600);
      }
    }
  });
});

restartGame.addEventListener('click', () => {
  actionSound.currentTime = 0;
  actionSound.play();
  game_Board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('X', 'O');
  });
  game_Active = true;
  current_Player = "X";
  status.textContent = gameMode === 'p2p' ? "Player X's Turn" : "Your Turn (X)";
});

function playExitSound() {
  actionSound.currentTime = 0;
  actionSound.play();
  setTimeout(() => {
    window.location.href = '../index.html';
  }, 200);
}

function showWinnerPopup(winner) {
  if (winner === 'draw') {
    winnerText.textContent = "It's a Draw 😟!";
    winnerGif.src = '../assets/try_again.gif'; 
    failSound.currentTime = 0;
    failSound.play().catch(() => {});
  } else {
    if (gameMode === 'computer') {
      winnerText.textContent = winner === 'X' ? 'You Win 🎉!' : 'Computer Wins 🤖!';
    } else {
      winnerText.textContent = `Player ${winner} Wins 🎉!`;
    }
    winnerGif.src = '../assets/victory.gif';
    winSound.currentTime = 0;
    winSound.play().catch(() => {});
  }

  winnerPopup.style.display = 'flex';
}

function closePopup() {
  winnerPopup.style.display = 'none';
  actionSound.currentTime = 0;
  actionSound.play();
}
