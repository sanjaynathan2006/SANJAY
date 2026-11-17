/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO DATA: every project on the site lives here.
 * ─────────────────────────────────────────────────────────────
 *
 *  HOW TO ADD A REAL VIDEO
 *  videoType "local"   → put the file in /public/videos and set videoSrc: "/videos/my-edit.mp4"
 *  videoType "youtube" → videoSrc: "https://youtu.be/VIDEO_ID" (watch, shorts & embed URLs all work)
 *  videoType "vimeo"   → videoSrc: "https://vimeo.com/123456789"
 *  videoType "gdrive"  → videoSrc: "https://drive.google.com/file/d/FILE_ID/view"
 *                        (sharing must be "Anyone with the link")
 *
 *  thumbnail  → "/thumbnails/my-edit.jpg" (put the image in /public/thumbnails).
 *               Leave "" to auto-use the YouTube thumbnail (for YouTube videos)
 *               or a labelled placeholder.
 *  previewSrc → OPTIONAL short muted MP4 (3–6 s, <2 MB) that plays when hovering
 *               the card, e.g. "/videos/previews/my-edit.mp4".
 *               Local videos use videoSrc for the preview if this is empty.
 *  aspectRatio → "16:9" (horizontal), "9:16" (reels/shorts) or "1:1" (square)
 *  beforeAfter → OPTIONAL images for the color-grading drag-to-compare slider.
 */

import type { VideoType } from "./site";

export type AspectRatio = "16:9" | "9:16" | "1:1";

export type Category =
  | "Reels"
  | "YouTube"
  | "Cinematic"
  | "Motion Graphics"
  | "Color Grading"
  | "Music Video"
  | "Wedding"
  | "Commercial"
  | "Gaming"
  | "Anime";

/** Order of the filter buttons (only categories that have projects are shown). */
export const categories: Category[] = [
  "Reels",
  "YouTube",
  "Cinematic",
  "Motion Graphics",
  "Color Grading",
  "Music Video",
  "Wedding",
  "Commercial",
  "Gaming",
  "Anime",
];

export type Software = "After Effects" | "Premiere Pro" | "DaVinci Resolve";

