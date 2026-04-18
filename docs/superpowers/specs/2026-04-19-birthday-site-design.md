# Birthday Website Design Spec
**Date:** 2026-04-19
**Subject:** Purva
**Goal:** A single-page static birthday experience — magical, emotional, interactive.

---

## Project Summary

A static birthday website for Purva. No backend. Deployable to Netlify/Vercel/GitHub Pages. Netlify Forms captures wish submissions invisibly. The visitor opens the page, clicks a gift box, sees memories and messages, and sends a wish to the "Birthday Universe."

---

## Tech Stack

- HTML5 / CSS3 / Vanilla JS
- Google Fonts: Playfair Display, Lato, Dancing Script
- Netlify Forms (no backend required)
- No npm, no framework, no build step

---

## File Structure

```
/birthday-wish
  index.html
  style.css
  script.js
  /images
    photo-1.jpg  (placeholder)
    photo-2.jpg
    photo-3.jpg
    photo-4.jpg
    photo-5.jpg
    photo-6.jpg
  /videos
    video-1.mp4  (placeholder)
    video-2.mp4
  /docs/superpowers/specs/  ← this file
  README.md
```

---

## Color Palette

```css
--pink:   #f8bbd9   /* soft rose */
--lilac:  #e1bee7   /* gentle purple */
--blue:   #bbdefb   /* powder blue */
--cream:  #fef6fb   /* off-white background */
--text:   #5c4a6b   /* muted plum */
--accent: #ce93d8   /* medium lilac — CTAs, highlights */
--dark:   #3b2d4a   /* deep plum — headings */
```

---

## Typography

| Role | Font | Weight |
|---|---|---|
| Hero headings | Playfair Display | 700 |
| Section headings | Playfair Display | 600 |
| Body text | Lato | 400 |
| Magical accents | Dancing Script | 700 |

---

## Sections

### 1. Hero

- Full viewport height
- Animated gradient background: pink → lilac → blue, slow shift loop
- Floating balloons (CSS keyframe, 5–8 balloons, staggered)
- Sparkle particles spawned via JS (random position, fade in/out)
- Heading: `"Happy Birthday Purva 🎂"` — Playfair Display, large
- Subtitle: `"A little corner of the internet made just for you."` — Dancing Script
- Music toggle button: top-right corner, plays soft looping background audio (user provides MP3, muted by default, opt-in)
- Scroll-down arrow cue at bottom

### 2. Gift Box Surprise

- Centered on page, below hero
- Text above box: `"I got you a small birthday surprise…"` — Dancing Script
- Instruction: `"Click the gift box to open it."` — Lato
- Gift box built from CSS divs (lid + base, ribbon): no SVG dependency
- **On click:**
  1. Lid animates upward + rotates with CSS keyframe
  2. Confetti burst from box center (JS canvas, ~150 particles, dreamy colors)
  3. 6 photo thumbnails animate outward radially from box
  4. Sections 3–8 fade in sequentially (opacity 0 → 1 with translateY)
- Sections 3–8 have `visibility: hidden; opacity: 0` until gift opened

### 3. Photo Memories

- Grid: 3 columns desktop / 2 columns tablet / 1 column mobile
- 6 placeholder image cards with `object-fit: cover`
- Caption below each image (editable in HTML)
- Hover: scale(1.03) + soft box-shadow
- Click → lightbox overlay with darkened background, close on click/Esc
- Placeholder filenames: `/images/photo-1.jpg` through `photo-6.jpg`

### 4. Video Memories

- 2 video cards in a responsive flex row (stack on mobile)
- `<video controls preload="metadata" poster="">` — user provides poster image + MP4
- Rounded cards, subtle lilac border-glow on hover
- Placeholder: `/videos/video-1.mp4`, `/videos/video-2.mp4`

### 5. Birthday Message

- Full-width frosted-glass card (`backdrop-filter: blur`, semi-transparent white)
- Soft lilac border, rounded-xl corners, large padding
- Message I'll write (warm, heartfelt, slightly romantic):
  > *"Some people walk into your life and quietly rearrange it —*
  > *making everything a little warmer, a little brighter, a little more worth celebrating.*
  > *Purva, you are that kind of person.*
  > *Today the universe pauses to celebrate you: your laughter, your light,*
  > *the way you make ordinary moments feel like something worth remembering.*
  > *Happy Birthday. May this year be as beautiful as you make everything around you."*
