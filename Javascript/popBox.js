// Modal Elements
const closeModal = document.getElementById('closeModal');
const modalContent = document.querySelector('.model__Content');
const openModal = document.getElementById('openModal');
const gridModal = document.getElementById('gridModal');

const hoverSound = document.getElementById('hoverSound');
const clickSound = document.getElementById('clickSound');

// All buttons sound effect
const allButtons = document.querySelectorAll('button');
allButtons.forEach(btn => {
  btn.addEventListener('mouseenter', playHoverSound);
  btn.addEventListener('click', playClickSound);
});

function playHoverSound() {
  hoverSound.currentTime = 0;
  hoverSound.play().catch(() => {});
}

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

// Computer Mode Grid Modal
openModal.onclick = () => {
  playClickSound();
  gridModal.style.display = 'flex';
  modalContent.style.animation = 'none';
  modalContent.offsetHeight;
  modalContent.style.animation = 'fadeInScale 0.4s ease forwards';
};

closeModal.onclick = () => {
  playClickSound();
  gridModal.style.display = 'none';
};

window.onclick = (e) => {
  if (e.target === gridModal) {
    playClickSound();
    gridModal.style.display = 'none';
  }
};

// Grid navigation logic
const gridButtons = document.querySelectorAll('.button__Group .btn');
gridButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const link = button.getAttribute('data-link');
    if (link) {
      setTimeout(() => {
        window.location.href = link;
      }, 150);
    }
  });
});

// Multiplayer Modal
const multiplayerBtn = document.getElementById('multiplayerBtn');
const multiModal = document.getElementById('multiModal');
const closeMultiModal = document.getElementById('closeMultiModal');

multiplayerBtn.onclick = () => {
  playClickSound();
  multiModal.style.display = 'flex';
  const modalContent = multiModal.querySelector('.model__Content');
  modalContent.style.animation = 'none';
  modalContent.offsetHeight;
  modalContent.style.animation = 'fadeInScale 0.4s ease forwards';
};

closeMultiModal.onclick = () => {
  playClickSound();
  multiModal.style.display = 'none';
};

window.addEventListener('click', (e) => {
  if (e.target === multiModal) {
    playClickSound();
    multiModal.style.display = 'none';
  }
});

// Generate Code Modal
const generateCodeBtn = document.getElementById('generateCodeBtn');
const generatedCodeModal = document.getElementById('generatedCodeModal');
const generatedCodeField = document.getElementById('generatedCodeField');
const closeCodeModal = document.getElementById('closeCodeModal');
const copyCodeBtn = document.getElementById('copyCodeBtn');

generateCodeBtn.onclick = (e) => {
  e.preventDefault();
  const code = Math.random().toString(36).substr(2, 6).toUpperCase();
  const link = `${window.location.origin}/?join=${code}`;
  generatedCodeField.value = link;

  playClickSound();
  generatedCodeModal.style.display = 'flex';
  const modalContent = generatedCodeModal.querySelector('.model__Content');
  modalContent.style.animation = 'none';
  modalContent.offsetHeight;
  modalContent.style.animation = 'fadeInScale 0.4s ease forwards';
};

closeCodeModal.onclick = () => {
  playClickSound();
  generatedCodeModal.style.display = 'none';
};

copyCodeBtn.onclick = () => {
  generatedCodeField.select();
  document.execCommand('copy');
  copyCodeBtn.textContent = 'Copied!';
  setTimeout(() => copyCodeBtn.textContent = 'Copy Link', 1500);
};

window.addEventListener('click', (e) => {
  if (e.target === generatedCodeModal) {
    playClickSound();
    generatedCodeModal.style.display = 'none';
  }
});

// Prevent default page reload for Start Game
const startGameBtn = document.getElementById('startGameBtn');
startGameBtn.onclick = (e) => {
  e.preventDefault();
  playClickSound();

  // Show grid modal again to pick board size
  multiModal.style.display = 'none';
  gridModal.style.display = 'flex';
  modalContent.style.animation = 'none';
  modalContent.offsetHeight;
  modalContent.style.animation = 'fadeInScale 0.4s ease forwards';
};
