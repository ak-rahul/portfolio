"use client";

import { Github, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/utils";

const certifications = [
  "Certified Agentic AI Developer",
  "Google Data Analytics Professional",
  "PyPI Publisher",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="px-5 sm:px-8 pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <div className="max-w-6xl mx-auto hero-fade-in">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-6">
          <span className="bullet-square" aria-hidden="true" />
          <span className="mono-label text-primary">
            Available for new projects
          </span>
        </div>

        {/* Asymmetric grid: name/role left, description right */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start">
          <div className="md:col-span-7">
            <h1
              className="font-display font-semibold tracking-tight leading-[1.05]"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)" }}
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
                className="rounded-[var(--radius)] font-mono text-xs uppercase tracking-[0.08em] h-11 px-6"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
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
            <ul className="mt-8 space-y-1.5">
              {certifications.map((cert) => (
                <li
                  key={cert}
                  className="font-mono text-[11px] tracking-wide text-muted-foreground"
                >
                  — {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
