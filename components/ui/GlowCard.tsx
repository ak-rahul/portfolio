"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

/**
 * 21st-dev inspired card with cursor-tracking radial glow.
 * The glow follows the mouse inside the card via CSS custom properties.
 */
export function GlowCard({ children, className, glowColor = "139,92,246" }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--glow-x", `${x}px`);
    card.style.setProperty("--glow-y", `${y}px`);
    card.style.setProperty("--glow-opacity", "1");
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--glow-opacity", "0");
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm",
        "transition-all duration-300",
        "hover:border-white/[0.12] hover:bg-white/[0.05]",
        className
      )}
      style={{
        "--glow-x": "50%",
        "--glow-y": "50%",
        "--glow-opacity": "0",
        "--glow-color": glowColor,
      } as React.CSSProperties}
    >
      {/* Cursor glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at var(--glow-x) var(--glow-y), rgba(var(--glow-color), 0.12), transparent 70%)`,
          opacity: "var(--glow-opacity)" as unknown as number,
        }}
      />
      {/* Gradient border on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at var(--glow-x) var(--glow-y), rgba(var(--glow-color), 0.15), transparent 70%)`,
          maskImage: "linear-gradient(black, black) padding-box, linear-gradient(black, black)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
