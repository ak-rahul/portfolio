"use client";

import { motion, Variants } from "framer-motion";
import { Github, Linkedin, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -3, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/50 hover:text-white hover:border-[oklch(0.72_0.19_295/0.4)] hover:bg-[oklch(0.72_0.19_295/0.08)] transition-all duration-200"
    >
      {icon}
    </motion.a>
  );
}

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden"
    >
      {/* Centre glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, oklch(0.72 0.19 295 / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto text-center z-10 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6 md:space-y-8"
        >
          {/* Status badge */}
          <motion.div variants={item} className="flex justify-center">
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-[oklch(0.72_0.19_295/0.3)] bg-[oklch(0.72_0.19_295/0.06)] text-[oklch(0.85_0.14_290)] text-xs font-medium tracking-wide"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.78_0.17_162)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[oklch(0.78_0.17_162)]" />
              </span>
              Available for new projects
            </Badge>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight"
          >
            <span className="glow-text">AK Rahul</span>
          </motion.h1>

          {/* Tagline */}
          <motion.h2
            variants={item}
            className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-white/50 leading-tight"
          >
            AI Developer &{" "}
            <span className="text-white font-semibold">Agentic Systems</span>{" "}
            Engineer
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg text-white/40 max-w-2xl mx-auto leading-relaxed px-4"
          >
            I build intelligent multi-agent systems that solve complex problems.
            Specializing in{" "}
            <span className="text-[oklch(0.85_0.14_290)] font-medium">LangChain</span>
            ,{" "}
            <span className="text-[oklch(0.78_0.17_162)] font-medium">RAG</span>
            , and scalable agentic architecture.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
          >
            <Button
              size="lg"
              onClick={() => scrollTo("projects")}
              className="h-12 px-8 rounded-full bg-[oklch(0.72_0.19_295)] hover:bg-[oklch(0.68_0.22_295)] text-white font-semibold shadow-[0_0_30px_oklch(0.72_0.19_295/0.3)] hover:shadow-[0_0_40px_oklch(0.72_0.19_295/0.5)] transition-all duration-300 w-full sm:w-auto"
            >
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("contact")}
              className="h-12 px-8 rounded-full border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.07] text-white/70 hover:text-white transition-all duration-300 w-full sm:w-auto"
            >
              Get In Touch
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={item}
            className="flex justify-center gap-3 pt-4"
          >
            <SocialLink
              href="https://github.com/ak-rahul"
              icon={<Github className="h-5 w-5" />}
              label="GitHub"
            />
            <SocialLink
              href="https://www.linkedin.com/in/ak-rahul"
              icon={<Linkedin className="h-5 w-5" />}
              label="LinkedIn"
            />
          </motion.div>

          {/* Certifications strip */}
          <motion.div
            variants={item}
            className="flex flex-wrap justify-center gap-2 pt-2"
          >
            {[
              "Certified Agentic AI Developer",
              "Google Data Analytics Professional",
              "PyPI Publisher",
            ].map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white/30 border border-white/[0.06] bg-white/[0.02]"
              >
                <Sparkles className="h-2.5 w-2.5 text-[oklch(0.72_0.19_295/0.6)]" />
                {cert}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2.5, duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-1">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <span className="text-[10px] text-white/20 tracking-widest uppercase">scroll</span>
        </div>
      </motion.div>
    </section>
  );
}
