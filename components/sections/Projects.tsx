"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Package, ExternalLink, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GlowCard } from "@/components/ui/GlowCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { projects } from "@/data/projects";
import { Project } from "@/types";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <TiltCard intensity={6}>
      <GlowCard className="h-full flex flex-col p-5 cursor-pointer group" glowColor="139,92,246">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3
            className="font-display font-semibold text-white text-base group-hover:text-[oklch(0.85_0.14_290)] transition-colors duration-200 leading-tight"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onClick()}
          >
            {project.title}
          </h3>
          <button
            onClick={onClick}
            className="flex-shrink-0 ml-2 p-1.5 rounded-lg text-white/20 hover:text-white/70 hover:bg-white/[0.06] transition-all duration-200"
            aria-label={`View details for ${project.title}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-white/40 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-[10px] px-2 py-0.5 border-white/[0.07] bg-white/[0.03] text-white/50"
            >
              {tech}
            </Badge>
          ))}
          {project.tech.length > 4 && (
            <Badge
              variant="outline"
              className="text-[10px] px-2 py-0.5 border-white/[0.07] bg-white/[0.03] text-white/40"
            >
              +{project.tech.length - 4}
            </Badge>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white border border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-200"
          >
            <Github className="h-3.5 w-3.5" />
            Code
          </a>
          {project.pypi && (
            <a
              href={project.pypi}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-[oklch(0.78_0.17_162)] border border-white/[0.07] hover:border-[oklch(0.78_0.17_162/0.3)] hover:bg-[oklch(0.78_0.17_162/0.06)] transition-all duration-200"
            >
              <Package className="h-3.5 w-3.5" />
              PyPI
            </a>
          )}
          <button
            onClick={onClick}
            className="ml-auto text-xs text-white/30 hover:text-white/70 transition-colors duration-200"
          >
            Details →
          </button>
        </div>
      </GlowCard>
    </TiltCard>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-4 relative" ref={ref}>
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.72 0.19 295 / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge variant="outline" className="mb-4 border-white/[0.08] text-white/40 text-xs tracking-widest uppercase">
            Portfolio
          </Badge>
          <h2 className="text-4xl md:text-6xl font-display font-bold glow-text mb-4">
            Featured Projects
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
            Open-source projects in AI agents, optimization, developer tooling, and machine learning.
          </p>
        </motion.div>

        {/* Project grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <ProjectCard
                project={project}
                onClick={() => setSelected(project)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Details dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl w-[90vw] max-h-[85vh] overflow-y-auto rounded-2xl bg-[oklch(0.10_0.04_270/0.95)] backdrop-blur-xl border border-white/[0.08]">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-white">
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="text-white/50">
                  {selected.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 pt-2">
                <p className="text-white/60 leading-relaxed text-sm">
                  {selected.longDescription}
                </p>

                <div>
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.tech.map((tech: string) => (
                      <Badge
                        key={tech}
                        className="border border-[oklch(0.72_0.19_295/0.3)] bg-[oklch(0.72_0.19_295/0.1)] text-[oklch(0.85_0.14_290)] text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    asChild
                    className="bg-[oklch(0.72_0.19_295)] hover:bg-[oklch(0.68_0.22_295)] text-white rounded-full"
                  >
                    <a href={selected.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View on GitHub
                    </a>
                  </Button>
                  {selected.pypi && (
                    <Button variant="outline" asChild className="rounded-full border-white/[0.12] text-white/70 hover:text-white">
                      <a href={selected.pypi} target="_blank" rel="noopener noreferrer">
                        <Package className="h-4 w-4 mr-2" />
                        PyPI Package
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
