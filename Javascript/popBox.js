const openModal = document.getElementById('openModal');
    const gridModal = document.getElementById('gridModal');
    const closeModal = document.getElementById('closeModal');

    openModal.onclick = () => gridModal.style.display = 'flex';
    closeModal.onclick = () => gridModal.style.display = 'none';

    window.onclick = (e) => {
      if (e.target === gridModal) {
        gridModal.style.display = 'none';
      }
    };