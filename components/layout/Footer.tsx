"use client";

import { Github, Linkedin, ArrowUp } from "lucide-react";
import { scrollToTop } from "@/lib/utils";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: brand & copy */}
          <div className="text-center md:text-left">
            <p className="font-mono text-xs tracking-[0.12em] uppercase text-foreground mb-1">
              ak-rahul
            </p>
            <p className="font-mono text-[11px] text-muted-foreground">
              © {year} AK Rahul. Built with Next.js, TypeScript &amp; Tailwind CSS.
            </p>
          </div>

          {/* Right: socials + back to top */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/ak-rahul"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-primary transition-colors duration-150"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ak-rahul"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary transition-colors duration-150"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            <div className="w-px h-4 bg-border" />

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground hover:text-primary hover:-translate-y-0.5 transition-all duration-150"
            >
              <ArrowUp className="h-3 w-3" />
              Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
