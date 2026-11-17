# /public/videos

Put **small** local video files here (hero loop, hover previews).

| File | Used for | Recommended |
|---|---|---|
| `hero-loop.mp4` | Background of the hero (`site.showreel.heroLoop` in `data/site.ts`) | 10–20 s, muted, 1080p, H.264, **under 8 MB** |
| `previews/<slug>.mp4` | Hover preview on a work card (`previewSrc` in `data/projects.ts`) | 3–6 s, no audio, 720p, **under 2 MB** |
| `<slug>.mp4` | Full local video (`videoType: "local"`, `videoSrc: "/videos/<slug>.mp4"`) | Only if small; prefer YouTube/Vimeo |

A file at `public/videos/my-edit.mp4` is referenced as `/videos/my-edit.mp4` (no `public`).

**Keep big files out of Git.** GitHub blocks files over 100 MB and Vercel serves large videos slowly.
Host full-length edits on YouTube/Vimeo (unlisted is fine), Cloudinary or Google Drive, and paste the link
into `data/projects.ts`.

Compress with HandBrake (preset "Web > Vimeo YouTube 720p30") or ffmpeg:

```bash
ffmpeg -i input.mov -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart preview.mp4
```
