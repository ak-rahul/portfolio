"use client";

import { useEffect, useRef } from "react";
import { Github, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/utils";

const certifications = [
  "Certified Agentic AI Developer",
  "Google Data Analytics Professional",
  "PyPI Publisher",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const washRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    const wash = washRef.current;
    if (!section || !wash) return;

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      wash.style.setProperty("--wash-x", `${x * -18}px`);
      wash.style.setProperty("--wash-y", `${y * -18}px`);
    };
    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="px-5 sm:px-8 pt-32 pb-24 md:pt-44 md:pb-32"
    >
      <div ref={washRef} className="ambient-wash" aria-hidden="true" />
      <div className="max-w-6xl mx-auto hero-fade-in">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-6">
          <span className="bullet-square pulse-dot" aria-hidden="true" />
          <span className="mono-label text-primary">
            Available for new projects
          </span>
        </div>

        {/* Asymmetric grid: name/role left, description right */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start">
          <div className="md:col-span-7">
            <h1
              className="font-display font-semibold tracking-tight leading-[1.05]"
              style={{ fontSize: "clamp(2.75rem, 6vw, 4.75rem)" }}
            >
              AK Rahul
            </h1>
            <h2 className="font-display italic font-medium text-2xl sm:text-3xl mt-3 text-muted-foreground">
              AI Developer &amp; Agentic Systems Engineer
            </h2>
          </div>

          <div className="md:col-span-5 border-l border-border pl-6 md:pt-3">
            <p className="text-lg leading-relaxed">
              I build intelligent multi-agent systems that solve complex
              problems. Specializing in{" "}
              <span className="text-primary font-medium">LangChain</span>,{" "}
              <span className="text-primary font-medium">RAG</span>, and
              scalable agentic architecture.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button
                onClick={() => scrollToId("projects")}
                className="group rounded-[var(--radius)] font-mono text-xs uppercase tracking-[0.08em] h-11 px-6"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToId("contact")}
                className="rounded-[var(--radius)] font-mono text-xs uppercase tracking-[0.08em] h-11 px-6"
              >
                Get In Touch
              </Button>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-5 mt-8">
              <a
                href="https://github.com/ak-rahul"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-primary transition-colors duration-150"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ak-rahul"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-primary transition-colors duration-150"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            {/* Certifications */}
            <div className="chip-row mt-8 font-mono text-[11px] tracking-wide text-muted-foreground">
              {certifications.map((cert) => (
                <span key={cert} className="chip-dot">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
