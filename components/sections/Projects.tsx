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

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <Card className="card-lift h-full flex flex-col">
      {/* Header */}
      <CardHeader className="pb-0">
        <h3 className="font-display font-semibold text-foreground text-lg leading-tight">
          {project.title}
        </h3>
      </CardHeader>

      {/* Description + tags */}
      <CardContent className="flex-1 pt-3">
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-2">
          {project.tech.map((tech) => (
            <span key={tech} className="tag-underline">
              {tech}
            </span>
          ))}
        </div>
      </CardContent>

      {/* Footer actions */}
      <CardFooter className="gap-4 pt-4 border-t border-border">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-150"
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
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-150"
          >
            <Package className="h-3.5 w-3.5" />
            PyPI
          </a>
        )}
        <button
          onClick={onClick}
          className="ml-auto text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-150"
          aria-label={`View details for ${project.title}`}
        >
          Details &rarr;
        </button>
      </CardFooter>
    </Card>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="px-5 sm:px-8 py-20 section-rule">
      <div className="max-w-6xl mx-auto">
        <p className="mono-label text-muted-foreground mb-2">Portfolio</p>
        <h2 className="font-display font-semibold text-2xl sm:text-3xl mb-10">
          Featured Projects
        </h2>

        {/* Project grid */}
        <Reveal className="grid sm:grid-cols-2 gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
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
