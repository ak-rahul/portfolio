"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Code, Rocket } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Multi-Agent Systems",
      description: "Expert in building collaborative AI agents using LangGraph and LangChain",
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "PyPI Publisher",
      description: "Published optimization-benchmarks with 245+ daily downloads",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Certified Agentic AI Developer",
      description: "Certified by Ready Tensor",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-transparent" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a <span className="text-primary font-semibold">Full-Stack AI Developer</span> specializing
                in building intelligent agentic systems. My expertise lies in creating multi-agent architectures
                that solve complex problems through collaborative AI.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Currently focused on <span className="text-primary font-semibold">LangChain, LangGraph</span>,
                and <span className="text-primary font-semibold">RAG systems</span>. I build production-ready
                applications with Docker, CI/CD pipelines, and modern DevOps practices.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                My projects have reached <span className="text-primary font-semibold">thousands of developers</span> worldwide,
                including DrRepo (repository analysis), optimization-benchmarks (PyPI package), and various
                multi-agent study assistants.
              </p>

              <div className="flex flex-wrap gap-8 pt-4 justify-center md:justify-start">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">6+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">245+</div>
                  <div className="text-sm text-muted-foreground">Daily Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Open Source</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-lg border bg-card hover:bg-accent transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
