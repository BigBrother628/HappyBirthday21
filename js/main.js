let counterInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('splash-screen').classList.add('hidden');
  }, 2200);
});

function initMain() {
  counterInterval = initCounter();
  initLetter();
  initGallery();
  initGames();
  initSecrets();
  initFloatingHearts();
  initNav();
  initFireworks();
}

function initNav() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      document.getElementById('section-' + btn.dataset.section).classList.add('active');
    });
  });
}

function initFloatingHearts() {
  const container = document.getElementById('floating-hearts');
  const hearts = ['💕', '❤️', '💗', '💖', '💝', '🌸'];
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (14 + Math.random() * 18) + 'px';
    heart.style.animationDuration = (8 + Math.random() * 12) + 's';
    heart.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(heart);
  }
}

function initSecrets() {
  const spot = document.getElementById('secret-spot');
  const secretText = document.getElementById('secret-text');
  let clickCount = 0;

  const messages = [
    '💕 Я тебя люблю!',
    '💗 Ты — моё всё!',
    '💖 Ты самая красивая!',
    '💝 Ты — мой sunshine!',
    '❤️ Навсегда твой!'
  ];

  spot.addEventListener('click', (e) => {
    const existing = document.querySelector('.secret-message');
    if (existing) existing.remove();

    const msg = document.createElement('div');
    msg.className = 'secret-message';
    msg.textContent = messages[clickCount % messages.length];
    document.body.appendChild(msg);

    clickCount++;

    setTimeout(() => msg.remove(), 3000);
  });
}
