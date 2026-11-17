"use client";

import type { VideoType } from "@/data/site";
import type { AspectRatio } from "@/data/projects";
import { embedUrl, hasVideo } from "@/lib/video";
import Placeholder from "./Placeholder";

export type VideoSource = { type: VideoType; src: string; poster?: string | null; title: string; ratio: AspectRatio };

/** Fills its (aspect-ratio sized) parent. Handles local files and YouTube / Vimeo / Google Drive embeds. */
export default function VideoPlayer({ type, src, poster, title, ratio, autoPlay = true }: VideoSource & { autoPlay?: boolean }) {
  if (!hasVideo(type, src)) {
    return <Placeholder ratio={ratio} title={title} note="Add videoSrc in data/projects.ts (or data/site.ts for the showreel)" />;
  }
  if (type === "local") {
    return (
      <video
        className="absolute inset-0 h-full w-full bg-black object-contain"
        src={src}
        poster={poster ?? undefined}
        controls
        autoPlay={autoPlay}
        playsInline
        preload="metadata"
      >
        Your browser does not support HTML5 video.
      </video>
    );
  }
  return (
    <iframe
      className="absolute inset-0 h-full w-full bg-black"
      src={embedUrl(type, src, autoPlay)!}
      title={title}
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; clipboard-write"
      allowFullScreen
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
