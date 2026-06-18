document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password-input');
  const authBtn = document.getElementById('auth-btn');
  const authError = document.getElementById('auth-error');
  const hintBtn = document.getElementById('hint-btn');
  const hintBox = document.getElementById('hint-box');
  const authScreen = document.getElementById('auth-screen');
  const mainContent = document.getElementById('main-content');

  const PASSWORD = '212121';

  passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tryAuth();
    hintBox.style.display = 'none';
    authError.style.display = 'none';
  });

  authBtn.addEventListener('click', tryAuth);

  hintBtn.addEventListener('click', () => {
    hintBox.style.display = hintBox.style.display === 'block' ? 'none' : 'block';
  });

  function tryAuth() {
    const val = passwordInput.value.trim();
    if (val === PASSWORD) {
      const audio = document.getElementById('audio-player');
      audio.src = 'audio/01-tantsy.mp3';
      audio.play().catch(() => {});

      authScreen.classList.add('hidden');
      setTimeout(() => {
        authScreen.style.display = 'none';
        mainContent.style.display = 'block';
        mainContent.style.animation = 'none';
        void mainContent.offsetHeight;
        mainContent.style.animation = 'contentFadeIn 1.2s ease forwards';
        document.body.style.overflow = 'auto';
        if (typeof initMain === 'function') initMain();
        if (typeof initPlayer === 'function') initPlayer();
      }, 800);
    } else {
      authError.style.display = 'block';
      passwordInput.value = '';
      passwordInput.focus();
    }
  }

  document.body.style.overflow = 'hidden';
});
