# Birthday Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a magical, interactive single-page birthday website for Purva with dreamy pastel aesthetics, a gift box reveal interaction, photo/video memories, a heartfelt message, and a secret wish-capture form via Netlify.

**Architecture:** Three static files (index.html, style.css, script.js) plus asset folders. The gift box click gates visibility of all content sections below it. The Netlify form submits via AJAX so the wish animation plays without a page reload. All animations are pure CSS keyframes + vanilla JS canvas — zero dependencies.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox, grid, keyframes), Vanilla JavaScript (ES6+, IntersectionObserver, fetch, canvas), Google Fonts (Playfair Display, Lato, Dancing Script), Netlify Forms.

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | All markup, section structure, Netlify form, font imports |
| `style.css` | All styling: variables, reset, layout, animations, responsive |
| `script.js` | All interactions: gift box, confetti, scatter, lightbox, wish form, shooting star, particles, scroll reveal, music, sparkles |
| `images/photo-1.jpg` … `photo-6.jpg` | Placeholder slots — user replaces |
| `videos/video-1.mp4`, `video-2.mp4` | Placeholder slots — user replaces |
| `README.md` | Deployment + customization guide |

---

## Task 1: Project Scaffold

**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `script.js`
- Create: `images/.gitkeep`
- Create: `videos/.gitkeep`

- [ ] **Step 1: Create `index.html` skeleton**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Happy Birthday Purva 🎂</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Lato:wght@300;400;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- SECTION 1: Hero -->
  <section id="hero"></section>

  <!-- SECTION 2: Gift Box -->
  <section id="gift"></section>

  <!-- SECTION 3: Photo Memories (hidden until gift opened) -->
  <section id="photos" class="hidden-section"></section>

  <!-- SECTION 4: Video Memories (hidden until gift opened) -->
  <section id="videos" class="hidden-section"></section>

  <!-- SECTION 5: Birthday Message (hidden until gift opened) -->
  <section id="message" class="hidden-section"></section>

  <!-- SECTION 6: Send a Wish (hidden until gift opened) -->
  <section id="wish" class="hidden-section"></section>

  <!-- SECTION 8: Closing (hidden until gift opened) -->
  <section id="closing" class="hidden-section"></section>

  <!-- Background music (<!-- MUSIC --> replace src with your MP3) -->
  <audio id="bg-music" loop>
    <source src="music.mp3" type="audio/mpeg" />
  </audio>

  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create empty `style.css`**

```css
/* Birthday Website — style.css */
```

- [ ] **Step 3: Create empty `script.js`**

```js
// Birthday Website — script.js
```

- [ ] **Step 4: Create placeholder asset files**

```bash
touch images/.gitkeep videos/.gitkeep
```

- [ ] **Step 5: Open `index.html` in browser — verify blank page loads with no console errors**

Open `index.html` directly in Chrome/Safari. Console should be clean.

- [ ] **Step 6: Commit**

```bash
git init
git add index.html style.css script.js images/.gitkeep videos/.gitkeep
git commit -m "feat: project scaffold — three-file structure with section placeholders"
```

---

## Task 2: CSS Foundation — Variables, Reset, Typography

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Add CSS custom properties, reset, and base typography to `style.css`**

```css
/* =========================================
   CSS Custom Properties
   ========================================= */
:root {
  --pink:   #f8bbd9;
  --lilac:  #e1bee7;
  --blue:   #bbdefb;
  --cream:  #fef6fb;
  --text:   #5c4a6b;
  --accent: #ce93d8;
  --dark:   #3b2d4a;
  --white:  #ffffff;
  --radius: 1.5rem;
  --shadow: 0 8px 32px rgba(92, 74, 107, 0.12);
  --transition: 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* =========================================
   Reset
   ========================================= */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Lato', sans-serif;
  color: var(--text);
  background: var(--cream);
  overflow-x: hidden;
}

/* =========================================
   Typography
   ========================================= */
h1, h2, h3 {
  font-family: 'Playfair Display', serif;
  color: var(--dark);
  line-height: 1.2;
}

.accent-font {
  font-family: 'Dancing Script', cursive;
}

/* =========================================
   Hidden sections — revealed after gift open
   ========================================= */
.hidden-section {
  opacity: 0;
  visibility: hidden;
  transform: translateY(40px);
  transition: opacity 0.7s var(--transition), transform 0.7s var(--transition), visibility 0.7s;
}

.hidden-section.revealed {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* =========================================
   Reduced motion
   ========================================= */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Verify in browser — body background should now be `#fef6fb` (off-white/cream)**

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: css foundation — variables, reset, typography, hidden-section utility"
```

---

## Task 3: Hero Section — Markup, Gradient, Balloons, Sparkles, Music Toggle

**Files:**
- Modify: `index.html` (fill `#hero` section)
- Modify: `style.css` (hero styles + balloon/sparkle keyframes)
- Modify: `script.js` (sparkle particle spawner + music toggle)

