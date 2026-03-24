"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Option D — Dot Grid + Mouse Spotlight
 * A dark background with an SVG dot-grid pattern.
 * A radial gradient "spotlight" follows the mouse, revealing the grid.
 * Used famously by Aceternity UI, Shadcn's own marketing site, and
 * many premium developer tool landing pages.
 *
 * Performance: SVG background is 100% static CSS.
 * The spotlight is a single CSS custom property update on mousemove,
 * throttled to RAF for max 60fps. Zero canvas needed.
 */
export default function GridBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const pending = useRef(false);
  const coords = useRef({ x: "50%", y: "50%" });

  const onMove = useCallback((e: MouseEvent) => {
    coords.current = { x: `${e.clientX}px`, y: `${e.clientY}px` };
    if (!pending.current) {
      pending.current = true;
      rafRef.current = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (el) {
          el.style.setProperty("--mouse-x", coords.current.x);
          el.style.setProperty("--mouse-y", coords.current.y);
        }
        pending.current = false;
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onMove]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
          background: "oklch(0.07 0.03 275)",
        } as React.CSSProperties
      }
    >
      {/* Dot grid layer — pure CSS background-image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, oklch(0.32 0.05 270 / 0.55) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Spotlight layer — follows mouse via CSS var */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), oklch(0.72 0.19 295 / 0.10) 0%, oklch(0.78 0.17 162 / 0.04) 40%, transparent 70%)",
        }}
      />

      {/* Static ambient glow — top centre */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.72 0.19 295 / 0.07) 0%, transparent 65%)",
        }}
      />

      {/* Bottom fade to solid BG — hides grid edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background:
            "linear-gradient(to top, oklch(0.07 0.03 275), transparent)",
        }}
      />
    </div>
  );
}
