"use client";

import { Github, Linkedin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-8 px-4 bg-black/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground flex items-center gap-1 justify-center md:justify-start">
              Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using Next.js, TypeScript & Tailwind CSS
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              © {currentYear} AK Rahul. All rights reserved.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/ak-rahul"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/ak-rahul"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>

          </div>
        </div>

        <div className="text-center mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top ↑
          </Button>
        </div>
      </div>
    </footer>
  );
}