- [ ] **Step 1: Fill in hero markup in `index.html`**

Replace `<section id="hero"></section>` with:

```html
<!-- SECTION 1: Hero -->
<section id="hero">
  <!-- Music toggle -->
  <button id="music-toggle" aria-label="Toggle background music">🎵</button>

  <!-- Balloon container (JS will add balloons) -->
  <div id="balloons"></div>

  <!-- Sparkle canvas -->
  <canvas id="sparkle-canvas"></canvas>

  <!-- Hero content -->
  <div class="hero-content">
    <p class="accent-font hero-subtitle-top">today is your day ✨</p>
    <h1 class="hero-heading">Happy Birthday<br />Purva 🎂</h1>
    <p class="accent-font hero-subtitle">"A little corner of the internet made just for you."</p>
  </div>

  <!-- Scroll cue -->
  <div class="scroll-cue">
    <span>scroll down</span>
    <div class="scroll-arrow">↓</div>
  </div>
</section>
```

- [ ] **Step 2: Add hero styles to `style.css`**

```css
/* =========================================
   Hero Section
   ========================================= */
#hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, var(--pink), var(--lilac), var(--blue), var(--pink));
  background-size: 400% 400%;
  animation: gradientShift 12s ease infinite;
}

@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Music toggle */
#music-toggle {
  position: fixed;
  top: 1.2rem;
  right: 1.2rem;
  z-index: 1000;
  background: rgba(255,255,255,0.7);
  border: none;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  font-size: 1.2rem;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: transform var(--transition), background var(--transition);
}
#music-toggle:hover { transform: scale(1.15); background: rgba(255,255,255,0.9); }

/* Sparkle canvas */
#sparkle-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
}

/* Balloons */
.balloon {
  position: absolute;
  bottom: -120px;
  font-size: clamp(2rem, 5vw, 3.5rem);
  animation: floatUp var(--dur, 8s) ease-in infinite;
  animation-delay: var(--delay, 0s);
  user-select: none;
  pointer-events: none;
}

@keyframes floatUp {
  0%   { transform: translateY(0) rotate(-5deg); opacity: 0.9; }
  50%  { transform: translateY(-45vh) rotate(5deg); }
  100% { transform: translateY(-110vh) rotate(-3deg); opacity: 0; }
}

/* Hero content */
.hero-content {
  text-align: center;
  z-index: 2;
  padding: 2rem;
}

.hero-subtitle-top {
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  color: var(--dark);
  opacity: 0.75;
  margin-bottom: 0.5rem;
}

.hero-heading {
  font-size: clamp(2.8rem, 8vw, 6rem);
  color: var(--dark);
  text-shadow: 0 4px 24px rgba(206, 147, 216, 0.3);
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 3vw, 1.6rem);
  color: var(--text);
  opacity: 0.85;
}

/* Scroll cue */
.scroll-cue {
  position: absolute;
  bottom: 2rem;
  text-align: center;
  color: var(--dark);
  opacity: 0.6;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  z-index: 2;
}

.scroll-arrow {
  font-size: 1.4rem;
  animation: bounce 2s ease infinite;
  margin-top: 0.25rem;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(8px); }
}
```

- [ ] **Step 3: Add sparkle particle spawner and balloon spawner + music toggle to `script.js`**

```js
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
  let playing = false;
  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      btn.textContent = '🎵';
    } else {
      audio.play().catch(() => {}); // ignore autoplay block
      btn.textContent = '⏸️';
    }
    playing = !playing;
  });
})();
```

- [ ] **Step 4: Open browser — verify animated gradient, floating balloons, sparkle particles, and music button in top-right**

- [ ] **Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: hero section — gradient animation, floating balloons, sparkles, music toggle"
```

---

## Task 4: Gift Box Section — Markup + CSS Construction

**Files:**
- Modify: `index.html` (fill `#gift` section)
- Modify: `style.css` (gift box styles)

- [ ] **Step 1: Fill in gift section markup in `index.html`**

Replace `<section id="gift"></section>` with:

```html
<!-- SECTION 2: Gift Box Surprise -->
<section id="gift">
  <p class="accent-font gift-label">I got you a small birthday surprise…</p>
  <div id="gift-box" role="button" tabindex="0" aria-label="Click to open your birthday surprise">
    <div id="gift-lid">
      <div class="ribbon-v"></div>
    </div>
    <div id="gift-base">
      <div class="ribbon-h"></div>
      <div class="ribbon-v base-ribbon-v"></div>
    </div>
  </div>
  <p class="gift-instruction">Click the gift box to open it 🎁</p>
  <!-- Confetti canvas (positioned over gift box) -->
  <canvas id="confetti-canvas"></canvas>
</section>
```

