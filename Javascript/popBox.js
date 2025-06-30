const closeModal = document.getElementById('closeModal');
const modalContent = document.querySelector('.model__Content');
const openModal = document.getElementById('openModal');
const gridModal = document.getElementById('gridModal');

const hoverSound = document.getElementById('hoverSound');
const clickSound = document.getElementById('clickSound');
const bgMusic = document.getElementById('bgMusic');
const muteToggle = document.getElementById('muteToggle');
const volumeSlider = document.getElementById('volumeSlider');

const musicTracks = [
  './assets/last-hope.mp3',

];

function shuffleMusicList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

bgMusic.volume = 0.5;
volumeSlider.value = 0.5;

window.addEventListener('load', () => {
  const allowed = localStorage.getItem('musicAllowed');
  if (allowed === 'true') {
    startMusic();
  }
});

function startMusic() {
  bgMusic.src = shuffleMusicList(musicTracks);
  bgMusic.loop = true;
  bgMusic.play()
    .then(() => localStorage.setItem('musicAllowed', 'true'))
    .catch(() => {});
}

document.body.addEventListener('click', startMusic, { once: true });
function playHoverSound() {
  hoverSound.currentTime = 0;
  hoverSound.play().catch(() => {});
}

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

const allButtons = document.querySelectorAll('button');
allButtons.forEach(btn => {
  btn.addEventListener('mouseenter', playHoverSound);
  btn.addEventListener('click', playClickSound);
});

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

const gridButtons = document.querySelectorAll('.button__Group .btn');
gridButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const link = button.getAttribute('data-link');
    setTimeout(() => {
      window.location.href = link;
    }, 150);
  });
});

muteToggle.addEventListener('click', () => {
  bgMusic.muted = !bgMusic.muted;
  muteToggle.textContent = bgMusic.muted ? 'Muted🔇' : 'Mute🔊';
});

volumeSlider.addEventListener('input', () => {
  bgMusic.volume = volumeSlider.value;
});
