const bgMusic = document.getElementById('bgMusic');
const muteToggle = document.getElementById('muteToggle');
const clickMuteSound = document.getElementById('clickMuteSound');

if (bgMusic) {
  const musicSrc = bgMusic.dataset.bg || ''; 
  bgMusic.src = musicSrc;
  bgMusic.volume = 0.5;

  window.addEventListener('load', () => {
    const allowed = localStorage.getItem('musicAllowed');
    if (allowed === 'true') {
      startMusic();
    }
  });

  document.body.addEventListener('click', startMusic, { once: true });

  function startMusic() {
    if (!bgMusic.src || bgMusic.src === window.location.href) {
      bgMusic.src = musicSrc;
    }

    bgMusic.loop = true;
    bgMusic.play()
      .then(() => localStorage.setItem('musicAllowed', 'true'))
      .catch(() => {});
  }

  if (muteToggle) {
    muteToggle.addEventListener('click', () => {
      bgMusic.muted = !bgMusic.muted;
      muteToggle.textContent = bgMusic.muted ? 'Muted🔇' : 'Mute🔊';

      if (clickMuteSound) {
        clickMuteSound.currentTime = 0;
        clickMuteSound.play().catch(() => {});
      }
    });
  }
}

const volumeSlider = document.getElementById('volumeSlider');

if (volumeSlider) {
  volumeSlider.value = bgMusic.volume;

  volumeSlider.addEventListener('input', () => {
    bgMusic.volume = parseFloat(volumeSlider.value);
  });
}
