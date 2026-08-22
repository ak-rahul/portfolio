"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";
import { cn, scrollToId } from "@/lib/utils";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    // Honor a direct link to a section (e.g. sharing `/#projects`) instead
    // of silently discarding the hash — scrollToId applies the same nav-
    // height offset as an in-app click. Deferred a frame so SmoothScroll's
    // Lenis instance (mounted as a sibling effect) has a chance to be ready.
    const hash = window.location.hash.slice(1);
    if (hash && navItems.some((item) => item.id === hash)) {
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(hash)));
    }

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActive(topmost.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = linkRefs.current[active];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    }
  }, [active]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setIsOpen(false);
      scrollToId(id);
    },
    []
  );

  return (
    <>
      <ScrollProgress />
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-background transition-colors duration-200",
          scrolled ? "border-b border-border" : "border-b border-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Wordmark */}
            <a
              href="#home"
              onClick={(e) => handleClick(e, "home")}
              className="font-mono text-sm font-medium tracking-[0.12em] uppercase text-foreground hover:text-primary transition-colors duration-150"
            >
              ak-rahul
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8 relative">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  ref={(el) => {
                    linkRefs.current[item.id] = el;
                  }}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={cn(
                    "font-mono text-xs tracking-[0.1em] uppercase pb-0.5 transition-colors duration-150",
                    active === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                </a>
              ))}
              <span
                className="nav-indicator"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: indicator.opacity,
                }}
                aria-hidden="true"
              />
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-foreground p-2 -mr-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-5 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={cn(
                    "font-mono text-xs tracking-[0.1em] uppercase transition-colors duration-150",
                    active === item.id ? "text-primary" : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