- [ ] **Step 2: Add gift box CSS to `style.css`**

```css
/* =========================================
   Gift Box Section
   ========================================= */
#gift {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 4rem 1rem;
  position: relative;
  background: linear-gradient(180deg, var(--blue) 0%, var(--cream) 100%);
}

.gift-label {
  font-size: clamp(1.3rem, 4vw, 2rem);
  color: var(--dark);
  text-align: center;
}

.gift-instruction {
  font-size: 1rem;
  color: var(--text);
  opacity: 0.7;
  letter-spacing: 0.05em;
}

/* Gift box */
#gift-box {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s;
  outline: none;
}
#gift-box:hover { transform: scale(1.05); }
#gift-box:focus-visible { outline: 3px solid var(--accent); border-radius: 4px; }

#gift-lid {
  width: 180px;
  height: 50px;
  background: linear-gradient(135deg, #f48fb1, #ce93d8);
  border-radius: 12px 12px 0 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(206,147,216,0.35);
  transform-origin: top center;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity 0.5s ease;
  z-index: 2;
}

#gift-lid.open {
  transform: translateY(-110px) rotate(-25deg);
  opacity: 0;
}

#gift-lid .ribbon-v {
  position: absolute;
  width: 28px;
  height: 100%;
  background: rgba(255,255,255,0.45);
  border-radius: 4px;
}

#gift-base {
  width: 200px;
  height: 160px;
  background: linear-gradient(135deg, #f06292, #ba68c8);
  border-radius: 0 0 20px 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(206,147,216,0.4);
}

#gift-base .ribbon-h {
  position: absolute;
  top: 50%;
  left: 0; right: 0;
  height: 28px;
  background: rgba(255,255,255,0.35);
  transform: translateY(-50%);
}

#gift-base .base-ribbon-v {
  position: absolute;
  top: 0; bottom: 0;
  left: 50%;
  width: 28px;
  background: rgba(255,255,255,0.35);
  transform: translateX(-50%);
}

/* Confetti canvas */
#confetti-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}
```

- [ ] **Step 3: Open browser — verify gift box is visible, centered, with pink/purple gradient and ribbon**

Hover should cause subtle scale. The lid should not animate yet (that's Task 5).

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: gift box section — CSS-built gift box with lid, base, ribbon"
```

---

## Task 5: Gift Box Interaction — Click Animation, Confetti, Section Reveal

**Files:**
- Modify: `script.js` (gift click handler, confetti engine, section reveal)

- [ ] **Step 1: Add gift box interaction + confetti + reveal to `script.js`**

```js
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

  giftBox.addEventListener('click', openGift);
  giftBox.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') openGift();
  });
})();
```

- [ ] **Step 2: Open browser — click the gift box**

Expected:
- Lid flies up and fades
- Colorful confetti bursts from the box
- All hidden sections fade in sequentially (they'll be empty for now — that's fine)
- Page scrolls down to the photos section

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat: gift box click — lid animation, confetti burst, staggered section reveal"
```

---

## Task 6: Photo Memories Section

**Files:**
- Modify: `index.html` (fill `#photos` section)
- Modify: `style.css` (photo grid + lightbox)
- Modify: `script.js` (lightbox logic)

- [ ] **Step 1: Fill in photo section markup in `index.html`**

Replace `<section id="photos" class="hidden-section"></section>` with:

