"use client";

import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using Next.js, TypeScript & shadcn/ui
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              © {currentYear} Rahul AK. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
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
                href="https://linkedin.com/in/ak-rahul"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="mailto:your.email..example.com"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Back to Top */}
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
