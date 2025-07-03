// --- Modal Elements ---
const openModal = document.getElementById('openModal');
const p2pBtn = document.getElementById('p2pBtn');
const gridModal = document.getElementById('gridModal');
const modalContent = document.querySelector('.model__Content');
const closeModal = document.getElementById('closeModal');

const hoverSound = document.getElementById('hoverSound');
const clickSound = document.getElementById('clickSound');

// Sound Effects for Buttons
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

// --- Mode Selection ---
let currentMode = "computer"; // default

openModal.onclick = () => {
  currentMode = "computer";
  playClickSound();
  showGridModal();
};

p2pBtn.onclick = () => {
  currentMode = "p2p";
  playClickSound();
  showGridModal();
};

function showGridModal() {
  gridModal.style.display = 'flex';
  modalContent.style.animation = 'none';
  modalContent.offsetHeight;
  modalContent.style.animation = 'fadeInScale 0.4s ease forwards';
}

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

// --- Grid Button Navigation ---
const gridButtons = document.querySelectorAll('.button__Group .btn');
gridButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const baseLink = button.getAttribute('data-link');
    if (baseLink) {
      const finalLink = `${baseLink}?mode=${currentMode}`;
      setTimeout(() => {
        window.location.href = finalLink;
      }, 150);
    }
  });
});