- IntersectionObserver triggers word-by-word fade-in as user scrolls to section

### 6. Send a Wish

- Heading: `"Send a Wish to the Birthday Universe ✨"` — Playfair Display
- Subtext: `"If you could wish for anything today, what would it be? Write it below and send it into the universe."`
- Netlify form: `name="birthday-wish"` `data-netlify="true"`
- Hidden input: `<input type="hidden" name="form-name" value="birthday-wish">`
- Textarea: styled, rounded, soft shadow, placeholder text
- Submit button: lilac gradient, glowing pulse animation, label: `"Send Wish ✨"`
- **No mention of Netlify, data storage, or form submission in the UI**

### 7. Wish Animation (post-submit)

- JS intercepts `submit` event, calls `fetch` to post form (AJAX), prevents page reload
- Sequence:
  1. Form fades out
  2. Shooting star SVG animates diagonally across screen (top-left to bottom-right), trailing sparkle dots
  3. Wish text chars scatter upward as glowing particles (JS canvas)
  4. Confetti burst
  5. Fade in message: `"Your wish has been sent to the Birthday Universe 🌌 May the stars make it come true."` — Dancing Script, large, glowing text-shadow
- Entire sequence ~3.5 seconds

### 8. Closing

- Soft gradient background, centered text
- Message:
  > *"Some people make the world brighter just by being in it.*
  > *Thank you for being one of those people.*
  > *Happy Birthday ❤️"*
- Looping floating hearts (CSS keyframe, 6–8 hearts, randomized position + delay)

---

## Animations Reference

| Name | Trigger | Method |
|---|---|---|
| Gradient shift | On load | CSS `@keyframes` on background-position |
| Floating balloons | On load | CSS `@keyframes` translateY loop |
| Sparkle particles | On load | JS setInterval, random DOM placement |
| Scroll fade-in | Scroll | `IntersectionObserver` |
| Gift lid open | Click | CSS class toggle + `@keyframes` |
| Confetti burst | Gift click + wish submit | JS canvas (custom, no library) |
| Photo radial scatter | Gift click | JS, staggered `setTimeout` + CSS transform |
| Section reveal | Gift click | Staggered opacity + translateY transitions |
| Shooting star | Wish submit | SVG element + CSS `@keyframes` |
| Wish particle scatter | Wish submit | JS canvas |
| Lightbox open/close | Photo click | CSS opacity transition |
| Floating hearts | On load (closing) | CSS `@keyframes` |
| Music toggle | Button click | JS `audio.play()` / `audio.pause()` |

---

## Netlify Forms Setup

- Form tag: `<form name="birthday-wish" method="POST" data-netlify="true">`
- Hidden field: `<input type="hidden" name="form-name" value="birthday-wish">`
- AJAX submit (JS `fetch`) so page doesn't reload — wish animation plays instead
- Netlify auto-detects form on first deploy scan
- Submissions visible at: Netlify Dashboard → Site → Forms → birthday-wish

---

## Responsiveness

- Mobile-first CSS
- Breakpoints: `768px` (tablet), `1024px` (desktop)
- Touch-friendly tap targets (min 44px)
- Swipe gesture on photo grid considered (lightbox nav arrows on mobile)

---

## Performance

- No npm / no build step
- Google Fonts loaded via `<link>` with `display=swap`
- Images: user replaces placeholders with optimized JPGs (recommend ≤200KB each)
- JS canvas animations use `requestAnimationFrame` and are cleaned up when off-screen
- All animations respect `prefers-reduced-motion` media query

---

## Placeholder Replacement Guide (for README)

1. **Photos:** Replace `/images/photo-1.jpg` through `photo-6.jpg` with your images. Update captions in `index.html` (search for `<!-- CAPTION -->`).
2. **Videos:** Replace `/videos/video-1.mp4` and `video-2.mp4`. Add poster images for thumbnails.
3. **Music:** Add an MP3 to `/` and update the `src` in `index.html` (search for `<!-- MUSIC -->`).
4. **Message:** Edit the birthday message in Section 5 of `index.html`.
5. **Deploy:** Drag the `/birthday-wish` folder into Netlify Drop, or connect your GitHub repo. Netlify Forms activates automatically on first deploy.

---

## Out of Scope

- Backend, database, or server-side code
- User accounts or authentication
- Analytics
- Multiple pages
- CMS integration
