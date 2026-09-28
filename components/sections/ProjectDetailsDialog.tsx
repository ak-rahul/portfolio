"use client";

import { useState } from "react";
import { Github, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Project } from "@/types";

export default function ProjectDetailsDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  // Keep the last project rendered through the dialog's ~200ms close
  // animation — nulling `project` immediately on close would blank the
  // content out from under the still-animating dialog. Adjusting state
  // during render (React's sanctioned pattern for derived state) syncs it
  // before paint on open, without an effect's extra commit.
  const [displayed, setDisplayed] = useState<Project | null>(null);
  if (project && project !== displayed) {
    setDisplayed(project);
  }

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl w-[90vw] max-h-[85vh] overflow-y-auto rounded-[var(--radius)]">
        {displayed && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-foreground">
                {displayed.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {displayed.description}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 pt-2">
              <p className="text-muted-foreground leading-relaxed text-sm">
                {displayed.longDescription}
              </p>

              <div>
                <h4 className="mono-label text-muted-foreground mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {displayed.tech.map((tech: string) => (
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
                  <a href={displayed.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
                {displayed.pypi && (
                  <Button variant="outline" asChild className="rounded-[var(--radius)]">
                    <a href={displayed.pypi} target="_blank" rel="noopener noreferrer">
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
  );
}
