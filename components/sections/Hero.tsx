"use client";

import { motion, Variants } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 pt-20 md:pt-16 relative overflow-hidden"
    >
      {/* Abstract background elements could function here if needed, but we rely on StarryBackground */}

      <div className="max-w-5xl mx-auto text-center z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div variants={item}>
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20 backdrop-blur-sm">
              Available for Hire
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
          >
            AK Rahul
          </motion.h1>

          <motion.h2
            variants={item}
            className="text-2xl sm:text-3xl md:text-4xl font-light mb-8 text-muted-foreground leading-tight"
          >
            AI Developer & <span className="text-foreground font-semibold">Agentic Systems</span> Engineer
          </motion.h2>

          <motion.p
            variants={item}
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed px-2"
          >
            I build intelligent multi-agent systems that solve complex problems.
            Specializing in <span className="text-primary">LangChain</span>, <span className="text-primary">RAG</span>, and scalable architecture.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" className="h-12 sm:h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all w-full sm:w-auto" asChild>
              <a href="#projects">
                View Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-12 sm:h-14 px-8 text-lg rounded-full border-primary/20 hover:bg-primary/5 w-full sm:w-auto" asChild>
              <a href="#contact">
                Contact Me
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="flex gap-6 justify-center mt-12 pt-8"
          >
            <SocialLink href="https://github.com/ak-rahul" icon={<Github className="h-6 w-6" />} label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/ak-rahul" icon={<Linkedin className="h-6 w-6" />} label="LinkedIn" />
            <SocialLink href="mailto:your.email@example.com" icon={<Mail className="h-6 w-6" />} label="Email" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
      >
        <div className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-muted-foreground rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-200"
    >
      {icon}
    </a>
  );
}
