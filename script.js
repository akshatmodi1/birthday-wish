// Birthday Website — script.js

// Shared FX namespace — avoids polluting global scope while letting IIFEs share utilities
const FX = {};

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
  const emojis = ['🎈','🎉','🎊','🎀','🥳','✨','🌸','🎂','🍰','💫','🌟','🎁','🦋','🌈','💝'];
  const positions = [3, 10, 18, 26, 34, 42, 50, 58, 66, 74, 82, 90, 95];
  positions.forEach((left, i) => {
    const el = document.createElement('div');
    el.className = 'balloon';
    el.textContent = emojis[i % emojis.length];
    el.style.left = left + '%';
    // Faster: 3–5s range (was 7–12s)
    el.style.setProperty('--dur', (3 + Math.random() * 2) + 's');
    el.style.setProperty('--delay', (Math.random() * 4) + 's');
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
FX.launchConfetti = function launchConfetti(canvas, x, y, count = 150) {
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
// Photo Strip — pause on hover/touch, lightbox on click
// =========================================
(function initCarousel() {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  // Touch: pause while finger is down, resume on lift
  track.addEventListener('touchstart', () => track.classList.add('paused'), { passive: true });
  track.addEventListener('touchend',   () => track.classList.remove('paused'), { passive: true });

  // Click to open lightbox — only real (non-duplicate) cards
  track.addEventListener('click', e => {
    const card = e.target.closest('.photo-card');
    if (!card || card.getAttribute('aria-hidden') === 'true') return;
    const src = card.getAttribute('data-src');
    if (src && window._openLightbox) window._openLightbox(src, card);
  });
})();

// =========================================
// Photo Lightbox
// =========================================
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  let lastFocused = null;

  function openLightbox(src, triggerEl) {
    lastFocused = triggerEl || document.activeElement;
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeBtn.focus(), 50);
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 300);
    if (lastFocused) lastFocused.focus();
  }

  // Lightbox open is handled by carousel initCarousel above
  // Expose openLightbox so carousel can call it
  window._openLightbox = openLightbox;

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  lightbox.addEventListener('keydown', e => {
    if (e.key === 'Tab' && lightbox.classList.contains('open')) {
      e.preventDefault();
      closeBtn.focus();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
})();

// =========================================
// Birthday Message — Word-by-Word Reveal
// =========================================
(function initMessageReveal() {
  const msgEl = document.getElementById('birthday-message');
  const sig = document.querySelector('.message-signature');

  // Split into words, wrap each in a span
  const text = msgEl.textContent.trim();
  const words = text.split(/\s+/);
  msgEl.innerHTML = words
    .map(w => `<span class="message-word">${w}</span>`)
    .join(' ');

  const wordSpans = msgEl.querySelectorAll('.message-word');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        wordSpans.forEach((span, i) => {
          setTimeout(() => {
            span.classList.add('visible');
          }, i * 60);
        });
        // Show signature after all words
        setTimeout(() => {
          sig.classList.add('visible');
        }, wordSpans.length * 60 + 400);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(msgEl);
})();

// =========================================
// Wish Particle Scatter (canvas)
// =========================================
FX.launchWishParticles = function launchWishParticles(canvas, wishText) {
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Create character particles from wish text
  const chars = wishText.slice(0, 40).split('');
  const particles = chars.map((char, i) => ({
    char,
    x: canvas.width / 2 + (Math.random() - 0.5) * 160,
    y: canvas.height * 0.6,
    vx: (Math.random() - 0.5) * 3,
    vy: -(Math.random() * 3 + 2),
    alpha: 1,
    size: Math.random() * 8 + 10,
    color: ['#f8bbd9','#ce93d8','#bbdefb','#e1bee7'][i % 4]
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy -= 0.04;
      p.alpha -= 0.018;
      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.font = `${p.size}px Dancing Script, cursive`;
        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();
      }
    });
    if (alive) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

// =========================================
// Wish Form — AJAX Submit + Animation
// =========================================
(function initWishForm() {
  const form = document.getElementById('wish-form');
  const animation = document.getElementById('wish-animation');
  const star = document.getElementById('shooting-star');
  const success = document.getElementById('wish-success');
  const wishCanvas = document.getElementById('wish-canvas');

  form.addEventListener('submit', e => {
    e.preventDefault(); // must be first — stops Netlify redirect AND native submit

    const wishText = document.getElementById('wish-textarea').value.trim();
    if (!wishText) return;

    // POST to Netlify — fire and forget, never block animation
    fetch(window.location.pathname, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    }).catch(() => {});

    // 1. Fade form out immediately
    form.style.transition = 'opacity 0.5s ease';
    form.style.opacity = '0';
    setTimeout(() => {
      form.style.display = 'none';
      animation.style.display = 'flex';
    }, 500);

    // 2. Shooting star
    setTimeout(() => star.classList.add('animate'), 600);

    // 3. Wish character particles
    setTimeout(() => FX.launchWishParticles(wishCanvas, wishText), 900);

    // 4. Confetti burst
    setTimeout(() => {
      const cc = document.createElement('canvas');
      cc.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:3;';
      animation.appendChild(cc);
      cc.width = cc.offsetWidth;
      cc.height = cc.offsetHeight;
      FX.launchConfetti(cc, cc.width / 2, cc.height / 2, 120);
      setTimeout(() => cc.remove(), 10000);
    }, 1600);

    // 5. Success message
    setTimeout(() => success.classList.add('visible'), 2400);
  });
})();

// =========================================
// Floating Hearts (Closing Section)
// =========================================
(function initHearts() {
  const container = document.getElementById('hearts-container');
  const hearts = ['❤️','🩷','💜','💙','🩵','✨','💫'];
  const positions = [5, 14, 24, 35, 48, 60, 72, 83, 92];

  positions.forEach((left, i) => {
    const el = document.createElement('div');
    el.className = 'floating-heart';
    el.textContent = hearts[i % hearts.length];
    el.style.setProperty('--left', left + '%');
    el.style.setProperty('--dur', (6 + Math.random() * 5) + 's');
    el.style.setProperty('--delay', (Math.random() * 4) + 's');
    el.style.setProperty('--size', (1.2 + Math.random() * 1.5) + 'rem');
    container.appendChild(el);
  });
})();



