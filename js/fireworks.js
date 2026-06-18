let fireworksAnimId = null;

function initFireworks() {
  const overlay = document.getElementById('fireworks-overlay');
  const canvas = document.getElementById('fireworks-canvas');
  const ctx = canvas.getContext('2d');
  const closeBtn = document.getElementById('fireworks-close');
  const startBtn = document.getElementById('fireworks-start');

  let particles = [];
  let rockets = [];
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.7,
        r: 0.5 + Math.random() * 1.5,
        twinkle: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.03
      });
    }
  }

  function createRocket() {
    const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
    const targetY = Math.random() * canvas.height * 0.35 + canvas.height * 0.05;
    rockets.push({
      x: x,
      y: canvas.height,
      targetY: targetY,
      speed: 4 + Math.random() * 3,
      trail: []
    });
  }

  function explode(x, y) {
    const colors = [
      '#FF6B9D', '#FFB6C1', '#FFD1DC', '#FF9CB4',
      '#FFC0CB', '#FF69B4', '#DB7093', '#FFFFFF',
      '#FFA07A', '#FFD700', '#FF1493'
    ];
    const count = 60 + Math.floor(Math.random() * 40);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 5;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.008 + Math.random() * 0.015,
        color: Math.random() > 0.5 ? color : color2,
        size: 2 + Math.random() * 3,
        gravity: 0.04
      });
    }

    if (Math.random() > 0.5) {
      setTimeout(() => explode(x + (Math.random() - 0.5) * 40, y + (Math.random() - 0.5) * 20), 100);
    }
  }

  function update() {
    ctx.fillStyle = 'rgba(10, 5, 20, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
      s.twinkle += s.speed;
      const alpha = 0.3 + Math.sin(s.twinkle) * 0.4;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    });

    rockets = rockets.filter(r => {
      r.trail.push({ x: r.x, y: r.y });
      if (r.trail.length > 12) r.trail.shift();

      r.y -= r.speed;
      r.speed *= 0.99;

      r.trail.forEach((t, i) => {
        ctx.beginPath();
        ctx.arc(t.x, t.y, 1.5 * (i / r.trail.length), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 182, 193, ${i / r.trail.length * 0.4})`;
        ctx.fill();
      });

      ctx.beginPath();
      ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#FFE4E1';
      ctx.fill();

      if (r.y <= r.targetY) {
        explode(r.x, r.y);
        return false;
      }
      return true;
    });

    particles = particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.99;
      p.life -= p.decay;

      if (p.life > 0) {
        const alpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.globalAlpha = alpha * 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
        return true;
      }
      return false;
    });

    fireworksAnimId = requestAnimationFrame(update);
  }

  function startFireworks() {
    if (fireworksAnimId) return;
    resize();
    createStars();
    ctx.fillStyle = 'rgba(10, 5, 20, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    update();

    let rocketCount = 0;
    const maxRockets = 18;
    const rocketInterval = setInterval(() => {
      if (rocketCount >= maxRockets || !overlay.classList.contains('active')) {
        clearInterval(rocketInterval);
        return;
      }
      createRocket();
      if (Math.random() > 0.4) setTimeout(createRocket, 200);
      rocketCount++;
    }, 400);

    const caption = document.getElementById('fireworks-caption');
    caption.style.display = 'block';
  }

  function stopFireworks() {
    if (fireworksAnimId) {
      cancelAnimationFrame(fireworksAnimId);
      fireworksAnimId = null;
    }
    particles = [];
    rockets = [];
  }

  window.addEventListener('resize', resize);

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    explode(x, y);
  });

  startBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    document.body.classList.add('fireworks-active');
    document.body.style.overflow = 'hidden';
    setTimeout(startFireworks, 300);
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    document.body.classList.remove('fireworks-active');
    document.body.style.overflow = '';
    stopFireworks();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      document.body.classList.remove('fireworks-active');
      document.body.style.overflow = '';
      stopFireworks();
    }
  });
}
