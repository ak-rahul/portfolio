"use client";

import { Github, Linkedin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.06] mt-8">
      {/* Subtle glow line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.19_295/0.5)] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand & copy */}
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-sm glow-text-violet mb-1">ak-rahul</p>
            <p className="text-xs text-white/30">
              © {year} AK Rahul. Built with Next.js, TypeScript & Tailwind CSS.
            </p>
          </div>

          {/* Right: socials + back to top */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ak-rahul"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ak-rahul"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            <div className="w-px h-5 bg-white/[0.08] mx-1" />

            <motion.button
              whileHover={{ y: -2 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/40 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-200 border border-white/[0.06] hover:border-white/[0.12]"
            >
              <ArrowUp className="h-3 w-3" />
              Top
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