```html
<!-- SECTION 3: Photo Memories -->
<section id="photos" class="hidden-section">
  <div class="section-container">
    <h2 class="section-heading">Photo Memories 📸</h2>
    <p class="section-sub accent-font">moments worth keeping forever</p>

    <div class="photo-grid">
      <!-- Replace src with your actual images. Edit caption text below each. -->
      <div class="photo-card" data-src="images/photo-1.jpg">
        <div class="photo-thumb" style="background: linear-gradient(135deg, var(--pink), var(--lilac));">
          <span class="photo-placeholder">📷</span>
        </div>
        <p class="photo-caption"><!-- CAPTION -->A beautiful memory</p>
      </div>
      <div class="photo-card" data-src="images/photo-2.jpg">
        <div class="photo-thumb" style="background: linear-gradient(135deg, var(--lilac), var(--blue));">
          <span class="photo-placeholder">📷</span>
        </div>
        <p class="photo-caption"><!-- CAPTION -->Smiles all around</p>
      </div>
      <div class="photo-card" data-src="images/photo-3.jpg">
        <div class="photo-thumb" style="background: linear-gradient(135deg, var(--blue), var(--pink));">
          <span class="photo-placeholder">📷</span>
        </div>
        <p class="photo-caption"><!-- CAPTION -->Golden hour</p>
      </div>
      <div class="photo-card" data-src="images/photo-4.jpg">
        <div class="photo-thumb" style="background: linear-gradient(135deg, var(--pink), var(--blue));">
          <span class="photo-placeholder">📷</span>
        </div>
        <p class="photo-caption"><!-- CAPTION -->Just us</p>
      </div>
      <div class="photo-card" data-src="images/photo-5.jpg">
        <div class="photo-thumb" style="background: linear-gradient(135deg, var(--accent), var(--pink));">
          <span class="photo-placeholder">📷</span>
        </div>
        <p class="photo-caption"><!-- CAPTION -->Favourite moments</p>
      </div>
      <div class="photo-card" data-src="images/photo-6.jpg">
        <div class="photo-thumb" style="background: linear-gradient(135deg, var(--lilac), var(--accent));">
          <span class="photo-placeholder">📷</span>
        </div>
        <p class="photo-caption"><!-- CAPTION -->Always and forever</p>
      </div>
    </div>
  </div>

  <!-- Lightbox overlay -->
  <div id="lightbox" aria-modal="true" role="dialog" aria-label="Photo lightbox">
    <button id="lightbox-close" aria-label="Close photo">✕</button>
    <img id="lightbox-img" src="" alt="Full size photo" />
  </div>
</section>
```

- [ ] **Step 2: Add photo grid + lightbox styles to `style.css`**

```css
/* =========================================
   Shared Section Layout
   ========================================= */
.section-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  text-align: center;
}

.section-heading {
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 0.5rem;
}

.section-sub {
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  color: var(--accent);
  margin-bottom: 3rem;
}

/* =========================================
   Photo Grid
   ========================================= */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

@media (max-width: 768px) {
  .photo-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .photo-grid { grid-template-columns: 1fr; }
}

.photo-card {
  cursor: pointer;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform var(--transition), box-shadow var(--transition);
  background: var(--white);
}
.photo-card:hover {
  transform: scale(1.03);
  box-shadow: 0 16px 48px rgba(92, 74, 107, 0.18);
}

.photo-thumb {
  width: 100%;
  aspect-ratio: 4/3;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.photo-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  font-size: 3rem;
  opacity: 0.5;
}

.photo-caption {
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: var(--text);
  text-align: center;
}

/* =========================================
   Lightbox
   ========================================= */
#lightbox {
  position: fixed;
  inset: 0;
  background: rgba(30, 15, 40, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}
#lightbox.open {
  opacity: 1;
  visibility: visible;
}

#lightbox-img {
  max-width: 90vw;
  max-height: 85vh;
  border-radius: var(--radius);
  box-shadow: 0 24px 80px rgba(0,0,0,0.6);
}

#lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255,255,255,0.15);
  border: none;
  color: white;
  font-size: 1.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background var(--transition);
}
#lightbox-close:hover { background: rgba(255,255,255,0.3); }
```

- [ ] **Step 3: Add lightbox JS to `script.js`**

```js
// =========================================
// Photo Lightbox
// =========================================
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    // Small delay before clearing src so close animation plays
    setTimeout(() => { lightboxImg.src = ''; }, 300);
  }

  // Click each photo card
  document.querySelectorAll('.photo-card').forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-src');
      // If no real image, show placeholder gradient instead
      if (src) openLightbox(src);
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
```

- [ ] **Step 4: Open browser, open gift, verify photo grid appears with gradient placeholders. Clicking a card should open lightbox (empty image is fine — placeholder images not added until deploy)**

- [ ] **Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: photo memories section — grid layout, placeholder cards, lightbox"
```

---

## Task 7: Video Memories Section

**Files:**
- Modify: `index.html` (fill `#videos` section)
- Modify: `style.css` (video card styles)

- [ ] **Step 1: Fill in video section markup in `index.html`**

Replace `<section id="videos" class="hidden-section"></section>` with:

```html
<!-- SECTION 4: Video Memories -->
<section id="videos" class="hidden-section" style="background: linear-gradient(180deg, var(--cream) 0%, var(--lilac) 100%);">
  <div class="section-container">
    <h2 class="section-heading">Video Memories 🎬</h2>
    <p class="section-sub accent-font">moving pictures, moving hearts</p>

    <div class="video-grid">
      <!-- Replace src and poster with your actual video/image files -->
      <div class="video-card">
        <video controls preload="metadata" poster="">
          <!-- VIDEO -->
          <source src="videos/video-1.mp4" type="video/mp4" />
          Your browser does not support video.
        </video>
        <p class="video-caption"><!-- CAPTION -->A favourite memory</p>
      </div>

      <div class="video-card">
        <video controls preload="metadata" poster="">
          <!-- VIDEO -->
          <source src="videos/video-2.mp4" type="video/mp4" />
          Your browser does not support video.
        </video>
        <p class="video-caption"><!-- CAPTION -->Together always</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add video card styles to `style.css`**

```css
/* =========================================
   Video Section
   ========================================= */