export type Project = {
  id: number;
  title: string;
  /** URL of the project page: /work/<slug>. Lowercase, dashes, unique. */
  slug: string;
  category: Category;
  description: string;
  software: Software[];
  aspectRatio: AspectRatio;
  videoType: VideoType;
  videoSrc: string;
  thumbnail: string;
  /** "mm:ss" */
  duration: string;
  year: number;
  client: string;
  previewSrc?: string;
  beforeAfter?: { before: string; after: string };
  /** Show this project bigger / first. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Neon Nights",
    slug: "neon-nights",
    category: "Cinematic",
    description:
      "A moody night-time city film cut to an original synth score. Speed ramps, match cuts and a teal-and-neon grade. PLACEHOLDER: replace with your own project story.",
    software: ["Premiere Pro", "DaVinci Resolve"],
    aspectRatio: "16:9",
    videoType: "local",
    videoSrc: "", // e.g. "/videos/neon-nights.mp4"
    thumbnail: "", // e.g. "/thumbnails/neon-nights.jpg"
    duration: "02:45",
    year: 2025,
    client: "Personal Project",
    featured: true,
  },
  {
    id: 2,
    title: "60 Seconds in Goa",
    slug: "60-seconds-in-goa",
    category: "Reels",
    description:
      "A vertical travel reel built around the first three seconds: whip transitions, sound design and on-beat captions.",
    software: ["Premiere Pro", "After Effects"],
    aspectRatio: "9:16",
    videoType: "youtube",
    videoSrc: "", // e.g. "https://youtube.com/shorts/VIDEO_ID"
    thumbnail: "",
    duration: "00:59",
    year: 2025,
    client: "Travel Creator",
  },
  {
    id: 3,
    title: "The Ultimate Setup Breakdown",
    slug: "ultimate-setup-breakdown",
    category: "YouTube",
    description:
      "A 12-minute tech video edited for retention: punch-ins, animated callouts, B-roll layering and a clean audio mix.",
    software: ["Premiere Pro", "After Effects"],
    aspectRatio: "16:9",
    videoType: "youtube",
    videoSrc: "", // e.g. "https://www.youtube.com/watch?v=VIDEO_ID"
    thumbnail: "",
    duration: "12:08",
    year: 2025,
    client: "Tech YouTuber",
  },
  {
    id: 4,
    title: "Manifesto: Kinetic Type",
    slug: "manifesto-kinetic-type",
    category: "Motion Graphics",
    description:
      "A kinetic typography piece animating a brand manifesto word by word, synced to voice-over.",
    software: ["After Effects"],
    aspectRatio: "16:9",
    videoType: "vimeo",
    videoSrc: "", // e.g. "https://vimeo.com/123456789"
    thumbnail: "",
    duration: "01:10",
    year: 2024,
    client: "Studio Brand",
  },
  {
    id: 5,
    title: "Monsoon Grade",
    slug: "monsoon-grade",
    category: "Color Grading",
    description:
      "From flat LOG to a rich, rain-soaked look. Node-based grade with skin-tone protection and film emulation.",
    software: ["DaVinci Resolve"],
    aspectRatio: "16:9",
    videoType: "local",
    videoSrc: "",
    thumbnail: "",
    duration: "01:32",
    year: 2025,
    client: "Indie Film",
    featured: true,
    // Add your own stills (same size) to show the drag-to-compare slider:
    beforeAfter: { before: "", after: "" }, // e.g. "/thumbnails/monsoon-before.jpg"
  },
  {
    id: 6,
    title: "Midnight Drive",
    slug: "midnight-drive",
    category: "Music Video",
    description:
      "Performance and narrative music video: beat-synced cuts, light leaks and a high-contrast night grade.",
    software: ["Premiere Pro", "DaVinci Resolve", "After Effects"],
    aspectRatio: "16:9",
    videoType: "youtube",
    videoSrc: "",
    thumbnail: "",
    duration: "03:41",
    year: 2024,
    client: "Independent Artist",
  },
  {
    id: 7,
    title: "Aarav & Meera",
    slug: "aarav-and-meera",
    category: "Wedding",
    description:
      "A wedding highlight film woven from vows, music and candid moments, with a soft, warm grade.",
    software: ["Premiere Pro", "DaVinci Resolve"],
    aspectRatio: "16:9",
    videoType: "vimeo",
    videoSrc: "",
    thumbnail: "",
    duration: "04:20",
    year: 2024,
    client: "Private Client",
  },
  {
    id: 8,
    title: "Sprint: Sneaker Drop",
    slug: "sprint-sneaker-drop",
    category: "Commercial",
    description:
      "A 30-second product ad with speed ramps, product macros and kinetic titles, delivered in 9:16 for social.",
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    aspectRatio: "9:16",
    videoType: "local",
    videoSrc: "",
    thumbnail: "",
    duration: "00:30",
    year: 2025,
    client: "Footwear Brand",
  },
  {
    id: 9,
    title: "Clutch Moments",
    slug: "clutch-moments",
    category: "Gaming",
    description:
      "A high-energy gaming montage with velocity edits, shakes, sync and custom sound effects.",
    software: ["After Effects", "Premiere Pro"],
    aspectRatio: "16:9",
    videoType: "youtube",
    videoSrc: "",
    thumbnail: "",
    duration: "02:05",
    year: 2023,
    client: "Gaming Channel",
  },
  {
    id: 10,
    title: "Sakura Requiem",
    slug: "sakura-requiem",
    category: "Anime",
    description:
      "An AMV-style edit focused on flow and emotion: smooth transitions, scene blending and lyric-driven storytelling.",
    software: ["After Effects"],
    aspectRatio: "16:9",
    videoType: "youtube",
    videoSrc: "",
    thumbnail: "",
    duration: "03:12",
    year: 2023,
    client: "Personal Project",
  },
  {
    id: 11,
    title: "Café Launch Reel",
    slug: "cafe-launch-reel",
    category: "Reels",
    description:
      "A launch-day reel for a specialty café. Macro coffee shots, ASMR sound design and snappy captions.",
    software: ["Premiere Pro", "DaVinci Resolve"],
    aspectRatio: "9:16",
    videoType: "gdrive",
    videoSrc: "", // e.g. "https://drive.google.com/file/d/FILE_ID/view"
    thumbnail: "",
    duration: "00:24",
    year: 2025,
    client: "Local Café",
  },
  {
    id: 12,
    title: "Logo Reveal Pack",
    slug: "logo-reveal-pack",
    category: "Motion Graphics",
    description:
      "A set of square logo reveals for social channels: liquid shapes, glitch and clean minimal variants.",
    software: ["After Effects"],
    aspectRatio: "1:1",
    videoType: "local",
    videoSrc: "",
    thumbnail: "",
    duration: "00:08",
    year: 2024,
    client: "Agency Client",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
