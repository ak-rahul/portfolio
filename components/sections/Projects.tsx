"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Github, Package } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

// Radix Dialog + its content only matter once a visitor actually clicks
// "Details" — lazy-loaded so that chunk isn't part of the bundle every
// visitor pays for on first load, most of whom never open it.
const ProjectDetailsDialog = dynamic(() => import("./ProjectDetailsDialog"));

function ProjectIndex({ index, className }: { index: number; className?: string }) {
  return (
    <span className={cn("mono-label text-muted-foreground", className)}>
      {String(index).padStart(2, "0")}
    </span>
  );
}

function TechTags({ tech, className }: { tech: string[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-x-3 gap-y-2", className)}>
      {tech.map((t) => (
        <span key={t} className="tag-underline">
          {t}
        </span>
      ))}
    </div>
  );
}

const actionLinkClass =
  "flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-150";

function ProjectActions({
  project,
  onClick,
  detailsClassName,
}: {
  project: Project;
  onClick: () => void;
  detailsClassName?: string;
}) {
  return (
    <>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={actionLinkClass}
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
          className={actionLinkClass}
        >
          <Package className="h-3.5 w-3.5" />
          PyPI
        </a>
      )}
      <button
        onClick={onClick}
        className={cn(
          "group text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-150",
          detailsClassName
        )}
        aria-label={`View details for ${project.title}`}
      >
        Details{" "}
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
          &rarr;
        </span>
      </button>
    </>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  return (
    <Card className="card-lift h-full flex flex-col">
      {/* Header — oversized faint numeral gives the spotlight cards editorial
          weight; the small mono ProjectIndex stays reserved for the compact
          "More Work" rows below, where this scale wouldn't fit. */}
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display font-semibold text-foreground text-xl sm:text-2xl leading-tight">
            {project.title}
          </h3>
          <span
            className="font-display font-semibold text-primary/10 text-6xl sm:text-7xl leading-none shrink-0"
            aria-hidden="true"
          >
            {String(index).padStart(2, "0")}
          </span>
        </div>
      </CardHeader>

      {/* Description + tags */}
      <CardContent className="flex-1 pt-3">
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {project.description}
        </p>
        <TechTags tech={project.tech} />
      </CardContent>

      {/* Footer actions */}
      <CardFooter className="gap-4 pt-4 border-t border-border">
        <ProjectActions project={project} onClick={onClick} detailsClassName="ml-auto" />
      </CardFooter>
    </Card>
  );
}

function ProjectRow({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  return (
    <div className="row-hover p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-3">
          <ProjectIndex index={index} className="pt-0.5" />
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-foreground text-base leading-tight">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {project.description}
            </p>
            <TechTags tech={project.tech} className="mt-3" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pl-8 sm:pl-0 shrink-0">
        <ProjectActions project={project} onClick={onClick} />
      </div>
    </div>
  );
}

const spotlight = projects.slice(0, 2);
const rest = projects.slice(2);

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  // The dialog (and its Radix chunk) only mounts after the first "Details"
  // click, then stays mounted for the rest of the session — see the
  // dynamic() import above.
  const [dialogMounted, setDialogMounted] = useState(false);
  const openDetails = (project: Project) => {
    setDialogMounted(true);
    setSelected(project);
  };

  return (
    <section id="projects" className="px-5 sm:px-8 section-rule">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-10">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
          <span className="rule-draw" aria-hidden="true" />
        </Reveal>

        {/* Spotlight: the two most substantial projects */}
        <Reveal className="grid sm:grid-cols-2 gap-5">
          {spotlight.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i + 1}
              onClick={() => openDetails(project)}
            />
          ))}
        </Reveal>

        {/* Rest: compact list, same hairline-divider vocabulary as About's highlights */}
        <p className="mono-label text-muted-foreground mt-14 mb-4">
          More Work
        </p>
        <Reveal className="bordered-grid grid-cols-1">
          {rest.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i + spotlight.length + 1}
              onClick={() => openDetails(project)}
            />
          ))}
        </Reveal>
      </div>

      {dialogMounted && (
        <ProjectDetailsDialog project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
