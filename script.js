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
