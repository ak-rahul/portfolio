"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Code2, Brain, Globe, Container, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { skillCategories } from "@/data/skills";

const categoryIcons: Record<string, React.ReactNode> = {
  Languages:         <Code2 className="h-4 w-4" />,
  "AI & LLMs":       <Brain className="h-4 w-4" />,
  "Web Technologies":<Globe className="h-4 w-4" />,
  "DevOps & Cloud":  <Container className="h-4 w-4" />,
  Databases:         <Database className="h-4 w-4" />,
};

const categoryGlow: Record<string, string> = {
  Languages:          "139,92,246",
  "AI & LLMs":        "167,139,250",
  "Web Technologies": "52,211,153",
  "DevOps & Cloud":   "96,165,250",
  Databases:          "251,146,60",
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 px-4 relative" ref={ref}>
      {/* Section bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 60%, oklch(0.78 0.17 162 / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-white/[0.08] text-white/40 text-xs tracking-widest uppercase">
              Toolkit
            </Badge>
            <h2 className="text-4xl md:text-6xl font-display font-bold glow-text mb-4">
              Technical Skills
            </h2>
            <p className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
              A comprehensive toolkit for building modern AI applications — from data pipelines to deployed agents.
            </p>
          </div>

          {/* Skill cards grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {skillCategories.map((cat) => {
              const glow = categoryGlow[cat.name] ?? "139,92,246";
              return (
                <motion.div key={cat.name} variants={cardVariants}>
                  <GlowCard glowColor={glow} className="h-full p-5">
                    {/* Category header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="p-2 rounded-lg text-sm"
                        style={{
                          background: `rgba(${glow}, 0.12)`,
                          color: `rgb(${glow})`,
                        }}
                      >
                        {categoryIcons[cat.name] ?? <Code2 className="h-4 w-4" />}
                      </div>
                      <h3 className="font-display font-semibold text-white text-sm">
                        {cat.name}
                      </h3>
                    </div>

                    {/* Skills badges */}
                    <motion.div
                      className="flex flex-wrap gap-2"
                      variants={containerVariants}
                    >
                      {cat.skills.map((skill) => (
                        <motion.div key={skill} variants={badgeVariants}>
                          <Badge
                            variant="outline"
                            className="text-xs px-2.5 py-1 border-white/[0.08] bg-white/[0.03] text-white/60 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-200 cursor-default"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Also proficient in */}
          <motion.p
            className="text-center text-white/30 text-sm mt-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="text-[oklch(0.72_0.19_295/0.8)] font-medium">Also proficient in:</span>{" "}
            Jupyter Notebooks, Kaggle, Google Colab, PowerShell, Bash,
            YAML, pytest, Pandas, NumPy, Scikit-learn, and more.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
