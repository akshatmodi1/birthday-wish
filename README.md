# Happy Birthday Manu 🎂

A magical single-page birthday website for Manu — built with vanilla HTML, CSS, and JS. No frameworks, no build step.

---

## What's on the site

| Section | What it does |
|---|---|
| Hero | Animated gradient background, floating emoji balloons, sparkle canvas, scroll cue |
| Photo Carousel | Full-width infinite CSS marquee — hover to pause, click photo to open full-screen lightbox |
| Video Memories | 4 videos in a 2×2 grid (1 column on mobile) |
| Birthday Message | Word-by-word reveal animation triggered by scroll |
| Send a Wish | Textarea form → submits to Netlify Forms (fire-and-forget) → plays fullscreen space animation |
| Closing | Floating hearts |

---

## How the Wish Animation Works

When the user clicks "Send Wish ✨":

1. The textarea is validated (non-empty required)
2. A fire-and-forget `fetch` POST sends the wish to Netlify Forms in the background
3. `Wish.play()` fires immediately — no waiting for the fetch
4. A fullscreen canvas overlay appears with:
   - **500 burst particles** exploding from center with trails + gravity
   - **350 twinkling stars** (random twinkle speed/size)
   - **7 shooting comets** staggered across the sky (800ms + 350ms intervals)
   - **3 aurora wave bands** fading in after 600ms
   - **3 text lines** appearing at 300ms / 1900ms / 3000ms
5. After **7500ms** the overlay fades out and the user is back on the page
6. The form resets after submission

The `Wish` module lives in `script.js` as a self-contained IIFE. Entry point: `Wish.play()`.

---

## Customizing Content

### 1. Photos

All photos live in `/images`. To add or remove photos:
- Add/remove files in `/images`
- Update the `.photo-card` entries in `index.html` (section `id="photos"`)
- The carousel duplicates all cards in HTML (66 total = 33 originals + 33 `aria-hidden` clones) — keep both sets in sync

Current files:
```
1images-1.jpg, 2images-01.jpg, 3images-4.jpg, 4images-1.png, 4images-5.jpg,
5images-1.jpg, 5images-2.jpg, 5images-3.jpg, 5images-4.jpg, 5images-5.jpg,
6images-6.jpg, 6images-8.jpg, 7images-7.jpg, 8images-10.jpg, 9images-13.jpg,
10images.jpg, 11images-2.jpg, 12images-16.jpg, 13images-8.jpg, 14images-9.jpg,
14photo-21.jpg, 14photo-31.jpg, 15images-11.jpg, 15photo-22.jpg, 16images-12.jpg,
17images-14.jpg, 18images-15.jpg, 19photo-14.jpg, photo-3.jpg, photo-11.jpg,
photo-15.jpg, photo-23.jpg, Screenshot_2024-06-10-22-54-51-932_com.snapchat.android.jpg
```

To update photo captions: edit the `.photo-card-caption` text inside each `.photo-card` in `index.html`.

### 2. Videos

All videos live in `/videos`. Current files:
```
videos/baap_re_cute.mp4
videos/malika_arora_walk.mp4
videos/phela_pyaar_janu.mp4
videos/sundar_manu.mp4
```

To change captions, edit the `<p class="video-caption">` text under each `<video>` tag in `index.html`.

### 3. Background Music

Replace `music.mp3` in the project root. The `<audio>` tag already points to `music.mp3`. Music is off by default — visitor clicks 🎵 to play.

### 4. Birthday Message

In `index.html`, find `id="message"` and edit the paragraph `id="birthday-message"`.

### 5. Wish Animation Tuning

In `script.js`, find `const CFG = {` inside the `Wish` module:

```js
const CFG = {
  BURST_COUNT : 500,   // explosion particles (more = bigger burst)
  STAR_COUNT  : 350,   // ambient twinkling stars
  COMET_COUNT : 7,     // shooting comets
  AURORA_BANDS: 3,     // aurora wave layers
  DURATION    : 7500,  // ms before the overlay fades out
  COLORS      : [...], // palette — all hex
};
```

---

## Running Locally

Browsers block videos and some fonts when opened as `file://`. Use a local server:

```bash
cd birthday-wish
python3 -m http.server 9000
# then open http://localhost:9000
```

---

## Deploying on Netlify

### Option A — Drag and Drop (easiest)

1. Go to [netlify.com](https://netlify.com) and sign in
2. **Add new site → Deploy manually**
3. Drag the entire `birthday-wish` folder into the upload area
4. Netlify gives you a live URL instantly

### Option B — GitHub + Netlify (for updates)

1. Push this folder to a GitHub repo
2. In Netlify: **Add new site → Import an existing project → GitHub**
3. Select your repo — no build command needed
4. Every push to `main` auto-redeploys

### Important: No build command needed

This is a static site. In Netlify settings leave Build command blank and set Publish directory to `.` (or leave default).

---

## Netlify Forms Setup

The wish form submits to Netlify Forms automatically — no backend needed.

**How it works:**
- Form has `data-netlify="true"` and `name="birthday-wish"`
- A hidden `<input name="form-name" value="birthday-wish">` tells Netlify which form it is
- The JS uses a fire-and-forget `fetch` POST — Netlify never redirects the user
- The wish animation plays immediately regardless of network

**Viewing submitted wishes:**
1. Netlify dashboard → your site → **Forms** tab
2. Click **birthday-wish** to see all submissions
3. Enable email notifications: **Site settings → Forms → Email notifications**

**Note:** Netlify Forms only works on the deployed URL, not `localhost`. Test locally by opening the animation directly; test form submissions after deploying.

---

## File Structure

```
birthday-wish/
  index.html          ← all markup
  style.css           ← all styles
  script.js           ← all interactions + Wish animation module
  music.mp3           ← background music
  images/             ← all 33 photos
  videos/             ← 4 videos
  README.md
  test-animation.html ← debug-only standalone animation test (safe to delete)
```

---

## Technical Notes

- **CSS marquee:** Photo carousel uses `@keyframes marquee` + `translateX(-50%)` with duplicated cards — no JS measurement needed
- **Lightbox:** Click any photo card to open full-screen; Escape or click backdrop to close; keyboard focus-trapped to close button
- **Scroll reveal:** Cards and headings use `IntersectionObserver` to fade in on scroll
- **Word-by-word message reveal:** Each word wrapped in `<span class="message-word">`, revealed with staggered `setTimeout` after `IntersectionObserver` triggers
- **No redirect on form submit:** Button is `type="button"`, submit handled entirely by JS click listener
