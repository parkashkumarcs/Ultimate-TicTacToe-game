const closeModal = document.getElementById('closeModal');
const modalContent = document.querySelector('.model__Content');
const openModal = document.getElementById('openModal');
const gridModal = document.getElementById('gridModal');

const hoverSound = document.getElementById('hoverSound');
const clickSound = document.getElementById('clickSound');
const bgMusic = document.getElementById('bgMusic');
const muteToggle = document.getElementById('muteToggle');
const volumeSlider = document.getElementById('volumeSlider');

// 🎵 Music List for Shuffle
const musicTracks = [
  './assets/best_console.mp3',
];

// 🎲 Shuffle function
function shuffleMusicList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// 🎧 Background music start after interaction
function initAudio() {
  bgMusic.src = shuffleMusicList(musicTracks);
  bgMusic.play().catch(() => {});
  document.body.removeEventListener('click', initAudio);
}
document.body.addEventListener('click', initAudio);

// 🔊 Hover
function playHoverSound() {
  hoverSound.currentTime = 0;
  hoverSound.play().catch(() => {});
}

// 🔊 Click
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

// ➕ Attach sounds to all buttons
const allButtons = document.querySelectorAll('button');
allButtons.forEach(btn => {
  btn.addEventListener('mouseenter', playHoverSound);
  btn.addEventListener('click', playClickSound);
});

// 💡 Modal logic
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

// 🔁 Grid button redirects
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

// 🔇 Mute / Unmute
muteToggle.addEventListener('click', () => {
  bgMusic.muted = !bgMusic.muted;
  muteToggle.textContent = bgMusic.muted ? 'Muted🔇' : 'Music🔊';
});

// 🎚 Volume control
volumeSlider.addEventListener('input', () => {
  bgMusic.volume = volumeSlider.value;
});
