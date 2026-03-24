"use client";

import { motion, useMotionValue, useSpring, useInView, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Award, Code2, Rocket, GitBranch } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/badge";

const highlights = [
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "Multi-Agent Systems",
    description: "Expert in building collaborative AI agents using LangGraph and LangChain",
    color: "139,92,246",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: "PyPI Publisher",
    description: "Published optimization-benchmarks with 245+ daily downloads",
    color: "52,211,153",
  },
  {
    icon: <Award className="h-5 w-5" />,
    title: "Certified Agentic AI Developer",
    description: "Certified by Ready Tensor",
    color: "139,92,246",
  },
  {
    icon: <Award className="h-5 w-5" />,
    title: "Google Data Analytics Professional",
    description: "Certified by Coursera",
    color: "52,211,153",
  },
];

function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const display = useMotionValue(0);
  const spring = useSpring(display, { stiffness: 60, damping: 20, mass: 1 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) display.set(target);
  }, [isInView, target, display]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-display font-bold glow-text-violet flex items-end justify-center gap-0.5">
        <motion.span>{rounded}</motion.span>
        <span>+</span>
      </div>
      <div className="text-xs text-white/40 mt-1 font-medium tracking-wide uppercase">{label}</div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="about" className="py-24 px-4 relative" ref={ref}>
      {/* Subtle section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 80% 50%, oklch(0.72 0.19 295 / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ─── Header ─── */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-white/[0.08] text-white/40 text-xs tracking-widest uppercase">
              Who I Am
            </Badge>
            <h2 className="text-4xl md:text-6xl font-display font-bold glow-text mb-4">
              About Me
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Bio */}
            <div className="space-y-5">
              <p className="text-base md:text-lg text-white/60 leading-relaxed">
                I&apos;m a{" "}
                <span className="text-white font-semibold">Full-Stack AI Developer</span>{" "}
                specializing in intelligent agentic systems. My expertise lies in creating
                multi-agent architectures that solve complex problems through collaborative AI.
              </p>
              <p className="text-base md:text-lg text-white/60 leading-relaxed">
                Currently focused on{" "}
                <span className="text-[oklch(0.85_0.14_290)] font-medium">LangChain</span>,{" "}
                <span className="text-[oklch(0.85_0.14_290)] font-medium">LangGraph</span>, and{" "}
                <span className="text-[oklch(0.78_0.17_162)] font-medium">RAG systems</span>.
                I build production-ready applications with Docker, CI/CD pipelines, and modern DevOps practices.
              </p>
              <p className="text-base md:text-lg text-white/60 leading-relaxed">
                My projects have reached{" "}
                <span className="text-white font-semibold">thousands of developers</span>{" "}
                worldwide — from DrRepo (AI repository analysis) to optimization-benchmarks (PyPI package).
              </p>

              {/* Stats */}
              <div className="flex gap-12 pt-4 border-t border-white/[0.06]">
                <AnimatedCounter target={6} label="Projects" />
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold glow-text-violet">100%</div>
                  <div className="text-xs text-white/40 mt-1 font-medium tracking-wide uppercase">Open Source</div>
                </div>
              </div>
            </div>

            {/* Right: Highlight cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-3"
            >
              {highlights.map((item) => (
                <motion.div key={item.title} variants={cardVariants}>
                  <GlowCard glowColor={item.color} className="p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 p-2.5 rounded-lg"
                        style={{
                          background: `rgba(${item.color}, 0.12)`,
                          color: `rgb(${item.color})`,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-white text-sm mb-1">
                          {item.title}
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