.video-grid {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.video-card {
  background: var(--white);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  width: 100%;
  max-width: 480px;
  transition: box-shadow var(--transition), transform var(--transition);
}
.video-card:hover {
  box-shadow: 0 12px 40px rgba(206, 147, 216, 0.3);
  transform: translateY(-4px);
}

.video-card video {
  width: 100%;
  display: block;
  background: linear-gradient(135deg, var(--pink), var(--lilac));
  min-height: 200px;
}

.video-caption {
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: var(--text);
  text-align: center;
}
```

- [ ] **Step 3: Open browser — verify two video cards appear after gift is opened, with gradient backgrounds (no video file needed yet)**

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: video memories section — responsive video cards with placeholder slots"
```

---

## Task 8: Birthday Message Section

**Files:**
- Modify: `index.html` (fill `#message` section)
- Modify: `style.css` (frosted glass card, word fade-in)
- Modify: `script.js` (IntersectionObserver word-by-word reveal)

- [ ] **Step 1: Fill in message section markup in `index.html`**

Replace `<section id="message" class="hidden-section"></section>` with:

```html
<!-- SECTION 5: Birthday Message -->
<section id="message" class="hidden-section">
  <div class="section-container">
    <h2 class="section-heading">A Message for You 💌</h2>

    <div class="message-card">
      <p class="message-text" id="birthday-message">
        Some people walk into your life and quietly rearrange it —
        making everything a little warmer, a little brighter, a little more worth celebrating.
        Purva, you are that kind of person.
        Today the universe pauses to celebrate you: your laughter, your light,
        the way you make ordinary moments feel like something worth remembering.
        Happy Birthday. May this year be as beautiful as you make everything around you.
      </p>
      <p class="message-signature accent-font">— with love ❤️</p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add message card styles to `style.css`**

```css
/* =========================================
   Birthday Message Section
   ========================================= */
#message {
  background: linear-gradient(135deg, var(--lilac) 0%, var(--pink) 100%);
  padding: 2rem 0;
}

.message-card {
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid rgba(255,255,255,0.7);
  border-radius: calc(var(--radius) * 1.5);
  padding: clamp(2rem, 5vw, 4rem);
  max-width: 720px;
  margin: 0 auto;
  box-shadow: 0 8px 48px rgba(206,147,216,0.2);
  text-align: center;
}

.message-text {
  font-size: clamp(1.05rem, 2.5vw, 1.3rem);
  line-height: 1.9;
  color: var(--dark);
  font-style: italic;
}

/* Word-by-word reveal — words start invisible */
.message-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.message-word.visible {
  opacity: 1;
  transform: translateY(0);
}

.message-signature {
  margin-top: 2rem;
  font-size: 1.4rem;
  color: var(--accent);
  opacity: 0;
  transition: opacity 1s ease 0.5s;
}
.message-signature.visible { opacity: 1; }
```

- [ ] **Step 3: Add word-by-word reveal to `script.js`**

```js
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
```

- [ ] **Step 4: Open browser — scroll to message section after opening gift. Words should cascade in one by one, then signature fades in.**

- [ ] **Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: birthday message section — frosted glass card, word-by-word scroll reveal"
```

---

## Task 9: Wish Form Section + Wish Animation

**Files:**
- Modify: `index.html` (fill `#wish` section with Netlify form + animation elements)
- Modify: `style.css` (wish form styles, shooting star, success message)
- Modify: `script.js` (AJAX submit, shooting star, particle scatter, confetti, success reveal)

- [ ] **Step 1: Fill in wish section markup in `index.html`**

Replace `<section id="wish" class="hidden-section"></section>` with:

