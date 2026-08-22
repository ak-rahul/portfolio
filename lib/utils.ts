import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface LenisLike {
  scrollTo: (target: Element | number, opts?: { offset?: number }) => void;
}

function getLenis(): LenisLike | undefined {
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

/** Scroll to an element by id, routing through the page's Lenis instance
 *  (set by SmoothScroll) when available so in-page nav matches the same
 *  inertial easing as manual scrolling; falls back to native smooth scroll. */
export function scrollToId(id: string, offset = -64) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

/** Scroll to the top of the page, routing through Lenis when available. */
export function scrollToTop() {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
