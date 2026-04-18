// Birthday Website — script.js

// =========================================
// Sparkle Canvas
// =========================================
(function initSparkles() {
  const canvas = document.getElementById('sparkle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function spawnParticle() {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      alpha: 0,
      growing: true,
      speed: Math.random() * 0.015 + 0.008,
      color: ['#f8bbd9','#e1bee7','#bbdefb','#ffffff','#ce93d8'][Math.floor(Math.random()*5)]
    });
  }

  setInterval(spawnParticle, 180);

  function drawSparkles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.alpha > 0 || p.growing);
    particles.forEach(p => {
      p.alpha += p.growing ? p.speed : -p.speed;
      if (p.alpha >= 1) p.growing = false;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      // 4-pointed star
      const s = p.r;
      ctx.moveTo(p.x, p.y - s*2);
      ctx.lineTo(p.x + s*0.5, p.y - s*0.5);
      ctx.lineTo(p.x + s*2, p.y);
      ctx.lineTo(p.x + s*0.5, p.y + s*0.5);
      ctx.lineTo(p.x, p.y + s*2);
      ctx.lineTo(p.x - s*0.5, p.y + s*0.5);
      ctx.lineTo(p.x - s*2, p.y);
      ctx.lineTo(p.x - s*0.5, p.y - s*0.5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(drawSparkles);
  }
  drawSparkles();
})();

// =========================================
// Balloons
// =========================================
(function initBalloons() {
  const container = document.getElementById('balloons');
  const emojis = ['🎈','🎈','🎈','🎀','🎊','🎉'];
  const positions = [5, 15, 28, 42, 58, 72, 85, 93];
  positions.forEach((left, i) => {
    const el = document.createElement('div');
    el.className = 'balloon';
    el.textContent = emojis[i % emojis.length];
    el.style.left = left + '%';
    el.style.setProperty('--dur', (7 + Math.random() * 5) + 's');
    el.style.setProperty('--delay', (Math.random() * 6) + 's');
    container.appendChild(el);
  });
})();

// =========================================
// Music Toggle
// =========================================
(function initMusic() {
  const btn = document.getElementById('music-toggle');
  const audio = document.getElementById('bg-music');
  if (!audio) return;
  let playing = false;
  btn.setAttribute('aria-pressed', 'false');
  btn.setAttribute('aria-label', 'Play background music');
  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      btn.textContent = '🎵';
    } else {
      audio.play().catch(() => {}); // ignore autoplay block
      btn.textContent = '⏸️';
    }
    playing = !playing;
    btn.setAttribute('aria-pressed', String(playing));
    btn.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
  });
})();

// =========================================
// Confetti Engine
// =========================================
function launchConfetti(canvas, x, y, count = 150) {
  const ctx = canvas.getContext('2d');
  const particles = [];
  const colors = ['#f8bbd9','#e1bee7','#bbdefb','#f48fb1','#ce93d8','#fff176','#ffffff'];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 3;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      r: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      gravity: 0.25,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.012;
      p.rotation += p.rotSpeed;
      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.5);
        ctx.restore();
      }
    });
    if (alive) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  draw();
}

// =========================================
// Gift Box Interaction
// =========================================
(function initGiftBox() {
  const giftBox = document.getElementById('gift-box');
  const lid = document.getElementById('gift-lid');
  const canvas = document.getElementById('confetti-canvas');
  const hiddenSections = document.querySelectorAll('.hidden-section');
  let opened = false;

  function openGift() {
    if (opened) return;
    opened = true;

    // Update aria state
    giftBox.setAttribute('aria-pressed', 'true');

    // 1. Animate lid off
    lid.classList.add('open');

    // 2. Confetti burst from gift center
    const rect = document.getElementById('gift-base').getBoundingClientRect();
    const section = document.getElementById('gift');
    const sectionRect = section.getBoundingClientRect();
    launchConfetti(
      canvas,
      rect.left - sectionRect.left + rect.width / 2,
      rect.top - sectionRect.top
    );

    // 3. Reveal hidden sections with staggered delay
    hiddenSections.forEach((section, i) => {
      setTimeout(() => {
        section.classList.add('revealed');
      }, 400 + i * 200);
    });

    // 4. Smooth scroll to photos after reveal
    setTimeout(() => {
      document.getElementById('photos').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1200);
  }

  giftBox.setAttribute('aria-pressed', 'false');
  giftBox.addEventListener('click', openGift);
  giftBox.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') openGift();
  });
})();
