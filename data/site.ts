/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG: edit your name, text, links and showreel here.
 * ─────────────────────────────────────────────────────────────
 *  Everything marked "PLACEHOLDER" is meant to be replaced.
 */

export type VideoType = "local" | "youtube" | "vimeo" | "gdrive";

export const site = {
  /** Main wordmark. Always shown in UPPERCASE. */
  name: "SANJAYNATHAN",
  role: "Video Editor & Motion Designer",
  /** PLACEHOLDER tagline */
  tagline: "Cutting stories frame by frame.",

  /** Your live domain (used for SEO / Open Graph / sitemap). */
  url: "https://sanjaynathan.com",
  /** Shown in search results & link previews. */
  description:
    "SANJAYNATHAN: video editor & motion designer. YouTube edits, reels, cinematic films, motion graphics and color grading in Premiere Pro, After Effects and DaVinci Resolve.",

  /** PLACEHOLDER contact email */
  email: "hello@sanjaynathan.com",
  /** Short line under the contact heading */
  availability: "Available for freelance projects worldwide",

  /**
   * Contact form endpoint.
   * 1. Create a free form at https://formspree.io
   * 2. Replace YOUR_FORM_ID below with your form's ID (e.g. "xyzabcd").
   * While it still says YOUR_FORM_ID, the form falls back to opening the visitor's email app.
   */
  formEndpoint: "https://formspree.io/f/YOUR_FORM_ID",

  /** PLACEHOLDER social links */
  socials: [
    { label: "Instagram", href: "https://instagram.com/yourhandle" },
    { label: "YouTube", href: "https://youtube.com/@yourchannel" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourprofile" },
    { label: "Behance", href: "https://behance.net/yourprofile" },
  ],

  /**
   * SHOWREEL
   *  - heroLoop: a SHORT, small (<8 MB), muted MP4 that loops behind the hero.
   *    Put it in /public/videos and write e.g. "/videos/hero-loop.mp4".
   *    Leave "" to show the animated placeholder.
   *  - full: the full showreel opened by the "Watch Showreel" button.
   *    type "local"   → src: "/videos/showreel.mp4"
   *    type "youtube" → src: "https://youtu.be/VIDEO_ID" (or the full watch URL)
   *    type "vimeo"   → src: "https://vimeo.com/123456789"
   *    type "gdrive"  → src: "https://drive.google.com/file/d/FILE_ID/view"
   *  - poster: an image shown before the video loads (e.g. "/thumbnails/showreel.jpg").
   */
  showreel: {
    heroLoop: "",
    poster: "",
    full: { type: "youtube" as VideoType, src: "" },
  },

  /** About section. PLACEHOLDER bio paragraphs. */
  about: {
    statement:
      "I shape raw footage into stories people actually finish watching: rhythm, emotion and every frame earning its place.",
    bio: [
      "I'm a video editor and motion designer obsessed with pacing, sound and the invisible cut. From punchy 30-second reels to long-form YouTube and cinematic travel films, I build edits that hold attention and feel effortless.",
      "My toolkit lives across Premiere Pro, After Effects and DaVinci Resolve: cutting, animating and grading until the story clicks. Replace this text in data/site.ts.",
    ],
    /** Portrait image path, e.g. "/images/portrait.jpg". Leave "" for a placeholder. */
    photo: "",
    stats: [
      { value: 120, suffix: "+", label: "Projects edited" },
      { value: 4, suffix: "", label: "Years learning" },
      { value: 35, suffix: "+", label: "Happy clients" },
    ],
  },

  /** Tools / software cards (text badges, not official logos). */
  tools: [
    {
      badge: "AE",
      name: "Adobe After Effects",
      use: "Motion graphics",
      description:
        "Kinetic typography, titles, logo reveals, compositing and VFX clean-ups that give an edit its signature look.",
      skills: ["Kinetic type", "Shape animation", "Tracking", "Compositing"],
      level: 88,
    },
    {
      badge: "PR",
      name: "Adobe Premiere Pro",
      use: "Editing",
      description:
        "Story-first cutting: multicam, pacing, sound design and fast turnarounds for YouTube, reels and long-form.",
      skills: ["Story & pacing", "Multicam", "Sound design", "Captions"],
      level: 94,
    },
    {
      badge: "DR",
      name: "DaVinci Resolve",
      use: "Color grading",
      description:
        "Node-based grading from LOG to look: skin tones, contrast and mood that make footage feel cinematic.",
      skills: ["Color correction", "Look design", "Skin tones", "Fairlight audio"],
      level: 85,
    },
  ],

  /** Services / edit types */
  services: [
    { title: "YouTube Video Editing", detail: "Retention-focused long-form edits, hooks, B-roll & captions" },
    { title: "Short-form / Reels / Shorts / TikTok", detail: "Vertical edits built for the first 3 seconds" },
    { title: "Cinematic Edits & Travel Films", detail: "Music-driven storytelling with a filmic finish" },
    { title: "Motion Graphics & Kinetic Typography", detail: "Animated titles, lower-thirds & type-driven pieces" },
    { title: "Color Grading", detail: "Correction & creative looks in DaVinci Resolve" },
    { title: "Music Videos", detail: "Beat-synced cuts, transitions & performance edits" },
    { title: "Wedding & Event Films", detail: "Highlight films & teasers full of feeling" },
    { title: "Commercials / Ads", detail: "Product spots & social ads that convert" },
    { title: "Gaming / Montage Edits", detail: "High-energy montages, velocity & sync" },
    { title: "Anime / AMV-style Edits", detail: "Flow, effects & storytelling to the beat" },
  ],

  /** Process timeline */
  process: [
    { title: "Brief", tc: "00:00:00:00", detail: "We talk goals, audience, references and deadlines. I map the story before touching the timeline." },
    { title: "Rough Cut", tc: "00:00:12:00", detail: "Selects, structure and pacing. The skeleton of the story, shared early for feedback." },
    { title: "Fine Cut", tc: "00:00:31:12", detail: "Precision trims, transitions, motion graphics and B-roll until every frame earns its place." },
    { title: "Color & Sound", tc: "00:00:48:06", detail: "Grade in Resolve, mix, sound design and music sync for the final polish." },
    { title: "Delivery", tc: "00:01:00:00", detail: "Exports for every platform (16:9, 9:16, 1:1) with captions and thumbnails on request." },
  ],

  /** PLACEHOLDER testimonials */
  testimonials: [
    { quote: "Turned 4 hours of raw footage into a 3-minute film that made our whole team emotional.", name: "Client Name", role: "Founder, Brand Studio" },
    { quote: "Our reels went from scroll-past to saved-and-shared. Retention jumped on every post.", name: "Client Name", role: "Content Creator" },
    { quote: "Fast, communicative and genuinely creative. The color grade alone was worth it.", name: "Client Name", role: "Filmmaker" },
    { quote: "He understands pacing like a musician. Every cut lands on the beat.", name: "Client Name", role: "Music Artist" },
    { quote: "Delivered every format we needed, on time, with zero back-and-forth.", name: "Client Name", role: "Marketing Lead" },
    { quote: "Our wedding film still gives us goosebumps. Thank you!", name: "Client Name", role: "Wedding Client" },
  ],
};

export type Site = typeof site;
