function initGallery() {
  const photos = [
    { file: 'photos/1.jpg', caption: 'Мне так тепло, когда я вижу тебя.' },
    { file: 'photos/2.jpg', caption: 'Самая родная и любимая.' },
    { file: 'photos/3.jpg', caption: 'Пусть всё вокруг будет таким же прекрасным, как ты на этом снимке.' },
    { file: 'photos/4.jpg', caption: 'Только твоя улыбка имеет для меня значение.' },
    { file: 'photos/5.jpg', caption: 'Ты делаешь этот мир (и мою галерею) лучше.' },
    { file: 'photos/6.jpg', caption: 'Мой шайлушайчик.' },
    { file: 'photos/7.jpg', caption: 'Мне так тепло, когда я вижу тебя.' },
    { file: 'photos/9.jpg', caption: 'Самая родная и любимая.' }
  ];

  const track = document.getElementById('gallery-track');
  const prev = document.getElementById('gallery-prev');
  const next = document.getElementById('gallery-next');
  const dotsEl = document.getElementById('gallery-dots');
  let current = 0;

  photos.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'polaroid';
    card.dataset.index = i;
    const rot = (Math.random() * 6 - 3).toFixed(1);
    card.style.transform = `rotate(${rot}deg)`;
    card.innerHTML = `
      <div class="polaroid-img">
        <img src="${p.file}" alt="Фото ${i + 1}" loading="lazy">
      </div>
      <div class="polaroid-caption">${p.caption}</div>
    `;
    track.appendChild(card);

    const dot = document.createElement('button');
    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll('.gallery-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prev.addEventListener('click', () => {
    goTo(current === 0 ? photos.length - 1 : current - 1);
  });

  next.addEventListener('click', () => {
    goTo(current === photos.length - 1 ? 0 : current + 1);
  });

  let touchStart = 0;
  const container = document.getElementById('gallery-container');
  container.addEventListener('touchstart', (e) => {
    touchStart = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const diff = touchStart - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next.click() : prev.click();
    }
  }, { passive: true });

  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('section-gallery').classList.contains('active')) return;
    if (e.key === 'ArrowLeft') prev.click();
    if (e.key === 'ArrowRight') next.click();
  });

  goTo(0);
}
