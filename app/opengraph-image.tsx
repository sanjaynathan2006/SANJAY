import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { tokenize } from "@/lib/emphasis";

export const alt = `${site.name}: ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview image, generated at build time from data/site.ts
export default async function OG() {
  const [anton, serif] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/og/anton.woff")),
    readFile(join(process.cwd(), "app/fonts/og/instrument-serif-italic.woff")),
  ]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#ff3d1f", color: "#0b0b0b", padding: "56px 64px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, fontFamily: "Anton" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 16, height: 16, borderRadius: 999, background: "#0b0b0b" }} />
            REC 00:00:00:00
          </div>
          <div>{site.role.toUpperCase()}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 64, lineHeight: 1, gap: 14, alignItems: "baseline" }}>
            {tokenize(site.tagline).map((t, i) => (
              <span key={i} style={t.em ? { fontFamily: "Instrument Serif", fontStyle: "italic" } : { fontFamily: "Anton", textTransform: "uppercase" }}>
                {t.word}
              </span>
            ))}
          </div>
          <div style={{ fontFamily: "Anton", fontSize: 196, lineHeight: 0.9, marginTop: 16 }}>{site.name}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Anton", data: anton, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serif, style: "italic", weight: 400 },
      ],
    },
  );
}
