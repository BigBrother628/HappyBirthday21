function initFlowers() {
  const section = document.getElementById('section-flowers');
  const rosesContainer = document.getElementById('bouquet-roses');
  const message = document.getElementById('bouquet-message');

  const roseTypes = ['🌹', '🌹', '🌹', '🌹', '🌹', '🌷', '🌸', '🌿', '🌿', '🌹', '🌹', '🌹'];
  let hasAnimated = false;

  const messages = [
    'Для тебя, моя любимая 🌹',
    'Ты прекрасна, как эти розы 💗',
    'Каждый лепесток — моя любовь ❤️',
    'Цветы вянут, а моя любовь — никогда 💕',
    'Ты — самый красивый цветок в моей жизни 🌸'
  ];

  function animateBouquet() {
    if (hasAnimated) return;
    hasAnimated = true;
    rosesContainer.innerHTML = '';

    roseTypes.forEach((rose, i) => {
      const span = document.createElement('span');
      span.className = 'bouquet-rose';
      span.textContent = rose;
      span.style.animationDelay = (i * 0.12) + 's';
      rosesContainer.appendChild(span);
    });

    message.textContent = messages[Math.floor(Math.random() * messages.length)];

    setTimeout(() => {
      message.textContent = 'Нажми на цветочек — он подмигнёт тебе 💕';
    }, roseTypes.length * 120 + 1500);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        animateBouquet();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);

  rosesContainer.addEventListener('click', (e) => {
    const rose = e.target.closest('.bouquet-rose');
    if (rose) {
      rose.style.animation = 'none';
      void rose.offsetHeight;
      rose.style.animation = 'roseWobble 0.4s ease';
      const emojis = ['💕', '❤️', '💗', '💖', '✨'];
      const sparkle = document.createElement('span');
      sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      sparkle.style.cssText = `
        position: absolute; font-size: 20px;
        animation: floatUp 1.5s ease-out forwards;
        pointer-events: none;
      `;
      const rect = rose.getBoundingClientRect();
      sparkle.style.left = (rect.left + rect.width / 2 - 10) + 'px';
      sparkle.style.top = (rect.top - 10) + 'px';
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1500);
    }
  });
}
