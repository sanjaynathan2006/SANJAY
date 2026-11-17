# /public/thumbnails

Put project thumbnails / poster images here and reference them in `data/projects.ts`:

```ts
thumbnail: "/thumbnails/neon-nights.jpg",
```

- **Match the video's shape:** 1920×1080 for 16:9, 1080×1920 for 9:16, 1080×1080 for 1:1.
- JPG or WebP, ideally under 300 KB. Next.js resizes and converts them to AVIF/WebP automatically.
- YouTube projects can leave `thumbnail: ""` and the YouTube thumbnail is used automatically.
- If there's no thumbnail at all, a labelled "YOUR VIDEO HERE" placeholder is shown.
- Before/after stills for color grading (`beforeAfter`) also go here, both the **same size**.
