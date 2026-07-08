# The Story of Us

An interactive, scroll-driven birthday website — a cinematic "chapters" experience (story, timeline, reasons, gallery, voice message, gift, cake, ending) instead of a static card. Built as a fully reusable template: every word of text, every photo, and every audio file is swapped through a single JSON file — no code editing required to make it your own.

**Live building blocks**: floating hearts/butterflies/sparkles background, a gift box that pops open into a hand-typed letter, a real photo cake with candles you can blow out via microphone (or a button), a hidden Konami-code easter egg, moon/heart tap-to-reveal secret notes, and a persistent ambient music player that ducks automatically when a voice message plays.

## Tech stack

- **Next.js 15** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS v4**
- **Howler.js** — audio playback (ambient music + voice message), with autoplay-unlock and mutual ducking handled for you
- **canvas-confetti** — celebration bursts
- **Lenis** — smooth scrolling

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Edits to `data/content.json` and any component hot-reload instantly.

```bash
npm run build   # production build
npm run start   # serve the production build
```

## How it works

Every section is its own component in `components/` (`StorySection`, `Timeline`, `ReasonsSection`, `PolaroidGallery`, `VoiceMessage`, `GiftBox`, `CakeSection`, `Ending`, plus ambient decoration components like `FloatingHearts`/`AmbientBackground`/`EasterEggs`). Each component imports `data/content.json` and renders whichever slice of it belongs to that chapter — no component hardcodes any copy, image path, or audio path.

`app/page.tsx` assembles the chapters in order and drives the intro loading sequence. `context/InteractiveProvider.tsx` owns shared state that multiple components need — confetti, the Konami-code listener, and the single ambient-audio `Howl` instance (so the hero panel and the floating mini-player button both control the same track, and voice-message playback can duck/restore it).

## Customizing everything: `data/content.json`

This is the only file you need to touch to make the site yours. Structure:

| Key | Drives |
|---|---|
| `site` | Page `<title>` / meta description |
| `hero` | Loading sequence messages, title, subtitle, background music (`audioSrc`) |
| `story` | "Our Story" chapter — add as many `slides` as you want |
| `timeline` | Dated milestones — add as many `entries` as you want, `photo` is optional (`null` to omit) |
| `reasons` | Swipeable "reasons you're amazing" cards — add as many `items` as you want, `tag` is optional |
| `gallery` | Swipeable photo carousel — add as many `photos` as you want |
| `voice` | Voice-message chapter, including its own `audioSrc` |
| `gift` | Gift-box chapter — `letterText` is what types out after the box opens (use `\n\n` for paragraph breaks) |
| `cake` | Candle-blow chapter — `image` is the cake photo path |
| `ending` | Final closing message |
| `easterEggs` | Text shown by the hidden moon/heart taps |

Every list (`slides`, `entries`, `items`, `photos`) is rendered by mapping over the array — there's no hardcoded limit, add as few or as many as you like.

**Photos**: drop image files into `public/photos/` and point any `"src"`/`"photo"`/`"image"` field at `/photos/yourfile.jpg`.

**Audio**: drop files into `public/audio/` and point `hero.audioSrc` / `voice.audioSrc` at `/audio/yourfile.mp3`.

## Deploying

Zero server-side features (no API routes, no database) — deploys anywhere for free:

- **Vercel** — connect the repo, zero config, done.
- **Netlify** — connect the repo, auto-detected.
- **GitHub Pages** — add `output: 'export'` to `next.config.js`, run `npm run build`, publish the generated `out/` folder.

## A note on the sample content

This repo ships with the `data/content.json`, cake photo, and audio files I used for my own version of this site so it works out of the box as a working example — they are **not original creations of this repository's author** (the photo and songs belong to their respective photographers/artists/labels). They're included purely to demonstrate the template end-to-end.

If you are the rights holder of any included image or audio file and would like it removed, please open an issue and I will take it down promptly.

If you're forking this to build your own version, swap every file in `public/photos/` and `public/audio/`, and rewrite `data/content.json`, before sharing your version publicly.
