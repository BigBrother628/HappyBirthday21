let currentTrack = 0;
let isPlaying = false;

const tracks = [
  { name: 'ssshhhhiiittt! — Танцы', file: 'audio/01-tantsy.mp3' },
  { name: 'Whole Lotta Swag — я тебя люблю', file: 'audio/02-lyublyu.mp3' },
  { name: 'тёмный принц — цветы', file: 'audio/03-tsvety.mp3' }
];

function initPlayer() {
  const audio = document.getElementById('audio-player');
  const toggle = document.getElementById('player-toggle');
  const icon = document.getElementById('player-icon');
  const prevBtn = document.getElementById('player-prev');
  const nextBtn = document.getElementById('player-next');
  const volSlider = document.getElementById('vol-slider');
  const volIcon = document.querySelector('.vol-icon');
  const listBtn = document.getElementById('player-list-btn');
  const tracklist = document.getElementById('player-tracklist');
  const progressBar = document.getElementById('player-progress-bar');
  const progress = document.getElementById('player-progress');
  const currentEl = document.getElementById('player-current');
  const totalEl = document.getElementById('player-total');
  const nameEl = document.getElementById('player-track-name');
  const items = document.querySelectorAll('.tracklist-item');

  function setIcon(state) {
    icon.className = 'icon ' + state;
  }

  function loadTrack(index) {
    currentTrack = index;
    audio.src = tracks[index].file;
    nameEl.textContent = tracks[index].name;
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  function tryPlay() {
    audio.play().catch(() => {
      isPlaying = false;
      setIcon('play');
      nameEl.textContent = 'Добавь MP3 в папку audio/';
    });
  }

  function prevTrack() {
    const prev = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    loadTrack(prev);
    if (isPlaying) tryPlay();
    tracklist.classList.remove('open');
  }

  function nextTrack() {
    const next = (currentTrack + 1) % tracks.length;
    loadTrack(next);
    if (isPlaying) tryPlay();
    tracklist.classList.remove('open');
  }

  if (!audio.paused) {
    isPlaying = true;
    setIcon('pause');
    nameEl.textContent = tracks[currentTrack].name;
  }

  function togglePlay() {
    if (!audio.src) loadTrack(0);
    if (isPlaying) {
      audio.pause();
      setIcon('play');
    } else {
      tryPlay();
      setIcon('pause');
    }
    isPlaying = !isPlaying;
  }

  toggle.addEventListener('click', togglePlay);

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && document.getElementById('main-content').style.display !== 'none') {
      e.preventDefault();
      togglePlay();
    }
  });

  prevBtn.addEventListener('click', prevTrack);
  nextBtn.addEventListener('click', nextTrack);

  volSlider.addEventListener('input', () => {
    audio.volume = parseFloat(volSlider.value);
    volIcon.textContent = volSlider.value === '0' ? '🔇' : volSlider.value < 0.4 ? '🔈' : '🔊';
  });

  audio.addEventListener('ended', nextTrack);

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = pct + '%';
      currentEl.textContent = formatTime(audio.currentTime);
      totalEl.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    totalEl.textContent = formatTime(audio.duration);
    if (isPlaying) tryPlay();
  });

  audio.addEventListener('error', () => {
    isPlaying = false;
    setIcon('play');
    nameEl.textContent = 'Файл не найден. См. audio/README.txt';
  });

  progress.addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = progress.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  });

  listBtn.addEventListener('click', () => {
    tracklist.classList.toggle('open');
  });

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.track);
      tracklist.classList.remove('open');
      if (idx === currentTrack && isPlaying) return;
      loadTrack(idx);
      if (!isPlaying) {
        isPlaying = true;
        setIcon('pause');
      }
      tryPlay();
    });
  });

  if (!audio.src) {
    loadTrack(0);
  } else {
    currentTrack = 0;
    nameEl.textContent = tracks[0].name;
    items.forEach((item, i) => {
      item.classList.toggle('active', i === 0);
    });
  }
}

function formatTime(t) {
  if (!t || isNaN(t)) return '0:00';
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return m + ':' + (s < 10 ? '0' : '') + s;
}
