export const FPS = 24;
const pad = (n: number) => String(Math.floor(n)).padStart(2, "0");
/** frames → "HH:MM:SS:FF" */
export function formatTC(frames: number, fps = FPS): string {
  const f = Math.max(0, Math.floor(frames));
  const ff = f % fps;
  const totalS = Math.floor(f / fps);
  return `${pad(totalS / 3600)}:${pad((totalS / 60) % 60)}:${pad(totalS % 60)}:${pad(ff)}`;
}
/** "mm:ss" → "00:mm:ss:00" */
export function durationToTC(d: string): string {
  const [m = "0", s = "0"] = d.split(":");
  return `00:${m.padStart(2, "0")}:${s.padStart(2, "0")}:00`;
}
