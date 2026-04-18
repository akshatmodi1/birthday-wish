# Happy Birthday Manu 🎂

A magical single-page birthday website for Manu.

---

## What's on the site

| Section | What it does |
|---|---|
| Hero | Animated gradient, floating balloons, sparkles, scroll cue |
| Photo Carousel | Full-width swipe carousel — auto-advances every 3s, swipe/drag to navigate, click to open full-screen |
| Video Memories | 4 videos in a 2×2 grid |
| Birthday Message | Word-by-word reveal animation |
| Send a Wish | Form with shooting-star animation (submits to Netlify Forms) |
| Closing | Floating hearts |

---

## Customizing Content

### 1. Photos

All photos live in `/images`. Current files (in carousel order):

```
1images-1.jpg, 2images-01.jpg, 3images-4.jpg, 4images-1.png, 4images-5.jpg,
5images-1.jpg, 5images-2.jpg, 5images-3.jpg, 5images-4.jpg, 5images-5.jpg,
6images-6.jpg, 6images-8.jpg, 7images-7.jpg, 8images-10.jpg, 9images-13.jpg,
10images.jpg, 11images-2.jpg, 12images-16.jpg, 13images-8.jpg, 14images-9.jpg,
14photo-21.jpg, 14photo-31.jpg, 15images-11.jpg, 15photo-22.jpg, 16images-12.jpg,
17images-14.jpg, 18images-15.jpg, 19photo-14.jpg, photo-3.jpg, photo-11.jpg,
photo-15.jpg, photo-23.jpg, Screenshot_2024-06-10-22-54-51-932_com.snapchat.android.jpg
```

To add or remove photos, update both `/images` and the `<div class="photo-card">` entries in `index.html` (section `id="photos"`).

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

In `index.html`, find the section `id="message"` and edit the paragraph `id="birthday-message"`.

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

---

## Viewing Submitted Wishes

Netlify Forms activates automatically on first deploy.

1. Netlify dashboard → your site → **Forms** tab
2. Click **birthday-wish** to see all submitted wishes
3. Enable email notifications: **Site settings → Forms → Email notifications**

---

## File Structure

```
birthday-wish/
  index.html        ← all markup
  style.css         ← all styles
  script.js         ← all interactions
  music.mp3         ← background music
  images/           ← all 33 photos
  videos/           ← 4 videos
  README.md
```
