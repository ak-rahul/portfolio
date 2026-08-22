import { projects } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";

const highlights = [
  {
    title: "Multi-Agent Systems",
    description:
      "Expert in building collaborative AI agents using LangGraph and LangChain",
  },
  {
    title: "PyPI Publisher",
    description:
      "Published optimization-benchmarks with 245+ daily downloads",
  },
  {
    title: "Certified Agentic AI Developer",
    description: "Certified by Ready Tensor",
  },
  {
    title: "Google Data Analytics Professional",
    description: "Certified by Coursera",
  },
];

export default function About() {
  return (
    <section id="about" className="px-5 sm:px-8 py-20 section-rule">
      <div className="max-w-6xl mx-auto">
        <p className="mono-label text-muted-foreground mb-8">About</p>

        <Reveal>
        <div className="grid md:grid-cols-12 gap-8 md:gap-10">
          {/* Bio */}
          <div className="md:col-span-8 space-y-5">
            <p className="text-lg leading-relaxed">
              I&apos;m a <span className="font-medium">Full-Stack AI Developer</span>{" "}
              specializing in intelligent agentic systems. My expertise lies in
              creating multi-agent architectures that solve complex problems
              through collaborative AI.
            </p>
            <p className="text-lg leading-relaxed">
              Currently focused on{" "}
              <span className="text-primary font-medium">LangChain</span>,{" "}
              <span className="text-primary font-medium">LangGraph</span>, and{" "}
              <span className="text-primary font-medium">RAG systems</span>. I
              build production-ready applications with Docker, CI/CD
              pipelines, and modern DevOps practices.
            </p>
            <p className="text-lg leading-relaxed">
              My projects have reached{" "}
              <span className="font-medium">thousands of developers</span>{" "}
              worldwide — from DrRepo (AI repository analysis) to
              optimization-benchmarks (PyPI package).
            </p>
          </div>

          {/* Stats */}
          <div className="md:col-span-4 flex md:flex-col gap-8 md:gap-4 md:border-l md:border-border md:pl-6">
            <div>
              <div className="font-display font-semibold text-4xl">
                {projects.length}
              </div>
              <div className="mono-label text-muted-foreground mt-1">
                Projects
              </div>
            </div>
            <div>
              <div className="font-display font-semibold text-4xl">100%</div>
              <div className="mono-label text-muted-foreground mt-1">
                Open Source
              </div>
            </div>
          </div>
        </div>

        {/* Highlights — bordered grid, 2x2 on larger screens */}
        <div className="bordered-grid grid-cols-1 sm:grid-cols-2 mt-14">
          {highlights.map((item) => (
            <div key={item.title} className="p-6">
              <div className="flex items-start gap-3">
                <span className="bullet-square mt-1.5" aria-hidden="true" />
                <div>
                  <h3 className="font-display font-semibold text-base mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
