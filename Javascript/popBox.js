const closeModal = document.getElementById('closeModal');
const modalContent = document.querySelector('.modal-content');
const openModal = document.getElementById('openModal');
const gridModal = document.getElementById('gridModal');

openModal.onclick = () => {
    gridModal.style.display = 'flex';
    modalContent.style.animation = 'none';
    modalContent.offsetHeight;
    modalContent.style.animation = 'fadeInScale 0.4s ease forwards';
};

closeModal.onclick = () => gridModal.style.display = 'none';
window.onclick = (e) => {
    if (e.target === gridModal) {
        gridModal.style.display = 'none';
    }
};