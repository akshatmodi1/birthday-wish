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

    // 4. Smooth scroll to photos after all sections have begun revealing
    setTimeout(() => {
      document.getElementById('photos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1400);
  }

  giftBox.setAttribute('aria-pressed', 'false');
  giftBox.addEventListener('click', openGift);
  giftBox.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // prevent Space from scrolling the page
      openGift();
    }
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
    // Move focus to close button for screen readers + keyboard users
    setTimeout(() => closeBtn.focus(), 50);
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 300);
    // Restore focus to the card that opened the lightbox
    if (lastFocused) lastFocused.focus();
  }

  // Click each photo card
  document.querySelectorAll('.photo-card').forEach(card => {
    const activate = (e) => {
      const src = card.getAttribute('data-src');
      if (src) openLightbox(src, card);
    };
    card.addEventListener('click', activate);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate(e);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
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
function launchWishParticles(canvas, wishText) {
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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const wishText = document.getElementById('wish-textarea').value;
    const formData = new FormData(form);

    // Submit to Netlify in background — silently
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
    } catch (_) {
      // Silently fail — animation still plays regardless
    }

    // 1. Hide form
    form.style.transition = 'opacity 0.5s ease';
    form.style.opacity = '0';
    setTimeout(() => {
      form.style.display = 'none';
      animation.style.display = 'flex';
    }, 500);

    // 2. Shooting star
    setTimeout(() => {
      star.classList.add('animate');
    }, 600);

    // 3. Wish character particles
    setTimeout(() => {
      launchWishParticles(wishCanvas, wishText);
    }, 900);

    // 4. Confetti burst — use a temporary canvas so wish particles can finish uninterrupted
    setTimeout(() => {
      const confettiCanvas = document.createElement('canvas');
      confettiCanvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:3;';
      animation.appendChild(confettiCanvas);
      confettiCanvas.width = confettiCanvas.offsetWidth;
      confettiCanvas.height = confettiCanvas.offsetHeight;
      launchConfetti(confettiCanvas, confettiCanvas.width / 2, confettiCanvas.height / 2, 120);
      // Remove temporary canvas once confetti finishes (~10s max)
      setTimeout(() => confettiCanvas.remove(), 10000);
    }, 1600);

    // 5. Success message
    setTimeout(() => {
      success.classList.add('visible');
    }, 2400);
  });
})();
