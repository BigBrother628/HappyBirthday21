function initGallery() {
  const base = window.location.pathname.replace(/\/[^/]*$/, '') || '';
  const photos = [
    { file: base + '/photos/1.jpg', caption: 'Мне так тепло, когда я вижу тебя.' },
    { file: base + '/photos/2.jpg', caption: 'Самая родная и любимая.' },
    { file: base + '/photos/3.jpg', caption: 'Пусть всё вокруг будет таким же прекрасным, как ты на этом снимке.' },
    { file: base + '/photos/4.jpg', caption: 'Всё остальное вокруг меркнет по сравнению с тобой.' },
    { file: base + '/photos/5.jpg', caption: 'Ты делаешь этот мир (и мою галерею) лучше.' },
    { file: base + '/photos/6.jpg', caption: 'Мой шайлушайчик.' },
    { file: base + '/photos/7.jpg', caption: 'Мне так тепло, когда я вижу тебя.' },
    { file: base + '/photos/9.jpg', caption: 'Самая родная и любимая.' }
  ];

  const track = document.getElementById('gallery-track');
  const prev = document.getElementById('gallery-prev');
  const next = document.getElementById('gallery-next');
  const dotsEl = document.getElementById('gallery-dots');
  let current = 0;

  photos.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'polaroid';
    const rot = (Math.random() * 6 - 3).toFixed(1);
    card.style.transform = 'rotate(' + rot + 'deg)';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'polaroid-img';

    const img = document.createElement('img');
    img.src = p.file;
    img.alt = 'Фото ' + (i + 1);
    img.loading = 'lazy';
    img.onerror = function () {
      imgWrap.innerHTML = '<div class="polaroid-placeholder">💕</div>';
    };

    imgWrap.appendChild(img);
    card.appendChild(imgWrap);

    const cap = document.createElement('div');
    cap.className = 'polaroid-caption';
    cap.textContent = p.caption;
    card.appendChild(cap);

    track.appendChild(card);

    const dot = document.createElement('button');
    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', function() { goTo(i); });
    dotsEl.appendChild(dot);
  });

  function goTo(index) {
    current = index;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    var dots = document.querySelectorAll('.gallery-dot');
    for (var d = 0; d < dots.length; d++) {
      dots[d].classList.toggle('active', d === current);
    }
  }

  prev.addEventListener('click', function() {
    goTo(current === 0 ? photos.length - 1 : current - 1);
  });

  next.addEventListener('click', function() {
    goTo(current === photos.length - 1 ? 0 : current + 1);
  });

  var touchStart = 0;
  var container = document.getElementById('gallery-container');
  container.addEventListener('touchstart', function(e) {
    touchStart = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', function(e) {
    var diff = touchStart - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) { next.click(); } else { prev.click(); }
    }
  }, { passive: true });

  document.addEventListener('keydown', function(e) {
    var section = document.getElementById('section-gallery');
    if (!section || !section.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') prev.click();
    if (e.key === 'ArrowRight') next.click();
  });

  goTo(0);
}
