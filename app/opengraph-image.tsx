import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name}: ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0a0a0a", color: "#ede9e3", padding: 64, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 4, color: "#8b8b86" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 16, height: 16, borderRadius: 999, background: "#ff2d2d" }} />
            REC 00:00:00:00
          </div>
          <div>4K · 24 FPS</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#ff2d2d", letterSpacing: 6, textTransform: "uppercase" }}>{site.role}</div>
          <div style={{ fontSize: 148, fontWeight: 900, letterSpacing: -6, lineHeight: 1 }}>{site.name}</div>
          <div style={{ fontSize: 36, marginTop: 16, color: "#ede9e3" }}>{site.tagline}</div>
        </div>
        <div style={{ display: "flex", height: 6, width: "100%", background: "#1a1a1a" }}>
          <div style={{ width: "62%", background: "#ff2d2d" }} />
        </div>
      </div>
    ),
    size,
  );
}
