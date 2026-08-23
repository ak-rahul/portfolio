"use client";

import { useState } from "react";
import { Github, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

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
      {/* Header */}
      <CardHeader className="pb-0">
        <ProjectIndex index={index} className="mb-2 block" />
        <h3 className="font-display font-semibold text-foreground text-lg leading-tight">
          {project.title}
        </h3>
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

  return (
    <section id="projects" className="px-5 sm:px-8 section-rule">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-10">
          <h2 className="font-display font-semibold text-2xl sm:text-3xl">
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
              onClick={() => setSelected(project)}
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
              onClick={() => setSelected(project)}
            />
          ))}
        </Reveal>
      </div>

      {/* Details dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl w-[90vw] max-h-[85vh] overflow-y-auto rounded-[var(--radius)]">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-foreground">
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selected.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 pt-2">
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {selected.longDescription}
                </p>

                <div>
                  <h4 className="mono-label text-muted-foreground mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.tech.map((tech: string) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="rounded-[var(--radius)] text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild className="rounded-[var(--radius)]">
                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      View on GitHub
                    </a>
                  </Button>
                  {selected.pypi && (
                    <Button
                      variant="outline"
                      asChild
                      className="rounded-[var(--radius)]"
                    >
                      <a
                        href={selected.pypi}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
