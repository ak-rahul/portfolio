"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Inertial smooth-scroll, skipped entirely under reduced-motion.
 *  Exposes the instance on window.__lenis so scrollToId() (lib/utils.ts)
 *  can route in-page nav clicks through the same easing as manual scroll.
 *  Top-level import, not dynamic: a dynamic import() here was tried and
 *  measured at ~640ms before window.__lenis became available — long
 *  enough that a visitor could start scrolling on native browser scroll
 *  and feel it switch to inertial mid-interaction. That's a worse tradeoff
 *  than the modest bundle-size saving it bought; consistent smooth scroll
 *  from the first frame wins here. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
    window.__lenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
