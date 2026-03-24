"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll progress bar fixed to the top of the page.
 * Width = scrollY / (scrollHeight - innerHeight), no deps.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        rafRef.current = requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
      style={{
        background: "linear-gradient(90deg, oklch(0.72 0.19 295), oklch(0.78 0.17 162))",
        transform: `scaleX(${progress})`,
        transition: "transform 0.05s linear",
      }}
      aria-hidden="true"
    />
  );
}
