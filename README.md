# SANJAYNATHAN: Video Editor Portfolio

A cinematic, dark portfolio for a video editor & motion designer.
Built with **Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP ScrollTrigger · Lenis**.
Poster-style type (Anton + Instrument Serif) and scroll-driven colour themes (ink, paper, signal red, darkroom).

Features: film-leader preloader, giant animated wordmark, letterbox bars, running timecodes, REC dots,
film grain, custom "PLAY" cursor, curtain page transitions, filterable masonry work grid (16:9 / 9:16 / 1:1),
hover previews, fullscreen lightbox, per-project pages, before/after color slider, pinned horizontal process
timeline, testimonial marquees, contact form with copy-to-clipboard email, SEO + Open Graph image + sitemap.
All heavy motion switches off for visitors with *reduced motion* enabled.

---

## 1. Run it locally

You need **Node.js 18.18+** (20 or 22 recommended): https://nodejs.org

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edits reload instantly.

Production check (what Vercel runs):

```bash
npm run build && npm start
```

---

## 2. Edit your content (only two files)

### `data/site.ts`: name, text, links, showreel
| Field | What it is |
|---|---|
| `name`, `role`, `tagline` | Wordmark, title, hero line |
| `url` | Your live domain (used for SEO + link previews) |
| `email`, `availability` | Contact section |
| `formEndpoint` | Contact form (see "Contact form" below) |
| `socials` | Instagram / YouTube / LinkedIn / Behance links (add or remove items freely) |
| `showreel.heroLoop` | Short muted MP4 behind the hero, e.g. `"/videos/hero-loop.mp4"` |
| `showreel.full` | Full showreel for the "Watch Showreel" button: `{ type: "youtube", src: "https://youtu.be/XXXX" }` |
| `showreel.poster` | Poster image for the hero video |
| `about` | Statement, bio paragraphs, `photo`, stats (numbers count up) |
| `tools`, `services`, `process`, `testimonials` | All section text |

### `data/projects.ts`: your portfolio
Each project looks like this:

```ts
{
  id: 1,
  title: "Neon Nights",
  slug: "neon-nights",              // page URL → /work/neon-nights (lowercase, dashes, unique)
  category: "Cinematic",            // must be one of the `categories` list in the same file
  description: "What the project was, your role, the result…",
  software: ["Premiere Pro", "DaVinci Resolve"],
  aspectRatio: "16:9",              // "16:9" | "9:16" | "1:1"
  videoType: "youtube",             // "local" | "youtube" | "vimeo" | "gdrive"
  videoSrc: "https://youtu.be/dQw4w9WgXcQ",
  thumbnail: "/thumbnails/neon-nights.jpg", // or "" (YouTube thumbnail / placeholder)
  duration: "02:45",
  year: 2025,
  client: "Personal Project",
  previewSrc: "/videos/previews/neon-nights.mp4", // optional hover clip
  featured: true,                   // optional: shown first under "All"
}
```

**Video source examples**

| `videoType` | `videoSrc` |
|---|---|
| `"local"` | `"/videos/my-edit.mp4"` (file in `public/videos/`) |
| `"youtube"` | `"https://www.youtube.com/watch?v=ID"`, `"https://youtu.be/ID"` or `"https://youtube.com/shorts/ID"` |
| `"vimeo"` | `"https://vimeo.com/123456789"` |
| `"gdrive"` | `"https://drive.google.com/file/d/FILE_ID/view"` (share as *Anyone with the link*) |

- **Add a project:** copy an object, give it a new `id` and unique `slug`.
- **Remove a project:** delete its object.
- **New category:** add it to the `Category` type and the `categories` array. Filter buttons appear automatically for categories that have projects.
- **Reels / Shorts:** set `aspectRatio: "9:16"`; cards, lightbox and project page size themselves correctly.
- **Hover previews** play only on desktop, only while hovered (nothing downloads before that). Local videos use `videoSrc` automatically; for YouTube/Vimeo projects add a tiny `previewSrc` MP4.
- **Color grading slider:** add `beforeAfter: { before: "/thumbnails/x-before.jpg", after: "/thumbnails/x-after.jpg" }`.

Images / files go in `public/thumbnails`, `public/videos`, `public/images`. Each folder has a README with sizes.

### Contact form
1. Create a free account at https://formspree.io, then **New form**.
2. Copy the endpoint (`https://formspree.io/f/abcdwxyz`) into `formEndpoint` in `data/site.ts`.
3. Submit the form once on your live site and confirm the email Formspree sends you.

Until then, the form opens the visitor's email app pre-filled (so it never silently fails).

### Italic serif accents
Wrap words in `*asterisks*` in `data/site.ts` (tagline, about statement) to render them in the italic serif:

```ts
tagline: "Cutting stories *frame by frame.*",
```

### Colours (section themes)
The page cross-fades between four colour themes as you scroll. Each section picks one with `data-theme`:

