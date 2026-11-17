import type { VideoType } from "@/data/site";
import type { AspectRatio, Project } from "@/data/projects";

export function ratioNumber(r: AspectRatio): number {
  return r === "9:16" ? 9 / 16 : r === "1:1" ? 1 : 16 / 9;
}
export function ratioCss(r: AspectRatio): string {
  return r.replace(":", " / ");
}

export function youtubeId(src: string): string | null {
  if (!src) return null;
  if (/^[\w-]{11}$/.test(src)) return src;
  const m = src.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
  return m ? m[1] : null;
}
export function vimeoId(src: string): string | null {
  if (!src) return null;
  if (/^\d+$/.test(src)) return src;
  const m = src.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
  return m ? m[1] : null;
}
export function driveId(src: string): string | null {
  if (!src) return null;
  const m = src.match(/\/d\/([\w-]+)/) || src.match(/[?&]id=([\w-]+)/);
  return m ? m[1] : /^[\w-]{20,}$/.test(src) ? src : null;
}

/** Returns an embeddable iframe URL, or null for local / empty sources. */
export function embedUrl(type: VideoType, src: string, autoplay = true): string | null {
  const ap = autoplay ? 1 : 0;
  if (type === "youtube") {
    const id = youtubeId(src);
    return id
      ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=${ap}&rel=0&modestbranding=1&playsinline=1`
      : null;
  }
  if (type === "vimeo") {
    const id = vimeoId(src);
    return id ? `https://player.vimeo.com/video/${id}?autoplay=${ap}&title=0&byline=0&portrait=0&dnt=1` : null;
  }
  if (type === "gdrive") {
    const id = driveId(src);
    return id ? `https://drive.google.com/file/d/${id}/preview` : null;
  }
  return null;
}

export function hasVideo(type: VideoType, src: string): boolean {
  if (!src) return false;
  return type === "local" ? true : embedUrl(type, src) !== null;
}

/** Thumbnail: explicit image → YouTube auto thumbnail → null (placeholder). */
export function thumbnailFor(p: Pick<Project, "thumbnail" | "videoType" | "videoSrc">): string | null {
  if (p.thumbnail) return p.thumbnail;
  if (p.videoType === "youtube") {
    const id = youtubeId(p.videoSrc);
    if (id) return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  }
  return null;
}

/** Hover preview clip (local MP4 only). */
export function previewFor(p: Project): string | null {
  if (p.previewSrc) return p.previewSrc;
  if (p.videoType === "local" && p.videoSrc) return p.videoSrc;
  return null;
}
