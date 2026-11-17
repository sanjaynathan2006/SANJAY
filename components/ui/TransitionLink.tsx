"use client";
import Link from "next/link";
import { useApp } from "@/components/layout/Providers";

/** A normal crawlable <a>, but clicks play the curtain transition / smooth-scroll. */
export default function TransitionLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: React.ComponentProps<typeof Link> & { href: string }) {
  const { navigate } = useApp();
  return (
    <Link
      href={href}
      className={className}
      scroll={false}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