```html
<!-- SECTION 6 + 7: Send a Wish + Wish Animation -->
<section id="wish" class="hidden-section">
  <div class="section-container">
    <h2 class="section-heading">Send a Wish to the Birthday Universe ✨</h2>
    <p class="section-sub accent-font">your words, carried by starlight</p>

    <p class="wish-description">
      If you could wish for anything today,<br />
      what would it be?<br />
      Write your wish below and send it into the universe.
    </p>

    <!-- Netlify form — do NOT remove data-netlify or the hidden input -->
    <form
      id="wish-form"
      name="birthday-wish"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="birthday-wish" />
      <!-- Honeypot: keep hidden from real users -->
      <p style="display:none;"><input name="bot-field" /></p>

      <textarea
        name="wish"
        id="wish-textarea"
        placeholder="Close your eyes, breathe, and write your wish…"
        rows="5"
        required
      ></textarea>

      <button type="submit" id="wish-submit">Send Wish ✨</button>
    </form>

    <!-- Wish animation overlay (hidden until submit) -->
    <div id="wish-animation" aria-live="polite">
      <canvas id="wish-canvas"></canvas>
      <!-- Shooting star SVG -->
      <svg id="shooting-star" viewBox="0 0 200 60" aria-hidden="true">
        <defs>
          <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0" />
            <stop offset="100%" style="stop-color:#f8bbd9;stop-opacity:1" />
          </linearGradient>
        </defs>
        <line x1="0" y1="30" x2="170" y2="30" stroke="url(#starGrad)" stroke-width="2"/>
        <polygon points="185,30 170,24 175,30 170,36" fill="#f8bbd9"/>
        <!-- Sparkle trail dots -->
        <circle cx="20" cy="26" r="2" fill="#e1bee7" opacity="0.7"/>
        <circle cx="50" cy="33" r="1.5" fill="#bbdefb" opacity="0.6"/>
        <circle cx="90" cy="25" r="2.5" fill="#f8bbd9" opacity="0.8"/>
        <circle cx="130" cy="34" r="1.5" fill="#ffffff" opacity="0.5"/>
      </svg>
      <p id="wish-success" class="accent-font">
        Your wish has been sent to the Birthday Universe 🌌<br />
        <span>May the stars make it come true.</span>
      </p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add wish section styles to `style.css`**

```css
/* =========================================
   Wish Section
   ========================================= */
#wish {
  background: linear-gradient(180deg, var(--cream) 0%, var(--blue) 100%);
}

.wish-description {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  line-height: 1.9;
  color: var(--text);
  margin-bottom: 2.5rem;
}

#wish-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  max-width: 560px;
  margin: 0 auto;
}

#wish-textarea {
  width: 100%;
  padding: 1.25rem 1.5rem;
  border: 2px solid var(--lilac);
  border-radius: var(--radius);
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: var(--dark);
  background: rgba(255,255,255,0.8);
  resize: vertical;
  outline: none;
  box-shadow: var(--shadow);
  transition: border-color var(--transition), box-shadow var(--transition);
}
#wish-textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px rgba(206,147,216,0.2);
}

#wish-submit {
  padding: 0.9rem 2.5rem;
  background: linear-gradient(135deg, var(--accent), #f48fb1);
  color: white;
  border: none;
  border-radius: 2rem;
  font-size: 1.1rem;
  font-family: 'Lato', sans-serif;
  cursor: pointer;
  box-shadow: 0 4px 24px rgba(206,147,216,0.4);
  animation: glowPulse 2.5s ease infinite;
  transition: transform var(--transition);
}
#wish-submit:hover { transform: scale(1.05); }

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 4px 24px rgba(206,147,216,0.4); }
  50%       { box-shadow: 0 4px 40px rgba(206,147,216,0.75); }
}

/* Wish animation overlay */
#wish-animation {
  display: none;
  position: relative;
  min-height: 300px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#wish-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

#shooting-star {
  width: clamp(160px, 40vw, 280px);
  position: absolute;
  top: 30%;
  left: -20%;
  opacity: 0;
}
#shooting-star.animate {
  animation: shootAcross 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
@keyframes shootAcross {
  0%   { left: -20%; opacity: 0; top: 20%; }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { left: 110%; opacity: 0; top: 60%; }
}

#wish-success {
  font-size: clamp(1.3rem, 4vw, 2rem);
  color: var(--dark);
  text-align: center;
  line-height: 1.7;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1s ease, transform 1s ease;
  z-index: 2;
}
#wish-success span {
  display: block;
  font-size: 0.75em;
  color: var(--accent);
  margin-top: 0.5rem;
}
#wish-success.visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 3: Add wish form AJAX submit + animation sequence to `script.js`**

```js
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
  const confettiCanvas = document.getElementById('confetti-canvas');

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
      // Silently fail — animation still plays
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

    // 4. Confetti burst
    setTimeout(() => {
      const rect = animation.getBoundingClientRect();
      const parentRect = animation.parentElement.getBoundingClientRect();
      launchConfetti(wishCanvas, wishCanvas.offsetWidth / 2, wishCanvas.offsetHeight / 2, 120);
    }, 1600);

    // 5. Success message
    setTimeout(() => {
      success.classList.add('visible');
    }, 2400);
  });
})();
```

- [ ] **Step 4: Open browser — open gift, scroll to wish section, type a wish, click Send**

