/* ================================
   MEMORY GAME
   ================================ */

const memoryEmojis = ['🌹', '💕', '🎀', '🐱', '⭐', '🎁'];
let memoryCards = [];
let memoryFlipped = [];
let memoryMatched = [];
let memoryMoves = 0;
let memoryLocked = false;

function initMemory() {
  const grid = document.getElementById('memory-grid');
  const movesEl = document.getElementById('memory-moves');
  const foundEl = document.getElementById('memory-found');
  const winEl = document.getElementById('memory-win');

  memoryCards = [...memoryEmojis, ...memoryEmojis];
  for (let i = memoryCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [memoryCards[i], memoryCards[j]] = [memoryCards[j], memoryCards[i]];
  }

  memoryFlipped = [];
  memoryMatched = [];
  memoryMoves = 0;
  memoryLocked = false;
  movesEl.textContent = '0';
  foundEl.textContent = '0';
  winEl.style.display = 'none';

  grid.innerHTML = '';
  memoryCards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.index = index;
    card.innerHTML = '<span class="card-content">💕</span>';
    card.addEventListener('click', () => flipCard(card, index));
    grid.appendChild(card);
  });
}

function flipCard(card, index) {
  if (memoryLocked) return;
  if (memoryMatched.includes(index)) return;
  if (memoryFlipped.includes(index)) return;
  if (memoryFlipped.length >= 2) return;

  card.classList.add('flipped');
  card.querySelector('.card-content').textContent = memoryCards[index];
  memoryFlipped.push(index);

  if (memoryFlipped.length === 2) {
    memoryMoves++;
    document.getElementById('memory-moves').textContent = memoryMoves;
    checkMatch();
  }
}

function checkMatch() {
  memoryLocked = true;
  const [a, b] = memoryFlipped;
  const cards = document.querySelectorAll('.memory-card');

  if (memoryCards[a] === memoryCards[b]) {
    memoryMatched.push(a, b);
    setTimeout(() => {
      cards[a].classList.add('matched');
      cards[b].classList.add('matched');
      memoryFlipped = [];
      memoryLocked = false;
      document.getElementById('memory-found').textContent = memoryMatched.length / 2;
      if (memoryMatched.length === memoryCards.length) {
        document.getElementById('memory-final-moves').textContent = memoryMoves;
        document.getElementById('memory-win').style.display = 'block';
      }
    }, 500);
  } else {
    setTimeout(() => {
      cards[a].classList.remove('flipped');
      cards[b].classList.remove('flipped');
      cards[a].querySelector('.card-content').textContent = '💕';
      cards[b].querySelector('.card-content').textContent = '💕';
      memoryFlipped = [];
      memoryLocked = false;
    }, 1000);
  }
}

/* ================================
   QUIZ
   ================================ */

const quizQuestions = [
  {
    question: 'Как Шайлушайчик называет тебя чаще всего?',
    options: ['Моя девочка', 'Солнышко', 'Зайка', 'Королева'],
    correct: -1
  },
  {
    question: 'Что Шайлушайчик любит в тебе больше всего?',
    options: ['Твою улыбку', 'Твою доброту', 'Твой смех', 'Всё в тебе!'],
    correct: -1
  },
  {
    question: 'Какое ваше любимое совместное занятие?',
    options: ['Смотреть фильмы', 'Гулять вместе', 'Обниматься', 'Всё, что с тобой'],
    correct: -1
  },
  {
    question: 'Что Шайлушайчик говорит тебе каждый день?',
    options: ['Доброе утро', 'Я тебя люблю', 'Ты красивая', 'Всё это сразу'],
    correct: -1
  },
  {
    question: 'Какое время суток самое любимое для вас двоих?',
    options: ['Утро — начать день вместе', 'День — быть рядом', 'Вечер — обниматься', 'Каждое мгновение с тобой'],
    correct: -1
  }
];

function initQuiz() {
  const container = document.getElementById('quiz-container');
  const result = document.getElementById('quiz-result');
  let currentQ = 0;
  let answers = [];

  result.style.display = 'none';
  container.innerHTML = '';

  function renderQuestion() {
    if (currentQ >= quizQuestions.length) {
      showResult();
      return;
    }

    const q = quizQuestions[currentQ];
    container.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'quiz-question';
    div.innerHTML = `<p class="quiz-q-text">${currentQ + 1}. ${q.question}</p>`;

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        div.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        answers[currentQ] = idx;
      });
      div.appendChild(btn);
    });

    container.appendChild(div);
    addNavButtons();
  }

  function addNavButtons() {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex; gap:10px; justify-content:center; margin-top:16px;';

    if (currentQ < quizQuestions.length - 1) {
      const nextBtn = document.createElement('button');
      nextBtn.className = 'quiz-submit';
      nextBtn.textContent = 'Далее 💕';
      nextBtn.style.padding = '12px 30px';
      nextBtn.addEventListener('click', () => {
        if (answers[currentQ] === undefined) {
          alert('Выбери ответ, милая! 💗');
          return;
        }
        currentQ++;
        renderQuestion();
      });
      wrapper.appendChild(nextBtn);
    } else {
      const finishBtn = document.createElement('button');
      finishBtn.className = 'quiz-submit';
      finishBtn.textContent = '✨ Узнать результат ✨';
      finishBtn.addEventListener('click', () => {
        if (answers[currentQ] === undefined) {
          alert('Выбери ответ, милая! 💗');
          return;
        }
        showResult();
      });
      wrapper.appendChild(finishBtn);
    }

    container.appendChild(wrapper);
  }

  function showResult() {
    container.innerHTML = '';
    const heartsCount = answers.filter(a => a !== undefined).length * 3 + 5;
    const results = [
      {
        emoji: '💖',
        score: `${heartsCount} сердечек из ${quizQuestions.length * 3 + 5}!`,
        title: 'Ты — само совершенство!',
        text: 'Каждый твой ответ наполнен любовью! Ты самая лучшая, самая красивая и самая любимая. Шайлушайчик обожает тебя больше всего на свете! ❤️'
      },
      {
        emoji: '💕',
        score: `${heartsCount} сердечек из ${quizQuestions.length * 3 + 5}!`,
        title: 'Идеальное попадание!',
        text: 'Ты знаешь всё о любви! Шайлушайчик счастлив, что ты есть. Каждый день с тобой — это подарок судьбы! 💗'
      }
    ];

    const r = results[Math.floor(Math.random() * results.length)];
    result.style.display = 'block';
    result.innerHTML = `
      <span class="quiz-result-emoji">${r.emoji}</span>
      <h3>${r.title}</h3>
      <p class="quiz-result-score">${r.score}</p>
      <p>${r.text}</p>
      <button class="quiz-restart" onclick="initQuiz()">🔄 Пройти ещё раз</button>
    `;
  }

  renderQuestion();
}

/* ================================
   INIT GAMES
   ================================ */

function initGames() {
  initMemory();
  initQuiz();

  document.querySelectorAll('.game-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.game-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.game-content').forEach(c => c.classList.remove('active'));
      document.getElementById('game-' + tab.dataset.game).classList.add('active');
    });
  });
}
