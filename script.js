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

  function setPlaying(state) {
    playing = state;
    btn.textContent = playing ? '⏸️' : '🎵';
    btn.setAttribute('aria-pressed', String(playing));
    btn.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
  }

  // Try autoplay immediately; browsers may block it until user gesture
  audio.play().then(() => {
    setPlaying(true);
  }).catch(() => {
    // Autoplay blocked — play on first user interaction anywhere on the page
    setPlaying(false);
    function startOnInteraction() {
      audio.play().then(() => setPlaying(true)).catch(() => {});
      document.removeEventListener('click', startOnInteraction);
      document.removeEventListener('keydown', startOnInteraction);
    }
    document.addEventListener('click', startOnInteraction, { once: true });
    document.addEventListener('keydown', startOnInteraction, { once: true });
  });

  btn.setAttribute('aria-pressed', 'false');
  btn.setAttribute('aria-label', 'Play background music');
  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
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
// Wish Form — Universe Animation
// =========================================
const Wish = (() => {

  const CFG = {
    BURST_COUNT : 500,
    STAR_COUNT  : 350,
    COMET_COUNT : 7,
    AURORA_BANDS: 3,
    DURATION    : 7500,
    COLORS      : ['#f8bbd9','#ce93d8','#bbdefb','#e1bee7','#ffe0f0','#d4aaff'],
  };

  let cv, ctx, W, H, raf;
  let stars=[], bursts=[], comets=[], auroras=[];
  let t0 = 0;

  const rnd  = (a,b) => a + Math.random()*(b-a);
  const pick = arr  => arr[Math.floor(Math.random()*arr.length)];

  function mkStar() {
    return { x:rnd(0,W), y:rnd(0,H), r:rnd(0.3,1.8),
             a:Math.random(), spd:rnd(0.003,0.015), grow:Math.random()>0.5,
             col:pick(CFG.COLORS) };
  }

  function mkBurst() {
    const angle = Math.random()*Math.PI*2;
    const spd   = rnd(2, 13);
    return { x:W/2, y:H/2,
             vx: Math.cos(angle)*spd, vy: Math.sin(angle)*spd,
             r: rnd(2,5.5), a:1, decay:rnd(0.004,0.012),
             col:pick(CFG.COLORS), trail:[], maxTrail:14 };
  }

  function mkComet(i) {
    const fromTop = Math.random() > 0.5;
    return {
      x: fromTop ? rnd(W*0.1, W*0.9) : -80,
      y: fromTop ? -80 : rnd(H*0.05, H*0.55),
      dx: fromTop ? rnd(2,5)  : rnd(6,11),
      dy: fromTop ? rnd(6,10) : rnd(1.5,4),
      len: rnd(120,240), width:rnd(1.2,2.8),
      col: pick(CFG.COLORS), a:0, glow:rnd(5,12),
      delay: 800 + i*350, active:false, done:false
    };
  }

  function mkAurora(i) {
    return {
      y: H * (0.25 + i*0.22),
      amp: rnd(30,70), freq: rnd(0.003,0.007),
      phase: Math.random()*Math.PI*2,
      spd: rnd(0.004,0.009),
      col: CFG.COLORS[i % CFG.COLORS.length],
      alpha: 0
    };
  }

  function hexAlpha(hex, a) {
    const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a.toFixed(3)})`;
  }

  function draw(ts) {
    if (!t0) t0 = ts;
    const elapsed = ts - t0;
    ctx.clearRect(0,0,W,H);

    // Aurora waves
    const auroraAlpha = Math.min(1, Math.max(0,(elapsed-600)/1200));
    auroras.forEach(au => {
      au.phase += au.spd;
      au.alpha  = auroraAlpha * 0.18;
      const grad = ctx.createLinearGradient(0, au.y - au.amp, 0, au.y + au.amp);
      grad.addColorStop(0,   'rgba(0,0,0,0)');
      grad.addColorStop(0.5, hexAlpha(au.col, au.alpha));
      grad.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.moveTo(0, au.y);
      for (let x=0; x<=W; x+=4)
        ctx.lineTo(x, au.y + Math.sin(x*au.freq + au.phase)*au.amp);
      ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
      ctx.fillStyle = grad; ctx.fill();
    });

    // Twinkling stars
    stars.forEach(s => {
      s.a += s.grow ? s.spd : -s.spd;
      if (s.a>=1){s.a=1;s.grow=false;}
      if (s.a<=0){s.a=0;s.grow=true;}
      if (s.r>1.1){ ctx.shadowColor=s.col; ctx.shadowBlur=6; }
      ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${s.a.toFixed(3)})`;
      ctx.fill();
      ctx.shadowBlur=0;
    });

    // Burst particles
    bursts.forEach(b => {
      if (b.a<=0) return;
      b.trail.push({x:b.x,y:b.y,a:b.a});
      if (b.trail.length>b.maxTrail) b.trail.shift();
      b.trail.forEach((pt,i) => {
        const ta = pt.a*(i/b.trail.length)*0.4;
        ctx.beginPath();
        ctx.arc(pt.x,pt.y,b.r*(i/b.trail.length),0,Math.PI*2);
        ctx.fillStyle=hexAlpha(b.col,ta); ctx.fill();
      });
      ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
      ctx.shadowColor=b.col; ctx.shadowBlur=b.r*4;
      ctx.fillStyle=hexAlpha(b.col,b.a); ctx.fill();
      ctx.shadowBlur=0;
      b.x+=b.vx; b.y+=b.vy;
      b.vx*=0.97; b.vy*=0.97; b.vy+=0.04;
      b.a-=b.decay;
    });

    // Comets
    comets.forEach(c => {
      if (!c.active||c.done) return;
      const fadeZone=80;
      if (c.x<fadeZone&&c.y<fadeZone)            c.a=Math.min(1,c.a+0.07);
      else if (c.x>W-fadeZone||c.y>H-fadeZone)  c.a=Math.max(0,c.a-0.05);
      else                                        c.a=Math.min(1,c.a+0.05);
      c.x+=c.dx; c.y+=c.dy;
      if (c.x>W+c.len&&c.y>H+c.len){c.done=true;return;}
      const tx=c.x-c.len*(c.dx/(c.dx+c.dy));
      const ty=c.y-c.len*(c.dy/(c.dx+c.dy));
      const g=ctx.createLinearGradient(tx,ty,c.x,c.y);
      g.addColorStop(0,'rgba(255,255,255,0)');
      g.addColorStop(0.5,`rgba(255,255,255,${(c.a*0.25).toFixed(3)})`);
      g.addColorStop(1,  `rgba(255,255,255,${c.a.toFixed(3)})`);
      ctx.beginPath(); ctx.moveTo(tx,ty); ctx.lineTo(c.x,c.y);
      ctx.strokeStyle=g; ctx.lineWidth=c.width; ctx.lineCap='round'; ctx.stroke();
      ctx.beginPath(); ctx.arc(c.x,c.y,c.glow*0.45,0,Math.PI*2);
      ctx.fillStyle=c.col; ctx.shadowColor=c.col; ctx.shadowBlur=c.glow*3;
      ctx.globalAlpha=c.a*0.95; ctx.fill();
      ctx.globalAlpha=1; ctx.shadowBlur=0;
      for(let i=0;i<3;i++){
        ctx.beginPath();
        ctx.arc(c.x+rnd(-18,18),c.y+rnd(-18,18),rnd(0.3,1.3),0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${rnd(0.1,0.6)*c.a})`; ctx.fill();
      }
    });

    raf = requestAnimationFrame(draw);
  }

  function play() {
    cv  = document.getElementById('wish-cv');
    ctx = cv.getContext('2d');
    W   = cv.width  = window.innerWidth;
    H   = cv.height = window.innerHeight;
    t0  = 0;

    // Reset text
    ['wish-t1','wish-t2','wish-t3'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('on');
    });

    stars   = Array.from({length:CFG.STAR_COUNT},  mkStar);
    bursts  = Array.from({length:CFG.BURST_COUNT},  mkBurst);
    comets  = Array.from({length:CFG.COMET_COUNT},  (_,i)=>mkComet(i));
    auroras = Array.from({length:CFG.AURORA_BANDS}, (_,i)=>mkAurora(i));
    comets.forEach(c => setTimeout(()=>{ c.active=true; }, c.delay));

    const ov = document.getElementById('wish-overlay');
    ov.setAttribute('aria-hidden','false');
    ov.classList.remove('w-hide');
    ov.classList.add('w-show');
    document.body.style.overflow = 'hidden';

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(draw);

    // Text sequence
    [['wish-t1',300],['wish-t2',1900],['wish-t3',3000]].forEach(([id,ms]) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.classList.add('on');
      }, ms);
    });

    // Fade out and return to page
    setTimeout(() => {
      ov.classList.add('w-hide');
      cancelAnimationFrame(raf);
      ov.addEventListener('transitionend', function done() {
        ov.removeEventListener('transitionend', done);
        ov.classList.remove('w-show','w-hide');
        ov.setAttribute('aria-hidden','true');
        document.body.style.overflow = '';
      }, { once: true });
    }, CFG.DURATION);
  }

  return { play };
})();

(function initWishForm() {
  const btn  = document.getElementById('wish-submit');
  const form = document.getElementById('wish-form');
  if (!btn || !form) return;

  form.addEventListener('submit', e => {
    const textarea = document.getElementById('wish-textarea');
    if (!textarea || !textarea.value.trim()) return; // let browser validation handle it

    // Play animation immediately, then let native form submit proceed
    // action="/#wish" means Netlify will redirect back to this page after submission
    Wish.play();
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



