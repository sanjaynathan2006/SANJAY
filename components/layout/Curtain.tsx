"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "./Providers";
import Timecode from "@/components/ui/Timecode";
import { site } from "@/data/site";

const ease = [0.76, 0, 0.24, 1] as const;

/** Page transition: a cut-to-black panel that wipes in, then lifts off the new page. */
export default function Curtain() {
  const { curtain, endCurtain } = useApp();
  return (
    <AnimatePresence onExitComplete={endCurtain}>
      {curtain === "cover" && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[95] flex items-end justify-between bg-ink-2 p-5 md:p-10"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)", transition: { duration: 0.6, ease } }}
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.75, ease, delay: 0.1 } }}
          aria-hidden="true"
        >
          <span className="absolute inset-x-0 top-0 h-0.5 bg-accent" />
          <span className="font-display text-2xl font-extrabold">{site.name}</span>
          <Timecode className="text-sm text-mute" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