| Theme | Colours | Used on |
|---|---|---|
| `ink` | near-black + warm white | Hero, Tools, Work, Footer |
| `paper` | warm cream + black | About, Testimonials |
| `red` | signal red + black | Services, Contact, preloader, page transition |
| `room` | darkroom maroon + blush | Process |

Change the colours at the top of `app/globals.css` (`.theme-ink`, `.theme-paper`, `.theme-red`, `.theme-room`).
To change a section's colour, edit its `data-theme="…"` attribute in `components/sections/*.tsx`.
Add `className="theme-red"` (etc.) to any element to give just that element a theme.

### Fonts
Self-hosted in `app/fonts/` (no Google Fonts request at build time) and loaded in `app/layout.tsx`:
- **Anton**: condensed display caps (headings, wordmark)
- **Instrument Serif Italic**: editorial accent words
- **Geist**: body text; **Geist Mono**: labels & timecodes

Favicon: `app/icon.svg`. Link-preview image: generated by `app/opengraph-image.tsx` from your name and tagline.

---

## 3. Deploy live on Vercel (free)

### a) Push the project to GitHub
1. Create a GitHub account and a new **empty** repository (e.g. `portfolio`) at https://github.com/new.
2. In this folder:

```bash
git init
```

```bash
git add -A && git commit -m "My portfolio"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
```

```bash
git push -u origin main
```

### b) Import into Vercel
1. Sign up at https://vercel.com with **Continue with GitHub**.
2. **Add New → Project**, then pick your `portfolio` repo and **Import**.
3. Leave all settings as detected (Framework: Next.js) and press **Deploy**.
4. About a minute later you get a live URL like `https://portfolio-yourname.vercel.app`.

Every `git push` to `main` redeploys automatically; other branches get preview URLs.

### c) Connect a custom domain (e.g. sanjaynathan.com)
1. Buy the domain (Namecheap, Cloudflare, GoDaddy, Porkbun…), or buy it directly in Vercel.
2. In Vercel: **Project → Settings → Domains → Add**, then enter `sanjaynathan.com` (also add `www.sanjaynathan.com` and let Vercel redirect one to the other).
3. Vercel shows the DNS records to create at your registrar. Usually:
   - `A` record, host `@`, value `76.76.21.21`
   - `CNAME` record, host `www`, value `cname.vercel-dns.com`

   (Always use the exact values Vercel displays.)
4. Wait for DNS to propagate (minutes up to 48 h). HTTPS is issued automatically.
5. Set `url: "https://sanjaynathan.com"` in `data/site.ts` and push, so SEO tags and the sitemap use your domain.

---

## 4. Hosting large videos: tips

Don't commit big videos to Git (GitHub rejects >100 MB, and it bloats every deploy).

| Option | Best for | How |
|---|---|---|
| **YouTube (unlisted)** | Full edits, free, fast everywhere | Upload → Visibility *Unlisted* → `videoType: "youtube"` |
| **Vimeo** | Clean ad-free player, client work | Upload → copy link → `videoType: "vimeo"` (free plan has weekly limits) |
| **Cloudinary** | Self-hosted MP4 with CDN + auto compression | Upload → copy the `.mp4` URL → `videoType: "local"`, `videoSrc: "https://res.cloudinary.com/…/video.mp4"` |
| **Google Drive** | Quick sharing | Share as *Anyone with the link* → `videoType: "gdrive"` (slower, shows Drive UI) |
| **`/public/videos`** | Only the tiny hero loop and hover previews | Keep each file under ~8 MB |

Tips for a fast site (Lighthouse 90+):
- Always set a `thumbnail` (poster). It's what loads first.
- Hero loop: 10–20 s, 1080p, no audio, CRF 26–30, `-movflags +faststart`.
- Hover previews: 3–6 s at 720p, under 2 MB.
- For Cloudinary, append `q_auto,f_auto` in the URL to auto-optimize.

---

## Project structure

```
app/
  layout.tsx              fonts, SEO metadata, global UI (preloader, cursor, nav, footer, grain)
  page.tsx                home page sections
  work/[slug]/page.tsx    project pages (static, one per project)
  opengraph-image.tsx     auto-generated social preview image
  icon.svg · sitemap.ts · robots.ts · not-found.tsx
components/
  layout/   Providers (Lenis + transitions) · Preloader · Navbar · Footer · Cursor · Curtain
  sections/ Hero · About · Tools · Services · Work · Process · Testimonials · Contact · ProjectView
  video/    VideoPlayer · VideoModal (lightbox) · WorkCard · BeforeAfter · Placeholder
  ui/       Reveal (split text) · Marquee · Timecode · Magnetic · FrameMarkers · CountUp …
data/       site.ts · projects.ts   ← edit these
lib/        video URL parsing, timecode, hooks, gsap setup
public/     videos/ · thumbnails/ · images/
```

## Accessibility & motion
- `prefers-reduced-motion`: disables smooth scrolling, parallax, pinning, marquees, grain animation and long preloader.
- Keyboard: skip link, visible focus rings, Esc closes the lightbox and menu, arrow keys move the before/after slider.
- Custom cursor only on mouse/trackpad devices; touch devices keep native behaviour.
