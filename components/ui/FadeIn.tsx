"use client";
import { motion } from "framer-motion";

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 24,
  as = "div",
}: {
  as?: "div" | "li";
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
