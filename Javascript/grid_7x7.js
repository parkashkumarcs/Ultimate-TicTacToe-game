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

let game_Board = Array(49).fill("");
let game_Active = true;
let current_Player = 'X';
const boardSize = 7;
const winLength = 5;

function playSound() {
  clickSoundGB.currentTime = 0;
  clickSoundGB.play();
}

function checkLine(start, step) {
  const first = game_Board[start];
  if (!first) return false;

  for (let i = 1; i < winLength; i++) {
    const index = start + i * step;
    if (game_Board[index] !== first) return false;
  }

  return true;
}

function checkWinner() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col <= boardSize - winLength; col++) {
      const index = row * boardSize + col;
      if (checkLine(index, 1)) return announceWinner(index);
    }
  }

  for (let col = 0; col < boardSize; col++) {
    for (let row = 0; row <= boardSize - winLength; row++) {
      const index = row * boardSize + col;
      if (checkLine(index, boardSize)) return announceWinner(index);
    }
  }

  for (let row = 0; row <= boardSize - winLength; row++) {
    for (let col = 0; col <= boardSize - winLength; col++) {
      const index = row * boardSize + col;
      if (checkLine(index, boardSize + 1)) return announceWinner(index);
    }
  }

  for (let row = 0; row <= boardSize - winLength; row++) {
    for (let col = winLength - 1; col < boardSize; col++) {
      const index = row * boardSize + col;
      if (checkLine(index, boardSize - 1)) return announceWinner(index);
    }
  }

  if (!game_Board.includes("")) {
    status.textContent = "It's Draw 😟!";
    game_Active = false;
    showWinnerPopup("draw");
    return true;
  }

  return false;
}

function announceWinner(index) {
  const winner = game_Board[index];
  status.textContent = `Player ${winner} Wins 😎!`;
  game_Active = false;
  showWinnerPopup(winner);
  return true;
}

// 🎯 Advanced AI Evaluation
function evaluateWindow(indices, symbol) {
  let score = 0;
  let countSelf = 0, countOpp = 0;

  for (let i of indices) {
    if (game_Board[i] === symbol) countSelf++;
    else if (game_Board[i] !== "") countOpp++;
  }

  if (countOpp > 0 && countSelf > 0) return 0;

  if (countSelf === 4 && indices.some(i => game_Board[i] === "")) score += 100;
  else if (countSelf === 3) score += 20;
  else if (countSelf === 2) score += 10;
  else if (countSelf === 1) score += 1;

  if (countOpp === 4 && indices.some(i => game_Board[i] === "")) score += 50;
  else if (countOpp === 3) score += 10;

  return score;
}

function getAllWindows() {
  const windows = [];

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col <= boardSize - winLength; col++) {
      const window = [];
      for (let i = 0; i < winLength; i++) {
        window.push(row * boardSize + col + i);
      }
      windows.push(window);
    }
  }

  for (let col = 0; col < boardSize; col++) {
    for (let row = 0; row <= boardSize - winLength; row++) {
      const window = [];
      for (let i = 0; i < winLength; i++) {
        window.push((row + i) * boardSize + col);
      }
      windows.push(window);
    }
  }

  for (let row = 0; row <= boardSize - winLength; row++) {
    for (let col = 0; col <= boardSize - winLength; col++) {
      const window = [];
      for (let i = 0; i < winLength; i++) {
        window.push((row + i) * boardSize + col + i);
      }
      windows.push(window);
    }
  }

  for (let row = 0; row <= boardSize - winLength; row++) {
    for (let col = winLength - 1; col < boardSize; col++) {
      const window = [];
      for (let i = 0; i < winLength; i++) {
        window.push((row + i) * boardSize + col - i);
      }
      windows.push(window);
    }
  }

  return windows;
}

function bestMove() {
  const windows = getAllWindows();
  const scores = Array(49).fill(0);

  for (let window of windows) {
    const scoreO = evaluateWindow(window, 'O');
    for (let index of window) {
      if (game_Board[index] === "") scores[index] += scoreO;
    }
  }

  let maxScore = -Infinity;
  let bestMoves = [];

  scores.forEach((score, index) => {
    if (score > maxScore) {
      maxScore = score;
      bestMoves = [index];
    } else if (score === maxScore) {
      bestMoves.push(index);
    }
  });

  if (bestMoves.length === 0) return null;
  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}

function computerMove() {
  if (!game_Active) return;
  const move = bestMove();
  if (move !== null && game_Board[move] === "") {
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
    const index = parseInt(cell.dataset.index);
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
  actionSound.currentTime = 0;
  actionSound.play();
  game_Board = Array(49).fill("");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('X', 'O');
  });
  game_Active = true;
  current_Player = "X";
  status.textContent = "Your Turn (X)";
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
    winnerText.textContent = winner === 'X' ? 'You Win 🎉!' : 'Computer Wins 🤖!';
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