Expected sequence:
- Form fades out
- Shooting star glides diagonally across
- Characters float upward as glowing particles
- Confetti burst
- Success message fades in: "Your wish has been sent to the Birthday Universe 🌌"

(Note: Netlify form submit will fail locally — that's expected. Animation plays regardless.)

- [ ] **Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: wish section — Netlify form, AJAX submit, shooting star + particle animation"
```

---

## Task 10: Closing Section

**Files:**
- Modify: `index.html` (fill `#closing` section)
- Modify: `style.css` (closing styles + floating hearts)

- [ ] **Step 1: Fill in closing section markup in `index.html`**

Replace `<section id="closing" class="hidden-section"></section>` with:

```html
<!-- SECTION 8: Closing -->
<section id="closing" class="hidden-section">
  <!-- Floating hearts (JS will inject these) -->
  <div id="hearts-container"></div>

  <div class="section-container closing-content">
    <p class="closing-text">
      Some people make the world brighter<br />just by being in it.
    </p>
    <p class="closing-text closing-thanks">
      Thank you for being one of those people.
    </p>
    <p class="closing-finale accent-font">Happy Birthday ❤️</p>
  </div>
</section>
```

- [ ] **Step 2: Add closing section styles + floating hearts keyframes to `style.css`**

```css
/* =========================================
   Closing Section
   ========================================= */
#closing {
  position: relative;
  min-height: 60vh;
  background: linear-gradient(135deg, var(--pink), var(--lilac), var(--blue));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 5rem 1rem;
}

.closing-content {
  position: relative;
  z-index: 2;
}

.closing-text {
  font-size: clamp(1.2rem, 3.5vw, 1.7rem);
  color: var(--dark);
  line-height: 1.8;
  margin-bottom: 1rem;
  text-align: center;
}

.closing-thanks {
  font-style: italic;
  opacity: 0.85;
}

.closing-finale {
  font-size: clamp(2rem, 6vw, 3.5rem);
  color: var(--dark);
  margin-top: 2rem;
  text-align: center;
}

/* Floating hearts */
.floating-heart {
  position: absolute;
  font-size: var(--size, 1.8rem);
  bottom: -60px;
  left: var(--left, 50%);
  opacity: 0;
  animation: floatHeart var(--dur, 7s) ease-in var(--delay, 0s) infinite;
  pointer-events: none;
  user-select: none;
}

@keyframes floatHeart {
  0%   { transform: translateY(0) scale(1); opacity: 0; }
  10%  { opacity: 0.8; }
  90%  { opacity: 0.4; }
  100% { transform: translateY(-100vh) scale(0.7) rotate(20deg); opacity: 0; }
}

/* Hearts container */
#hearts-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
```

- [ ] **Step 3: Add floating hearts spawner to `script.js`**

```js
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
```

- [ ] **Step 4: Open browser — open gift, scroll to bottom. Verify floating hearts animate upward and closing message is visible.**

- [ ] **Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: closing section — floating hearts, final message"
```

---

## Task 11: Scroll Reveal via IntersectionObserver

**Files:**
- Modify: `script.js` (global scroll reveal for section headings + cards)

- [ ] **Step 1: Add scroll reveal observer to `script.js`**

```js
// =========================================
// Scroll Reveal — fade-in for inner elements
// =========================================
(function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.photo-card, .video-card, .message-card, .section-heading, .section-sub, .wish-description'
  );

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
})();
```

- [ ] **Step 2: Open browser — after opening gift, scroll slowly through sections. Cards and headings should fade + rise in as they enter view.**

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat: scroll reveal — IntersectionObserver fade-in for cards and headings"
```

---

## Task 12: Mobile Polish + Responsive Tweaks

**Files:**
- Modify: `style.css` (mobile-specific overrides)

- [ ] **Step 1: Add mobile responsiveness to `style.css`**

```css
/* =========================================
   Mobile Polish
   ========================================= */
@media (max-width: 600px) {
  .hero-heading { letter-spacing: -0.02em; }

  #gift-box #gift-lid { width: 130px; height: 40px; }
  #gift-box #gift-base { width: 150px; height: 120px; }

  .message-card { padding: 1.75rem 1.25rem; }

  .video-grid { flex-direction: column; align-items: center; }

  #wish-form { padding: 0 0.5rem; }

  .closing-finale { font-size: clamp(1.8rem, 10vw, 2.5rem); }

  /* Larger tap targets */
  #wish-submit { width: 100%; max-width: 320px; padding: 1rem; }
  #lightbox-close { width: 3rem; height: 3rem; font-size: 1.3rem; }
}

@media (max-width: 380px) {
  .hero-heading { font-size: 2.4rem; }
  .gift-label { font-size: 1.1rem; }
}
```

