import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/data/site";
import Providers from "@/components/layout/Providers";
import VideoModalProvider from "@/components/video/VideoModal";
import Preloader from "@/components/layout/Preloader";
import Cursor from "@/components/layout/Cursor";
import Curtain from "@/components/layout/Curtain";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Fonts are self-hosted from app/fonts (variable woff2, SIL Open Font License),
// so builds never depend on fetching Google Fonts.
const syne = localFont({ src: "./fonts/syne.woff2", weight: "400 800", variable: "--font-syne", display: "swap" });
const inter = localFont({ src: "./fonts/inter.woff2", weight: "100 900", variable: "--font-inter", display: "swap" });
const mono = localFont({ src: "./fonts/jetbrains-mono.woff2", weight: "100 800", variable: "--font-mono-jb", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.role}`, template: `%s · ${site.name}` },
  description: site.description,
  keywords: ["video editor", "motion designer", "color grading", "reels editor", "YouTube editor", "After Effects", "Premiere Pro", "DaVinci Resolve", site.name],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name}: ${site.role}`,
    description: site.tagline,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${site.name}: ${site.role}`, description: site.tagline },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <noscript>
          <style>{`#preloader{display:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="label-mono sr-only z-[120] bg-accent px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <Providers>
          <VideoModalProvider>
            <Preloader />
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <Curtain />
            <Cursor />
          </VideoModalProvider>
        </Providers>
        <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden" aria-hidden="true">
          <div className="grain" />
        </div>
      </body>
    </html>
  );
}
