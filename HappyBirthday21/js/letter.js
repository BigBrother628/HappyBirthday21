function initLetter() {
  const envelope = document.getElementById('envelope');
  const letterPaper = document.getElementById('letter-paper');
  let isOpen = false;

  envelope.addEventListener('click', () => {
    isOpen = !isOpen;
    envelope.classList.toggle('opened', isOpen);
    letterPaper.classList.toggle('open', isOpen);

    if (isOpen) {
      setTimeout(() => {
        const hearts = ['💕', '❤️', '💗', '💖', '💝'];
        for (let i = 0; i < 8; i++) {
          const heart = document.createElement('div');
          heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
          heart.style.cssText = `
            position: fixed;
            font-size: ${16 + Math.random() * 20}px;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            pointer-events: none;
            z-index: 999;
            animation: floatUp 2s ease-out forwards;
          `;
          document.body.appendChild(heart);
          setTimeout(() => heart.remove(), 2000);
        }
      }, 300);
    }
  });
}