- [ ] **Step 2: Test at 375px width (iPhone SE) in browser DevTools**

Check:
- Hero heading doesn't overflow
- Gift box fits on screen
- Photo grid is single column
- Video cards stack
- Wish button full width
- No horizontal scroll

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: mobile responsive polish — tap targets, layout tweaks for small screens"
```

---

## Task 13: README — Customization + Deployment Guide

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create `README.md`**

```markdown
# Happy Birthday Purva 🎂

A magical single-page birthday website. Personalize and deploy in minutes.

---

## Customizing Content

### 1. Replace Photos

Drop your images into the `/images` folder, naming them exactly:

```
images/photo-1.jpg
images/photo-2.jpg
images/photo-3.jpg
images/photo-4.jpg
images/photo-5.jpg
images/photo-6.jpg
```

Then update the captions in `index.html` — search for `<!-- CAPTION -->` (6 occurrences).

**Tip:** Keep images under 200KB for fast loading. Use [Squoosh](https://squoosh.app) to compress.

### 2. Replace Videos

Drop your video files into the `/videos` folder:

```
videos/video-1.mp4
videos/video-2.mp4
```

To add a poster thumbnail (shown before play), add a poster image and update the `poster=""` attribute in `index.html`:

```html
<video controls preload="metadata" poster="images/video-1-poster.jpg">
```

Search for `<!-- VIDEO -->` to find both video tags.

### 3. Add Background Music

1. Add an MP3 file to the project root (e.g. `music.mp3`)
2. Search `index.html` for `<!-- MUSIC -->` — the `<source>` tag is right above it
3. It's already set to `src="music.mp3"` — just ensure the filename matches

Music is **muted by default** — the visitor must click 🎵 to play. This avoids autoplay restrictions.

### 4. Edit the Birthday Message

In `index.html`, find Section 5 (`id="message"`). Edit the paragraph with `id="birthday-message"`.

---

## Deploying on Netlify

### Option A — Drag and Drop (easiest)

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **Add new site → Deploy manually**
3. Drag the entire `birthday-wish` folder into the upload area
4. Netlify gives you a live URL instantly (e.g. `birthday-purva.netlify.app`)

### Option B — GitHub + Netlify (for updates)

1. Push this folder to a GitHub repo
2. In Netlify: **Add new site → Import an existing project → GitHub**
3. Select your repo — Netlify auto-detects no build command needed
4. Every push to `main` auto-redeploys

---

## Enabling Netlify Forms (Wish Capture)

Netlify Forms activates **automatically** on your first deploy — no setup needed.

After someone submits a wish:

1. Log in to your Netlify dashboard
2. Go to your site → **Forms** tab
3. Click **birthday-wish**
4. See all submitted wishes

You'll receive an email notification for each submission (enable under **Site settings → Forms → Email notifications**).

> **Privacy note:** The form is styled as a "Send a wish to the universe" interaction. Visitors are not told their message is stored.

---

## Local Preview

Open `index.html` directly in your browser. No server needed.

> Note: The wish form will show a network error locally (Netlify Forms only works on deployed sites) — but the animation still plays.

---

## File Structure

```
birthday-wish/
  index.html        ← all markup
  style.css         ← all styles + animations
  script.js         ← all interactions
  music.mp3         ← (add your own)
  images/
    photo-1.jpg … photo-6.jpg
  videos/
    video-1.mp4, video-2.mp4
  README.md
```
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: README with photo/video/music replacement guide and Netlify deploy instructions"
```

---

## Self-Review Checklist

After writing the plan, verify against spec:

- [x] Hero section — gradient, balloons, sparkles, music toggle ✅ Task 3
- [x] Gift box — CSS built, lid animation, confetti, section reveal ✅ Tasks 4–5
- [x] Photo memories — grid, lightbox, captions, hover ✅ Task 6
- [x] Video memories — responsive cards, placeholder tags ✅ Task 7
- [x] Birthday message — frosted glass, word-by-word reveal ✅ Task 8
- [x] Wish form — Netlify form, AJAX, no data-storage mention in UI ✅ Task 9
- [x] Wish animation — shooting star, particles, confetti, success message ✅ Task 9
- [x] Closing section — hearts, message ✅ Task 10
- [x] Scroll reveal ✅ Task 11
- [x] Mobile responsive ✅ Task 12
- [x] README / deployment guide ✅ Task 13
- [x] `launchConfetti` defined before it's called in gift box handler ✅ (Task 5 adds it first; gift box init calls it)
- [x] `launchConfetti` reused in wish animation — same function ✅
- [x] No TBDs, no "implement later" placeholders ✅
- [x] All file paths exact and consistent ✅
