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

let game_Board = Array(25).fill("");
let game_Active = true;
let current_Player = 'X';
const boardSize = 5;
const winLength = 4;

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

  if (!game_Board.includes('')) {
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

function evaluateLine(indices, symbol) {
  let score = 0;
  let countSelf = 0;
  let countOpponent = 0;
  for (let idx of indices) {
    if (game_Board[idx] === symbol) countSelf++;
    else if (game_Board[idx] !== "") countOpponent++;
  }

  if (countOpponent > 0 && countSelf > 0) return 0;
  if (countSelf === 4) score += 100;
  else if (countSelf === 3) score += 20;
  else if (countSelf === 2) score += 5;
  else if (countSelf === 1) score += 1;

  if (countOpponent === 3 && countSelf === 0) score += 30; 

  return score;
}

function bestMove() {
  const scores = Array(25).fill(0);
  const lines = [];

  // Row lines
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col <= boardSize - winLength; col++) {
      let line = [];
      for (let i = 0; i < winLength; i++) {
        line.push(row * boardSize + (col + i));
      }
      lines.push(line);
    }
  }

  // Col lines
  for (let col = 0; col < boardSize; col++) {
    for (let row = 0; row <= boardSize - winLength; row++) {
      let line = [];
      for (let i = 0; i < winLength; i++) {
        line.push((row + i) * boardSize + col);
      }
      lines.push(line);
    }
  }

  // Diagonal ↘
  for (let row = 0; row <= boardSize - winLength; row++) {
    for (let col = 0; col <= boardSize - winLength; col++) {
      let line = [];
      for (let i = 0; i < winLength; i++) {
        line.push((row + i) * boardSize + (col + i));
      }
      lines.push(line);
    }
  }

  // Anti-Diagonal ↙
  for (let row = 0; row <= boardSize - winLength; row++) {
    for (let col = winLength - 1; col < boardSize; col++) {
      let line = [];
      for (let i = 0; i < winLength; i++) {
        line.push((row + i) * boardSize + (col - i));
      }
      lines.push(line);
    }
  }

  for (let line of lines) {
    for (let idx of line) {
      if (game_Board[idx] === "") {
        scores[idx] += evaluateLine(line, "O"); // Offensive
        scores[idx] += evaluateLine(line, "X"); // Defensive
      }
    }
  }

  let maxScore = -1;
  let bestIndices = [];
  scores.forEach((val, idx) => {
    if (game_Board[idx] === "") {
      if (val > maxScore) {
        maxScore = val;
        bestIndices = [idx];
      } else if (val === maxScore) {
        bestIndices.push(idx);
      }
    }
  });

  if (bestIndices.length > 0) {
    return bestIndices[Math.floor(Math.random() * bestIndices.length)];
  }

  // Fallback
  const emptyIndices = game_Board.map((val, i) => val === "" ? i : null).filter(i => i !== null);
  return emptyIndices.length > 0 ? emptyIndices[Math.floor(Math.random() * emptyIndices.length)] : null;
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
  actionSound.currentTime = 0;
  actionSound.play();
  game_Board = Array(25).fill("");
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
