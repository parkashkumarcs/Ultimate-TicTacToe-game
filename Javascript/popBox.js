const closeModal = document.getElementById('closeModal');
const modalContent = document.querySelector('.model__Content');
const openModal = document.getElementById('openModal');
const gridModal = document.getElementById('gridModal');

const hoverSound = document.getElementById('hoverSound');
const clickSound = document.getElementById('clickSound');


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
