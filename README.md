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

To add a poster thumbnail (shown before play), add a poster image and update the `poster=""` attribute in `index.html` — search for `<!-- VIDEO -->` to find both video tags.

### 3. Add Background Music

1. Add an MP3 file to the project root (e.g. `music.mp3`)
2. The `<source>` tag in `index.html` already points to `music.mp3` — just ensure the filename matches
3. Music is **muted by default** — the visitor must click 🎵 to play

### 4. Edit the Birthday Message

In `index.html`, find the section with `id="message"`. Edit the paragraph with `id="birthday-message"`.

---

## Deploying on Netlify

### Option A — Drag and Drop (easiest)

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **Add new site → Deploy manually**
3. Drag the entire `birthday-wish` folder into the upload area
4. Netlify gives you a live URL instantly

### Option B — GitHub + Netlify (for updates)

1. Push this folder to a GitHub repo
2. In Netlify: **Add new site → Import an existing project → GitHub**
3. Select your repo — no build command needed
4. Every push to `main` auto-redeploys

---

## Viewing Submitted Wishes (Netlify Forms)

Netlify Forms activates **automatically** on your first deploy — no setup needed.

After someone submits a wish:

1. Log in to your Netlify dashboard
2. Go to your site → **Forms** tab
3. Click **birthday-wish**
4. See all submitted wishes

Enable email notifications: **Site settings → Forms → Email notifications**

---

## Local Preview

Open `index.html` directly in your browser. No server needed.

> Note: The wish form shows a network error locally (Netlify Forms only works on deployed sites) — the animation still plays.

---

## File Structure

```
birthday-wish/
  index.html        ← all markup
  style.css         ← all styles + animations
  script.js         ← all interactions
  music.mp3         ← add your own MP3
  images/           ← drop photos here (photo-1.jpg … photo-6.jpg)
  videos/           ← drop videos here (video-1.mp4, video-2.mp4)
  README.md
```
