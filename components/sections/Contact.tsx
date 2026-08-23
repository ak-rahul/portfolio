import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/card";

const contactMethods = [
  {
    icon: <Github className="h-5 w-5" />,
    title: "GitHub",
    handle: "@ak-rahul",
    description: "Follow my open-source work",
    href: "https://github.com/ak-rahul",
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    title: "LinkedIn",
    handle: "ak-rahul",
    description: "Let's connect professionally",
    href: "https://www.linkedin.com/in/ak-rahul",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="px-5 sm:px-8 section-rule">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-4">
          <h2 className="font-display font-semibold text-2xl sm:text-3xl">
            Get In Touch
          </h2>
          <span className="rule-draw" aria-hidden="true" />
        </Reveal>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-12">
          I&apos;m always open to discussing new projects, collaborations, or
          just interesting AI conversations. Reach out on any platform below.
        </p>

        <Reveal className="grid sm:grid-cols-2 gap-5 max-w-2xl">
          {contactMethods.map((method) => (
            <a
              key={method.title}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="card-lift p-6 h-full">
                <div className="flex items-start justify-between mb-4 text-foreground group-hover:text-primary transition-colors duration-150">
                  {method.icon}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
                </div>

                <h3 className="font-display font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors duration-150">
                  {method.title}
                </h3>
                <p className="font-mono text-sm text-muted-foreground mb-2">
                  {method.handle}
                </p>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </Card>
            </a>
          ))}
        </Reveal>

        <p className="mono-label text-muted-foreground mt-14">
          Open to freelance, collaborations, and full-time opportunities.
        </p>
      </div>
    </section>
  );
}
