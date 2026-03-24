"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, ArrowUpRight, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/ui/GlowCard";

const contactMethods = [
  {
    icon: <Github className="h-6 w-6" />,
    title: "GitHub",
    handle: "@ak-rahul",
    description: "Follow my open-source work",
    href: "https://github.com/ak-rahul",
    color: "139,92,246",
    cta: "View Profile",
  },
  {
    icon: <Linkedin className="h-6 w-6" />,
    title: "LinkedIn",
    handle: "ak-rahul",
    description: "Let's connect professionally",
    href: "https://www.linkedin.com/in/ak-rahul",
    color: "52,211,153",
    cta: "Connect",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-24 px-4 relative" ref={ref}>
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 80%, oklch(0.78 0.17 162 / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 border-white/[0.08] text-white/40 text-xs tracking-widest uppercase">
            Contact
          </Badge>
          <h2 className="text-4xl md:text-6xl font-display font-bold glow-text mb-5">
            Get In Touch
          </h2>
          <p className="text-white/40 text-base leading-relaxed max-w-lg mx-auto">
            I&apos;m always open to discussing new projects, collaborations, or just
            interesting AI conversations. Reach out on any platform below.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 gap-5"
        >
          {contactMethods.map((method) => (
            <motion.div key={method.title} variants={cardVariants}>
              <a
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <GlowCard
                  glowColor={method.color}
                  className="h-full p-6 group hover:scale-[1.02] transition-transform duration-300"
                >
                  {/* Icon + title */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        background: `rgba(${method.color}, 0.12)`,
                        color: `rgb(${method.color})`,
                      }}
                    >
                      {method.icon}
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    />
                  </div>

                  <h3 className="font-display font-semibold text-white text-lg mb-1">
                    {method.title}
                  </h3>
                  <p
                    className="text-sm font-medium mb-2"
                    style={{ color: `rgb(${method.color})` }}
                  >
                    {method.handle}
                  </p>
                  <p className="text-white/40 text-sm">{method.description}</p>

                  {/* CTA text */}
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-white/30 group-hover:text-white/70 transition-colors duration-200">
                    {method.cta}
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </GlowCard>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Collaboration note */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/[0.06] bg-white/[0.02] text-white/30 text-sm">
            <MessageSquare className="h-4 w-4 text-[oklch(0.72_0.19_295/0.6)]" />
            Open to freelance, collaborations, and full-time opportunities.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
